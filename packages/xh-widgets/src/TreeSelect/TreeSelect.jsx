import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TreeNode from './TreeNode';

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const Ul = styled.ul`
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  margin: 0;
  margin-top: -4px;
  padding: 0 4px;
`;

const propTypes = {
  treeData: PropTypes.array,
  onSelect: PropTypes.func
};

const TreeSelect = ({ treeData, onSelect }) => {
  const handleNodeSelected = selected => {
    if (onSelect) {
      onSelect(selected);
    }
  };

  const renderNode = data => {
    return data.map((node, index) => {
      const { key, children, ...res } = node;
      return (
        <TreeNode
          key={key || index}
          subData={children}
          onSelect={handleNodeSelected}
          {...res}
        >
          {children && <Ul>{renderNode(children)}</Ul>}
        </TreeNode>
      );
    });
  };

  return (
    <Container>
      <Ul>{renderNode(treeData)}</Ul>
    </Container>
  );
};

TreeSelect.propTypes = propTypes;

export default TreeSelect;
