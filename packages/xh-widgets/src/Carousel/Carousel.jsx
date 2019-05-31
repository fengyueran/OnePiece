import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.ul`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
`;

const Item = styled.li.attrs(({ isShow, isTranslate }) => ({
  style: {
    display: isShow ? 'block' : 'none',
    transform: isTranslate ? `translateX(-100%)` : 'none'
  }
}))`
  width: 100%;
  flex-shrink: 0;
  transition: transform 6s ease-in-out;
`;
const Img = styled.img`
  width: 100%;
  display: block;
`;

const propTypes = {
  images: PropTypes.array.isRequired
};

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerEl = useRef(null);
  const [lastIndex, setLastIndex] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      const index = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      const children = containerEl.current.children;
      const el = children[activeIndex];
      setLastIndex(activeIndex);
      setActiveIndex(index);
      el.addEventListener(
        'transitionend',
        () => {
          setLastIndex();
        },
        false
      );
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex, images.length]);

  return (
    <Container ref={containerEl}>
      {images.map(({ src }, index) => {
        const isActive = activeIndex === index;
        const isShow = isActive || lastIndex === index;
        const isTranslate = isShow && typeof lastIndex !== 'undefined';
        return (
          <Item
            key={index}
            active={isActive}
            isShow={isShow}
            isTranslate={isTranslate}
          >
            <Img src={src} />
          </Item>
        );
      })}
    </Container>
  );
};

Carousel.propTypes = propTypes;

export default React.memo(Carousel);
