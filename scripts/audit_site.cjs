// scripts/audit_site.cjs
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function getFiles(dir, match = /\.html$/) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, match));
    } else if (match.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getFiles(distDir);
console.log('Total HTML files found in dist:', htmlFiles.length);

const internalRoutes = new Set();
htmlFiles.forEach(f => {
  let route = f.replace(distDir, '').replace(/\\/g, '/');
  if (route.endsWith('index.html')) {
    route = route.slice(0, -10);
  }
  if (!route.startsWith('/')) route = '/' + route;
  internalRoutes.add(route);
});

const auditResults = {
  canonicalErrors: [],
  internalDeadLinks: [],
  outboundLinksWithoutNofollow: [],
  emptyAnchorTags: [],
  trackingCodes: [],
  infraLeaks: [],
  thinContentPages: [],
  schemaErrors: [],
  duplicateTitles: {},
  duplicateDescriptions: {},
  titleLengthIssues: [],
  descLengthIssues: []
};

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let route = f.replace(distDir, '').replace(/\\/g, '/');
  if (route.endsWith('index.html')) route = route.slice(0, -10);

  // 1. Canonical tag check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canonicalMatch) {
    auditResults.canonicalErrors.push({ route, error: 'Missing canonical tag' });
  } else {
    const href = canonicalMatch[1];
    if (!href.startsWith('https://jichangtuijian.pics')) {
      auditResults.canonicalErrors.push({ route, error: 'Canonical does not start with https://jichangtuijian.pics: ' + href });
    }
  }

  // 2. Titles & Descriptions
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (title) {
    auditResults.duplicateTitles[title] = (auditResults.duplicateTitles[title] || []).concat(route);
  }

  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (desc) {
    auditResults.duplicateDescriptions[desc] = (auditResults.duplicateDescriptions[desc] || []).concat(route);
  }

  // 3. Links Analysis
  const linkRegex = /<a\s+([^>]*?)href=["'](.*?)["']([^>]*?)>/gi;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const attrs = (match[1] + ' ' + match[3]).toLowerCase();
    const href = match[2].trim();

    if (!href || href === '#' || href.startsWith('#') || href.startsWith('javascript:')) {
      if (!href || href === 'javascript:void(0)') {
        auditResults.emptyAnchorTags.push({ route, tag: match[0] });
      }
      continue;
    }

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.includes('jichangtuijian.pics')) {
        // Outbound external link
        const hasNofollow = attrs.includes('nofollow');
        const hasSponsored = attrs.includes('sponsored');
        if (!hasNofollow || !hasSponsored) {
          auditResults.outboundLinksWithoutNofollow.push({ route, href, attrs: match[1] + ' ' + match[3] });
        }
      }
    } else if (href.startsWith('/')) {
      // Internal link
      let targetPath = href.split('#')[0].split('?')[0];
      const targetVariations = [
        targetPath,
        targetPath + '/',
        targetPath + '/index.html',
        targetPath.replace(/\/$/, '') + '/index.html',
        targetPath.replace(/\/$/, '')
      ];
      let exists = false;
      for (const t of targetVariations) {
        if (internalRoutes.has(t) || fs.existsSync(path.join(distDir, t))) {
          exists = true;
          break;
        }
      }
      if (!exists && !targetPath.includes('.')) {
        auditResults.internalDeadLinks.push({ source: route, target: href });
      }
    }
  }

  // 4. Tracking code
  if (/gtag\(|google-analytics\.com|googletagmanager\.com|hm\.baidu\.com|adsbygoogle/.test(content)) {
    auditResults.trackingCodes.push({ route });
  }

  // 5. Infra leaks
  const leakMatches = content.match(/Users[\\\/]Pro\s+User|127\.0\.0\.1:432|node_modules/g);
  if (leakMatches) {
    auditResults.infraLeaks.push({ route, leaks: leakMatches });
  }

  // 6. Word count
  const bodyText = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                          .replace(/<[^>]+>/g, ' ');
  const hanziCount = (bodyText.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (hanziCount < 800 && route !== '/404.html') {
    auditResults.thinContentPages.push({ route, count: hanziCount });
  }

  // 7. Schema JSON-LD
  const schemaRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let sMatch;
  while ((sMatch = schemaRegex.exec(content)) !== null) {
    try {
      JSON.parse(sMatch[1]);
    } catch (e) {
      auditResults.schemaErrors.push({ route, error: e.message });
    }
  }
});

console.log('=== AUDIT FINISHED ===');
console.log('Canonical errors:', auditResults.canonicalErrors.length);
if (auditResults.canonicalErrors.length > 0) {
  console.log(auditResults.canonicalErrors);
}

console.log('Internal dead links:', auditResults.internalDeadLinks.length);
if (auditResults.internalDeadLinks.length > 0) {
  console.log('Dead link details:', auditResults.internalDeadLinks);
}

console.log('Outbound links without nofollow & sponsored:', auditResults.outboundLinksWithoutNofollow.length);
if (auditResults.outboundLinksWithoutNofollow.length > 0) {
  console.log('Outbound violation samples:', auditResults.outboundLinksWithoutNofollow.slice(0, 10));
}

console.log('Tracking codes count:', auditResults.trackingCodes.length);
console.log('Infra leaks count:', auditResults.infraLeaks.length);
if (auditResults.infraLeaks.length > 0) {
  console.log('Infra leaks details:', auditResults.infraLeaks);
}

console.log('Thin content (<800 Hanzi):', auditResults.thinContentPages.length);
if (auditResults.thinContentPages.length > 0) {
  console.log('Thin content pages:', auditResults.thinContentPages);
}

console.log('Schema syntax errors:', auditResults.schemaErrors.length);
if (auditResults.schemaErrors.length > 0) {
  console.log('Schema errors:', auditResults.schemaErrors);
}

const dupTitles = Object.entries(auditResults.duplicateTitles).filter(([k, v]) => v.length > 1);
console.log('Duplicate titles count:', dupTitles.length);
if (dupTitles.length > 0) {
  console.log('Duplicate titles:', dupTitles);
}

const dupDescs = Object.entries(auditResults.duplicateDescriptions).filter(([k, v]) => v.length > 1);
console.log('Duplicate descriptions count:', dupDescs.length);
if (dupDescs.length > 0) {
  console.log('Duplicate descriptions:', dupDescs);
}
