const fs = require('fs').promises;
const path = require('path');

const root = path.join(__dirname, '..', 'src');
const exts = ['.ts', '.tsx', '.js', '.jsx'];

function shouldProcess(file) {
  return exts.includes(path.extname(file));
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      await walk(full);
    } else if (ent.isFile() && shouldProcess(full)) {
      await processFile(full);
    }
  }
}

function removeBlockComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '');
}

function removeLineComments(text) {
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const idx = line.indexOf('//');
    if (idx === -1) continue;
    const before = line.slice(0, idx);
    if (/https?:\/\//.test(line)) {
      // if the // is part of a URL, keep the line as-is
      continue;
    }
    // if the // appears inside a string (simple heuristic) skip
    const doubleQuotes = (before.match(/"/g) || []).length;
    const singleQuotes = (before.match(/'/g) || []).length;
    if (doubleQuotes % 2 === 1 || singleQuotes % 2 === 1) continue;
    lines[i] = before.replace(/\s+$/,'');
  }
  return lines.join('\n');
}

async function processFile(file) {
  try {
    const orig = await fs.readFile(file, 'utf8');
    let out = orig;
    out = removeBlockComments(out);
    out = removeLineComments(out);
    if (out !== orig) {
      await fs.writeFile(file, out, 'utf8');
      console.log('Stripped comments:', file);
    }
  } catch (err) {
    console.error('Error processing', file, err);
  }
}

(async () => {
  await walk(root);
})();
