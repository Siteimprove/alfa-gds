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

// @see https://alphagov.github.io/accessibility-tool-audit/test-cases.html

// Content
// -----------------------------------------------------------------------------

// Content identified by location => manual
// @see https://github.com/act-rules/act-rules.github.io/pull/832

// Plain language is not used => out of scope (QA?)

// Content is not in correct reading order in source code => needs layout system (at least)

// First instance of abbreviation not expanded => out of scope (QA?)

// Page Layout
// -----------------------------------------------------------------------------

// Wide page forces users to scroll horizontally => Not done yet

// Colour and Contrast
// -----------------------------------------------------------------------------

// Colour alone is used to convey content => manual?

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "small-text-does-not-have-a-contrast-ratio-of-at-least-451-so-does-not-meet-aa"
);

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "large-text-does-not-have-a-contrast-ratio-of-at-least-31-so-does-not-meet-aa"
);

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "small-text-does-not-have-a-contrast-ratio-of-at-least-71-so-does-not-meet-aaa"
);

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "large-text-does-not-have-a-contrast-ratio-of-at-least-451-so-does-not-meet-aaa"
);

// Focus not visible => R65-ish
// The button actually has visible focus with a border going from 2px to 1px, thus passes R65.

// Typography
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R73"), "typography", "inadequate-line-height-used");

test(fixture, Rules.get("R72"), "typography", "all-caps-text-found");

// Blink element found => R70 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-165

test(
  fixture,
  Rules.get("R85"),
  "typography",
  "italics-used-on-long-sections-of-text"
);

// Marquee element found => R70 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-165

test(fixture, Rules.get("R75"), "typography", "very-small-text-found");

test(fixture, Rules.get("R71"), "typography", "justified-text-found");

// Language of content
// -----------------------------------------------------------------------------

// Text language changed without required change in direction => not planned yet

test(
  fixture,
  Rules.get("R4"),
  "language-of-content",
  "html-element-has-an-empty-lang-attribute"
);

// lang attribute not used to identify change of language => not planned

// Text language is in the wrong direction

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

// html element has lang attribute set to wrong language => not planned, need collaboration with QA
// @see https://act-rules.github.io/rules/ucwvc8

// lang attribute used to identify change of language, but with wrong language => not planned

// Page title
// -----------------------------------------------------------------------------

// Inappropriate page title => manual

test(fixture, Rules.get("R1"), "page-title", "empty-page-title");

test(fixture, Rules.get("R1"), "page-title", "missing-page-title");

// Headings
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R64"), "headings", "empty-heading");

test(fixture, Rules.get("R61"), "headings", "missing-h1");

// Text formatting used instead of an actual heading => manual

test(
  fixture,
  Rules.get("R53"),
  "headings",
  "headings-not-structured-in-a-hierarchical-manner"
);

// Lists
// -----------------------------------------------------------------------------

// LI element with no parent => not there yet
// @see https://github.com/act-rules/act-rules.github.io/pull/1250

// List not marked up as a list => out of scope

// DT or DD elements that are not contained within a DL element => not there yet
// @see https://github.com/act-rules/act-rules.github.io/pull/1250

// Improperly nested lists => not there yet
// @see https://github.com/act-rules/act-rules.github.io/pull/1176

// Tables
// -----------------------------------------------------------------------------

test(
  fixture,
  Rules.get("R46"),
  "tables",
  "table-with-column-headers-and-double-row-headers"
);

// Table has no scope attributes => R76 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-171

// Table nested within table header => not planned

// Table nested within table => R77 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-172

// Table with inconsistent numbers of columns in rows => not planned
// not a WCAG failure?

test(
  fixture,
  Rules.get("R46"),
  "tables",
  "table-that-only-has-th-elements-in-it"
);

// Table is missing a caption => not planned
// not a WCAG failure?

// Table used for layout => not planned

test(fixture, Rules.get("R46"), "tables", "table-has-an-empty-table-header");

