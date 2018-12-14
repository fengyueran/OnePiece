import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Sizer, SizerX, SizerY } from '../src/Sizer';

const setup = (Component, props) => {
  const wrapper = shallow(
    <Component {...props} />
  );
  return wrapper;
};

describe('VerticalBox Shallow', () => {
  const sizerWrapper = setup(Sizer, { id: 'sizer' });
  it('Sizer should be render', () => {
    expect(sizerWrapper.find('#sizer').exists()).toBe(true); 
  });

  const sizerXWrapper = setup(SizerX, { id: 'sizerX' });
  it('SizerX should be render', () => {
    expect(sizerXWrapper.find('#sizerX').exists()).toBe(true); 
  });

  const sizerYWrapper = setup(SizerY, { id: 'sizerY' });
  it('SizerY should be render', () => {
    expect(sizerYWrapper.find('#sizerY').exists()).toBe(true); 
  });

  it('Sizer snapshot', () => {
    const Instance = (
      <div>
        <Sizer />
        <SizerX size={18} />
        <SizerY size={28} />
      </div>);
    const tree = renderer
      .create(Instance)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});