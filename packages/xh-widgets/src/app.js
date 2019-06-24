import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Carousel from './Carousel';
import slice1 from './assets/slice1.png';
import slice2 from './assets/slice2.png';
import slice3 from './assets/slice3.png';

const Container = styled.div`
  /* position: absolute;
  transform: translateX(-50%);
  left: 50%;
  margin-top: 200px; */
  width: 300px;
  margin-left: 200px;
`;

const images = [{ src: slice1 }, { src: slice2 }, { src: slice3 }];
class App extends Component {
  render() {
    console.log('app*************');
    return (
      <Container>
        <Carousel images={images} />
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
