import styled from 'styled-components';

const Sizer = styled.div`
  flex-grow: 1;
`;

const SizerX = styled.div`
  width: ${props => `${props.size}px`}
`;

const SizerY = styled.div`
  height: ${props => `${props.size}px`}
`;

export { Sizer, SizerX, SizerY };