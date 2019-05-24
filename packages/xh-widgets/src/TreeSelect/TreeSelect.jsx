import React, { useState } from 'react';
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
  padding-left: 4px;
  padding-right: 20px;
`;

const propTypes = {
  treeData: PropTypes.array,
  onSelect: PropTypes.func,
  isExpanded: PropTypes.bool,
  nodeKey: PropTypes.string
};

const TreeSelect = ({ nodeKey, treeData = [], onSelect, isExpanded }) => {
  const [treeNodesStatus, setTreeNodesStatus] = useState({});
  const [selectedNodeId, setSelectedNodeId] = useState();
  const handleNodeSelected = selected => {
    treeNodesStatus[selected.id] = selected.isExpanded;
    setTreeNodesStatus({ ...treeNodesStatus });
    setSelectedNodeId(selected.id);
    if (onSelect) {
      onSelect(selected);
    }
  };

  const renderNode = (data, position) => (
    <Ul>
      {data.map((node, index) => {
        const { children, ...res } = node;
        const pos = position ? `${position}-${index}` : `${index}`;
        const id = node[nodeKey] || pos;
        let expanded = treeNodesStatus[id];
        if (typeof expanded === 'undefined') expanded = isExpanded;
        const isSelected = id === selectedNodeId;
        return (
          <TreeNode
            key={id}
            subData={children}
            isExpanded={expanded}
            onSelect={handleNodeSelected}
            id={id}
            isSelected={isSelected}
            {...res}
          >
            {children && renderNode(children, pos)}
          </TreeNode>
        );
      })}
    </Ul>
  );

  return <Container>{renderNode(treeData)}</Container>;
};

TreeSelect.propTypes = propTypes;

export default TreeSelect;
