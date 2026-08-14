const fs = require('fs');
const lines = fs.readFileSync('src/constants/fallback-data.ts', 'utf8').split('\n');

const products = [];
let currentProduct = null;
let insideProducts = false;

for (let line of lines) {
  if (line.includes('export const FALLBACK_PRODUCTS')) {
    insideProducts = true;
    continue;
  }
  if (insideProducts && line.includes('export const FALLBACK_PACKAGES')) {
    insideProducts = false;
    break;
  }
  if (insideProducts) {
    line = line.trim();
    if (line === '{') {
      currentProduct = { images: [] };
    } else if (line === '},' || line === '}') {
      if (currentProduct) {
        products.push(currentProduct);
        currentProduct = null;
      }
    } else if (currentProduct) {
      // Parse fields
      if (line.startsWith('id:')) {
        currentProduct.id = line.split(':')[1].trim().replace(/['",]/g, '');
      } else if (line.startsWith('name:')) {
        currentProduct.name = line.substring(line.indexOf(':') + 1).trim().replace(/['",]/g, '');
      } else if (line.startsWith('categoryId:')) {
        currentProduct.categoryId = line.split(':')[1].trim().replace(/['",]/g, '');
      } else if (line.startsWith('productType:')) {
        currentProduct.productType = line.split(':')[1].trim().replace(/['",]/g, '');
      } else if (line.startsWith('images:')) {
        const imgMatch = line.match(/"(https:\/\/images\.unsplash\.com\/photo-[^"]+)"/);
        if (imgMatch) {
          currentProduct.images.push(imgMatch[1]);
        }
      } else if (line.startsWith('image:')) {
        const imgMatch = line.match(/"(https:\/\/images\.unsplash\.com\/photo-[^"]+)"/);
        if (imgMatch) {
          currentProduct.image = imgMatch[1];
        }
      }
    }
  }
}

console.log('Total products parsed:', products.length);

const categories = {};
const images = {};
const duplicates = [];

products.forEach(p => {
  categories[p.categoryId] = (categories[p.categoryId] || 0) + 1;
  const mainImg = p.image || p.images[0];
  if (mainImg) {
    const mainId = mainImg.match(/photo-[^?]+/)?.[0] || mainImg;
    if (images[mainId]) {
      duplicates.push({ id: p.id, name: p.name, image: mainImg, category: p.categoryId });
    }
    images[mainId] = p.id;
  }
});

console.log('Category distribution:', categories);
console.log('Duplicate image IDs count:', duplicates.length);
if (duplicates.length > 0) {
  console.log('Duplicate images details:', duplicates);
}

const toners = products.filter(p => p.categoryId === 'cat-toners-essences');
console.log('Toners & Essences productTypes:', toners.map(t => ({ id: t.id, name: t.name, type: t.productType })));
