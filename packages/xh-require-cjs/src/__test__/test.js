const test = () => {
  const requireCJS = require('../require-cjs');

  const str = `
    Object.defineProperty(exports, "__esModule", { value: true });
    const run = () => {
      console.log("running");
    };
    module.exports = run;
`;
  const run = requireCJS(str);

  console.log(run());
};
test();
