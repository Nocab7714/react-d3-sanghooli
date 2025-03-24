import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToRef = (shouldScrollOnMount = false) => {
  const ref = useRef(null);
  const location = useLocation();

  const scrollToRef = () => {
    if (!ref.current) return;

    // 確保元素已經在DOM中，並且已經正確渲染
    const executeScroll = () => {
      try {
        // 獲取目標元素的位置
        const offsetTop =
          ref.current.getBoundingClientRect().top + window.scrollY;
        const offsetAdjustment = 180;
        const targetPosition = Math.max(0, offsetTop - offsetAdjustment);

        // 強制滾動到指定位置
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // 雙重確保滾動成功
        setTimeout(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto',
          });
        }, 150);
      } catch (err) {
        console.error('Error during scroll:', err);
      }
    };

    // 使用多個延遲嘗試滾動，確保至少一次成功
    setTimeout(executeScroll, 0); // 立即嘗試
    setTimeout(executeScroll, 50); // 短延遲嘗試
    setTimeout(executeScroll, 200); // 較長延遲嘗試
  };

  // 初始載入時若需要滾動
  useEffect(() => {
    if (shouldScrollOnMount || location.state?.scrollToResults) {
      setTimeout(() => {
        scrollToRef();
      }, 300); // 確保畫面載入完成
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, scrollToRef };
};

export default useScrollToRef;
