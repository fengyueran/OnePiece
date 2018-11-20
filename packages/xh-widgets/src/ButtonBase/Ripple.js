import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import Transition from 'react-transition-group/Transition';

const DURATION = 550;
const rippleEnter = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;

const rippleExit = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const RippleVisibleStyle = css`
  opacity: 0.3;
  transform: scale(1);
  animation: ${rippleEnter} ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const ChildLeavingStyle = css`
  opacity: 0;
  animation: ${rippleExit} 550ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const StyledRipple = styled.span`
  width: 50;
  height: 50;
  left: 0;
  top: 0;
  opacity: 0;
  position: absolute;
  ${props => (props.visible && RippleVisibleStyle)};
`;

const RippleChild = styled.span`
  opacity: 1;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: red;
  ${props => (props.leaving && ChildLeavingStyle)};
`;

class Ripple extends React.Component {
  state = {
    visible: false,
    leaving: false,
  };

  handleEnter = () => {
    this.setState({
      visible: true,
    });
  };

  handleExit = () => {
    this.setState({
      leaving: true,
    });
  };

  render() {
    const {
      rippleX,
      rippleY,
      rippleSize,
      ...other
    } = this.props;
    const { visible, leaving } = this.state;

    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };

    return (
      <Transition onEnter={this.handleEnter} onExit={this.handleExit} {...other}>
        <StyledRipple visible={visible} style={rippleStyles}>
          <RippleChild leaving={leaving} />
        </StyledRipple>
      </Transition>
    );
  }
}

Ripple.propTypes = {
  pulsate: PropTypes.bool,
  rippleSize: PropTypes.number.isRequired,
  rippleX: PropTypes.number.isRequired,
  rippleY: PropTypes.number.isRequired,
};

Ripple.defaultProps = {
  pulsate: false,
};

export default Ripple;
