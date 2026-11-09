// scripts/verify_seo_head.cjs
const fs = require('fs');

const testPages = [
  'dist/index.html',
  'dist/works/index.html',
  'dist/brands/index.html',
  'dist/free-nodes/index.html',
  'dist/trial/index.html',
  'dist/blacklist/index.html',
  'dist/faq/index.html',
  'dist/clients/index.html',
  'dist/blog/index.html',
  'dist/about/index.html',
  'dist/disclaimer/index.html',
  'dist/works/guangsu/index.html',
  'dist/blog/clash-verge-rev-complete-tutorial/index.html'
];

testPages.forEach(p => {
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  const canonical = (content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) || [])[1];
  const robots = (content.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i) || [])[1];
  const title = (content.match(/<title>(.*?)<\/title>/i) || [])[1];
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE';
  console.log(p);
  console.log('  Canonical:', canonical);
  console.log('  Robots:   ', robots);
  console.log('  Title:    ', title ? title.slice(0, 50) + '...' : 'NONE');
  console.log('  H1:       ', h1.slice(0, 50) + '...');
});
