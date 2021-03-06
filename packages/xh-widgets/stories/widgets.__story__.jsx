import React, { useState } from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  array,
  object
} from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import FlexBox from '../src/FlexBox';
import Row from '../src/Row';
import Col from '../src/Col';
import CircularProgressBar from '../src/CircularProgressBar';
import ButtonWithRipple from '../src/Button';
import Icon from '../src/Icon';
import TreeSelect from '../src/TreeSelect';
import Pagination from '../src/Pagination';
import Tabs from '../src/Tabs';
import Spin from '../src/Spin';
import Carousel from '../src/Carousel/Carousel';
import Modal from './Modal';
import classes from './main.css';
import icon from '../assets/next@2x.png';

import { treeData } from './mock-data';

const Card = styled.div`
  width: 400px;
  height: 150px;
  margin: 20px 5px;
  background: #59c6d4;
  &:before {
    position: relative;
    left: 0;
    top: 0;
    content: 'Card';
  }
`;

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Widgets', module)
  .addWithChapters('Container', {
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
              <FlexBox className={classes.container} style={{ color: 'blue' }}>
                {[1, 2, 3].map((v, k) => (
                  <Card key={k} style={{ margin: 5 }} />
                ))}
              </FlexBox>
            ),
            options: {
              showSource: true,
              allowSourceToggling: true,
              showPropTables: true,
              allowPropTablesToggling: true
            }
          }
        ]
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
              <Row className={classes.container} style={{ color: 'blue' }}>
                {[1, 2, 3].map((v, k) => (
                  <Card key={k} />
                ))}
              </Row>
            ),
            options: {
              showSource: true,
              allowSourceToggling: true,
              showPropTables: true,
              allowPropTablesToggling: true
            }
          }
        ]
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
              <Col className={classes.container} style={{ color: 'blue' }}>
                {[1, 2, 3].map((v, k) => (
                  <Card key={k} style={{ margin: 5 }} />
                ))}
              </Col>
            ),
            options: {
              showSource: true,
              allowSourceToggling: true,
              showPropTables: true,
              allowPropTablesToggling: true
            }
          }
        ]
      }
    ]
  })
  .add('CircularProgressBar', () => (
    <CircularProgressBar
      size={number('size', 100)}
      thickness={number('thickness', 3)}
      value={number('value', 10)}
      railColor={color('railColor', 'blue')}
      strokeColor={color('strokeColor', 'gray')}
    />
  ))
  .add('Button', () => (
    <ButtonWithRipple hasRipple={boolean('hasRipple', true)}>
      <img src={icon} style={{ width: 25, marginRight: 5 }} />
      Submit
    </ButtonWithRipple>
  ))
  .add('Icon', () => <Icon src={icon} tintColor={color('tintColor', 'blue')} />)
  .add('TreeSelect', () => (
    <TreeSelect
      treeData={array('treeData', treeData)}
      onSelect={selected => console.log(selected)}
    />
  ))
  .add('Pagination', () => (
    <Pagination
      total={number('total', 100)}
      pageSize={number('pageSize', 10)}
      onPageChange={page => console.log('current page ', page)}
    />
  ))
  .add('Tabs', () => (
    <Tabs
      tabs={array('tabs', ['哪吒', '海贼王', '奥特曼', '变形金刚'])}
      onTabChange={tab => console.log('current tab ', tab)}
    />
  ))
  .add('Spin', () => (
    <div style={{ width: '100px', height: '100px', border: 'solid' }}>
      <Spin />
    </div>
  ))
  .add('Carousel', () => (
    <div style={{ width: '500px', height: '280px', border: 'solid' }}>
      <Carousel
        interval={number('interval', 2000)}
        onChange={index => console.log('current slide ', index)}
      >
        {[1, 2, 3, 4, 5, 6].map(v => (
          <div key={v}>{v}</div>
        ))}
      </Carousel>
    </div>
  ))
  .add('Modal', () => (
    <Modal
      // visible={boolean('visible', false)}
      centered={boolean('centered', true)}
      dialogStyle={object('dialogStyle', { top: 150 })}
      maskStyle={object('maskStyle', { background: '#ABC7F3' })}
    />
  ));
