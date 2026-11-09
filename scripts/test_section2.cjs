const fs = require('fs');
const path = require('path');

const rawFile = 'c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt';
const text = fs.readFileSync(rawFile, 'utf8');
const lines = text.split(/\r?\n/);

const section2 = lines.slice(964).join('\n');
const bNames = [
  'WgetCloud', '白月光', 'FlyingBird', 'CyberGuard', '龙猫云', 'FATCAT',
  'TNTCloud', '青云梯', '山水云', '灵动云', '浪网', 'EdgeNova', '萤火虫', 'sslar'
];

bNames.forEach(b => {
  const idx = section2.indexOf(b);
  console.log(b, 'found at index:', idx);
});
