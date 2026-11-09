// scripts/print_review_schema.cjs
const fs = require('fs');
const content = fs.readFileSync('dist/works/guangsu/index.html', 'utf8');
const match = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
if (match) {
  console.log(JSON.stringify(JSON.parse(match[1]), null, 2));
}
