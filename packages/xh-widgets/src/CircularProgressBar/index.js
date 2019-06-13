import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: 'inline-block';
  line-height: 1;
`;

const SIZE = 44;

const CircularProgressBar = props => {
  const { size, thickness, value, strokeColor, railColor } = props;
  const rootStyle = {};
  const circleStyle = {};

  rootStyle.transform = 'rotate(-90deg)';
  const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
  circleStyle.strokeDasharray = circumference.toFixed(3);
  circleStyle.strokeDashoffset = `${(
    ((100 - value) / 100) *
    circumference
  ).toFixed(3)}px`;

  return (
    <Container
      style={{ width: size, height: size, ...rootStyle }}
      role="progressbar"
    >
      <svg viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          stroke={strokeColor}
          strokeWidth={thickness}
        />
        <circle
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          stroke={railColor}
          strokeWidth={thickness}
        />
      </svg>
    </Container>
  );
};

CircularProgressBar.propTypes = {
  /** The diameter of circle. */
  size: PropTypes.number,

  /** The thickness of circle. */
  thickness: PropTypes.number,

  /** The value of the progress, value between 0 and 100. */
  value: PropTypes.number,

  /** The background color of circle bar. */
  railColor: PropTypes.string,

  /** The stroke color of progress. */
  strokeColor: PropTypes.string
};

CircularProgressBar.defaultProps = {
  size: 40,
  thickness: 3.6,
  value: 0,
  railColor: '#51B5F4',
  strokeColor: '#F5F5F5'
};

export default CircularProgressBar;
