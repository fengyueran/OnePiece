import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Icon } from '../src/Icon';
import image from '../assets/next@2x.png';

const setup = (Component, props) => {
  const wrapper = shallow(
    <Component {...props} />
  );
  return wrapper;
};

describe('Icon shallow', () => {
  console.log('icon', image);

  const iconWrapper = setup(Icon, { id: "icon", src: image, tintColor: 'red' });
  const iconNode = iconWrapper.find('#icon');

  it('Icon should be render', () => {
    expect(iconNode.exists()).toBe(true); 
  });

  it('Icon props should be right', () => {
    expect(iconNode.props().src).toBe('test-file-stub');
    expect(iconNode.props().tintColor).toBe('red'); 
  });

  it('Icon snapshot', () => {
    const Instance = (
      <div>
        <Icon src={image} tintColor="red" />
      </div>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});