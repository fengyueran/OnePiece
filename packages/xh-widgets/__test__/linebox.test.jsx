import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { LineBox } from '../src/LineBox';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(
    <Component {...res}>
      {children}
    </Component>
  );
  return wrapper;
};

describe('LineBox Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: "LineBox",
    children,
  };

  const wrapper = setup(LineBox, props);
  console.log(wrapper.debug());

  it('LineBox should be render', () => {
    expect(wrapper.find('#LineBox').exists()).toBe(true); 
  });

  it('LineBox should be render children', () => {
    expect(wrapper.find('#LineBox').children().length).toBe(children.length); 
  });

  it('LineBox snapshot', () => {
    const Instance = (
      <LineBox>
        {children}
      </LineBox>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});