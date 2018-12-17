import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIcon = styled.div`
  mask-image: ${props => `url(${props.src})`};
  background: ${props => props.tintColor};
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`;

const Icon = props => (
  <StyledIcon {...props} />
);

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Icon.defaultProps = {
  tintColor: '#9520f7',
  width: 20,
  height: 20,
};

export { Icon };
export default Icon;