import fs from 'fs';
import path from 'path';

class Walker {
  constructor(option = { ignoreHiddenFile: true }) {
    this._filesPath = [];
    this.ignoreHiddenFile = option.ignoreHiddenFile;
  }

  getFilesPath() {
    return this._filesPath;
  }

  workSync(walkPath) {
    try {
      const files = fs.readdirSync(walkPath);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(walkPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          this.workSync(filePath);
        } else if (stat.isFile()) {
          const isHiddenFile = file.startsWith('.');
          if (isHiddenFile) {
            if (!this.ignoreHiddenFile) {
              this._filesPath.push(filePath);
            }
          } else {
            this._filesPath.push(filePath);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default Walker;