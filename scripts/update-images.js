const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'constants', 'fallback-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Rename Amino Acid Gentle Barrier Cleanser to Amino Acid Gentle Purifying Cleanser
content = content.replace(/"Amino Acid Gentle Barrier Cleanser"/g, '"Amino Acid Gentle Purifying Cleanser"');
content = content.replace(/Amino Acid Gentle Barrier Cleanser/g, 'Amino Acid Gentle Purifying Cleanser');

// New mapping of product name -> new image URL
const mappings = {
  "Camellia & Jojoba Melting Cleansing Balm": "https://plus.unsplash.com/premium_photo-1750860247667-32aef8a96f05?q=80&w=706&auto=format&fit=crop",
  "Wild Rose & Aloe Hydrating Gel Cleanser": "https://plus.unsplash.com/premium_photo-1752485892600-46b977a8072a?q=80&w=784&auto=format&fit=crop",
  "2% Salicylic Acid Clarifying Foaming Wash": "https://plus.unsplash.com/premium_photo-1715604348374-eef445b6efb0?q=80&w=687&auto=format&fit=crop",
  "Centella Asiatica & Green Tea Calming Mist": "https://plus.unsplash.com/premium_photo-1764335936706-e39f4142b010?q=80&w=1074&auto=format&fit=crop",
  "Bulgarian Rose Hydrosol Balancing Essence": "https://images.unsplash.com/photo-1675438621427-0c86ddc4d2f3?q=80&w=687&auto=format&fit=crop",
  "5% Glycolic + PHA Resurfacing Glow Toner": "https://images.unsplash.com/photo-1670201202886-20cb6b2701a0?q=80&w=687&auto=format&fit=crop",
  "Multi-Molecular Hyaluronic Deep Infusion Essence": "https://images.unsplash.com/photo-1677511255825-78533743b356?q=80&w=880&auto=format&fit=crop",
  "Kakadu Plum 15% Vitamin C Radiance Elixir": "https://images.unsplash.com/photo-1772023042063-ef4ae9bc6d39?q=80&w=880&auto=format&fit=crop",
  "Blue Tansy Calming Night Repair Serum": "https://plus.unsplash.com/premium_photo-1775947810690-5217c95c067b?q=80&w=1170&auto=format&fit=crop",
  "10% Niacinamide + 1% Zinc Pore Clarifying Serum": "https://images.unsplash.com/photo-1642162229036-cc0617ea36fc?q=80&w=627&auto=format&fit=crop",
  "Copper Peptide Multi-Firming Matrix Elixir": "https://images.unsplash.com/photo-1778409762668-cf893875d611?q=80&w=952&auto=format&fit=crop",
  "Shea & Squalane Deep Barrier Moisture Cream": "https://plus.unsplash.com/premium_photo-1764346829774-5c144f1469bd?q=80&w=732&auto=format&fit=crop",
  "Sea Kelp & Snow Mushroom Ultra-Light Water Cream": "https://images.unsplash.com/photo-1666291252311-f4b981256ffe?q=80&w=764&auto=format&fit=crop",
  "5-Ceramide Lipid Complex Defense Cream": "https://images.unsplash.com/photo-1764694071508-e4b1efcd39bc?q=80&w=764&auto=format&fit=crop",
  "Centella Cica B5 Recovery Soothing Gel-Cream": "https://images.unsplash.com/photo-1770717984643-2a1545902579?w=500&auto=format&fit=crop&q=60",
  "100% Pure Cold-Pressed Rosehip Seed Botanical Oil": "https://plus.unsplash.com/premium_photo-1764599123093-859e089f585f?q=80&w=687&auto=format&fit=crop",
  "Golden Marula & Evening Primrose Glow Oil": "https://images.unsplash.com/photo-1637524725461-bff1afdb946e?q=80&w=1185&auto=format&fit=crop",
  "Bio-Retinoid Squalane Active Restorative Oil": "https://plus.unsplash.com/premium_photo-1661445028970-80e9ee083355?q=80&w=1170&auto=format&fit=crop",
  "Botanical Lipid Barrier Replenishing Oil": "https://images.unsplash.com/photo-1614859232869-72d3b926b3dc?w=500&auto=format&fit=crop&q=60",
  "Green Coffee & Cucumber De-Puffing Eye Gel": "https://images.unsplash.com/photo-1688380344979-20e6fb38db74?w=500&auto=format&fit=crop&q=60",
  "Prickly Pear & Hibiscus Firming Eye Cream": "https://images.unsplash.com/photo-1646683772419-d5a50258d4d9?w=500&auto=format&fit=crop&q=60",
  "Triple Peptide Dark Circle Complex": "https://images.unsplash.com/photo-1695989599169-f9c157b8743e?w=500&auto=format&fit=crop&q=60",
  "Encapsulated Retinal Youth Contour Eye Balm": "https://images.unsplash.com/photo-1671575192248-5d8e42f18a9c?w=500&auto=format&fit=crop&q=60",
  "Non-Nano Zinc Oxide & Squalane Mineral SPF 50": "https://images.unsplash.com/photo-1598662957563-ee4965d4d72c?w=500&auto=format&fit=crop&q=60",
  "Sheer Raspberry Seed Antioxidant Daily SPF 30": "https://plus.unsplash.com/premium_photo-1716631285494-8f6522e48d83?q=80&w=735&auto=format&fit=crop",
  "Invisible Daily UV Fluid SPF 50+ PA++++": "https://plus.unsplash.com/premium_photo-1783427249450-1f5b5779cfb7?w=500&auto=format&fit=crop&q=60",
  "Centella Calming Water Sun Gel SPF 50": "https://images.unsplash.com/photo-1596980846062-81a524d170ee?w=500&auto=format&fit=crop&q=60",
  "Papaya Enzyme & Willow Bark Radiance Polish": "https://plus.unsplash.com/premium_photo-1682535210542-21dceae4530c?w=500&auto=format&fit=crop&q=60",
  "Organic Bamboo & Jojoba Facial Exfoliating Paste": "https://images.unsplash.com/photo-1627435600376-3135aa112b47?w=500&auto=format&fit=crop&q=60",
  "10% AHA + 2% BHA Multi-Acid Resurfacing Peel": "https://images.unsplash.com/photo-1600482418127-22010d6be219?w=500&auto=format&fit=crop&q=60",
  "5% Lactic Acid + Hyaluronic Overnight Micro-Peel": "https://images.unsplash.com/photo-1625753784137-d4965dfe5e73?w=500&auto=format&fit=crop&q=60",
  "French Green Clay & Matcha Detoxifying Pore Mask": "https://images.unsplash.com/photo-1677919630957-1c27eb4d96b4?w=500&auto=format&fit=crop&q=60",
  "Australian Pink Clay Brightening & Soothing Paste": "https://plus.unsplash.com/premium_photo-1716626439900-73b09f089d98?w=500&auto=format&fit=crop&q=60",
  "Volcanic Ash & 2% BHA Deep Clarifying Treatment": "https://images.unsplash.com/photo-1516815989420-9cb5ef0fce78?w=500&auto=format&fit=crop&q=60",
  "Charcoal & Salicylic Acid Deep Pore Purifier": "https://plus.unsplash.com/premium_photo-1678216312237-9d6522eec01d?w=500&auto=format&fit=crop&q=60",
  "Amino Acid Gentle Purifying Cleanser": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop"
};

// We will parse the file structure line by line to locate each product segment,
// identify its name, and replace its images and image properties.
const lines = content.split('\n');
let insideProducts = false;
let currentProductIndex = -1;
let currentProductName = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('export const FALLBACK_PRODUCTS')) {
    insideProducts = true;
    continue;
  }
  if (insideProducts && line.includes('export const FALLBACK_PACKAGES')) {
    insideProducts = false;
    break;
  }
  
  if (insideProducts) {
    if (line.trim().startsWith('name:')) {
      // Extract product name
      const match = line.match(/name:\s*["']([^"']+)["']/);
      if (match) {
        currentProductName = match[1].trim();
      }
    }
    
    if (currentProductName && mappings[currentProductName]) {
      const newUrl = mappings[currentProductName];
      if (line.trim().startsWith('images:')) {
        lines[i] = line.replace(/\[\s*["'][^"']+["']\s*\]/, `["${newUrl}"]`);
      } else if (line.trim().startsWith('image:')) {
        lines[i] = line.replace(/:\s*["'][^"']+["']/, `: "${newUrl}"`);
      }
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Successfully updated fallback-data.ts with new images!');
