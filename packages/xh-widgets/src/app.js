import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Modal from './Modal';

const Container = styled.div`
  /* position: absolute;
  transform: translateX(-50%);
  left: 50%;
  margin-top: 200px; */
  width: 300px;
  height: 500px;
  background: blue;
  margin-left: 200px;
`;

class App extends Component {
  render() {
    console.log('app*************');
    return (
      <Container
        onClick={() => {
          Modal.confirm();
        }}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
