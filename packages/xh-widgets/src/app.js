
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

class App extends Component {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <Button>
          Submit
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
