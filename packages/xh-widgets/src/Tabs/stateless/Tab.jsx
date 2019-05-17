import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTab = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  margin: 0 12px 0 0;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  color: ${props => (props.selected ? '#37464e' : '#737272')};
  background: ${props => (props.selected ? '#fff' : 'none')};
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired
};

const Tab = ({ selected, index, value }) => {
  return (
    <StyledTab data-index={index} selected={selected}>
      {value}
    </StyledTab>
  );
};

Tab.propTypes = propTypes;

export default Tab;
