import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { computedStyle } from './utils';

const withData = WrappedComponent => {
  const propTypes = {
    tabs: PropTypes.array.isRequired,
    activeTabIndex: PropTypes.number,
    onTabChange: PropTypes.func
  };

  const Container = ({ tabs = [], onTabChange, activeTabIndex }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tabsWidth, setTabsWidth] = useState({});
    const tabsContainerEl = useRef(null);
    if (
      typeof activeTabIndex !== 'undefined' &&
      activeTabIndex !== selectedIndex
    ) {
      setSelectedIndex(activeTabIndex);
    }
    let bottomBarPos = 0;

    const calcBottomBarPos = () => {
      let position = 0;
      for (let i = 0; i < selectedIndex; i++) {
        const { width, marginRight } = tabsWidth[i];
        position += width + marginRight;
      }
      return position;
    };

    if (selectedIndex) {
      bottomBarPos = calcBottomBarPos();
    }

    const activeTabWidth =
      tabsWidth[selectedIndex] && tabsWidth[selectedIndex].width;

    useEffect(() => {
      const nodesWidth = {};
      if (tabsContainerEl) {
        const tabsContainer = tabsContainerEl.current;
        Array.prototype.some.call(tabsContainer.children, (node, index) => {
          const style = computedStyle(node);
          nodesWidth[index] = style;
        });
      }
      setTabsWidth(nodesWidth);
    }, [tabs]);

    const handleTabClick = e => {
      const tabIndex = e.target.getAttribute('data-index');
      if (tabIndex) {
        setSelectedIndex(+tabIndex);
        if (onTabChange) {
          onTabChange(+tabIndex);
        }
      }
    };

    return (
      <WrappedComponent
        tabs={tabs}
        activeTabWidth={activeTabWidth}
        bottomBarPos={bottomBarPos}
        selectedIndex={selectedIndex}
        onClick={handleTabClick}
        getRef={tabsContainerEl}
      />
    );
  };

  Container.propTypes = propTypes;
  return Container;
};

export default withData;
