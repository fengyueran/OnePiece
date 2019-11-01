import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { opacityIncreaseCss, opacityDecreaseCss } from './animation';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: #000;
  opacity: ${({ visible }) => (visible ? 0.5 : 0)};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  ${({ visible }) => (visible ? opacityIncreaseCss : opacityDecreaseCss)};
`;

const propTypes = {
  portal: PropTypes.bool,
  visible: PropTypes.bool,
  centered: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
  children: PropTypes.node
};

const BackDrop = ({ portal, visible, centered, children, ...res }) => (
  <StyledModal visible={visible} centered={centered} {...res}>
    {children}
  </StyledModal>
);

BackDrop.propTypes = propTypes;

export default BackDrop;
