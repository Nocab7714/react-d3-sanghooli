import { useState, useEffect } from 'react';
import PaginationComponent from './PaginationComponent';

const PaginationParentExampleComponent = () => {
  // 資料驅動範例
  // 1. 請從外層傳入 PaginationData 資料
  // 2. 資料請使用 API Get 到的回傳的資料做驅動
  // 3. 後台系統也可以使用
  const [paginationData, setPaginationData] = useState({
    total_pages: 0, // 總頁數
    current_page: 0, // 當前頁數
    has_pre: false, // 是否有上一頁
    has_next: false, // 是否有下一頁
    // "category": "" // 類別屬性用於前台商品列表篩選使用
  });

  // 模擬 API 請求
  const fetchPageData = (page) => {
    // 這裡應該是 API 請求，例如 fetch(`/api?page=${page}`)
    console.log(`Fetching data for page ${page}`);

    // 假設 API 回應的分頁資訊
    setPaginationData({
      total_pages: 30,
      current_page: page,
      has_pre: page > 1,
      has_next: page < 30,
    });
  };

  useEffect(() => {
    fetchPageData(paginationData.current_page);
  }, []);

  return (
    <>
      <PaginationComponent
        paginationData={paginationData}
        onPageChange={fetchPageData}
      />
      {/* <p className="mt-3">目前頁碼：{paginationData.current_page}</p> */}
    </>
  );
};

export default PaginationParentExampleComponent;
