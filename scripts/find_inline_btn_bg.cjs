const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (full.endsWith('.astro')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '../src/pages'));
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/<a[^>]*class="[^"]*button[^"]*"[^>]*style="[^"]*background:[^"]*"[^>]*>/g);
  if (matches) {
    console.log(path.relative(path.join(__dirname, '..'), file), matches.length);
    for (const m of matches) {
      console.log('   ', m);
    }
  }
}
