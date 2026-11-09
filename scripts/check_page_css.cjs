async function main() {
  for (const path of ['/search/', '/blog/']) {
    console.log('=== PATH:', path, '===');
    const r = await fetch('http://localhost:4321' + path);
    const html = await r.text();
    const match = html.match(/<a[^>]*href="[^"]*xingdaomeng[^"]*"[^>]*>[\s\S]*?<\/a>/g);
    console.log('xingdaomeng match:', match);
  }
}
main();
