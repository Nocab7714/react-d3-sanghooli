import { useEffect, useState, useRef } from 'react';

// 若需要新增跑馬燈訊息請在這裡新增
const messages = [
    '🔥最新公告：網站維護時間為週五晚上 22:00 ~ 00:00，請注意系統更新！ ',
    '全新客製化電子卡片 和 包裝挑選功能，預計2025 ∞ ~ 上線，敬請期待！',
];

const MarqueeTextBacked = ({ headerRef, headerHeight, setHeaderHeight}) => {
  // 控制修正 header 使用 fix top 的高度使用
  const bannerRef = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const bannerHeight = bannerRef.current?.offsetHeight || 0;
      const headerHeight = headerRef.current?.offsetHeight || 0;
      setHeaderHeight(bannerHeight + headerHeight);
    };

    // 初始計算
    updateHeaderHeight();

    // 監聽視窗大小變化，當跑馬燈換行時重新計算
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [headerHeight]);

  // 文字淡入淡出動畫
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // 控制淡入淡出的狀態

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // 先讓文字淡出
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length); // 切換訊息
        // (prev + 1) % messages.length（取模運算）：確保 index 不會超過陣列長度，並且能夠循環回到 0。
        setFade(true);
      }, 500); // 0.5 秒後切換文字
    }, 5000); // 每 5 秒換一次

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div ref={bannerRef}  className="bg-white">
        <div
          className="py-3 border border-light"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 238, 219, 0) 0%, #FFEEDB 50%, rgba(255, 238, 219, 0) 100%)',
          }}
        >
          <p
            className="text-center fs-7 fs-md-6"
            style={{
              opacity: fade ? 1 : 0, // 使用 opacity 做淡入淡出
              transition: 'opacity 0.5s ease-in-out', // 0.5 秒內淡入淡出
            }}
          >
            {messages[index]}
          </p>
        </div>
      </div>
    </>
  );
};

export default MarqueeTextBacked;
