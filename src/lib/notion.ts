import "server-only";
import type { EcosystemJoin } from "./ecosystem-join";
import type { Application } from "./join";

/**
 * Writes contributor applications to the Notion "Contributor Applications"
 * database. Server-only: the token must never reach the browser.
 *
 * Setup: create an internal integration at https://www.notion.so/profile/integrations,
 * connect it to the database (⋯ → Connections), and set NOTION_TOKEN.
 */

const NOTION_VERSION = "2025-09-03";

/** Data source of the "Contributor Applications" database in the SaSarjan workspace. */
const DEFAULT_DATA_SOURCE_ID = "2f9945a0-e41f-474c-8b80-d5a729d1b458";

/**
 * Data source of the "Ecosystem Join Requests" database (SaSarjan Home Page), written by the
 * /ecosystem/join form. The integration must be connected to this database too.
 */
const DEFAULT_ECOSYSTEM_DATA_SOURCE_ID = "42330dcf-2a7e-818b-a95c-000bb7011d7b";

export function notionConfigured() {
  return Boolean(process.env.NOTION_TOKEN?.trim());
}

const richText = (content: string) =>
  content ? { rich_text: [{ type: "text", text: { content } }] } : { rich_text: [] };
const select = (name: string) => ({ select: name ? { name } : null });
const multiSelect = (names: string[]) => ({ multi_select: names.map((name) => ({ name })) });

function toProperties(a: Application) {
  // Keys are the exact property names in the Notion database.
  return {
    "Full name": { title: [{ type: "text", text: { content: a.fullName } }] },
    Email: { email: a.email },
    "Phone / WhatsApp": { phone_number: a.phone || null },
    "State / UT": select(a.state),
    "City / District": richText(a.city),
    "Current Role & Organisation": richText(a.role),
    "LinkedIn / Website": { url: a.linkedin || null },
    "Years of Experience": select(a.experience),
    "How would you like to contribute?": multiSelect(a.tracks),
    "Focus Areas": multiSelect(a.focusAreas),
    "Areas of Expertise": multiSelect(a.expertise),
    "Key Achievements & Leadership Experience": richText(a.achievements),
    "What can you offer?": richText(a.offer),
    "What would you like to learn?": richText(a.learn),
    "Time Commitment": select(a.time),
    Languages: multiSelect(a.languages),
    "Age Group (optional)": select(a.ageGroup),
    "Gender (optional)": select(a.gender),
    "How did you hear about us?": select(a.heardFrom),
    "Referred by": richText(a.referredBy),
    "Consent to be contacted": { checkbox: a.consent },
    "Review Status": { status: { name: "New" } },
  };
}

/** Creates one row. Throws on failure with Notion's status, error code and message. */
export async function createApplication(application: Application) {
  const dataSourceId = process.env.NOTION_CONTRIBUTORS_DATA_SOURCE_ID?.trim() || DEFAULT_DATA_SOURCE_ID;
  await createPage(dataSourceId, toProperties(application));
}

/** Creates one "Ecosystem Join Requests" row. Throws on failure like `createApplication`. */
export async function createEcosystemJoin(join: EcosystemJoin) {
  const dataSourceId =
    process.env.NOTION_ECOSYSTEM_DATA_SOURCE_ID?.trim() || DEFAULT_ECOSYSTEM_DATA_SOURCE_ID;
  // Keys are the exact property names in the Notion database.
  await createPage(dataSourceId, {
    Name: { title: [{ type: "text", text: { content: join.name } }] },
    Email: { email: join.email },
    "Participation interest": select(join.interest),
    Organisation: richText(join.organisation),
    Initiative: select(join.initiative),
    Skills: richText(join.skills),
    Contribution: richText(join.contribution),
    Message: richText(join.message),
    // The form states, next to its submit button, that submitting agrees to being contacted.
    "Consent to be contacted": { checkbox: true },
    "Review Status": { status: { name: "New" } },
  });
}

async function createPage(dataSourceId: string, properties: Record<string, unknown>) {
  const token = process.env.NOTION_TOKEN?.trim();
  if (!token) throw new Error("NOTION_TOKEN is not set");

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { code?: string; message?: string };
    throw new Error(`Notion API ${res.status} ${body.code ?? ""}: ${body.message ?? "unknown error"}`);
  }
}
