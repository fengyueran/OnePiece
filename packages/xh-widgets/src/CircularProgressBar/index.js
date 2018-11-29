import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: 'inline-block',
  lineHeight: 1,
`;

const SIZE = 44;

const CircularProgressBar = (props) => {
  const { 
    size, thickness, value,
  } = props;
  const rootStyle = {};
  const circleStyle = {};

  rootStyle.transform = 'rotate(-90deg)';
  const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
  circleStyle.strokeDasharray = circumference.toFixed(3);
  circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
  

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
          stroke="#F5F5F5"
          strokeWidth={thickness}
        />
        <circle
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          stroke="#51B5F4"
          strokeWidth={thickness}
        />
      </svg>
    </Container>
  );
};

CircularProgressBar.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  value: PropTypes.number,
};

CircularProgressBar.defaultProps = {
  size: 40,
  thickness: 3.6,
  value: 0,
};

export { CircularProgressBar };
export default CircularProgressBar;