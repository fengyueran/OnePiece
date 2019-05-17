import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from '../ButtonBase';
import { fade } from '../utils/colorManipulator';

const ButtonContainer = styled(ButtonBase)`
  min-width: 64px;
  min-height: 36px;
  padding: 8px 16px;
  border-radius: 2px;
  margin: 8px;
  font-size: 0.875rem;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  background-color: #e0e0e0;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  &:hover {
    ${props =>
      props.hasHover &&
      `background-color: ${fade('rgba(0, 0, 0, 0.87)', 0.2)}`};
  }
`;

const Container = styled.span`
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const Button = ({ hasRipple, hasHover, children, className, ...other }) => (
  <ButtonContainer
    className={className}
    hasRipple={hasRipple}
    hasHover={hasHover}
    {...other}
  >
    <Container>{children}</Container>
  </ButtonContainer>
);

Button.propTypes = {
  hasRipple: PropTypes.bool,
  hasHover: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

Button.defaultProps = {
  hasRipple: true,
  hasHover: true
};

export default Button;
