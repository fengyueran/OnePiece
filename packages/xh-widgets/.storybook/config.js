import { configure, addDecorator, setAddon } from '@storybook/react';
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withConsole, setConsoleOptions } from '@storybook/addon-console';

setAddon(chaptersAddon);
addDecorator(withInfo);
addDecorator(withKnobs);
setDefaults({
  sectionOptions: {
    showSource: false,
    allowSourceToggling: false,
    showPropTables: false,
    allowPropTablesToggling: false
  }
});
const optionsCallback = options => ({
  panelExclude: [...options.panelExclude, /Warning|warn/]
});
addDecorator((storyFn, context) =>
  withConsole(optionsCallback)(storyFn)(context)
);

const req = require.context('../stories', true, /__story__\.(js|jsx)$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
