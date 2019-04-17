import { Aspect, Target, Result, Outcome } from "@siteimprove/alfa-act";

export interface Context {
  found: Array<Result<Aspect, Target, Outcome.Failed | Outcome.CantTell>>;
}
