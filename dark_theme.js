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

// Generic card styling replacements for standard light cards
const replacements = [
  { regex: /bg-white border-2 border-red-600/g, replace: "glass-panel border-2 border-[#FF5A2F]" },
  { regex: /bg-white border border-stone-200/g, replace: "glass-panel" },
  { regex: /bg-white border border-stone-100/g, replace: "glass-panel" },
  { regex: /bg-white/g, replace: "glass-panel" },
  
  // Text colors on previously white cards
  { regex: /text-stone-900/g, replace: "text-white" },
  { regex: /text-stone-800/g, replace: "text-stone-100" },
  { regex: /text-stone-700/g, replace: "text-stone-300" },
  { regex: /text-stone-600/g, replace: "text-stone-400" },
  
  // Borders
  { regex: /border-stone-200/g, replace: "border-white/10" },
  { regex: /border-stone-100/g, replace: "border-white/5" },
  { regex: /bg-stone-50/g, replace: "bg-white/5" },
  { regex: /bg-red-50\b/g, replace: "bg-[#FF5A2F]/10" },
  
  // Green buttons -> Orange/Red buttons
  { regex: /bg-emerald-600 hover:bg-emerald-500/g, replace: "bg-gradient-to-r from-[#FF5A2F] to-[#E83E59] hover:from-[#E83E59] hover:to-[#FF5A2F]" },
  { regex: /bg-emerald-600/g, replace: "bg-gradient-to-r from-[#FF5A2F] to-[#E83E59]" },
  { regex: /hover:bg-emerald-500/g, replace: "hover:from-[#E83E59] hover:to-[#FF5A2F]" },
  { regex: /text-emerald-600/g, replace: "text-[#FF5A2F]" },
  { regex: /text-emerald-500/g, replace: "text-[#FF5A2F]" },
  { regex: /border-emerald-600/g, replace: "border-[#FF5A2F]" },
  
  // Buttons rounding (replace rounded-xl/2xl with rounded-full for CTA buttons)
  // This is tricky using regex across all files, so we'll just fix the obvious one in PricingSection
  { regex: /mt-7 w-full rounded-2xl bg-gradient-to-r/g, replace: "mt-7 w-full rounded-full bg-gradient-to-r" },
  { regex: /mt-7 w-full rounded-xl bg-gradient-to-r/g, replace: "mt-7 w-full rounded-full bg-gradient-to-r" }
];

files.forEach(file => {
  const original = fs.readFileSync(file, "utf8");
  let updated = original;

  replacements.forEach(({ regex, replace }) => {
    updated = updated.replace(regex, replace);
  });

  // Fix some specific things like "glass-panel/5" which is invalid
  updated = updated.replace(/glass-panel\/5/g, "bg-white/5");
  updated = updated.replace(/glass-panel\/10/g, "bg-white/10");
  updated = updated.replace(/glass-panel\/20/g, "bg-white/20");

  if (original !== updated) {
    fs.writeFileSync(file, updated, "utf8");
    modifiedCount++;
  }
});

console.log(`Modified ${modifiedCount} files for dark theme.`);
