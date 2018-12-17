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

  it('Button should be render', () => {
    expect(wrapper.find('#Button').exists()).toBe(true); 
  });


  it('Can toggle touch Ripple effect', () => {
    const Instance = <Button hasRipple={false} />;
    const buttonWrapper = shallow(Instance);
    expect(buttonWrapper.find('Styled(ButtonBase)').prop('hasRipple')).toBe(false);
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

  it('should handle click event', () => {
    class TestButton extends React.Component {
      state = {
        className: null,
      };

      onClick = () => {
        this.setState({ className: "clicked" });
      }

      render() {
        const { className } = this.state;
        return <Button id="Button" className={className} onClick={this.onClick}>Button</Button>;
      }
    }
    const buttonWrapper = shallow(
      <TestButton />
    );
    buttonWrapper.simulate('click');
    expect(buttonWrapper.find('#Button').hasClass('clicked')).toBe(true);
  });
});