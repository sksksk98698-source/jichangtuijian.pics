const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../dist/_astro/BaseLayout.CQNgQJ_L.css');
const content = fs.readFileSync(cssPath, 'utf8');

const regex = /\.button[^{]*\{[^}]*\}/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(m[0]);
}

const regex2 = /\.promo-btn[^{]*\{[^}]*\}/g;
while ((m = regex2.exec(content)) !== null) {
  console.log(m[0]);
}

const regex3 = /\.action-btn[^{]*\{[^}]*\}/g;
while ((m = regex3.exec(content)) !== null) {
  console.log(m[0]);
}
