import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { Button } from '../src/Button';

const setup = (Component, props) => {
  const { children, ...res } = props;
  const wrapper = shallow(
    <Component {...res}>
      {children}
    </Component>
  );
  return wrapper;
};

describe('Button Shallow', () => {
  const children = [
    <div key="children1" id="children1" />,
    <div key="children2" id="children2" />
  ];
  const props = {
    id: "Button",
    children,
  };

  const wrapper = setup(Button, props);
  console.log(wrapper.debug());

  it('Button should be render', () => {
    expect(wrapper.find('#Button').exists()).toBe(true); 
  });

  it('Button snapshot', () => {
    const Instance = (
      <Button>
        {children}
      </Button>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});