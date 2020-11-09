import * as path from "path";
import * as fs from "fs";
import { ExecutionContext } from "ava";

import { Audit, Rule, Outcome } from "@siteimprove/alfa-act";
import { Option } from "@siteimprove/alfa-option";
import { Page } from "@siteimprove/alfa-web";

import { Context } from "./context";

export async function fixture(
  t: ExecutionContext<Context>,
  rule: Option<Rule<Page, unknown, any>>,
  category: string,
  fixture: string,
  options: fixture.Options = {}
): Promise<void> {
  t.plan(1);

  const directory = path.join("test", "fixtures", category);

  const filename = fixture + ".json";

  const test = JSON.parse(
    fs.readFileSync(path.join(directory, filename), "utf8")
  );

  const page = Page.from(test.page);

  const outcome = await Audit.of(page, [rule.get()])
    .evaluate()
    .map((outcomes) =>
      [...outcomes]
        .filter((outcome) => outcome.rule === rule.get())
        .reduce((outcome, candidate) => {
          if (Outcome.isFailed(outcome)) {
            return outcome;
          }

          if (Outcome.isFailed(candidate)) {
            return candidate;
          }

          if (Outcome.isPassed(outcome)) {
            return outcome;
          }

          if (Outcome.isPassed(candidate)) {
            return candidate;
          }

          return outcome;
        })
    );

  if (Outcome.isFailed(outcome) || Outcome.isCantTell(outcome)) {
    t.pass(test.id);
  } else {
    t.fail(test.id);
    t.log(rule.get().uri, "\n", test.page.response.body);
  }

  if (Outcome.isFailed(outcome) || Outcome.isCantTell(outcome)) {
    t.context.found.push(outcome);
    t.log(`${outcome.target}`);
  }
}

export namespace fixture {
  export interface Options {}

  export function title(
    title: string = "",
    rule: Option<Rule<Page, unknown, any>>,
    category: string,
    fixture: string,
    options?: Options
  ): string {
    const directory = path.join("test", "fixtures", category);

    const filename = fixture + ".json";

    const test = JSON.parse(
      fs.readFileSync(path.join(directory, filename), "utf8")
    );

    return test.title;
  }
}
