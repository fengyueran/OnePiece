import { configure, addDecorator, setAddon } from '@storybook/react';
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters';
import { withKnobs } from '@storybook/addon-knobs/react';

setAddon(chaptersAddon);
addDecorator(withKnobs);
setDefaults({
  sectionOptions: {
    showSource: false,
    allowSourceToggling: false,
    showPropTables: false,
    allowPropTablesToggling: false
  }
});

const req = require.context('../stories', true, /__story__\.(js|jsx)$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
