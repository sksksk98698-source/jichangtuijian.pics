const fs = require('fs');
const path = require('path');

const rawFile = 'c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt';
const text = fs.readFileSync(rawFile, 'utf8');
const lines = text.split(/\r?\n/);

// Mapping of image files available in public/images/speedtests/
const availableImages = fs.readdirSync(path.join(__dirname, '../public/images/speedtests'));
console.log('Available image assets:', availableImages.length);

function findSpeedtestImage(brandName) {
  // Normalize brand name
  const clean = brandName.replace(/[\(（].*?[\)）]/g, '').trim();
  const match = availableImages.find(img => img.includes(clean) && (img.endsWith('.png') || img.endsWith('.jpg')));
  if (match) return `/images/speedtests/${match}`;
  if (clean === '暮光加速') {
    const mg = availableImages.find(img => img.includes('幕光加速') || img.includes('快狸'));
    if (mg) return `/images/speedtests/${mg}`;
  }
  if (clean === '无忧链接') {
    const wy = availableImages.find(img => img.includes('photo_2026-09-07_12-51-58'));
    if (wy) return `/images/speedtests/${wy}`;
  }
  return null;
}

function findUnlockImages(brandName) {
  const clean = brandName.replace(/[\(（].*?[\)）]/g, '').trim();
  if (clean === '光速云') {
    return [
      '/images/speedtests/photo_2026-08-19_12-13-01.jpg',
      '/images/speedtests/photo_2026-08-19_12-13-50.jpg',
      '/images/speedtests/photo_2026-08-19_12-13-58.jpg',
      '/images/speedtests/photo_2026-08-19_12-18-40.jpg',
      '/images/speedtests/photo_2026-08-19_12-20-10.jpg'
    ];
  }
  if (clean === '无忧链接') {
    return [
      '/images/speedtests/photo_2026-09-07_12-51-58.jpg',
      '/images/speedtests/photo_2026-09-07_12-51-59.jpg'
    ];
  }
  return [];
}

console.log('Testing image detection for 光速云:', findSpeedtestImage('光速云'), findUnlockImages('光速云'));
console.log('Testing image detection for SOGO云:', findSpeedtestImage('SOGO云'));
console.log('Testing image detection for 暮光加速:', findSpeedtestImage('暮光加速'));
