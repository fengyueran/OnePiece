import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import ButtonBase from '../ButtonBase';
import { fade } from '../utils/colorManipulator';

const ButtonStyle = css`
  min-width: 64px;
  min-height: 36px;
  padding: 8px 16px;
  border-radius: 2px;
  margin: 8px;
  font-size: 0.875rem;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  background-color: #e0e0e0; 
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${fade('rgba(0, 0, 0, 0.87)', 0.2)};
  }
`;

const Container = styled.span`
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const Button = ({ 
  isRipple, children, style, className, onClick
}) => (
  <ButtonBase
    onClick={onClick} 
    style={style}
    cssStyle={ButtonStyle}
    className={className}
    isRipple={isRipple}
  >
    <Container>{children}</Container>
  </ButtonBase>
);

Button.propTypes = {
  isRipple: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export { Button };
export default Button;