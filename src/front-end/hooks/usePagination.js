import { useState, useEffect } from 'react';

const usePagination = (items, itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 當 items 列表變更時，重設回第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  // 計算總頁數
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // 分頁處理
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 生成分頁控制資料
  const paginationData = {
    total_pages: totalPages,
    current_page: currentPage,
    has_pre: currentPage > 1,
    has_next: currentPage < totalPages,
  };

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    paginationData,
    hasPagination: totalPages > 1,
  };
};

export default usePagination;
