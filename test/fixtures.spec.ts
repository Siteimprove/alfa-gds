import ava, { TestInterface } from "ava";

import { Rules } from "@siteimprove/alfa-rules";
import { None } from "@siteimprove/alfa-option";

import { Context } from "./helpers/context";
import { fixture } from "./helpers/fixture";
import { summary } from "./helpers/summary";

const test = ava as TestInterface<Context>;

test.before("Initialize context", (t) => {
  t.context = {
    counts: {
      total: 0,
      found: 0,
      invalid: 0,
      legacy: { error: 0, warning: 0 },
    },
  };
});

test.after("Summary", summary);

// Content
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#content

test(fixture, None, "content", "content-identified-by-location");

test(fixture, None, "content", "plain-language-is-not-used");

test(
  fixture,
  None,
  "content",
  "content-is-not-in-correct-reading-order-in-source-code"
);

test(
  fixture,
  None,
  "content",
  "content-is-not-organised-into-well-defined-groups-or-chunks-using-headings-lists-and-other-visual-mechanisms"
);

test(fixture, None, "content", "first-instance-of-abbreviation-not-expanded");

// Page Layout
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#pagelayout

test(
  fixture,
  None,
  "page-layout",
  "wide-page-forces-users-to-scroll-horizontally"
);

// Colour and Contrast
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#colourandcontrast

test(
  fixture,
  None,
  "colour-and-contrast",
  "colour-alone-is-used-to-convey-content"
);

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "small-text-does-not-have-a-contrast-ratio-of-at-least-451-so-does-not-meet-aa",
  {
    legacy: "error",
  }
);

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "large-text-does-not-have-a-contrast-ratio-of-at-least-31-so-does-not-meet-aa",
  {
    legacy: "error",
  }
);

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "small-text-does-not-have-a-contrast-ratio-of-at-least-71-so-does-not-meet-aaa",
  {
    legacy: "error",
  }
);

test(
  fixture,
  Rules.get("R69"),
  "colour-and-contrast",
  "large-text-does-not-have-a-contrast-ratio-of-at-least-451-so-does-not-meet-aaa",
  {
    legacy: "error",
  }
);

test(fixture, None, "colour-and-contrast", "focus-not-visible");

// Typography
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#typography

test(fixture, Rules.get("R73"), "typography", "inadequate-line-height-used");

test(fixture, Rules.get("R72"), "typography", "all-caps-text-found", {
  // While using capitalized text does make it more difficult to read, it is not
  // a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "typography", "blink-element-found", {
  // As the <blink> element is both deprecated and obsolete, it no longer works
  // in any modern browser and is therefore not a WCAG conformance issue.
  requirement: false,
});

test(
  fixture,
  Rules.get("R85"),
  "typography",
  "italics-used-on-long-sections-of-text",
  {
    // While using italic text for long sections does make it more difficult to
    // read, it is not a WCAG conformance issue.
    requirement: false,
  }
);

test(fixture, None, "typography", "marquee-element-found", {
  legacy: "error",
});

test(fixture, Rules.get("R75"), "typography", "very-small-text-found", {
  // Small text is by itself not a WCAG conformance issue as long as it can be
  // resized without loss of functionality or information, which is the case
  // here.
  requirement: false,
});

test(fixture, Rules.get("R71"), "typography", "justified-text-found");

// Language of content
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#languageofcontent

test(
  fixture,
  None,
  "language-of-content",
  "text-language-changed-without-required-change-in-direction"
);

test(
  fixture,
  Rules.get("R4"),
  "language-of-content",
  "html-element-has-an-empty-lang-attribute",
  {
    legacy: "error",
  }
);

test(
  fixture,
  None,
  "language-of-content",
  "lang-attribute-not-used-to-identify-change-of-language"
);

test(
  fixture,
  None,
  "language-of-content",
  "text-language-is-in-the-wrong-direction"
);

test(
  fixture,
  Rules.get("R5"),
  "language-of-content",
  "html-element-has-an-invalid-value-in-the-lang-attribute",
  {
    legacy: "error",
  }
);

test(
  fixture,
  Rules.get("R7"),
  "language-of-content",
  "lang-attribute-used-to-identify-change-of-language-but-with-invalid-value",
  {
    legacy: "error",
  }
);

test(
  fixture,
  Rules.get("R4"),
  "language-of-content",
  "html-element-is-missing-a-lang-attribute",
  {
    legacy: "error",
  }
);

