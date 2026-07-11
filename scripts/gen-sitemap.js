#!/usr/bin/env node
/*
 * Generates sitemap.xml with an accurate <lastmod> per page:
 *   - if the page's source file has uncommitted changes -> today (it's about to deploy)
 *   - otherwise -> the date of the last git commit that touched it
 * Runs as part of build.sh, so lastmod is never hand-maintained.
 */
'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SITE = 'https://floatboise.com';
const PAGES = [
  { loc: '/',                   file: 'index.html',                   changefreq: 'weekly',  priority: '1.0' },
  { loc: '/map/',               file: 'map/index.html',               changefreq: 'monthly', priority: '0.8' },
  { loc: '/guides/first-time/', file: 'guides/first-time/index.html', changefreq: 'monthly', priority: '0.8' },
  { loc: '/guides/kids/',       file: 'guides/kids/index.html',       changefreq: 'monthly', priority: '0.8' },
];

const root = path.resolve(__dirname, '..');
const today = new Date().toISOString().slice(0, 10);

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: root, encoding: 'utf8' }).trim();
}

function lastmod(file) {
  try {
    // porcelain output is non-empty when the file is modified/added/untracked
    if (git(`status --porcelain -- "${file}"`)) return today;
    return git(`log -1 --format=%cs -- "${file}"`) || today;
  } catch (e) {
    return today; // no git / not committed yet
  }
}

const urls = PAGES.map((p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${lastmod(p.file)}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log('sitemap.xml generated (' + PAGES.length + ' urls)');
