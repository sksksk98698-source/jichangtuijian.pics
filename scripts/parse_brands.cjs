const fs = require('fs');
const path = require('path');

const srcPath = 'c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt';
const text = fs.readFileSync(srcPath, 'utf8');

// Load speedtest manifest
const manifestPath = path.join(__dirname, '../public/images/speedtests/speedtest-manifest.json');
let manifest = { assets: [] };
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

console.log('Manifest assets:', manifest.assets.length);

// Let's inspect lines
const lines = text.split(/\r?\n/);
console.log('Total lines:', lines.length);

// Let's scan for all brand headers
const brandHeaders = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const m = line.match(/^(?:主推)?##\s*(\d+)\.\s*([^\(（\n]+)(?:[\(（]([^\)）]+)[\)）])?/);
  if (m) {
    brandHeaders.push({
      lineIndex: i,
      raw: line,
      rank: parseInt(m[1]),
      name: m[2].trim(),
      slug: m[3] ? m[3].trim().toLowerCase() : ''
    });
  }
}
console.log('Found brand headers in section 1:', brandHeaders.length);
console.log(brandHeaders.map(b => `${b.rank}: ${b.name} (${b.slug})`));

// Check section 2 (after line 965: "这14家机场 位置都往后面排")
let section2Index = lines.findIndex(l => l.includes('这14家机场 位置都往后面排'));
console.log('Section 2 index:', section2Index);
