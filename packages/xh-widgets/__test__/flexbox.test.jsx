import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { FlexBox } from '../src/FlexBox';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(
    <Component {...res}>
      {children}
    </Component>
  );
  return wrapper;
};

describe('FlexBox Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: "FlexBox",
    children,
  };

  const wrapper = setup(FlexBox, props);
  console.log(wrapper.debug());

  it('FlexBox should be render', () => {
    expect(wrapper.find('#FlexBox').exists()).toBe(true); 
  });

  it('FlexBox should be render children', () => {
    expect(wrapper.find('#FlexBox').children().length).toBe(children.length); 
  });

  it('FlexBox snapshot', () => {
    const Instance = (
      <FlexBox>
        {children}
      </FlexBox>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});