// Table with some empty cells => not planned
// has valid use cases
// @see https://www.w3.org/WAI/tutorials/tables/two-headers/#table-with-header-cells-in-the-top-row-and-first-column

// Images
// -----------------------------------------------------------------------------

// Image has alt and title that are different => not planned
// not a WCAG failure

// Image with presentation role has non-empty alt => not planned
// non-empty alt does not trigger presentational role conflict resolution so R86 passes this

test(fixture, Rules.get("R2"), "images", "image-with-no-alt-attribute");

// Background image that conveys information does not have a text alternative => not planned
// Alfa doesn't handle background images

// Image has empty alt and non-empty title => not planned
// non-empty title does not trigger presentational role conflict resolution, so R86 passes this

// A distraction is present, an animated gif => manual

// Image that conveys information has an empty alt attribute => manual
// @see https://act-rules.github.io/rules/e88epe

// Image that conveys information has inappropriate alt text => manual
// @see https://act-rules.github.io/rules/qt1vmo

// Note that R39 is always asking question on the target, so we always have a cantTell outcome with it
// Since this test never consider a filename as a correct accessible name, this is correct
test(
  fixture,
  Rules.get("R39"),
  "images",
  "image-alt-attribute-contains-image-file-name"
);

// Image with partial text alternative => manual
// @see https://act-rules.github.io/rules/qt1vmo

// Multimedia
// -----------------------------------------------------------------------------

// Multimedia rules all have question in the Applicability.
// Thus, they result in cantTell on every video whether they pass or fail the test

// Embedded video file is missing text alternative => R38

// Flashing content doesn't have warning => manual?

// Embedded audio file is missing text alternative => R30

// Links
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R11"), "links", "image-link-with-no-alternative-text");

// Link to javascript, invalid hypertext reference => not planned

// Uninformative link text => manual
// only the 2.4.4 rule in ACT rule, this arguably failing 2.4.9
// @see https://act-rules.github.io/rules/5effbb

// Link launches new window with no warning => manual?

// Links not separated by printable characters => manual?

// Link text with identical title => not planned
// not a WCAG failure?

// Links to a sound file, no transcript => not planned

// Identifying links by colour alone => R62 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-61
// OTOH, that very test case has the link alone on a line and will be inapplicable to
// @see https://github.com/act-rules/act-rules.github.io/pull/1010

// Link to PDF does not include information on file format and file size => not planned

// Link to #, invalid hypertext reference => not planned
// not a WCAG failure? <a href="#"> has valid use cases

test(fixture, Rules.get("R11"), "links", "blank-link-text");

test(
  fixture,
  Rules.get("R41"),
  "links",
  "links-with-the-same-text-go-to-different-pages"
);

// Link text does not make sense out of context => manual

// Adjacent links going to the same destination => R52 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-78

// Link contains only a full stop => manual
// @see https://act-rules.github.io/rules/5effbb

// Image link alt text repeats text in the link => R51 is not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-77

// Link not clearly identifiable and distinguishable from surrounding text => R62 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-61

// Link to a multimedia file, no transcript => not planned

// Non-specific link text => not planned
// @see https://siteimprove-wgs.atlassian.net/browse/WT-67
// Maybe as a policy to circumvent problems with translations

// Link to an image, no text alternative => not planned

// Buttons
// -----------------------------------------------------------------------------

// Alfa consider the default name of "Submit button" as a valid accessible name for image buttons
// test(fixture, Rules.get("R28"), "buttons", "image-button-has-no-alt-attribute");

test(fixture, Rules.get("R12"), "buttons", "empty-button");

// Uninformative alt attribute value on image button => manual

// Alfa consider the default name of "Submit button" as a valid accessible name for image buttons
// test(
//   fixture,
//   Rules.get("R28"),
//   "buttons",
//   "empty-alt-attribute-on-image-button"
// );

// Forms
// -----------------------------------------------------------------------------

// Errors identified by colour only => manual

test(
  fixture,
  Rules.get("R8"),
  "forms",
  "labels-missing-when-they-would-look-clumsy-for-some-form-controls"
);

