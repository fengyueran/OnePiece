import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TreeSelect } from './TreeSelect';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1'
          },
          {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2'
          }
        ]
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1'
  }
];
class App extends Component {
  render() {
    return (
      <TreeSelect
        treeData={treeData}
        onSelect={selected => console.log(selected)}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
