import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Col } from '../src/Col';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(<Component {...res}>{children}</Component>);
  return wrapper;
};

describe('Col Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: 'Col',
    children
  };

  const wrapper = setup(Col, props);
  console.log(wrapper.debug());

  it('Col should be render', () => {
    expect(wrapper.find('#Col').exists()).toBe(true);
  });

  it('Col should be render children', () => {
    expect(wrapper.find('#Col').children().length).toBe(children.length);
  });

  it('Col snapshot', () => {
    const Instance = <Col>{children}</Col>;
    const tree = renderer.create(Instance).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
