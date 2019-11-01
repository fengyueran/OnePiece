import { css } from 'styled-components';

const modalEnterCss = css`
  animation: enter 0.3s ease-out;
  @keyframes enter {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const modalFadeCss = css`
  animation: fade 0.3s ease-out;
  @keyframes fade {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50px);
    }
  }
`;

const opacityIncreaseCss = css`
  animation: increase 0.15s linear;
  @keyframes increase {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
`;

const opacityDecreaseCss = css`
  animation: decrease 0.15s linear;
  @keyframes decrease {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 0;
    }
  }
`;

export { modalEnterCss, modalFadeCss, opacityIncreaseCss, opacityDecreaseCss };
