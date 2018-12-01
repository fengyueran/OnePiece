import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { VerticalBox } from '../src/VerticalBox';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(
    <Component {...res}>
      {children}
    </Component>
  );
  return wrapper;
};

describe('VerticalBox Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: "VerticalBox",
    children,
  };

  const wrapper = setup(VerticalBox, props);
  console.log(wrapper.debug());

  it('VerticalBox should be render', () => {
    expect(wrapper.find('#VerticalBox').exists()).toBe(true); 
  });

  it('VerticalBox should be render children', () => {
    expect(wrapper.find('#VerticalBox').children().length).toBe(children.length); 
  });

  it('VerticalBox snapshot', () => {
    const Instance = (
      <VerticalBox>
        {children}
      </VerticalBox>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});