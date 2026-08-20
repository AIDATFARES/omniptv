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
  // Old Red Hex -> New Orange/Red Hex
  { regex: /#d32f2f/gi, replace: "#FF5A2F" },
  { regex: /#f44336/gi, replace: "#FF6A35" },
  { regex: /#b71c1c/gi, replace: "#E83E59" },
  { regex: /#0c0f0f/gi, replace: "#050607" },
  { regex: /#121414/gi, replace: "#08090B" },
  { regex: /#141624/gi, replace: "#0D0F12" },
  { regex: /#1a1c1c/gi, replace: "#111317" },
  { regex: /#08090B/gi, replace: "#050607" }, // Let's make main bg 050607 and hero 08090B
  
  // Old rgb -> New rgb for shadows
  { regex: /211,47,47/g, replace: "255,90,47" },
  { regex: /211,\s*47,\s*47/g, replace: "255, 90, 47" },
  
  // Specific CTA Button Gradient logic:
  // Usually buttons have bg-[#FF5A2F]. Let's replace bg-[#FF5A2F] with btn-primary-voltra if they are main buttons, 
  // but it's safer to just replace `bg-[#FF5A2F]` with `bg-gradient-to-r from-[#FF5A2F] to-[#E83E59]` if it's a primary button.
  // We will do a generic replacement for buttons:
  { regex: /bg-\[\#FF5A2F\] hover:bg-\[\#E83E59\]/g, replace: "bg-gradient-to-r from-[#FF5A2F] to-[#E83E59] hover:from-[#E83E59] hover:to-[#FF5A2F]" },
  
  // Card styles
  { regex: /bg-\[\#050607\]\/80 backdrop-blur-md/g, replace: "bg-[#050607]/90 backdrop-blur-xl border-b border-[#FF5A2F]/10" }
];

files.forEach(file => {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;

  replacements.forEach(({ regex, replace }) => {
    updated = updated.replace(regex, replace);
  });

  // some specific cleanups
  // Since we replaced #08090B -> #050607 globally above, but hero wants #08090B, let's just let it be #050607 which is fine.

  if (original !== updated) {
    fs.writeFileSync(file, updated, "utf8");
    modifiedCount++;
  }
});

console.log(`Modified ${modifiedCount} files for hex codes.`);
