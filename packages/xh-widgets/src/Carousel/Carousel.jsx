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

const itemToleft = css`
  transform: translateX(-100%);
`;

const itemToRight = css`
  transform: translateX(100%);
`;

const activeItemCss = css`
  display: block;
`;
const itemShowCss = css`
  display: block;
`;

const Item = styled.div.attrs(({ isShow }) => ({
  style: {
    // display: isShow ? 'block' : 'none'
    // transform: isTranslate ? `translateX(-100%)` : 'none'
  }
}))`
  position: relative;
  display: none;
  float: left;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
  transition: transform 6s ease-in-out, -webkit-transform 6s ease-in-out;
  ${({ classes }) => classes && `${classes.join(' ')}`}
`;

const Img = styled.img`
  width: 100%;
  display: block;
`;

const propTypes = {
  images: PropTypes.array.isRequired
};
function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}
class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      activeClass: [itemShowCss],
      previousClass: [itemShowCss]
    };
  }

  componentDidMount() {
    const { images } = this.props;
    this.timer = setTimeout(() => {
      this.setState(
        ({ activeIndex }) => {
          const index = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
          return { activeIndex: index, previousActiveIndex: activeIndex };
        },
        () => {
          const children = this.containerEl.children;
          const el = children[this.state.activeIndex];
          // console.log(el.offsetHeight);
          triggerBrowserReflow(el);
          triggerBrowserReflow(children[1]);
          this.setState(
            {
              previousClass: [activeItemCss, itemToleft],
              activeClass: [itemShowCss]
            },
            () => {
              console.log('111111111111', el);
              el.addEventListener(
                'transitionend',
                () => {
                  this.setState({
                    previousActiveIndex: undefined,
                    previousClass: undefined,
                    activeClass: [itemShowCss]
                  });
                  console.log('222222222222');
                },
                false
              );
            }
          );
        }
      );
    }, 1000);
  }

  getContainer = ref => {
    this.containerEl = ref;
  };

  render() {
    const { images } = this.props;
    const {
      activeIndex,
      previousActiveIndex,
      activeClass,
      previousClass
    } = this.state;
    console.log('activeIndex', activeIndex);
    console.log('lastIndex', previousActiveIndex);
    return (
      <Container ref={this.getContainer}>
        {images.map(({ src }, index) => {
          const isActiveItem = activeIndex === index;
          const isPreviousItem = previousActiveIndex === index;
          let classes;
          if (isActiveItem) classes = activeClass;
          if (isPreviousItem) classes = previousClass;

          return (
            <Item key={index} classes={classes}>
              <Img src={src} />
            </Item>
          );
        })}
      </Container>
    );
  }
}

Carousel.propTypes = propTypes;

export default React.memo(Carousel);