test(
  fixture,
  None,
  "language-of-content",
  "html-element-has-lang-attribute-set-to-wrong-language"
);

test(
  fixture,
  None,
  "language-of-content",
  "lang-attribute-used-to-identify-change-of-language-but-with-wrong-language"
);

// Page title
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#pagetitle

test(fixture, None, "page-title", "inappropriate-page-title");

test(fixture, Rules.get("R1"), "page-title", "empty-page-title", {
  legacy: "error",
});

test(fixture, Rules.get("R1"), "page-title", "missing-page-title", {
  legacy: "error",
});

// Headings
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#headings

test(fixture, Rules.get("R64"), "headings", "empty-heading", {
  legacy: "error",
});

test(fixture, Rules.get("R61"), "headings", "missing-h1", {
  legacy: "error",

  // While not having an <h1> makes it more difficult to navigate by headings,
  // it is not a WCAG conformance issue.
  requirement: false,
});

test(
  fixture,
  None,
  "headings",
  "text-formatting-used-instead-of-an-actual-heading"
);

test(
  fixture,
  Rules.get("R53"),
  "headings",
  "headings-not-structured-in-a-hierarchical-manner",
  {
    legacy: "error",

    // While not having properly structured headings can make it more difficult
    // to navigate by headings, it is not a WCAG conformance issue.
    requirement: false,
  }
);

// Lists
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#lists

test(fixture, None, "lists", "li-element-with-no-parent");

test(fixture, None, "lists", "list-not-marked-up-as-a-list");

test(
  fixture,
  None,
  "lists",
  "dt-or-dd-elements-that-are-not-contained-within-a-dl-element"
);

test(fixture, None, "lists", "improperly-nested-lists");

// Tables
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#tables

test(
  fixture,
  Rules.get("R46"),
  "tables",
  "table-with-column-headers-and-double-row-headers",
  {
    legacy: "warning",
  }
);

test(fixture, None, "tables", "table-has-no-scope-attributes");

test(fixture, None, "tables", "table-nested-within-table-header");

test(fixture, None, "tables", "table-nested-within-table");

test(
  fixture,
  None,
  "tables",
  "table-with-inconsistent-numbers-of-columns-in-rows",
  {
    legacy: "warning",

    // While the <table> element ends up oddly layed out, it is still possible
    // to navigate to all cells and headers are announced correctly. It is
    // therefore not a WCAG conformance issue.
    requirement: false,
  }
);

test(
  fixture,
  Rules.get("R46"),
  "tables",
  "table-that-only-has-th-elements-in-it"
);

test(fixture, None, "tables", "table-is-missing-a-caption", {
  legacy: "error",

  // While <caption> elements can help provide an overview of the data in a
  // <table>, they are not required and it is therefore not a WCAG conformance
  // issue.
  requirement: false,
});

test(fixture, None, "tables", "table-used-for-layout");

test(fixture, None, "tables", "table-has-an-empty-table-header", {
  legacy: "error",

  // The empty <th> has no effect on neither the ability to navigate the table
  // nor the ability to determine that the row headers are names. It is
  // therefore not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "tables", "table-with-some-empty-cells", {
  // Empty <td> elements are fine for indicating missing data and will both
  // appear and be announced by assistive technology as "blank". It is therefore
  // not a WCAG conformance issue.
  requirement: false,
});

// Images
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#images

test(fixture, None, "images", "image-has-alt-and-title-that-are-different", {
  // Having alt and title attributes that are different is not necessarily an
  // issue. In this case, both attributes comminicate that the image has
  // something to do with the BBC. It is therefore not a WCAG conformance issue.
  requirement: false,
});

test(
  fixture,
  None,
  "images",
  "image-with-presentation-role-has-non-empty-alt",
  {
    // A presentational image with a non-empty alt attribute is not an issue
    // unless the image wasn't intended to be presentational. In this case, it's
    // clearly the intention for the image to be presentational and the alt
    // attribute is simply ignored. It is therefore not a WCAG conformance issue.
    requirement: false,
  }
);

test(fixture, Rules.get("R2"), "images", "image-with-no-alt-attribute", {
  legacy: "error",
});

test(
  fixture,
  None,
  "images",
  "background-image-that-conveys-information-does-not-have-a-text-alternative"
);

