function readBinaryStringFromArrayBuffer(u) {
  const b = new Blob([u]);
  const r = new FileReader();
  r.readAsText(b, 'utf-8');
  r.onload = function (event) {
    console.log('event.target.result', event?.target?.result);
  };
}
