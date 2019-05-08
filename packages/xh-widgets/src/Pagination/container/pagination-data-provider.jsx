import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withButtonBase, DoubleLeftImg } from '../stateless/Widget';

const withData = WrappedComponent => {
  const PaginationContainer = props => {
    const EXPANDE_THRESHOLD_PAGE = 10;
    const ELLIPSIS_THRESHOLD_PAGE = 5;
    const { total, pageSize, current, onPageChange } = props;
    const totalPages = Math.ceil(total / pageSize) || 0;

    const [currentPage, setCurrentPage] = useState(1);

    if (current && current !== currentPage) {
      setCurrentPage(current);
    }

    const handleJumpPage = e => {
      const valueStr = e.target.innerText;
      if (valueStr) {
        const page = +valueStr;
        setCurrentPage(page);
        if (onPageChange) {
          onPageChange(page - 1);
        }
      }
    };

    const jumpPrePage = () => {
      if (currentPage > 1) {
        const page = currentPage - 1;
        setCurrentPage(page);
        if (onPageChange) {
          onPageChange(page - 1);
        }
      }
    };

    const jumpNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        if (onPageChange) {
          onPageChange(currentPage);
        }
      }
    };

    const jumpPreFivePage = () => {
      let page = currentPage - 5;
      if (page < 1) {
        page = 1;
      }
      setCurrentPage(page);
      if (onPageChange) {
        onPageChange(page - 1);
      }
    };

    const jumpNextFivePage = () => {
      let page = currentPage + 5;
      if (page > totalPages) {
        page = totalPages;
      }
      setCurrentPage(page);
      if (onPageChange) {
        onPageChange(page - 1);
      }
    };

    const PreFiveBtn = withButtonBase(DoubleLeftImg, 0, jumpPreFivePage);
    const NextFiveBtn = withButtonBase(DoubleLeftImg, 180, jumpNextFivePage);

    const calcPageItem = () => {
      let pageItems;
      if (totalPages < EXPANDE_THRESHOLD_PAGE) {
        pageItems = Array(totalPages).fill(0);
        pageItems = pageItems.map((v, index) => index + 1);
      } else {
        pageItems = [1];
        const isShowLeftEllipsis = currentPage >= ELLIPSIS_THRESHOLD_PAGE;
        if (isShowLeftEllipsis) {
          pageItems = [...pageItems, PreFiveBtn, currentPage - 1, currentPage];
        } else {
          pageItems = Array(ELLIPSIS_THRESHOLD_PAGE - 1).fill(0);
          pageItems = pageItems.map((v, index) => index + 1);
        }
        const isShowRightEllipsis =
          totalPages - currentPage >= ELLIPSIS_THRESHOLD_PAGE - 1;
        if (isShowRightEllipsis) {
          if (currentPage >= ELLIPSIS_THRESHOLD_PAGE) {
            pageItems.push(currentPage + 1);
          }
          pageItems.push(NextFiveBtn);
          pageItems.push([totalPages]);
        } else {
          pageItems = Array(ELLIPSIS_THRESHOLD_PAGE - 1).fill(0);
          pageItems = pageItems.map((v, index) => totalPages - index);
          pageItems.reverse();
          pageItems = [1, PreFiveBtn, ...pageItems];
        }
      }
      return pageItems;
    };

    const isShowPagination = total > pageSize;
    const pageItems = calcPageItem();
    return (
      isShowPagination && (
        <WrappedComponent
          totalPages={totalPages}
          pageItems={pageItems}
          currentPage={currentPage}
          jumpPrePage={jumpPrePage}
          jumpNextPage={jumpNextPage}
          handleJumpPage={handleJumpPage}
        />
      )
    );
  };

  PaginationContainer.propTypes = {
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    current: PropTypes.number,
    onPageChange: PropTypes.func.isRequired
  };

  PaginationContainer.defaultProps = {
    pageSize: 10
  };

  return PaginationContainer;
};

export default withData;
