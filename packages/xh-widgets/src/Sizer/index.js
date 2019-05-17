import styled from 'styled-components';

const Sizer = styled.div`
  flex-grow: 1;
`;

Sizer.X = styled.div`
  width: ${props => `${props.size}px`};
`;

Sizer.Y = styled.div`
  height: ${props => `${props.size}px`};
`;

export default Sizer;
