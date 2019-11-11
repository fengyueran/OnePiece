import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { Row } from '../src/Row';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(<Component {...res}>{children}</Component>);
  return wrapper;
};

describe('Row Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: 'Row',
    children
  };

  const wrapper = setup(Row, props);
  console.log(wrapper.debug());

  it('Row should be render', () => {
    expect(wrapper.find('#Row').exists()).toBe(true);
  });

  it('Row should be render children', () => {
    expect(wrapper.find('#Row').children().length).toBe(children.length);
  });

  it('Row snapshot', () => {
    const Instance = <Row>{children}</Row>;
    const tree = renderer.create(Instance).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
