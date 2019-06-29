import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Next from '../Icons/Next';
import Prev from '../Icons/Prev';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  overflow: hidden;
  position: relative;
  background: #9ac6ca;
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

const DotsWrapper = styled.ul`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  padding: 0;
  list-style: none;
`;

const Dot = styled.li`
  height: 3px;
  width: ${props => (props.isActive ? '25px' : '18px')};
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  background-clip: padding-box;
  margin: 0 5px;
  background-color: ${props =>
    props.isActive ? '#fff' : 'rgba(0, 0, 0, 0.65)'};
  ${props => (props.isActive ? 'opacity: 1;' : 'opacity: 0.3')};
  :hover {
    cursor: pointer;
    ${props => !props.isActive && 'opacity: 0.7'};
  }
  transition: all 0.5s;
`;

const Item = styled.div`
  position: relative;
  display: none;
  width: 100%;
  height: 100%;
  min-height: inherit;
  backface-visibility: hidden;
  align-items: center;
  justify-content: center;

  ${({ isCurrent, currentClass }) => isCurrent && currentClass}
  ${({ isPrevious, previousClass }) => isPrevious && previousClass}
`;

const PreBtn = styled(SlideBtnWrapper)`
  left: 0;
`;

const NextBtn = styled(SlideBtnWrapper)`
  right: 0;
`;

const itemShow = css`
  display: flex;
`;

const transition = css`
  transition: transform 1s ease-in-out, -webkit-transform 1s ease-in-out;
`;

const displayAndLocateItem = css`
  position: absolute;
  top: 0;
  display: flex;
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

function triggerBrowserReflow(node) {
  // get offsetHeight will trigger reflow whitch make animation work
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}
class Carousel extends React.Component {
  static propTypes = {
    /** The interval between automatically cycling an item. */
    interval: PropTypes.number,

    /** The call back func when slide finish. */
    onChange: PropTypes.func,

    /** The items which will slide */
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    interval: 4000
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

  componentDidMount() {
    this.circleSlide();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  circleSlide = () => {
    const { interval } = this.props;
    this._interval = setInterval(this.handleSlideToNext, interval);
  };

  onMoveEnter = () => {
    clearInterval(this._interval);
    this._sliding = false;
  };

  onMouseLeave = () => {
    this.circleSlide();
  };

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
    const { onChange } = this.props;
    const { activeIndex } = this.state;
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
        if (onChange) {
          onChange(activeIndex);
        }
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

  handleSelect = e => {
    const { activeIndex } = this.state;
    const selectedIndex = e.target.getAttribute('data-index');
    if (
      selectedIndex !== null &&
      +selectedIndex !== activeIndex &&
      !this._sliding
    ) {
      this._sliding = true;
      this._direction = +selectedIndex > activeIndex ? 'next' : 'prev';
      this._nextIndex = +selectedIndex;
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
      <Container
        ref={this.getContainer}
        onMouseEnter={this.onMoveEnter}
        onMouseLeave={this.onMouseLeave}
      >
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
          <DotsWrapper onClick={this.handleSelect}>
            {children.map((child, index) => (
              <Dot
                key={index}
                data-index={index}
                isActive={activeIndex === index}
              />
            ))}
          </DotsWrapper>
        </IndicatorView>
      </Container>
    );
  }
}

export default Carousel;
