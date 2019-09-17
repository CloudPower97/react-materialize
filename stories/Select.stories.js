import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import Select from '../src/Select';
import Icon from '../src/Icon';

const stories = storiesOf('Components|Select', module);

stories.addParameters({
  info: {
    text: `Select allows user input through specified options.`
  }
});

stories.add('Default', () => (
  <Select value="" onChange={action('Select changed')}>
    <option value="" disabled>
      Choose your option
    </option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
));

stories.add('with Icon', () => (
  <Select value="" icon={<Icon>{text('icon', 'cloud')}</Icon>}>
    <option value="" disabled>
      Choose your option
    </option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
));

stories.add('Multiple', () => (
  <Select multiple value={['']}>
    <option value="" disabled>
      Choose your option
    </option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
));

stories.add('Label', () => (
  <Select label="Choose your option" value="2">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
));

stories.add('Disabled', () => (
  <Select disabled value="2">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
));

const browserDefault = storiesOf('Components|Select/Browser default', module);

browserDefault.add('Default', () => (
  <Select browserDefault value="2">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
));

browserDefault.add('Disabled', () => (
  <Select disabled browserDefault value="2">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
));
