const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

// Get all files in a directory recursively
function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Get all content of src files
function getSrcContent() {
  const srcFiles = getFiles(srcDir);
  let content = '';
  for (const file of srcFiles) {
    content += fs.readFileSync(file, 'utf8') + '\n';
  }
  // Also include the root metadata files like layout.tsx, page.tsx just in case, though they are in src/app
  return content;
}

const allPublicFiles = getFiles(publicDir);
const srcContent = getSrcContent();

const unusedFiles = [];
const protectedFiles = ['favicon.ico', 'robots.txt', 'sitemap.xml'];

for (const file of allPublicFiles) {
  const fileName = path.basename(file);
  const relativePath = file.replace(publicDir, '').replace(/\\/g, '/'); // e.g., /blog/image.png
  
  if (protectedFiles.includes(fileName)) continue;

  // Check if filename or relative path is mentioned in src
  // We check fileName without extension just in case, but checking the exact filename is safer.
  if (!srcContent.includes(fileName) && !srcContent.includes(relativePath)) {
    unusedFiles.push(file);
  }
}

console.log(JSON.stringify(unusedFiles, null, 2));
