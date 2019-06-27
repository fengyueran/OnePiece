import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  viewBox: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const SvgBase = ({
  viewBox,
  children,
  width,
  height,
  color = 'currentColor'
}) => (
  <svg
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
  >
    {children}
  </svg>
);

SvgBase.propTypes = propTypes;

export default SvgBase;
