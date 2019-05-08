import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const IconWrapper = styled.i`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SVG = styled.svg`
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: ${props => props.fontSize || '24px'};
  transform: ${props => props.deg && `rotate(${props.deg}deg)`};
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  user-select: none;
  flex-shrink: 0;
  fill: currentcolor;
`;

const LeftImg = ({ deg }) => (
  <SVG viewBox="0 0 24 24" deg={deg}>
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
  </SVG>
);
LeftImg.propTypes = {
  deg: PropTypes.number
};

const DoubleLeftImg = ({ deg }) => (
  <SVG viewBox="64 64 896 896" deg={deg} fontSize="12px">
    <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" />
  </SVG>
);
DoubleLeftImg.propTypes = {
  deg: PropTypes.number
};

const paginationActiveItemStyle = css`
  background-color: #337ab7;
  border-color: #337ab7;
  color: #fff;
  cursor: default;
`;

const paginationDisabledItemStyle = css`
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
`;

const PaginationItem = styled.li`
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  border: ${props => (props.isEllipsis ? 'none' : '1px solid #d9d9d9')};
  background-color: #fff;
  outline: 0;
  ${props => props.isActive && paginationActiveItemStyle}
  ${props => props.disabled && paginationDisabledItemStyle}
  :hover {
    background-color: ${props => (props.isEllipsis ? 'none' : '#eee')};
    color: #23527c;
    ${props => props.isActive && paginationActiveItemStyle}
    ${props => props.disabled && paginationDisabledItemStyle}
  }
`;

const Ellipsis = styled.span`
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;
  letter-spacing: 2px;
  text-align: center;
  text-indent: 0.13em;
  transition: all 0.2s;
  cursor: pointer;
  position: absolute;
  height: 32px;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s;
  ::before {
    content: '•••';
  }
`;

const ButtonIconWrapper = styled.i`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  opacity: 0;
`;

const ButtonItem = styled(PaginationItem)`
  position: relative;
  :hover {
    span {
      opacity: 0;
    }
    i {
      opacity: 1;
    }
  }
`;

const withButtonBase = (Icon, rotateDeg, onClick) => {
  const title = rotateDeg ? 'Next 5 Pages' : 'Privous 5 Pages';
  const Item = () => (
    <ButtonItem isEllipsis onClick={onClick} title={title}>
      <ButtonIconWrapper>
        <Icon deg={rotateDeg} />
      </ButtonIconWrapper>
      <Ellipsis />
    </ButtonItem>
  );
  return Item;
};

const withIcon = (Icon, rotateDeg) => {
  const Item = ({ disabled, onClick }) => (
    <PaginationItem disabled={disabled} onClick={onClick}>
      <IconWrapper>
        <Icon deg={rotateDeg} disabled={disabled} />
      </IconWrapper>
    </PaginationItem>
  );
  Item.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };
  return Item;
};

const PrevIcon = withIcon(LeftImg);
const NextIcon = withIcon(LeftImg, 180);

export {
  PaginationItem,
  Ellipsis,
  PrevIcon,
  NextIcon,
  DoubleLeftImg,
  withButtonBase
};
