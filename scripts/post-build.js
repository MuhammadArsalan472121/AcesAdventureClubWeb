const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const htaccessSrc = path.join(__dirname, 'htaccess.template');
const htaccessDest = path.join(distDir, '.htaccess');
const indexHtmlPath = path.join(distDir, 'index.html');
const underscoreExpoDir = path.join(distDir, '_expo');
const regularExpoDir = path.join(distDir, 'expo');

console.log('Running Post-Build Optimization for InfinityFree Web Hosting...');

// 1. Rename _expo to expo (CRITICAL: InfinityFree blocks folders starting with '_')
if (fs.existsSync(underscoreExpoDir)) {
  if (fs.existsSync(regularExpoDir)) {
    fs.rmSync(regularExpoDir, { recursive: true, force: true });
  }
  fs.renameSync(underscoreExpoDir, regularExpoDir);
  console.log('✓ Renamed "_expo" to "expo" (prevents InfinityFree 403 Forbidden / upload block)');
}

// 2. Copy .htaccess template
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, htaccessDest);
  console.log('✓ Successfully created dist/.htaccess with GZIP, Caching, and SPA rewrite rules.');
}

// 3. Patch dist/index.html
if (fs.existsSync(indexHtmlPath)) {
  let content = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Cleanly replace _expo with expo
  content = content.replace(/\/_expo\//g, './expo/');
  content = content.replace(/_expo\//g, 'expo/');
  content = content.replace(/\.\.\/expo\//g, './expo/');
  
  // Replace absolute leading slashes
  content = content.replace(/src="\/expo\//g, 'src="./expo/');
  content = content.replace(/href="\/favicon/g, 'href="./favicon');
  content = content.replace(/href="\/expo\//g, 'href="./expo/');
  
  // Fix body overflow clipping
  content = content.replace(/body\s*\{\s*overflow:\s*hidden;\s*\}/g, 'body { overflow-x: hidden; background-color: #0d1b2a; }');

  // Find Ionicons font in dist/expo/assets or dist/assets to preload
  function findFiles(dir, filter) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    fs.readdirSync(dir).forEach((file) => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) {
        results = results.concat(findFiles(full, filter));
      } else if (filter(file)) {
        results.push(full);
      }
    });
    return results;
  }

  const ioniconFonts = findFiles(regularExpoDir, (f) => f.includes('Ionicons') && f.endsWith('.ttf'));
  let fontPreloadTag = '';
  if (ioniconFonts.length > 0) {
    const relPath = path.relative(distDir, ioniconFonts[0]).replace(/\\/g, '/');
    fontPreloadTag = `<link rel="preload" href="./${relPath}" as="font" type="font/ttf" crossorigin>`;
    console.log(`✓ Injected font preload for ${relPath}`);
  }

  // Inject font-display: swap and preloads before </head>
  const headInject = `
    ${fontPreloadTag}
    <style>
      @font-face {
        font-family: 'ionicons';
        font-display: swap;
      }
      /* Prevent layout shift during font load */
      [data-icon] {
        display: inline-block;
        vertical-align: middle;
      }
    </style>
  </head>`;
  content = content.replace('</head>', headInject);
  
  fs.writeFileSync(indexHtmlPath, content, 'utf8');
  console.log('✓ Successfully patched dist/index.html with relative paths, font preloading, and clean styling.');
}

console.log('---------------------------------------------------------');
console.log('Build ready for InfinityFree! Upload all contents of "dist" into "htdocs".');