// Error messages - no suggestion for corrections given, e.g. required format => R82 always ask question
// @see https://siteimprove-wgs.atlassian.net/browse/WT-154

// Left aligned form labels with too much white space => manual

// Group of radio buttons not enclosed in a fieldset => R80 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-80

test(fixture, Rules.get("R8"), "forms", "form-element-has-no-label");

// Fieldset without a legend => not planned

// Empty legend => not planned

test(
  fixture,
  Rules.get("R8"),
  "forms",
  "label-element-with-for-attribute-but-not-matching-id-attribute-of-form-control"
);

// Group of check boxes not enclosed in a fieldset => R80 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-80

test(fixture, Rules.get("R8"), "forms", "empty-label-found");

// Two unique labels, but identical for= attributes => not planned

test(
  fixture,
  Rules.get("R69"),
  "forms",
  "errors-identified-with-a-poor-colour-contrast"
);

// Non-unique field label found => manual?

test(fixture, Rules.get("R8"), "forms", "missing-labels-in-checkboxes");

// Field hint not associated with input => manual?

// Alfa considers the placeholder attribute as a valid way to give an accessible name
// test(fixture, Rules.get("R8"), "forms", "placeholder-no-label");

// Errors are not identified => R82 always ask question
// @see https://siteimprove-wgs.atlassian.net/browse/WT-154

// Form control that changes context without warning => manual?

// Navigation
// -----------------------------------------------------------------------------

// Inadequately-sized clickable targets found => not planned yet

// Keyboard Access
// -----------------------------------------------------------------------------

// Alert shows for a short time => manual

// Lightbox - close button doesn't receive focus => manual

// Focus order in wrong order => manual

// Tabindex greater than 0 => not planned
// not a WCAG failure per se

// Keyboard focus is not indicated visually => R65-ish
// R65 needs 2 focusable on page, this test case only has one and is inapplicable…

// Keyboard focus assigned to a non focusable element using tabindex=0 => not planned
// not a WCAG failure per se

// Concertina items don't get keyboard focus => manual

// Keyboard trap => manual
// @see https://act-rules.github.io/rules/80af7b

// Dropdown navigation - only the top level items receive focus => manual

// Lightbox - ESC key doesn't close the lightbox => manual

// Link with a role=button does not work with space bar => manual

// Tooltips don't receive keyboard focus => manual?

// Accesskey attribute used => not planned

// Lightbox - focus is not moved immediately to lightbox => manual

// Lightbox - focus is not retained within the lightbox => manual

// Fake button is not keyboard accessible => not planned
// Could be "widget is in tab order"?

// Frames
// -----------------------------------------------------------------------------

test(
  fixture,
  Rules.get("R13"),
  "frames",
  "iframe-is-missing-a-title-attribute"
);

// iframe title attribute does not describe the content or purpose of the iframe => manual

// CSS
// -----------------------------------------------------------------------------

// Content is not readable and functional when text is increased => manual?
// seems to be Firefox specific…

// Non-decorative content inserted using CSS => manual

// visibility:hidden used to visually hide content when it should be available to screenreader => manual

// display:none used to visually hide content when it should be available to screenreader => manual

// Page zoom - boxes that don't expand with the text => manual
// the zoom seems to work fine in Chrome :thinking:

// HTML
// -----------------------------------------------------------------------------

test(fixture, Rules.get("R3"), "html", "duplicate-id");

// Article element used to mark-up an element that's not an article/blog post etc. => manual

// Empty paragraph => not planned

// Deprecated center element => R70 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-165

test(fixture, Rules.get("R21"), "html", "invalid-aria-role-names");

// Object not embedded accessibly - wmode parameter not set to window => not planned

// Spacer image found => not planned

// Inline style adds colour => not planned

// Start and close tags don't match => not planned
// usually auto-fixed by browsers.

// PRE element without CODE element inside it => R79 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-174

// Deprecated font element => R70 not written yet
// @see https://siteimprove-wgs.atlassian.net/browse/WT-165
