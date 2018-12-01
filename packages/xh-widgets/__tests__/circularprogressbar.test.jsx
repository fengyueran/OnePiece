import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { CircularProgressBar } from '../src/CircularProgressBar';

const setup = (Component, props) => {
  const wrapper = shallow(
    <Component {...props} />
  );
  return wrapper;
};

describe('CircularProgressBar test', () => {
  const props = {
    size: 100,
    thickness: 3,
    value: 50,
    pathColor: 'red',
    trailColor: 'blue',
  };

  const wrapper = setup(CircularProgressBar, props);

  it('CircularProgressBar should be render correctly', () => {
    const svg = wrapper.childAt(0);
    expect(svg.name()).toBe('svg'); 
    expect(svg.childAt(0).name(), 'circle');
    expect(svg.childAt(1).name(), 'circle');
    expect(svg.children().length).toBe(2); 
    expect(svg.childAt(0).props().cx).toBe(44);
    expect(svg.childAt(0).props().stroke).toBe('blue');
    expect(svg.childAt(1).props().stroke).toBe('red');
  });

  it('CircularProgressBar snapshot', () => {
    const tree = renderer
      .create(<CircularProgressBar {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});