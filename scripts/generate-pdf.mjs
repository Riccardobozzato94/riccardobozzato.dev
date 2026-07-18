import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const htmlPath = join(root, "public", "files", "operational-chaos-diagnostic.html");
const pdfPath = join(root, "public", "files", "operational-chaos-diagnostic.pdf");

(async () => {
  console.log("🚀 Launching Puppeteer...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Read the local HTML file
  const html = readFileSync(htmlPath, "utf-8");
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Generate PDF — A4 format, clean print
  await page.pdf({
    path: pdfPath,
    format: "A4",
    margin: { top: "10mm", bottom: "10mm", left: "8mm", right: "8mm" },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`✅ PDF generated: ${pdfPath}`);
})();
