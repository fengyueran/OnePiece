UI Widgets

- Tree Shaking

```
babel7 babel.config.js
module.exports = {
  presets: [
    "react-app"
  ],
  plugins: [["import",  {
    "libraryName": "@xinghunm/widgets",
    camel2UnderlineComponentName: false,
    camel2DashComponentName: false,
    customName: function (name) {
        return `@xinghunm/widgets/lib/${name}`;
    }}]]
}
```