test(fixture, None, "images", "image-has-empty-alt-and-non-empty-title", {
  legacy: "error",

  // Having an empty alt attribute on an image will make it presentational,
  // which may or may not be appropriate depending on the context. The title
  // attribute is still presented as a tooltip, which likewise may or may not
  // be appropriate depending on the context. It is therefore not necessarily
  // a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "images", "a-distraction-is-present-an-animated-gif", {
  // Moving images are not a WCAG conformance issue unless they present
  // information and fulfill other criteria, neither of which this image does.
  // It is therefore not a WCAG conformance issue.
  requirement: false,
});

test(
  fixture,
  None,
  "images",
  "image-that-conveys-information-has-an-empty-alt-attribute",
  {
    legacy: "warning",
  }
);

test(
  fixture,
  None,
  "images",
  "image-that-conveys-information-has-inappropriate-alt-text"
);

test(
  fixture,
  Rules.get("R39"),
  "images",
  "image-alt-attribute-contains-image-file-name",
  {
    legacy: "error",
  }
);

test(fixture, None, "images", "image-with-partial-text-alternative");

// Multimedia
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#multimedia

test(
  fixture,
  None,
  "multimedia",
  "embedded-video-file-is-missing-text-alternative",
  {
    legacy: "warning",
  }
);

test(fixture, None, "multimedia", "flashing-content-doesnt-have-warning");

test(
  fixture,
  None,
  "multimedia",
  "embedded-audio-file-is-missing-text-alternative",
  {
    legacy: "warning",
  }
);

// Links
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#links

test(
  fixture,
  Rules.get("R11"),
  "links",
  "image-link-with-no-alternative-text",
  {
    legacy: "error",
  }
);

test(fixture, None, "links", "link-to-javascript-invalid-hypertext-reference", {
  // Using the `javascript:` protocol for <a> elements is not necessarily a WCAG
  // conformance issue. In this case, it's simply used for showing an alert box.
  // It is therefore not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "links", "uninformative-link-text", {
  legacy: "error",
});

test(fixture, None, "links", "link-launches-new-window-with-no-warning");

