import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { VContainer } from '../src/VContainer';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(
    <Component {...res}>
      {children}
    </Component>
  );
  return wrapper;
};

describe('VContainer Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: "VContainer",
    children,
  };

  const wrapper = setup(VContainer, props);
  console.log(wrapper.debug());

  it('VContainer should be render', () => {
    expect(wrapper.find('#VContainer').exists()).toBe(true); 
  });

  it('VContainer should be render children', () => {
    expect(wrapper.find('#VContainer').children().length).toBe(children.length); 
  });

  it('VContainer snapshot', () => {
    const Instance = (
      <VContainer>
        {children}
      </VContainer>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});