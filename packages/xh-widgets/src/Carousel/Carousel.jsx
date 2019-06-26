import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  ::after {
    display: block;
    clear: both;
    content: '';
  }
`;

const itemShow = css`
  display: block;
`;

const transition = css`
  transition: transform 1s ease-in-out, -webkit-transform 1s ease-in-out;
`;

const displayAndLocateItem = css`
  position: absolute;
  top: 0;
  display: block;
`;

const itemToleft = css`
  ${displayAndLocateItem}
  transform: translateX(-100%);
`;

const itemToRight = css`
  ${displayAndLocateItem}
  transform: translateX(100%);
`;

const previousSlideToLeft = css`
  ${itemShow}
  transform: translateX(-100%);
  ${transition}
`;

const currentSlideToLeft = css`
  ${itemShow}
  position: absolute;
  top: 0;
  transform: translateX(0);
  ${transition}
`;

const Item = styled.div`
  position: relative;
  display: none;
  width: 100%;
  backface-visibility: hidden;
  ${({ isCurrent, currentClass }) => isCurrent && currentClass}
  ${({ isPrevious, previousClass }) => isPrevious && previousClass}
`;

const Img = styled.img`
  width: 100%;
  display: block;
`;

const propTypes = {
  images: PropTypes.array.isRequired
};

function triggerBrowserReflow(node) {
  // get offsetHeight will trigger reflow whitch make animation work
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}
class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      currentClass: itemShow
    };
    this.direction = 'next';
    this._sliding = false;
  }

  componentDidMount() {}

  getContainer = ref => {
    this.containerEl = ref;
  };

  moveNextSlide = ({ activeIndex }) => {
    const { images } = this.props;
    const index = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    const transitionClass =
      this.direction === 'next' ? itemToRight : itemToleft;
    return {
      activeIndex: index,
      previousActiveIndex: activeIndex,
      previousClass: itemShow,
      currentClass: transitionClass
    };
  };

  getActiveItem = () => {
    const children = this.containerEl.children;
    const el = children[this.state.activeIndex];
    return el;
  };

  enableAnimation = () => {
    const el = this.getActiveItem();
    triggerBrowserReflow(el);
  };

  onTransitonEnd = () => {
    this.setState({
      previousClass: '',
      currentClass: itemShow
    });
    const activeEl = this.getActiveItem();
    activeEl.removeEventListener('transitionend', this.onTransitonEnd);
    this._sliding = false;
  };

  translateXSlide = () => {
    this.enableAnimation();
    this.setState(
      {
        previousClass: previousSlideToLeft,
        currentClass: currentSlideToLeft
      },
      () => {
        const activeEl = this.getActiveItem();
        activeEl.addEventListener('transitionend', this.onTransitonEnd);
      }
    );
  };

  next = () => {
    if (!this._sliding) {
      this._sliding = true;
      this.setState(this.moveNextSlide, this.translateXSlide);
    }
  };

  render() {
    const { images } = this.props;
    const {
      activeIndex,
      previousActiveIndex,
      currentClass,
      previousClass
    } = this.state;

    return (
      <Container ref={this.getContainer} onClick={this.next}>
        {images.map(({ src }, index) => {
          const isCurrent = activeIndex === index;
          const isPrevious = previousActiveIndex === index;
          return React.cloneElement(
            <Item key={index}>
              <Img src={src} />
            </Item>,
            { isCurrent, isPrevious, currentClass, previousClass }
          );
        })}
      </Container>
    );
  }
}

Carousel.propTypes = propTypes;

export default React.memo(Carousel);
