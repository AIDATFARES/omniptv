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

const files = walkSync("src").filter(f => f.endsWith(".tsx") || f.endsWith(".ts"));
let modifiedCount = 0;

const replacements = [
  // Red to Orange/Red theme
  { regex: /\btext-red-500\b/g, replace: "text-[#FF5A2F]" },
  { regex: /\btext-red-400\b/g, replace: "text-[#FF6A35]" },
  { regex: /\btext-red-300\b/g, replace: "text-[#E83E59]" },
  
  { regex: /\bbg-red-500\b/g, replace: "bg-[#FF5A2F]" },
  { regex: /\bbg-red-400\b/g, replace: "bg-[#FF6A35]" },
  { regex: /\bbg-red-300\b/g, replace: "bg-[#E83E59]" },

  { regex: /\bborder-red-500\b/g, replace: "border-[#FF5A2F]" },
  { regex: /\bborder-red-400\b/g, replace: "border-[#FF6A35]" },
  
  { regex: /\bfrom-red-500\b/g, replace: "from-[#FF5A2F]" },
  { regex: /\bvia-red-500\b/g, replace: "via-[#E83E59]" },
  { regex: /\bto-red-500\b/g, replace: "to-[#FF3D57]" },
  
  { regex: /\bfrom-red-400\b/g, replace: "from-[#FF5A2F]" },
  { regex: /\bvia-red-400\b/g, replace: "via-[#E83E59]" },
  { regex: /\bto-red-400\b/g, replace: "to-[#FF3D57]" },
  
  { regex: /\bdecoration-red-500\b/g, replace: "decoration-[#FF5A2F]" },
  { regex: /\bdecoration-red-400\b/g, replace: "decoration-[#FF6A35]" },
  
  { regex: /\bring-red-500\b/g, replace: "ring-[#FF5A2F]" },

  // Background replacements to match dark cinematic #050607, #08090B, #0D0F12, #111317
  { regex: /bg-\[#0c0f0f\]/g, replace: "bg-[#050607]" },
  { regex: /bg-\[#121414\]/g, replace: "bg-[#08090B]" },
  { regex: /bg-\[#1a1c1c\]/g, replace: "bg-[#111317]" },
  { regex: /bg-\[#1e2020\]/g, replace: "bg-[#15171B]" },
  { regex: /bg-\[#282a2b\]/g, replace: "bg-[#1A1C21]" },
  { regex: /bg-\[#161a23\]/g, replace: "bg-[#111317]" },
  { regex: /bg-\[#141624\]/g, replace: "bg-[#0d0f12]" },
  
  // Replace direct gradient classes with the text-gradient-primary utility if applicable
  { regex: /bg-gradient-to-r from-red-400 via-red-400 to-red-400 bg-clip-text text-transparent/g, replace: "text-gradient-primary" },
  { regex: /bg-gradient-to-r from-red-500 via-red-500 to-red-500 bg-clip-text text-transparent/g, replace: "text-gradient-primary" },
  { regex: /bg-gradient-to-r from-\[\#FF5A2F\] via-\[\#E83E59\] to-\[\#FF3D57\] bg-clip-text text-transparent/g, replace: "text-gradient-primary" }
];

files.forEach(file => {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;

  replacements.forEach(({ regex, replace }) => {
    updated = updated.replace(regex, replace);
  });

  if (original !== updated) {
    fs.writeFileSync(file, updated, "utf8");
    modifiedCount++;
  }
});

console.log(`Modified ${modifiedCount} files for colors.`);
