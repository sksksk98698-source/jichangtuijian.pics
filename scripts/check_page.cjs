async function main() {
  const r = await fetch('http://localhost:4321/about/');
  const html = await r.text();
  const match = html.match(/<a[^>]*class="[^"]*action-btn[^"]*"[^>]*>[\s\S]*?<\/a>/g);
  console.log('Action buttons:', match ? match.slice(0, 4) : 'none');
}
main();
