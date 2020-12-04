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
  const directory = path.join("test", "fixtures", category);

  const filename = fixture + ".json";

  t.context.counts.total++;

  if (options.requirement === false) {
    t.context.counts.invalid++;
    t.pass();
    return;
  }

  if (options.legacy) {
    t.context.counts.legacy[options.legacy]++;
  }

  if (rule.isNone()) {
    t.pass();
    return;
  }

  t.plan(1);

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
          if (Outcome.isFailed(outcome) || Outcome.isCantTell(outcome)) {
            return outcome;
          }

          if (Outcome.isFailed(candidate) || Outcome.isCantTell(candidate)) {
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
    t.context.counts.found++;
    t.log(`${outcome.target}`);
  }
}

export namespace fixture {
  export interface Options {
    /**
     * Whether or not this fixture was flagged in the legacy Siteimprove engine.
     */
    legacy?: "error" | "warning";

    /**
     * Whether or not this fixture tests an actual WCAG requirement. Some
     * fixtures don't actually test WCAG requirements and should therefore not
     * be failed by Alfa.
     */
    requirement?: boolean;
  }

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
