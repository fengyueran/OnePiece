import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
`;

const LContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const VtContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
`;

const FlexContainer = ({ className, style, children }) => (
  <Container 
    style={style}
    className={className}
  >
    {
      children
    }
  </Container>
);

FlexContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const LineContainer = ({ className, style, children }) => (
  <LContainer 
    style={style}
    className={className}
  >
    {
      children
    }
  </LContainer>
);

LineContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const VContainer = ({ className, style, children }) => (
  <VtContainer 
    style={style}
    className={className}
  >
    {
      children
    }
  </VtContainer>
);

VContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export { FlexContainer, VContainer, LineContainer };
