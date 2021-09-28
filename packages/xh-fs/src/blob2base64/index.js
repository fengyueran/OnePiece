const convertBlob2Base64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(this.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsDataURL(blob);
  });