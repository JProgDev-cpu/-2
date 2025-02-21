const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const config = require('./image-config');

const compressImage = async (inputPath, outputPath, options) => {
  try {
    await sharp(inputPath)
      .resize(options.width, options.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: options.quality,
        progressive: true
      })
      .toFile(outputPath);
    
    console.log(`Compressed: ${inputPath}`);
  } catch (err) {
    console.error(`Error compressing ${inputPath}:`, err);
  }
};

// 压缩商品图片
const processProductImages = async () => {
  const dir = path.join(__dirname, '../packages/shop/images/products');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      await compressImage(
        path.join(dir, file),
        path.join(dir, `compressed_${file}`),
        config.products
      );
    }
  }
};

// 压缩景点图片
const processSpotImages = async () => {
  const dir = path.join(__dirname, '../packages/monitor/images/spots');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      await compressImage(
        path.join(dir, file),
        path.join(dir, `compressed_${file}`),
        config.spots
      );
    }
  }
};

// 执行压缩
processProductImages();
processSpotImages(); 