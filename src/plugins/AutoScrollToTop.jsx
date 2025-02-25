// AutoScrollToTop 元件加入於 Layout 的頁面元件內，會設定為「跳轉頁面時自動滾到頁面最上方」

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AutoScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default AutoScrollToTop;
