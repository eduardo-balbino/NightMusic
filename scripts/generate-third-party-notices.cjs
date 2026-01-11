const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "THIRD-PARTY-LICENSES");
const out = path.join(process.cwd(), "THIRD-PARTY-NOTICES.txt");

if (!fs.existsSync(dir)) {
  console.error("THIRD-PARTY-LICENSES directory not found.");
  process.exit(1);
}

const jsonPath = path.join(dir, "licenses.json");
let keys = [];
if (fs.existsSync(jsonPath)) {
  const licenses = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  keys = Object.keys(licenses);
} else {
  // fallback: read files and use filenames
  keys = fs.readdirSync(dir).filter((f) => f !== "licenses.json");
}

let outStream = "";
outStream += "THIRD-PARTY NOTICES\n";
outStream += "Generated: " + new Date().toISOString() + "\n\n";

if (fs.existsSync(jsonPath)) {
  const licenses = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  keys.forEach((pkg) => {
    const safeName = pkg.replace(/[^a-z0-9\.\-]/gi, "_");
    const file = path.join(dir, `${safeName}.LICENSE.txt`);
    outStream +=
      "----------------------------------------------------------------" + "\n";
    outStream += `Package: ${pkg}\n`;
    outStream += `License: ${licenses[pkg] && licenses[pkg].licenses ? licenses[pkg].licenses : "UNKNOWN"}\n`;
    outStream +=
      "----------------------------------------------------------------" +
      "\n\n";
    if (fs.existsSync(file)) {
      outStream += fs.readFileSync(file, "utf8") + "\n\n";
    } else {
      outStream += "[license text not available]\n\n";
    }
  });
} else {
  // simple concat
  keys.forEach((fname) => {
    const file = path.join(dir, fname);
    outStream +=
      "----------------------------------------------------------------" + "\n";
    outStream += `File: ${fname}\n`;
    outStream +=
      "----------------------------------------------------------------" +
      "\n\n";
    outStream += fs.readFileSync(file, "utf8") + "\n\n";
  });
}

fs.writeFileSync(out, outStream, "utf8");
console.log("Wrote", out);