test(fixture, None, "links", "links-not-separated-by-printable-characters", {
  // Links are not required to be separated by printable character and is not a
  // WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "links", "link-text-with-identical-title", {
  // While duplicating the link text in the title attribute is unnecessary, it
  // is not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "links", "links-to-a-sound-file-no-transcript");

test(fixture, Rules.get("R62"), "links", "identifying-links-by-colour-alone");

test(
  fixture,
  None,
  "links",
  "link-to-pdf-does-not-include-information-on-file-format-and-file-size",
  {
    // Links to external assets are not required to describe the file format nor
    // the size of the asset referenced. It is therefore not a WCAG conformance
    // iisue.
    requirement: false,
  }
);

test(fixture, None, "links", "link-to-invalid-hypertext-reference", {
  // Empty fragment references in <a> elements are a perfectly valid way of
  // implementing "go to top" behaviour, which is what this link does. The link
  // text is poor, but is ambiguous to users in general. It is therefore not a
  // WCAG conformance issue.
  requirement: false,
});

test(fixture, Rules.get("R11"), "links", "blank-link-text");

test(
  fixture,
  Rules.get("R41"),
  "links",
  "links-with-the-same-text-go-to-different-pages",
  {
    legacy: "error",
  }
);

test(fixture, None, "links", "link-text-does-not-make-sense-out-of-context");

test(fixture, None, "links", "adjacent-links-going-to-the-same-destination", {
  legacy: "error",

  // While having two adjacent links going to the same destination can be
  // cumbersome when relying on tab navigation as it adds an unnecessary tab
  // stop, it is not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "links", "link-contains-only-a-full-stop");

test(fixture, None, "links", "image-link-alt-text-repeats-text-in-the-link", {
  legacy: "error",

  requirement: false,
});

test(
  fixture,
  Rules.get("R62"),
  "links",
  "link-not-clearly-identifiable-and-distinguishable-from-surrounding-text",
  {
    legacy: "error",
  }
);

test(fixture, None, "links", "link-to-a-multimedia-file-no-transcript");

test(fixture, None, "links", "non-specific-link-text", {
  legacy: "error",
});

test(fixture, None, "links", "link-to-an-image-no-text-alternative");

// Buttons
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#buttons

test(fixture, None, "buttons", "image-button-has-no-alt-attribute", {
  legacy: "error",

  // Image buttons receive a default name of "Submit", which may or may not be
  // appropriate depending on the context. It is therefore not a WCAG
  // conformance issue.
  requirement: false,
});

test(fixture, Rules.get("R12"), "buttons", "empty-button");

test(
  fixture,
  None,
  "buttons",
  "uninformative-alt-attribute-value-on-image-button"
);

test(fixture, None, "buttons", "empty-alt-attribute-on-image-button", {
  legacy: "error",

  // Image buttons receive a default name of "Submit", which may or may not be
  // appropriate depending on the context. It is therefore not a WCAG
  // conformance issue.
  requirement: false,
});

// Forms
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#forms

test(fixture, None, "forms", "errors-identified-by-colour-only");

test(
  fixture,
  Rules.get("R8"),
  "forms",
  "labels-missing-when-they-would-look-clumsy-for-some-form-controls",
  {
    legacy: "error",
  }
);

test(
  fixture,
  None,
  "forms",
  "error-messages-no-suggestion-for-corrections-given-eg-required-format"
);

test(
  fixture,
  None,
  "forms",
  "left-aligned-form-labels-with-too-much-white-space",
  {
    requirement: false,
  }
);

test(
  fixture,
  None,
  "forms",
  "group-of-radio-buttons-not-enclosed-in-a-fieldset",
  {
    requirement: false,
  }
);

test(fixture, Rules.get("R8"), "forms", "form-element-has-no-label", {
  legacy: "error",
});

test(fixture, None, "forms", "fieldset-without-a-legend", {
  // Fieldsets are not required to have a legend, especially not when they don't
  // contain any form controls. It is therefore not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "forms", "empty-legend", {
  // Legend are not required to contain text, especially not when their
  // associated fieldset contains no form controls. It is therefore not a WCAG
  // conformance issue.
  requirement: false,
});

test(
  fixture,
  Rules.get("R8"),
  "forms",
  "label-element-with-for-attribute-but-not-matching-id-attribute-of-form-control",
  {
    legacy: "error",
  }
);

test(
  fixture,
  None,
  "forms",
  "group-of-check-boxes-not-enclosed-in-a-fieldset",
  {
    requirement: false,
  }
);

test(fixture, Rules.get("R8"), "forms", "empty-label-found", {
  legacy: "error",
});

test(fixture, None, "forms", "two-unique-labels-but-identical-for-attributes", {
  requirement: false,
});

test(
  fixture,
  Rules.get("R69"),
  "forms",
  "errors-identified-with-a-poor-colour-contrast",
  {
    legacy: "error",
  }
);

test(fixture, None, "forms", "non-unique-field-label-found");

test(fixture, Rules.get("R8"), "forms", "missing-labels-in-checkboxes", {
  legacy: "error",
});

test(fixture, None, "forms", "field-hint-not-associated-with-input");

test(fixture, None, "forms", "placeholder-no-label", {
  legacy: "error",

  // Labels are not necessarily required when placeholders are used as the
  // placeholder provides a non-persistent label. In this case, both the type
  // of the input and the associated submit button clearly indicate the purpose
  // of the input even in the abscense of the placeholder. It is therefore not a
  // WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "forms", "errors-are-not-identified");

test(
  fixture,
  None,
  "forms",
  "form-control-that-changes-context-without-warning"
);

// Navigation
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#navigation

test(fixture, None, "navigation", "inadequately-sized-clickable-targets-found");

// Keyboard Access
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#keyboardaccess

test(fixture, None, "keyboard-access", "alert-shows-for-a-short-time", {
  legacy: "warning",
});

test(
  fixture,
  None,
  "keyboard-access",
  "lightbox-close-button-doesnt-receive-focus"
);

test(fixture, None, "keyboard-access", "focus-order-in-wrong-order", {
  legacy: "warning",
});

test(fixture, None, "keyboard-access", "tabindex-greater-than-0", {
  legacy: "warning",

  // It is perfectly fine, albeit error prone, to use a tabindex attribute with
  // a value greater than 0. It is therefore not a WCAG conformance issue.
  requirement: false,
});

test(
  fixture,
  None,
  "keyboard-access",
  "keyboard-focus-is-not-indicated-visually",
  {
    legacy: "error",

    // Focus indicators are only required when more than one keyboard actionable
    // item is present. It is therefore not a WCAG conformance issue.
    requirement: false,
  }
);

test(
  fixture,
  None,
  "keyboard-access",
  "keyboard-focus-assigned-to-a-non-focusable-element-using-tabindex0",
  {
    // It is perfectly fine to make otherwise non-inactive elements elements
    // interactive using the tabindex attribute. It is therefore not a WCAG
    // conformance issue.
    requirement: false,
  }
);

test(
  fixture,
  None,
  "keyboard-access",
  "concertina-items-dont-get-keyboard-focus"
);

test(fixture, None, "keyboard-access", "keyboard-trap");

test(
  fixture,
  None,
  "keyboard-access",
  "dropdown-navigation-only-the-top-level-items-receive-focus"
);

test(
  fixture,
  None,
  "keyboard-access",
  "lightbox-esc-key-doesnt-close-the-lightbox"
);

test(
  fixture,
  None,
  "keyboard-access",
  "link-with-a-rolebutton-does-not-work-with-space-bar",
  {
    legacy: "warning",
  }
);

test(fixture, None, "keyboard-access", "tooltips-dont-receive-keyboard-focus");

test(fixture, None, "keyboard-access", "accesskey-attribute-used", {
  // While the accesskey is poorly supported, it is not necessarily a WCAG
  // conformance issue to use it.
  requirement: false,
});

test(
  fixture,
  None,
  "keyboard-access",
  "lightbox-focus-is-not-moved-immediately-to-lightbox"
);

test(
  fixture,
  None,
  "keyboard-access",
  "lightbox-focus-is-not-retained-within-the-lightbox"
);

test(
  fixture,
  None,
  "keyboard-access",
  "fake-button-is-not-keyboard-accessible"
);

// Frames
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#frames

test(
  fixture,
  Rules.get("R13"),
  "frames",
  "iframe-is-missing-a-title-attribute",
  {
    legacy: "error",
  }
);

test(
  fixture,
  None,
  "frames",
  "iframe-title-attribute-does-not-describe-the-content-or-purpose-of-the-iframe"
);

// CSS
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#css

test(
  fixture,
  Rules.get("R80"),
  "css",
  "content-is-not-readable-and-functional-when-text-is-increased"
);

test(fixture, None, "css", "non-decorative-content-inserted-using-css", {
  // WCAG does not require strict separation of content and presentation and
  // this is therefore not a conformance issue. The content is still announced
  // by assistive technology even if inserted using CSS.
  requirement: false,
});

test(
  fixture,
  None,
  "css",
  "visibilityhidden-used-to-visually-hide-content-when-it-should-be-available-to-screenreader"
);

test(
  fixture,
  None,
  "css",
  "displaynone-used-to-visually-hide-content-when-it-should-be-available-to-screenreader"
);

test(fixture, None, "css", "page-zoom-boxes-that-dont-expand-with-the-text");

// HTML
// https://alphagov.github.io/accessibility-tool-audit/test-cases.html#html

test(fixture, Rules.get("R3"), "html", "duplicate-id", {
  legacy: "error",
});

test(
  fixture,
  None,
  "html",
  "article-element-used-to-mark-up-an-element-thats-not-an-articleblog-post-etc",
  {
    legacy: "warning",

    // The <article> element is intended for any "section of a page that
    // consists of a composition that forms an independent part of a document,
    // page, or site", which is also how it's used here. It is therefore not a
    // WCAG conformance issue.
    requirement: false,
  }
);

test(fixture, None, "html", "empty-paragraph", {
  // Empty paragraphs are not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "html", "deprecated-center-element", {
  legacy: "error",

  // WCAG does not require strict separation of content and presentation and
  // this is therefore not a conformance issue.
  requirement: false,
});

test(fixture, Rules.get("R21"), "html", "invalid-aria-role-names", {
  legacy: "error",
});

test(
  fixture,
  None,
  "html",
  "object-not-embedded-accessibly-wmode-parameter-not-set-to-window",
  {
    // The wmode parameter is only useful for embedding now obsolete Flash
    // content. It is therefore not a WCAG conformance issue.
    requirement: false,
  }
);

test(fixture, None, "html", "spacer-image-found", {
  // A presentational spacer image is a perfectly valid, albeit dated, way of
  // adding whitespace. It is therefore not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "html", "inline-style-adds-colour", {
  // Inline styles are perfectly fine for adding color, just as external style
  // sheets are. It is therefore not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "html", "start-and-close-tags-dont-match");

test(fixture, None, "html", "pre-element-without-code-element-inside-it", {
  // <pre> elements may be used for ASCII art, as is the case here. It is
  // therefore not a WCAG conformance issue.
  requirement: false,
});

test(fixture, None, "html", "deprecated-font-element", {
  legacy: "error",

  // WCAG does not require strict separation of content and presentation and
  // this is therefore not a conformance issue.
  requirement: false,
});
