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
    const { isRipple } = this.props;
    if (isRipple) {
      this.ripple.start(e);
    }
  }

  handleMouseUp = (e) => {
    const { isRipple } = this.props;
    if (isRipple) {
      this.ripple.stop(e);
    }
  }

  onRippleRef = (node) => {
    this.ripple = node;
  };

  render() {
    const { 
      className, cssStyle, style, children, onClick
    } = this.props;
    return (
      <StyledButtonBase
        onClick={onClick} 
        style={style}
        cssStyle={cssStyle}
        className={className}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
      >
        {children}
        <TouchRipple ref={this.onRippleRef} />
      </StyledButtonBase>);
  }
}

ButtonBase.propTypes = {
  isRipple: PropTypes.bool,
  style: PropTypes.object,
  cssStyle: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

ButtonBase.defaultProps = {
  isRipple: true,
};

export default ButtonBase;