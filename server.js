/**
 * Server.js - Executive Multi-Venture Business Portal
 * Stack: Node.js native HTTP server + Static File Serving + REST Financial API
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

// Load the verified financial dataset
let VENTURE_DATA = {};
try {
  VENTURE_DATA = require("./public/js/data.js");
} catch (err) {
  console.warn("Notice: data.js loaded in client context or loading fallback.");
}

// MIME Type mapping
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".csv": "text/csv; charset=utf-8"
};

// Create Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS Headers for API flexibility
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Route: Health Check
  if (pathname === "/health" || pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", timestamp: new Date().toISOString() }));
    return;
  }

  // API Route: All Venture Data
  if (pathname === "/api/ventures") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(VENTURE_DATA, null, 2));
    return;
  }

  // API Route: Consolidated Projections
  if (pathname === "/api/projections") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(VENTURE_DATA.consolidated || {}, null, 2));
    return;
  }

  // API Route: Export Financial CSV
  if (pathname === "/api/export/csv") {
    const data = VENTURE_DATA.consolidated ? VENTURE_DATA.consolidated.timeframes : [];
    let csv = "Period,FM AI Revenue,NeoGen Revenue,BloomPress Revenue,Total Portfolio Revenue,Total Operating Expenses,Consolidated Net Profit,Blended Profit Margin\n";
    data.forEach(d => {
      csv += `"${d.period}",${d.fmaiRevenue},${d.neogenRevenue},${d.bloomRevenue},${d.totalRevenue},${d.totalExpenses},${d.netProfit},"${d.blendedMargin}"\n`;
    });
    res.writeHead(200, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Consolidated_Financial_Model.csv"'
    });
    res.end(csv);
    return;
  }

  // Static File Delivery
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
  if (safePath === "/" || safePath === "\\") {
    safePath = "index.html";
  }

  let filePath = path.join(PUBLIC_DIR, safePath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, safePath);
  }

  // If path doesn't have an extension and exists as directory, check for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 Fallback
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 Not Found</title><link rel="stylesheet" href="/css/styles.css"></head>
        <body style="display:flex;align-items:center;justify-content:center;height:100vh;text-align:center;">
          <div class="section-block" style="max-width:500px;">
            <h1 style="color:#0052FF;font-size:3rem;margin-bottom:0.5rem;">404</h1>
            <h2>Page Not Found</h2>
            <p style="margin:1rem 0;">The requested resource does not exist.</p>
            <a href="/" class="btn-cpa-audit" style="display:inline-block;">Return to Executive Dashboard</a>
          </div>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600"
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log("==================================================================");
  console.log("  EXECUTIVE MULTI-VENTURE BUSINESS PORTAL");
  console.log("  - FitMind AI (FM AI): White + Blue Ecosystem & Watch Schematics");
  console.log("  - NeoGen Technologies: White + Blue AI Automation Agency");
  console.log("  - BloomPress Publishers: Subtle Gold + White Atelier");
  console.log("  - CPA Audit Governance & Real-Time Simulation Engine Active");
  console.log(`  Local Access URL: http://localhost:${PORT}`);
  console.log("==================================================================");
});
