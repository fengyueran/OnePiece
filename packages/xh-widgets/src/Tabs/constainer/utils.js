export const computedStyle = node => {
  const style = window.getComputedStyle(node);
  const properties = ['width', 'margin-right'];
  const values = properties.map(property => {
    let value = style.getPropertyValue(property);
    value = +value.replace('px', '');
    return value;
  });
  const width = values[0];
  const marginRight = values[1];
  return { width, marginRight };
};
