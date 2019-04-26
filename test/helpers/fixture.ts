import * as path from "path";
import * as fs from "fs";
import { ExecutionContext } from "ava";

import { Rule, Result, Outcome, audit } from "@siteimprove/alfa-act";
import { Seq } from "@siteimprove/alfa-collection";

import { Context } from "./context";

const { isArray } = Array;

export interface FixtureOptions {}

export function fixture(
  t: ExecutionContext<Context>,
  rule: Rule<any, any> | Array<Rule<any, any>>,
  category: string,
  fixture: string,
  options: FixtureOptions = {}
): void {
  const rules = isArray(rule) ? rule : [rule];

  const directory = path.join("test", "fixtures", category);

  const filename = fixture + ".json";

  const test = JSON.parse(
    fs.readFileSync(path.join(directory, filename), "utf8")
  );

  t.plan(1);

  const precedence: { [O in Outcome]: number } = {
    [Outcome.Failed]: 3,
    [Outcome.CantTell]: 2,
    [Outcome.Passed]: 1,
    [Outcome.Inapplicable]: 0
  };

  const result = Seq(audit(test.aspects, rules).results)
    .filter(result => rules.indexOf(result.rule) !== -1)
    .reduce<Result<any, any>>((result, candidate) =>
      precedence[candidate.outcome] > precedence[result.outcome]
        ? candidate
        : result
    );

  t.assert(
    [Outcome.Failed, Outcome.CantTell].includes(result.outcome),
    test.id
  );

  if (
    result.outcome === Outcome.Failed ||
    result.outcome === Outcome.CantTell
  ) {
    t.context.found.push(result);
    t.log("Target", result.target);
  }
}

export namespace fixture {
  export function title(
    title: string = "",
    rule: Rule<any, any> | Array<Rule<any, any>>,
    category: string,
    fixture: string,
    options?: FixtureOptions
  ): string {
    const directory = path.join("test", "fixtures", category);

    const filename = fixture + ".json";

    const test = JSON.parse(
      fs.readFileSync(path.join(directory, filename), "utf8")
    );

    return test.title;
  }
}
