import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PaginationItem, PrevIcon, NextIcon } from './Widget';

const BasePagination = styled.ul`
  border-radius: 4px;
  display: inline-block;
  padding: 10px 0;
  margin: 0;
  li {
    display: inline-block;
    margin-right: 8px;
  }
`;

const PaginationPropTypes = {
  totalPages: PropTypes.number.isRequired,
  pageItems: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  jumpPrePage: PropTypes.func.isRequired,
  jumpNextPage: PropTypes.func.isRequired,
  handleJumpPage: PropTypes.func.isRequired
};

const Pagination = props => {
  const {
    totalPages,
    pageItems,
    currentPage,
    jumpPrePage,
    jumpNextPage,
    handleJumpPage
  } = props;
  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const items = pageItems.map((v, index) => {
    const isNotNum = isNaN(v);
    const isActive = v === currentPage;
    return isNotNum ? (
      React.cloneElement(v(), { key: index })
    ) : (
      <PaginationItem
        key={index}
        isEllipsis={isNotNum}
        isActive={isActive}
        onClick={handleJumpPage}
      >
        {v}
      </PaginationItem>
    );
  });
  return (
    <BasePagination>
      <PrevIcon disabled={preDisabled} onClick={jumpPrePage} />
      {items}
      <NextIcon disabled={nextDisabled} onClick={jumpNextPage} />
    </BasePagination>
  );
};

Pagination.propTypes = PaginationPropTypes;

export default Pagination;
