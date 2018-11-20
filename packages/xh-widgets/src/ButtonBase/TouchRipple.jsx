import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Ripple from './Ripple';


const StyledTransitionGroup = styled(TransitionGroup)`
  display: block;
  position: absolute;
  overflow: hidden;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 0;
`;

const DURATION = 550;
class TouchRipple extends React.PureComponent {
  state = {
    nextKey: 0, //eslint-disable-line
    ripples: [],
  };

  start = (event = {}) => {
    const element = ReactDOM.findDOMNode(this);
    const rect = element 
      ? element.getBoundingClientRect()
      : {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };

    // Get the size of the ripple
    const clientX = event.clientX;
    const clientY = event.clientY;
    const rippleX = Math.round(clientX - rect.left);
    const rippleY = Math.round(clientY - rect.top);
    
    const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) 
    - rippleX), rippleX) * 2 + 2;
    const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) 
    - rippleY), rippleY) * 2 + 2;
    const rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);

    this.startCommit({ rippleX, rippleY, rippleSize });
  }

  stop = () => {
    const { ripples } = this.state;
    if (ripples && ripples.length) {
      this.setState(
        {
          ripples: ripples.slice(1),
        },
      );
    }
  };

  startCommit = (params) => {
    const { rippleX, rippleY, rippleSize } = params;
    this.setState(state => ({
      nextKey: ++state.nextKey,
      ripples: [
        ...state.ripples,
        <Ripple
          key={state.nextKey}
          timeout={{
            exit: DURATION,
            enter: DURATION,
          }}
          rippleX={rippleX}
          rippleY={rippleY}
          rippleSize={rippleSize}
        />,
      ]
    }));
  }

  render() {
    return (
      <StyledTransitionGroup
        component="span"
        enter
        exit
      >
        {this.state.ripples}
      </StyledTransitionGroup>
    );
  }
}

export default TouchRipple;