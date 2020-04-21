import ava, { TestInterface } from "ava";

import { Rules } from "@siteimprove/alfa-rules";

import { Context } from "./helpers/context";
import { fixture } from "./helpers/fixture";
import { summary } from "./helpers/summary";

const test = ava as TestInterface<Context>;

test.before("Initialize context", (t) => {
  t.context = { found: [] };
});

test.after("Summary", summary);

// Language of content
// -----------------------------------------------------------------------------

test(
  fixture,
  Rules.get("R4"),
  "language-of-content",
  "html-element-has-an-empty-lang-attribute"
);

test(
  fixture,
  Rules.get("R5"),
  "language-of-content",
  "html-element-has-an-invalid-value-in-the-lang-attribute"
);

test(
  fixture,
  Rules.get("R7"),
  "language-of-content",
  "lang-attribute-used-to-identify-change-of-language-but-with-invalid-value"
);

test(
  fixture,
  Rules.get("R4"),
  "language-of-content",
  "html-element-is-missing-a-lang-attribute"
);

// Page title
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R1"), "page-title", "empty-page-title");

test(fixture, Rules.get("R1"), "page-title", "missing-page-title");

// Headings
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R64"), "headings", "empty-heading");

test(fixture, Rules.get("R61"), "headings", "missing-h1");

test(
  fixture,
  Rules.get("R53"),
  "headings",
  "headings-not-structured-in-a-hierarchical-manner"
);

// Tables
// -----------------------------------------------------------------------------

test(
  fixture,
  Rules.get("R46"),
  "tables",
  "table-with-column-headers-and-double-row-headers"
);

test(
  fixture,
  Rules.get("R46"),
  "tables",
  "table-that-only-has-th-elements-in-it"
);

test(fixture, Rules.get("R46"), "tables", "table-has-an-empty-table-header");

// Images
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R2"), "images", "image-with-no-alt-attribute");

test(
  fixture,
  Rules.get("R39"),
  "images",
  "image-alt-attribute-contains-image-file-name"
);

// Links
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R11"), "links", "image-link-with-no-alternative-text");

test(fixture, Rules.get("R11"), "links", "blank-link-text");

test(
  fixture,
  Rules.get("R41"),
  "links",
  "links-with-the-same-text-go-to-different-pages"
);

// Buttons
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R28"), "buttons", "image-button-has-no-alt-attribute");

test(fixture, Rules.get("R12"), "buttons", "empty-button");

test(
  fixture,
  Rules.get("R28"),
  "buttons",
  "empty-alt-attribute-on-image-button"
);

// Forms
// -----------------------------------------------------------------------------

test(
  fixture,
  Rules.get("R8"),
  "forms",
  "labels-missing-when-they-would-look-clumsy-for-some-form-controls"
);

test(fixture, Rules.get("R8"), "forms", "form-element-has-no-label");

test(
  fixture,
  Rules.get("R8"),
  "forms",
  "label-element-with-for-attribute-but-not-matching-id-attribute-of-form-control"
);

test(fixture, Rules.get("R8"), "forms", "empty-label-found");

test(fixture, Rules.get("R8"), "forms", "missing-labels-in-checkboxes");

test(fixture, Rules.get("R8"), "forms", "placeholder-no-label");

// Frames
// -----------------------------------------------------------------------------

test(
  fixture,
  Rules.get("R13"),
  "frames",
  "iframe-is-missing-a-title-attribute"
);

// HTML
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R3"), "html", "duplicate-id");

test(fixture, Rules.get("R21"), "html", "invalid-aria-role-names");
