
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { LineBox } from './LineBox';
import { Button } from './Button';

const StyledButton = styled(Button)`
  background: #fffff;
`;
class App extends Component {
  render() {
    return (
      <LineBox style={{ padding: 20 }}>
        <StyledButton onClick={() => alert('clicked')}>
          Submit
        </StyledButton>
        <StyledButton>
          Submit
        </StyledButton>
      </LineBox>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;