
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button } from './Button';

const StyledButton = styled(Button)`
  background: #536DFE;
`;
class App extends Component {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <StyledButton onClick={() => alert('clicked')}>
          Submit
        </StyledButton>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
