const fs = require('fs');
const path = require('path');
const junk = require('junk');

const isJunkOrHiddenFile = (fullpath) => {
  const filename = path.basename(fullpath);

  if (process.platform === 'win32') {
    return junk.is(filename);
  }

  return junk.is(filename) || /^\./.test(filename) || /^~\$/.test(filename);
};

const walkDir = (dir, options = { symbolicLink: false }) => {
  let results = [];
  const dirStat = fs.statSync(dir);
  if (dirStat && dirStat.isDirectory()) {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      const junkOrHiddenFile = isJunkOrHiddenFile(file);
      if (!junkOrHiddenFile) {
        if (stat && stat.isDirectory()) {
          results = results.concat(walkDir(file, options));
        } else {
          if (stat.isSymbolicLink() && symbolicLink) {
            results.push(file);
          } else {
            results.push(file);
          }
        }
      }
    });
  } else {
    results.push(dir);
  }
  return results;
};

const walk = (source, options) => {
  let results = [];
  const isArray = Array.isArray(source);
  if (isArray) {
    source.forEach((dir) => {
      results = results.concat(walkDir(dir, options));
    });
  } else {
    results = walkDir(source, options);
  }
  return results;
};

module.exports = walk;
