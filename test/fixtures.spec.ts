import ava, { TestInterface } from "ava";
import { Rules } from "@siteimprove/alfa-rules";
import { Context } from "./helpers/context";
import { fixture } from "./helpers/fixture";
import { summary } from "./helpers/summary";

const test = ava as TestInterface<Context>;

test.before("Initialize context", t => {
  t.context = { found: [] };
});

test.after("Summary", summary);

test(fixture, Rules.SIA_R1, "page-title", "empty-page-title");
test(fixture, Rules.SIA_R1, "page-title", "missing-page-title");

test(
  fixture,
  Rules.SIA_R4,
  "language-of-content",
  "html-element-has-an-empty-lang-attribute"
);
test(
  fixture,
  Rules.SIA_R4,
  "language-of-content",
  "html-element-is-missing-a-lang-attribute"
);
test(
  fixture,
  Rules.SIA_R5,
  "language-of-content",
  "html-element-has-an-invalid-value-in-the-lang-attribute"
);

test(fixture, Rules.SIA_R28, "buttons", "image-button-has-no-alt-attribute");
test(fixture, Rules.SIA_R12, "buttons", "empty-button");
test(fixture, Rules.SIA_R28, "buttons", "empty-alt-attribute-on-image-button");

test(fixture, Rules.SIA_R2, "images", "image-with-no-alt-attribute");
test(
  fixture,
  Rules.SIA_R39,
  "images",
  "image-alt-attribute-contains-image-file-name"
);

test(fixture, Rules.SIA_R11, "links", "image-link-with-no-alternative-text");
test(fixture, Rules.SIA_R11, "links", "blank-link-text");

test(
  fixture,
  Rules.SIA_R8,
  "forms",
  "labels-missing-when-they-would-look-clumsy-for-some-form-controls"
);
test(fixture, Rules.SIA_R8, "forms", "form-element-has-no-label");
test(
  fixture,
  Rules.SIA_R8,
  "forms",
  "label-element-with-for-attribute-but-not-matching-id-attribute-of-form-control"
);
test(fixture, Rules.SIA_R8, "forms", "empty-label-found");
test(fixture, Rules.SIA_R8, "forms", "missing-labels-in-checkboxes");
test(fixture, Rules.SIA_R8, "forms", "placeholder-no-label");

test(fixture, Rules.SIA_R13, "frames", "iframe-is-missing-a-title-attribute");

test(fixture, Rules.SIA_R3, "html", "duplicate-id");
test(fixture, Rules.SIA_R21, "html", "invalid-aria-role-names");
