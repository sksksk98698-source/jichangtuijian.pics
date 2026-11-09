const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

// Find all css files in dist/_astro/
const astroDir = path.join(distDir, '_astro');
const cssFiles = fs.readdirSync(astroDir).filter(f => f.endsWith('.css'));

console.log('CSS files found:', cssFiles);

for (const f of cssFiles) {
  const content = fs.readFileSync(path.join(astroDir, f), 'utf8');
  console.log(`\n=== Checking ${f} (${content.length} chars) ===`);
  const lines = content.split('}');
  for (const l of lines) {
    if (l.includes('action-btn') || l.includes('.button') || l.includes('promo-btn')) {
      console.log('RULE:', l.trim().slice(0, 150));
    }
  }
}
