#!/usr/bin/env node
/**
 * Create a new main branch, category or watch from the templates.
 *
 *   npm run new -- branch "Engineering"
 *   npm run new -- category "Motorsport"
 *   npm run new -- watch "Race Weekend" --category motorsport
 *
 * Add --slug my-address to choose the web address yourself.
 * See docs/adding-content.md.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const [kind, name] = args;
const flag = (f) => {
  const i = args.indexOf(`--${f}`);
  return i > -1 ? args[i + 1] : undefined;
};

const usage = `Usage:
  npm run new -- branch "Engineering"
  npm run new -- category "Motorsport"
  npm run new -- watch "Race Weekend" --category motorsport`;

const fail = (msg) => {
  console.error(`\n✗ ${msg}\n\n${usage}\n`);
  process.exit(1);
};

if (!['branch', 'category', 'watch'].includes(kind) || !name) fail('Tell me what to create and its name.');

const slugify = (s) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const slug = flag('slug') ? slugify(flag('slug')) : slugify(name);
if (!slug) fail(`"${name}" doesn't give a usable web address; add --slug something.`);

const fill = (tpl, vars) =>
  Object.entries(vars).reduce((t, [k, v]) => t.replaceAll(`{{${k}}}`, v), readFileSync(join(root, 'templates', tpl), 'utf8'));
const yamlName = (s) => (/[:#'"{}[\],&*?|<>=!%@`]/.test(s) ? JSON.stringify(s) : s);
const write = (path, text) => {
  if (existsSync(path)) fail(`${relative(root, path)} already exists.`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  console.log(`  created ${relative(root, path)}`);
};

console.log('');
if (kind === 'category') {
  write(join(root, 'src/content/categories', `${slug}.md`), fill('category.md', { NAME: yamlName(name), SLUG: slug }));
  console.log(`
✓ Category "${name}" created as a draft.
  1. Fill in the TODOs in src/content/categories/${slug}.md
  2. Preview: npm run dev, then open /monasterie-website/watches/${slug}/
  3. Publish: set draft: false, commit and push.
  Add watches with: npm run new -- watch "Watch name" --category ${slug}
`);
}

if (kind === 'watch') {
  const category = flag('category');
  const catDir = join(root, 'src/content/categories');
  const cats = existsSync(catDir) ? readdirSync(catDir).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)) : [];
  if (!category) fail(`Add --category. Categories: ${cats.join(', ') || '(none yet, create one first)'}`);
  if (!cats.includes(category)) fail(`No category "${category}". Categories: ${cats.join(', ') || '(none yet)'}`);
  write(join(root, 'src/content/watches', slug, 'index.md'), fill('watch.md', { NAME: yamlName(name), SLUG: slug, CATEGORY: category }));
  console.log(`
✓ Watch "${name}" created as a draft in ${category}.
  1. Put its photos in src/content/watches/${slug}/ and list them under photos:
  2. Fill in summary, status, price (when real) and the specs; delete rows you don't need.
  3. Write the story under the --- line.
  4. Preview: npm run dev, then open /monasterie-website/watches/${category}/${slug}/
  5. Publish: set draft: false, commit and push.
`);
}

if (kind === 'branch') {
  write(join(root, 'src/pages', `${slug}.astro`), fill('branch-page.astro', { NAME: name }));
  const file = join(root, 'src/data/branches.ts');
  const src = readFileSync(file, 'utf8');
  const marker = '  // new branches are added above this line';
  if (!src.includes(marker)) fail('Could not find where to add the branch in src/data/branches.ts.');
  const entry = `  {
    title: ${JSON.stringify(name)},
    href: '${slug}/',
    blurb: 'TODO one short line about this branch',
    icon: 'icon',
    order: 20,
  },
`;
  writeFileSync(file, src.replace(marker, entry + marker));
  console.log(`  updated src/data/branches.ts`);
  console.log(`
✓ Branch "${name}" created. It is live as soon as you push, so finish it first.
  1. Fill in the TODOs in src/pages/${slug}.astro
  2. Write its one-line blurb in src/data/branches.ts
  3. Preview: npm run dev, then open /monasterie-website/${slug}/
  4. Commit and push.
`);
}
