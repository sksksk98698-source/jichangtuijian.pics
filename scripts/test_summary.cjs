const fs = require('fs');
const path = require('path');

const rawFile = 'c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt';
const text = fs.readFileSync(rawFile, 'utf8');

// Parse summary table around line 920
const lines = text.split(/\r?\n/);
let tableLines = [];
let inTable = false;
for (let line of lines) {
  if (line.includes('| 1 | 光速云 |')) inTable = true;
  if (inTable) {
    if (line.startsWith('|') && !line.includes('---')) {
      tableLines.push(line);
    } else if (!line.startsWith('|')) {
      inTable = false;
    }
  }
}
console.log('Summary table items found:', tableLines.length);

const summaryMap = new Map();
for (let l of tableLines) {
  const parts = l.split('|').map(s => s.trim()).filter(Boolean);
  if (parts.length >= 5) {
    const rank = parseInt(parts[0]);
    const name = parts[1];
    const link = parts[2].replace(/`/g, '');
    const code = parts[3].replace(/`/g, '');
    const feature = parts[4];
    summaryMap.set(name, { rank, link, code, feature });
  }
}
console.log('Parsed summary table items:', summaryMap.size);
for (let [k, v] of summaryMap.entries()) {
  console.log(`- ${k}: rank=${v.rank}, code=${v.code}`);
}
