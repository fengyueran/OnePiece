const fs = require('fs');

const writeJson = (json, filePath) =>
  new Promise((resolve, reject) => {
    const jsonStr = JSON.stringify(json, null, 2);
    fs.writeFile(filePath, jsonStr, 'utf8', (err) => {
      if (err) {
        console.log('An error occured while writing JSON Object to File.');
        reject(err);
      }
      console.log('JSON file has been saved.');
      resolve();
    });
  });

export default writeJson;
