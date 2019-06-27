import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Next from '../Icons/Next';
import Prev from '../Icons/Prev';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const IndicatorView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SlideBtnWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  :hover {
    color: #fff;
    cursor: pointer;
  }
`;

const PreBtn = styled(SlideBtnWrapper)`
  left: 0;
`;

const NextBtn = styled(SlideBtnWrapper)`
  right: 0;
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

const previousSlideToRight = css`
  ${itemShow}
  transform: translateX(100%);
  ${transition}
`;

const currentSlideToCenter = css`
  ${displayAndLocateItem}
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
function triggerBrowserReflow(node) {
  // get offsetHeight will trigger reflow whitch make animation work
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}
class Carousel extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      currentClass: itemShow
    };
    this._direction = 'next';
    this._sliding = false;
    this._nextIndex = 0;
  }

  getContainer = ref => {
    this.containerEl = ref;
  };

  moveNextSlide = ({ activeIndex }) => {
    const transitionClass =
      this._direction === 'next' ? itemToRight : itemToleft;
    return {
      activeIndex: this._nextIndex,
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
    const previousClass =
      this._direction === 'next' ? previousSlideToLeft : previousSlideToRight;
    this.setState(
      {
        previousClass,
        currentClass: currentSlideToCenter
      },
      () => {
        const activeEl = this.getActiveItem();
        activeEl.addEventListener('transitionend', this.onTransitonEnd);
      }
    );
  };

  handleSlideToPrev = () => {
    if (!this._sliding) {
      this._sliding = true;
      this._direction = 'prev';
      const { children } = this.props;
      const { activeIndex } = this.state;
      this._nextIndex =
        activeIndex === 0 ? children.length - 1 : activeIndex - 1;
      this.setState(this.moveNextSlide, this.translateXSlide);
    }
  };

  handleSlideToNext = () => {
    if (!this._sliding) {
      this._sliding = true;
      this._direction = 'next';
      const { children } = this.props;
      const { activeIndex } = this.state;
      this._nextIndex =
        activeIndex === children.length - 1 ? 0 : activeIndex + 1;
      this.setState(this.moveNextSlide, this.translateXSlide);
    }
  };

  render() {
    const { children } = this.props;
    const {
      activeIndex,
      previousActiveIndex,
      currentClass,
      previousClass
    } = this.state;

    return (
      <Container ref={this.getContainer}>
        {children.map((child, index) => {
          const isCurrent = activeIndex === index;
          const isPrevious = previousActiveIndex === index;
          return React.cloneElement(<Item key={index}>{child}</Item>, {
            isCurrent,
            isPrevious,
            currentClass,
            previousClass
          });
        })}
        <IndicatorView>
          <PreBtn onClick={this.handleSlideToPrev}>
            <Prev />
          </PreBtn>
          <NextBtn onClick={this.handleSlideToNext}>
            <Next />
          </NextBtn>
        </IndicatorView>
      </Container>
    );
  }
}

export default Carousel;
