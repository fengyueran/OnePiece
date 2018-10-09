import { configure, addDecorator, setAddon } from '@storybook/react';
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters';
import { withKnobs } from '@storybook/addon-knobs/react';

setAddon(chaptersAddon);
addDecorator(withKnobs);

const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
