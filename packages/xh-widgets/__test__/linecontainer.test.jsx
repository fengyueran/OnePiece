import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { LineContainer } from '../src/LineContainer';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(
    <Component {...res}>
      {children}
    </Component>
  );
  return wrapper;
};

describe('LineContainer Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: "LineContainer",
    children,
  };

  const wrapper = setup(LineContainer, props);
  console.log(wrapper.debug());

  it('LineContainer should be render', () => {
    expect(wrapper.find('#LineContainer').exists()).toBe(true); 
  });

  it('LineContainer should be render children', () => {
    expect(wrapper.find('#LineContainer').children().length).toBe(children.length); 
  });

  it('LineContainer snapshot', () => {
    const Instance = (
      <LineContainer>
        {children}
      </LineContainer>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});