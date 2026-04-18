import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const profilePath = path.join(rootDir, "content", "profile.yaml");
const templatePath = path.join(rootDir, "index.template.html");
const generatedTsPath = path.join(rootDir, "src", "generated", "site-content.ts");
const llmsPath = path.join(rootDir, "public", "llms.txt");
const indexHtmlPath = path.join(rootDir, "index.html");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizeUrl(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function buildTranslations(profile) {
  const labels = profile.ui.labels;
  const cards = profile.ui.cards;
  const techStack = profile.ui.techStack;

  return {
    en: {
      name: profile.branding.name.en,
      tagline: profile.branding.tagline.en,
      hook: profile.branding.hook.en,
      connect: labels.en.connect,
      textMe: labels.en.textMe,
      pingMe: labels.en.pingMe,
      cards: cards.en,
      techStack: techStack.en,
    },
    ru: {
      name: profile.branding.name.ru,
      tagline: profile.branding.tagline.ru,
      hook: profile.branding.hook.ru,
      connect: labels.ru.connect,
      textMe: labels.ru.textMe,
      pingMe: labels.ru.pingMe,
      cards: cards.ru,
      techStack: techStack.ru,
    },
  };
}

function buildStructuredData(profile, canonicalUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.branding.name.en,
    jobTitle: profile.branding.title.en,
    description: profile.branding.summary.en,
    url: canonicalUrl,
    email: profile.contacts.email,
    sameAs: [profile.contacts.github, profile.contacts.telegram],
    knowsAbout: profile.skills.core,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: profile.education.institution.en,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: profile.branding.title.en,
      occupationLocation: {
        "@type": "Place",
        name: "Remote / Moscow",
      },
    },
  };
}

function buildLlms(profile, canonicalUrl) {
  const experienceSections = profile.experience
    .map((item) => {
      const websiteLine = item.website ? ` (${item.website})` : "";
      const achievements = item.achievements.en.map((achievement) => `- ${achievement}`).join("\n");

      return `### ${item.company}${websiteLine}\n**${item.role.en}** | ${item.period.en}\n\n${item.summary.en}\n\n${achievements}\n\n**Stack**: ${item.stack.join(" · ")}`;
    })
    .join("\n\n");

  const projectSections = profile.projects
    .map((project) => `### ${project.title.en}\n${project.description.en}`)
    .join("\n\n");

  return `# ${profile.branding.name.en} - ${profile.branding.tagline.en}

> ${profile.branding.summary.en}

**Canonical URL**: ${canonicalUrl}/

## About

**${profile.branding.name.en}** | ${profile.branding.title.en}

- **Location**: Moscow, Russia
- **Focus**: ${profile.branding.hook.en}
- **Education**: ${profile.education.institution.en}, ${profile.education.program.en}
- **Status**: ${profile.education.status.en}

## Experience

${experienceSections}

## Selected Projects

${projectSections}

## Core Skills

${profile.skills.core.join(" · ")}

## Languages

${profile.skills.languages.join(" · ")}

## Contact

- **GitHub**: ${profile.contacts.github}
- **Telegram**: ${profile.contacts.telegram}
- **Email**: ${profile.contacts.email}
`;
}

function validateProfile(profile) {
  assert(profile.site?.url, "site.url is required");
  assert(profile.branding?.name?.en, "branding.name.en is required");
  assert(profile.branding?.name?.ru, "branding.name.ru is required");
  assert(profile.branding?.tagline?.en, "branding.tagline.en is required");
  assert(profile.branding?.tagline?.ru, "branding.tagline.ru is required");
  assert(profile.branding?.hook?.en, "branding.hook.en is required");
  assert(profile.branding?.hook?.ru, "branding.hook.ru is required");
  assert(profile.seo?.title, "seo.title is required");
  assert(profile.seo?.description, "seo.description is required");
  assert(Array.isArray(profile.seo?.keywords), "seo.keywords must be an array");
  assert(profile.contacts?.email, "contacts.email is required");
  assert(profile.contacts?.github, "contacts.github is required");
  assert(profile.contacts?.telegram, "contacts.telegram is required");
  assert(Array.isArray(profile.experience), "experience must be an array");
  assert(Array.isArray(profile.projects), "projects must be an array");
  assert(Array.isArray(profile.ui?.cards?.en), "ui.cards.en must be an array");
  assert(Array.isArray(profile.ui?.cards?.ru), "ui.cards.ru must be an array");
}

async function main() {
  const rawProfile = await fs.readFile(profilePath, "utf8");
  const profile = parse(rawProfile);
  validateProfile(profile);

  const canonicalUrl = normalizeUrl(profile.site.url);
  const translations = buildTranslations(profile);
  const structuredData = buildStructuredData(profile, canonicalUrl);
  const llmsText = buildLlms(profile, canonicalUrl);
  const publicContent = {
    site: profile.site,
    branding: profile.branding,
    contacts: profile.contacts,
    education: profile.education,
    experience: profile.experience,
    projects: profile.projects,
    skills: profile.skills,
    translations,
  };

  const template = await fs.readFile(templatePath, "utf8");
  const indexHtml = template
    .replaceAll("__HTML_LANG__", escapeHtml(profile.site.locale))
    .replaceAll("__META_TITLE__", escapeHtml(profile.seo.title))
    .replaceAll("__META_DESCRIPTION__", escapeHtml(profile.seo.description))
    .replaceAll("__META_KEYWORDS__", escapeHtml(profile.seo.keywords.join(", ")))
    .replaceAll("__META_AUTHOR__", escapeHtml(profile.site.author))
    .replaceAll("__CANONICAL_URL__", escapeHtml(canonicalUrl))
    .replace("__STRUCTURED_DATA__", JSON.stringify(structuredData, null, 2));

  const generatedTs = `// Generated by scripts/generate-content.mjs from content/profile.yaml
// Do not edit this file manually.

export const siteContent = ${JSON.stringify(publicContent, null, 2)} as const;

export const translations = siteContent.translations;

export type Language = keyof typeof translations;
`;

  await fs.mkdir(path.dirname(generatedTsPath), { recursive: true });
  await fs.writeFile(generatedTsPath, generatedTs);
  await fs.writeFile(llmsPath, `${llmsText.trimEnd()}\n`);
  await fs.writeFile(indexHtmlPath, indexHtml);

  console.log("Generated content artifacts from content/profile.yaml");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
