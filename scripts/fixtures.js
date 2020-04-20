const path = require("path");
const fs = require("fs");
const makeDir = require("make-dir");
const temp = require("tempy");

const { Scraper } = require("@siteimprove/alfa-scraper");

const tests = require("../vendor/accessibility-tool-audit/tests.json");

const { keys } = Object;

const out = path.join("test", "fixtures");

fetch(out);

async function fetch(out) {
  const scraper = await Scraper.of();

  for (const category of keys(tests)) {
    const directory = path.join(out, normalize(category));

    console.group(directory);

    await makeDir(directory);

    for (const title of keys(tests[category])) {
      const test = tests[category][title];

      const id = normalize(title);
      const filename = id + ".json";

      console.time(filename);

      const url = temp.file({ name: id + ".html" });

      const example = /href="example-pages\/(.+\.html)"/.exec(test.example);

      let content;

      if (example === null) {
        content = await template(test.example, title);
      } else {
        content = fs.readFileSync(
          path.resolve(
            __dirname,
            path.join(
              "../vendor/accessibility-tool-audit/example-pages",
              example[1]
            )
          )
        );
      }

      fs.writeFileSync(url, content);

      const page = await scraper
        .scrape(`file://${url}`)
        .then((page) => page.toJSON());

      const fixture = JSON.stringify(
        {
          id,
          category,
          title,
          page,
        },
        null,
        2
      );

      fs.writeFileSync(path.join(directory, filename), fixture + "\n");

      console.timeEnd(filename);
    }

    console.groupEnd(directory);
  }

  scraper.close();
}

/**
 * @see https://github.com/alphagov/accessibility-tool-audit/blob/gh-pages/build/generate.js#L95-L105
 */
function normalize(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-\ ]/g, "")
    .replace(/\//g, " ")
    .replace(/:/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * @see https://github.com/alphagov/accessibility-tool-audit/blob/gh-pages/build/templates/single-test.html
 */
async function template(content, title) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <script src="${await asset("javascript/jquery-1.12.0.min.js")}"></script>
  <script src="${await asset("javascript/main.js")}"></script>
  <link rel="stylesheet" href="${await asset("stylesheets/tests.css")}">
</head>
<body>
  <h1>${title}</h1>
  <main>${content}</main>
</body>
</html>
  `.trim();
}

const assets = new Map();

async function asset(name) {
  let asset = assets.get(name);

  if (asset === undefined) {
    asset = temp.file({ name });

    await makeDir(path.dirname(asset));

    fs.writeFileSync(
      asset,
      fs.readFileSync(
        path.resolve(
          __dirname,
          path.join("../vendor/accessibility-tool-audit/assets", name)
        )
      )
    );

    assets.set(name, asset);
  }

  return asset;
}
