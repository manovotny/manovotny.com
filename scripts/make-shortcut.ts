// Builds and signs the "Save Bookmark" Apple Shortcut so nobody has to click
// it together in the editor. The output embeds BOOKMARKS_CAPTURE_TOKEN, so the
// file is gitignored; re-run after rotating the token.
//
//   npm run shortcut
//
// Shortcuts are property lists. The action identifiers and parameter shapes
// below are what the Shortcuts app itself writes for these four actions.
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";

if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

const token = process.env.BOOKMARKS_CAPTURE_TOKEN;

if (!token) {
  console.error("BOOKMARKS_CAPTURE_TOKEN is not set");
  process.exit(1);
}

// Override to point a test build somewhere else, e.g. a local echo server.
const ENDPOINT =
  process.env.SHORTCUT_ENDPOINT ?? "https://manovotny.com/api/bookmarks";
const NAME = process.env.SHORTCUT_NAME ?? "Save Bookmark";

type Plist = string | number | boolean | Plist[] | { [key: string]: Plist };

// --- plist serialization ---------------------------------------------------

function escape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function serialize(value: Plist, depth: number): string {
  const pad = "\t".repeat(depth);

  if (typeof value === "string")
    return `${pad}<string>${escape(value)}</string>`;
  if (typeof value === "number") return `${pad}<integer>${value}</integer>`;
  if (typeof value === "boolean") return `${pad}<${value}/>`;
  if (Array.isArray(value)) {
    return [
      `${pad}<array>`,
      ...value.map((item) => serialize(item, depth + 1)),
      `${pad}</array>`,
    ].join("\n");
  }

  return [
    `${pad}<dict>`,
    ...Object.entries(value).flatMap(([key, item]) => [
      `${pad}\t<key>${escape(key)}</key>`,
      serialize(item, depth + 1),
    ]),
    `${pad}</dict>`,
  ].join("\n");
}

// --- Shortcuts value shapes ------------------------------------------------

// A reference to an earlier action's output.
function output(uuid: string, name: string): Plist {
  return {
    Value: { OutputName: name, OutputUUID: uuid, Type: "ActionOutput" },
    WFSerializationType: "WFTextTokenAttachment",
  };
}

const shortcutInput: Plist = {
  Value: { Type: "ExtensionInput" },
  WFSerializationType: "WFTextTokenAttachment",
};

// Text consisting solely of one output token.
function tokenText(uuid: string, name: string): Plist {
  return {
    Value: {
      attachmentsByRange: {
        "{0, 1}": { OutputName: name, OutputUUID: uuid, Type: "ActionOutput" },
      },
      string: "￼",
    },
    WFSerializationType: "WFTextTokenString",
  };
}

// Text consisting solely of the Shortcut Input token. A shared Safari page or
// link coerces to its URL, which is all the endpoint needs.
const inputText: Plist = {
  Value: {
    attachmentsByRange: { "{0, 1}": { Type: "ExtensionInput" } },
    string: "￼",
  },
  WFSerializationType: "WFTextTokenString",
};

function text(value: string): Plist {
  return {
    Value: { attachmentsByRange: {}, string: value },
    WFSerializationType: "WFTextTokenString",
  };
}

function dictionary(entries: [string, Plist][]): Plist {
  return {
    Value: {
      WFDictionaryFieldValueItems: entries.map(([key, value]) => ({
        WFItemType: 0,
        WFKey: text(key),
        WFValue: value,
      })),
    },
    WFSerializationType: "WFDictionaryFieldValue",
  };
}

// --- the workflow ----------------------------------------------------------

const title = randomUUID().toUpperCase();
const request = randomUUID().toUpperCase();
const message = randomUUID().toUpperCase();

const workflow: Plist = {
  WFWorkflowActions: [
    {
      WFWorkflowActionIdentifier:
        "is.workflow.actions.properties.safariwebpage",
      WFWorkflowActionParameters: {
        UUID: title,
        WFContentItemPropertyName: "Name",
        WFInput: shortcutInput,
      },
    },
    {
      WFWorkflowActionIdentifier: "is.workflow.actions.downloadurl",
      WFWorkflowActionParameters: {
        Advanced: true,
        ShowHeaders: true,
        UUID: request,
        // Shortcuts spells this "Json"; any other casing drops the body.
        WFHTTPBodyType: "Json",
        WFHTTPHeaders: dictionary([["Authorization", text(`Bearer ${token}`)]]),
        WFHTTPMethod: "POST",
        WFJSONValues: dictionary([
          ["url", inputText],
          ["title", tokenText(title, "Name")],
        ]),
        WFURL: text(ENDPOINT),
      },
    },
    {
      WFWorkflowActionIdentifier: "is.workflow.actions.getvalueforkey",
      WFWorkflowActionParameters: {
        UUID: message,
        WFDictionaryKey: "message",
        WFGetDictionaryValueType: "Value",
        WFInput: output(request, "Contents of URL"),
      },
    },
    {
      WFWorkflowActionIdentifier: "is.workflow.actions.notification",
      WFWorkflowActionParameters: {
        WFNotificationActionBody: tokenText(message, "Dictionary Value"),
        WFNotificationActionSound: false,
        WFNotificationActionTitle: NAME,
      },
    },
  ],
  WFWorkflowClientVersion: "2607.0.3",
  WFWorkflowHasOutputFallback: false,
  WFWorkflowHasShortcutInputVariables: true,
  WFWorkflowIcon: {
    WFWorkflowIconGlyphNumber: 59511,
    WFWorkflowIconStartColor: 4282601983,
  },
  WFWorkflowImportQuestions: [],
  WFWorkflowInputContentItemClasses: [
    "WFURLContentItem",
    "WFSafariWebPageContentItem",
  ],
  WFWorkflowMinimumClientVersion: 900,
  WFWorkflowMinimumClientVersionString: "900",
  WFWorkflowName: NAME,
  WFWorkflowOutputContentItemClasses: [],
  WFWorkflowTypes: ["ActionExtension"],
};

const plist = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
  '<plist version="1.0">',
  serialize(workflow, 0),
  "</plist>",
  "",
].join("\n");

const unsigned = `${NAME}.unsigned.shortcut`;
const signed = `${NAME}.shortcut`;

writeFileSync(unsigned, plist);
// macOS refuses to import unsigned shortcut files; `shortcuts sign` is the
// supported way to produce one it accepts.
execFileSync("shortcuts", [
  "sign",
  "--mode",
  "anyone",
  "--input",
  unsigned,
  "--output",
  signed,
]);
unlinkSync(unsigned);
execFileSync("open", [signed]);

console.info(`Wrote and opened ${signed} (endpoint ${ENDPOINT})`);
