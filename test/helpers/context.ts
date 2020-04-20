import { Outcome } from "@siteimprove/alfa-act";
import { Page } from "@siteimprove/alfa-web";

export interface Context {
  found: Array<Outcome<Page, unknown, any>>;
}
