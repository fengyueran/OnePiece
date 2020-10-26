const path = require('path');
const copy = require('../copy');

const cp = async (source, dest) => {
  try {
    const sourceRoot = path.dirname(source);
    const copyProcess = copy(source, dest, {
      parents: true,
      sourceRoot,
    }).on('progress', (progress) => {
      console.log('progress', progress);
    });

    setTimeout(() => {
      copyProcess.abort();
    }, 2000);
    await copyProcess;
    console.log('Files copied!');
  } catch (err) {
    throw err;
  }
};
cp('/Users/xinghunm/xinghun/data/test', '/Users/xinghunm/xinghun/data/tmp');
