module.exports = (str) => {
  const _module = { exports: {} };
  const fn = new Function('module', 'exports', str);
  fn(_module, _module.exports);
  return _module.exports;
};
