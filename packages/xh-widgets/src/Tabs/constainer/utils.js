export const computedStyle = node => {
  const style = window.getComputedStyle(node);
  const properties = ['width', 'padding-left', 'padding-right', 'margin-right'];
  const values = properties.map(property => {
    let value = style.getPropertyValue(property);
    value = +value.replace('px', '');
    return value;
  });
  const width = values[0] + values[1] + values[2];
  const marginRight = values[3];
  return { width, marginRight };
};
