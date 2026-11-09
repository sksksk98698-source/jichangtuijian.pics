// scripts/check_schemas.cjs
const fs = require('fs');
const path = require('path');

const sampleFiles = [
  'dist/index.html',
  'dist/works/index.html',
  'dist/brands/index.html',
  'dist/free-nodes/index.html',
  'dist/trial/index.html',
  'dist/blacklist/index.html',
  'dist/faq/index.html',
  'dist/works/guangsu/index.html',
  'dist/blog/clash-verge-rev-complete-tutorial/index.html'
];

sampleFiles.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const schemaRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  console.log('\n--- ' + f + ' ---');
  let count = 0;
  while ((match = schemaRegex.exec(content)) !== null) {
    count++;
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) {
        console.log('  Block ' + count + ' Array of types: ' + parsed.map(p => p['@type']).join(', '));
      } else if (parsed['@graph']) {
        console.log('  Block ' + count + ' @graph types: ' + parsed['@graph'].map(item => item['@type']).join(', '));
      } else {
        console.log('  Block ' + count + ' @type: ' + parsed['@type']);
      }
    } catch (e) {
      console.log('  Block ' + count + ' JSON Error: ' + e.message);
    }
  }
  if (count === 0) console.log('  NO JSON-LD FOUND');
});
