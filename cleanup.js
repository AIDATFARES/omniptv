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
  return content;
}

const allPublicFiles = getFiles(publicDir);
const srcContent = getSrcContent();

const protectedFiles = ['favicon.ico', 'robots.txt', 'sitemap.xml', 'next.svg', 'vercel.svg', 'file.svg', 'globe.svg', 'window.svg'];

let deletedCount = 0;

for (const file of allPublicFiles) {
  const fileName = path.basename(file);
  const relativePath = file.replace(publicDir, '').replace(/\\/g, '/'); // e.g., /blog/image.png
  
  if (protectedFiles.includes(fileName)) continue;

  // Check if filename or relative path is mentioned in src
  // For safety, checking if the filename exists anywhere in the source code.
  if (!srcContent.includes(fileName) && !srcContent.includes(relativePath)) {
    console.log('Deleting unused file:', relativePath);
    fs.unlinkSync(file);
    deletedCount++;
  }
}

console.log(`Deleted ${deletedCount} unused files.`);
