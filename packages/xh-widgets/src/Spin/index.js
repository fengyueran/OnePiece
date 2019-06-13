import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  div:nth-child(1) {
    left: 0;
    top: 0;
    background: #f25022;
  }
  div:nth-child(2) {
    right: 0;
    top: 0;
    background: #7fba02;
    animation-delay: 0.4s;
  }
  div:nth-child(3) {
    left: 0;
    bottom: 0;
    background: #00a4ef;
    animation-delay: 0.8s;
  }
  div:nth-child(4) {
    right: 0;
    bottom: 0;
    background: #ffb902;
    animation-delay: 1.2s;
  }
  animation: Rotate 1.2s linear infinite;
  @keyframes Rotate {
    to {
      transform: rotate(405deg);
    }
  }
`;

const Item = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #457fca;
  border-radius: 100%;
  transform: scale(0.7);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: opacityChange 1s linear alternate infinite;
  @keyframes opacityChange {
    to {
      opacity: 1;
    }
  }
`;

const Spin = () => (
  <Container>
    <SpinWrapper>
      <Item />
      <Item />
      <Item />
      <Item />
    </SpinWrapper>
  </Container>
);

export default Spin;
