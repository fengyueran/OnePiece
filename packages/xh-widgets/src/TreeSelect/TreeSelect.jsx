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
  const renderNode = data => {
    return data.map(node => {
      const { title, key, children } = node;
      return (
        <TreeNode key={key} data-nodeid={key} title={title}>
          {children && <Ul>{renderNode(children)}</Ul>}
        </TreeNode>
      );
    });
  };

  const handleNodeClick = e => {
    const caseId = e.target.getAttribute('nodeid');
    if (onSelect) {
      onSelect();
    }
  };
  return (
    <Container>
      <Ul onClick={handleNodeClick}>{renderNode(treeData)}</Ul>
    </Container>
  );
};

TreeSelect.propTypes = propTypes;

export default TreeSelect;
