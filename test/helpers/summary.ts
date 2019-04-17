import { ExecutionContext } from "ava";
import * as globby from "globby";
import plur = require("plur");
import { Context } from "./context";

const { round } = Math;

export function summary(t: ExecutionContext<Context>) {
  const total = globby.sync("test/fixtures/**/*.json").length;
  const found = t.context.found.length;
  const pct = round((found / total) * 1e4) / 1e2;

  t.log("Found", found, plur("barrier", found), "out of", total, `(${pct}%)`);
}
