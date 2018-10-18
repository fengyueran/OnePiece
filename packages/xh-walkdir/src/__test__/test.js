import Walker from '../../lib';

const walker = new Walker();

walker.workSync('../../src');
console.log('FilesPath:', walker.getFilesPath());