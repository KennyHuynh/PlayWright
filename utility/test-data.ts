import * as fs from 'fs';
import * as path from 'path';

function findFile(fileName: string, startDir: string): string | null {
  const files = fs.readdirSync(startDir);

  for (const file of files) {
    const fullPath = path.join(startDir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      const found = findFile(fileName, fullPath);
      if (found) return found;
    } else if (file === fileName) {
      return fullPath;
    }
  }

  return null;
}
export { findFile };