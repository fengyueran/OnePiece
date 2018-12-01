/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { FlexBox } from '../src/FlexBox';
import { LineBox } from '../src/LineBox';
import { VerticalBox } from '../src/VerticalBox';
import { CircularProgressBar } from '../src/CircularProgressBar'
import { Button as ButtonWithRipple } from '../src/Button'
import classes from './main.css';
import icon from '../assets/next@2x.png';

const Card = styled.div`
  width: 400px;
  height: 150px;
  margin: 20px 5px;
  background: #59c6d4;
  &:before {
    position: relative;
    left: 0;
    top: 0;
    content: "Card";
  }
`;

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Widgets', module)
  .addWithChapters(
    'Container',
  {
    info: 'Container有三种FlexBox, LineBox以及VerticalBox。',
    chapters: [
      // List of chapters. Refer to Configuration Format section.
      {
        title: '1）FlexBox',
        sections: [
          // List of sections.
          {
            subtitle: `
            FlexBox为弹性容器，自动换行，如下图中的Card。
          `,
            sectionFn: () => (
            <FlexBox 
              className={classes["container"]}
              style={{ color: 'blue' }}
            >
              {
                [1, 2, 3].map((v, k) => (
                  <Card key={k} style={{ margin: 5 }}/>
                ))
              }
            </FlexBox>),
            options: {
              showSource: true,
              allowSourceToggling: true,
              showPropTables: true,
              allowPropTablesToggling: true,
            },
          },
        ],
      },
      {
        title: '2）LineBox',
        sections: [
          // List of sections.
          {
            subtitle: `
            LineBox使子元素水平排列，不换行，当空间不够时子元素等比缩放，如下图中的Card。
          `,
            sectionFn: () => (
            <LineBox 
              className={classes["container"]}
              style={{ color: 'blue' }}
            >
              {
                [1, 2, 3].map((v, k) => (
                  <Card key={k} />
                ))
              }
            </LineBox>),
            options: {
              showSource: true,
              allowSourceToggling: true,
              showPropTables: true,
              allowPropTablesToggling: true,
            },
          },
        ],
      },
      {
        title: '3）VerticalBox',
        sections: [
          // List of sections.
          {
            subtitle: `
            VerticalBox使子元素垂直排列，当空间不够时子元素等比缩放，如下图中的Card。
          `,
            sectionFn: () => (
            <VerticalBox 
              className={classes["container"]}
              style={{ color: 'blue' }}
            >
              {
                [1, 2, 3].map((v, k) => (
                  <Card key={k} style={{ margin: 5 }} />
                ))
              }
            </VerticalBox>),
            options: {
              showSource: true,
              allowSourceToggling: true,
              showPropTables: true,
              allowPropTablesToggling: true,
            },
          },
        ],
      },
    ],
  })
  .addDecorator(withSmartKnobs)
  .add('CircularProgressBar', () => (
      <CircularProgressBar 
        size={100}
        thickness={3}
        value={10}
        pathColor="blue"
        trailColor="gray"
      />))
  .add('Button', () => (
    <ButtonWithRipple>
      <img src={icon} style={{ width: 25, marginRight: 5 }} />
      Submit
    </ButtonWithRipple>))