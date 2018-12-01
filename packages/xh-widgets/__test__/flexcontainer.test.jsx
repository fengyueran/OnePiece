import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { FlexContainer } from '../src/FlexContainer';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(
    <Component {...res}>
      {children}
    </Component>
  );
  return wrapper;
};

describe('FlexContainer Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: "FlexContainer",
    children,
  };

  const wrapper = setup(FlexContainer, props);
  console.log(wrapper.debug());

  it('FlexContainer should be render', () => {
    expect(wrapper.find('#FlexContainer').exists()).toBe(true); 
  });

  it('FlexContainer should be render children', () => {
    expect(wrapper.find('#FlexContainer').children().length).toBe(children.length); 
  });

  it('FlexContainer snapshot', () => {
    const Instance = (
      <FlexContainer>
        {children}
      </FlexContainer>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});