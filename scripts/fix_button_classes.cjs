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
let totalReplaced = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Match <a ... class="button" ... style="...background: (transparent|#fff|#fafaf9)..." ...>
  content = content.replace(/(<a\b[^>]*?\bclass=")(button)("(?=[^>]*?\bstyle="[^"]*background:\s*(?:transparent|#fff|#fafaf9)[^"]*"))/g, '$1button neutral$3');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', path.relative(path.join(__dirname, '..'), file));
    totalReplaced++;
  }
}

console.log('Total files updated in round 2:', totalReplaced);
