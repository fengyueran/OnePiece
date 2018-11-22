import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TouchRipple from './TouchRipple';

const StyledButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
  ${props => props.cssStyle};
`;

class ButtonBase extends React.Component {
  handleMouseDown = (e) => {
    this.ripple.start(e);
  }

  handleMouseUp = (e) => {
    this.ripple.stop(e);
  }

  onRippleRef = (node) => {
    this.ripple = node;
  };

  render() {
    const { cssStyle, children } = this.props;
    return (
      <StyledButtonBase
        cssStyle={cssStyle}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
      >
        {children}
        <TouchRipple ref={this.onRippleRef} />
      </StyledButtonBase>);
  }
}

ButtonBase.propTypes = {
  cssStyle: PropTypes.array,
  children: PropTypes.node,
};


export default ButtonBase;