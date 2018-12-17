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
`;

class ButtonBase extends React.Component {
  handleMouseDown = (e) => {
    const { hasRipple } = this.props;
    if (hasRipple) {
      this.ripple.start(e);
    }
  }

  handleMouseUp = (e) => {
    const { hasRipple } = this.props;
    if (hasRipple) {
      this.ripple.stop(e);
    }
  }

  onRippleRef = (node) => {
    this.ripple = node;
  };

  render() {
    const { 
      className, children, ...other
    } = this.props;
    return (
      <StyledButtonBase
        className={className}
        onMouseLeave={this.handleMouseUp}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        {...other}
      >
        {children}
        <TouchRipple ref={this.onRippleRef} />
      </StyledButtonBase>);
  }
}

ButtonBase.propTypes = {
  hasRipple: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

ButtonBase.defaultProps = {
  hasRipple: true,
};

export default ButtonBase;