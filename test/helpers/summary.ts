import { ExecutionContext } from "ava";
import plur = require("plur");

import { Context } from "./context";

const { round } = Math;

export function summary(t: ExecutionContext<Context>) {
  const { total, found, invalid, legacy } = t.context.counts;

  t.log(
    "Alfa found",
    found,
    plur("barrier", found),
    "out of",
    total - invalid,
    `(${round((found / (total - invalid)) * 1e4) / 1e2}%)`
  );

  t.log(
    "Legacy engine found",
    legacy.error,
    plur("barrier", legacy.error),
    "out of",
    total - invalid,
    `(${round((legacy.error / (total - invalid)) * 1e4) / 1e2}%)`
  );

  t.log(invalid, "out of", total, "barriers were false positives");
}
