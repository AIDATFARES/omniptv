const fs = require("fs");
const path = require("path");

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        if (!dirFile.includes("node_modules") && !dirFile.includes(".next") && !dirFile.includes(".git")) {
           filelist = walkSync(dirFile, filelist);
        }
      } else {
        filelist.push(dirFile);
      }
    } catch (err) {
      if (err.code === "ENOTDIR" || err.code === "EBADF") filelist.push(dirFile);
    }
  });
  return filelist;
}

const files = walkSync("src").filter(f => f.endsWith(".tsx") || f.endsWith(".ts") || f.endsWith(".css") || f.endsWith(".js"));
files.push("package.json");
files.push("README.md");
files.push("theme.txt");

let modifiedCount = 0;

files.forEach(file => {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;

  updated = updated.replace(/IPTVDoor/gi, "OmniPtv");
  updated = updated.replace(/iptvdoor/gi, "omniptv");
  
  // also rename the component inside the renamed file if there's any reference
  updated = updated.replace(/WhyIPTVDoorSection/g, "WhyOmniPtvSection");

  if (original !== updated) {
    fs.writeFileSync(file, updated, "utf8");
    modifiedCount++;
  }
});

console.log(`Modified ${modifiedCount} files for branding.`);
