const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "THIRD-PARTY-LICENSES");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const jsonPath = path.join(outDir, "licenses.json");
if (!fs.existsSync(jsonPath)) {
  process.exit(1);
}

const licenses = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
Object.keys(licenses).forEach((k) => {
  const obj = licenses[k] || {};
  const safeName = k.replace(/[^a-z0-9.-]/gi, "_");
  const dest = path.join(outDir, `${safeName}.LICENSE.txt`);
  const header =
    "Package: " +
    k +
    "\nLicense: " +
    (obj.licenses || "UNKNOWN") +
    "\nSource: " +
    (obj.licenseFile || "") +
    "\n\n";

  if (obj.licenseFile && fs.existsSync(obj.licenseFile)) {
    try {
      const content = fs.readFileSync(obj.licenseFile, "utf8");
      fs.writeFileSync(dest, header + content);
    } catch {
      fs.writeFileSync(dest, header + "[failed to read license file]");
    }
  } else {
    fs.writeFileSync(dest, header + "[no licenseFile path available]");
  }
});
