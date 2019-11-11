import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from '../../Row';
import Col from '../../Col';
import Tab from './Tab';

const Container = styled(Col)`
  position: relative;
  height: 100%;
`;

const TabBottomBar = styled.div`
  display: block;
  transform: ${props => `translate3d(${props.translateX}px, 0, 0)`};
  width: ${props => `${props.tabWidth || 0}px`};
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  height: 2px;
  background-color: #457fca;
  transform-origin: 0 0;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const propTypes = {
  activeTabWidth: PropTypes.number,
  bottomBarPos: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  getRef: PropTypes.object,
  tabs: PropTypes.array.isRequired
};

const Tabs = props => {
  const {
    tabs = [],
    activeTabWidth,
    bottomBarPos,
    selectedIndex,
    onClick,
    getRef
  } = props;

  return (
    <Container>
      <Row ref={getRef} onClick={onClick}>
        {tabs.map((v, index) => (
          <Tab
            key={v}
            index={index}
            value={v}
            selected={index === selectedIndex}
          />
        ))}
      </Row>
      <TabBottomBar tabWidth={activeTabWidth} translateX={bottomBarPos} />
    </Container>
  );
};

Tabs.propTypes = propTypes;

export default Tabs;
