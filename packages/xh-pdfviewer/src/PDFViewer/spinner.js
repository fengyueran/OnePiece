import styled from 'styled-components';

const Spinner = styled.div`
  border-radius: 50%;
  position: relative;
  top: 20px;
  left: 20px;
  font-size: 8px;
  width: 1em;
  height: 1em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  @keyframes load5 {
    0%,
    100% {
      box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2), 2.5em 0em 0 0em rgba(10, 131, 249, 0.2), 1.75em 1.75em 0 0em rgba(10, 131, 249, 0.2), 0em 2.5em 0 0em rgba(10, 131, 249, 0.2), -1.8em 1.8em 0 0em rgba(10, 131, 249, 0.2), -2.6em 0em 0 0em rgba(10, 131, 249, 0.5), -1.8em -1.8em 0 0em rgba(10, 131, 249, 0.7);
    }
    12.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(10, 131, 249, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(10, 131, 249, 0.2), 1.75em 1.75em 0 0em rgba(10, 131, 249, 0.2), 0em 2.5em 0 0em rgba(10, 131, 249, 0.2), -1.8em 1.8em 0 0em rgba(10, 131, 249, 0.2), -2.6em 0em 0 0em rgba(10, 131, 249, 0.2), -1.8em -1.8em 0 0em rgba(10, 131, 249, 0.5);
    }
    25% {
      box-shadow: 0em -2.6em 0em 0em rgba(10, 131, 249, 0.5), 1.8em -1.8em 0 0em rgba(10, 131, 249, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(10, 131, 249, 0.2), 0em 2.5em 0 0em rgba(10, 131, 249, 0.2), -1.8em 1.8em 0 0em rgba(10, 131, 249, 0.2), -2.6em 0em 0 0em rgba(10, 131, 249, 0.2), -1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2);
    }
    37.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(10, 131, 249, 0.2), 1.8em -1.8em 0 0em rgba(10, 131, 249, 0.5), 2.5em 0em 0 0em rgba(10, 131, 249, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(10, 131, 249, 0.2), -1.8em 1.8em 0 0em rgba(10, 131, 249, 0.2), -2.6em 0em 0 0em rgba(10, 131, 249, 0.2), -1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2);
    }
    50% {
      box-shadow: 0em -2.6em 0em 0em rgba(10, 131, 249, 0.2), 1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2), 2.5em 0em 0 0em rgba(10, 131, 249, 0.5), 1.75em 1.75em 0 0em rgba(10, 131, 249, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(10, 131, 249, 0.2), -2.6em 0em 0 0em rgba(10, 131, 249, 0.2), -1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2);
    }
    62.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(10, 131, 249, 0.2), 1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2), 2.5em 0em 0 0em rgba(10, 131, 249, 0.2), 1.75em 1.75em 0 0em rgba(10, 131, 249, 0.5), 0em 2.5em 0 0em rgba(10, 131, 249, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(10, 131, 249, 0.2), -1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2);
    }
    75% {
      box-shadow: 0em -2.6em 0em 0em rgba(10, 131, 249, 0.2), 1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2), 2.5em 0em 0 0em rgba(10, 131, 249, 0.2), 1.75em 1.75em 0 0em rgba(10, 131, 249, 0.2), 0em 2.5em 0 0em rgba(10, 131, 249, 0.5), -1.8em 1.8em 0 0em rgba(10, 131, 249, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2);
    }
    87.5% {
      box-shadow: 0em -2.6em 0em 0em rgba(10, 131, 249, 0.2), 1.8em -1.8em 0 0em rgba(10, 131, 249, 0.2), 2.5em 0em 0 0em rgba(10, 131, 249, 0.2), 1.75em 1.75em 0 0em rgba(10, 131, 249, 0.2), 0em 2.5em 0 0em rgba(10, 131, 249, 0.2), -1.8em 1.8em 0 0em rgba(10, 131, 249, 0.5), -2.6em 0em 0 0em rgba(10, 131, 249, 0.7), -1.8em -1.8em 0 0em #ffffff;
    }
  }  
`;

export default Spinner;