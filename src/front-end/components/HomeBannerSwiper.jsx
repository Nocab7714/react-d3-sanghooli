import { useState } from 'react';

import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import bannerImg01 from '@/assets/img/banner/banner01.webp';
import bannerImg02 from '@/assets/img/banner/banner02.webp';
import bannerImg03 from '@/assets/img/banner/banner03.webp';

const HomeBannerSwiper = () => {
  // 由於需使用 loop 功能，故輪播資料大小需要大於 slidesPerView.length + 1 ( 3 + 1 = 4 筆，loop 功能才會正常運作)
  // wiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters

  // 輪播資料
  const [bannerData] = useState([
    {
      id: 1,
      image: bannerImg01,
      description: '每一件禮物都訴說著動人的故事。',
    },
    {
      id: 2,
      image: bannerImg02,
      description: '這個聖誕節，交換的不僅是禮物，還有滿滿的歡笑與愛。',
    },
    {
      id: 3,
      image: bannerImg03,
      description: '獨特而珍貴，選擇精緻設計，讓禮物成為永恆的回憶。',
    },
    {
      id: 4,
      image: bannerImg01,
      description: '每一件禮物都訴說著動人的故事。',
    },
    {
      id: 5,
      image: bannerImg02,
      description: '這個聖誕節，交換的不僅是禮物，還有滿滿的歡笑與愛。',
    },
    {
      id: 6,
      image: bannerImg03,
      description: '獨特而珍貴，選擇精緻設計，讓禮物成為永恆的回憶。',
    },
  ]);

  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]} // 載入模組
        autoplay={{ delay: 5000 }} // 自動輪播時間（毫秒）
        pagination={{ clickable: true }} // 分頁元件可以透過點擊切換
        centeredSlides={true} // 使輪播內容置中
        slidesPerView={2.5} // 輪播內容的數量 (初始設定)
        spaceBetween={40} // 輪播內容之間的間距 (初始設定)
        loop={true} // 使輪播內容可以循環
        breakpoints={{
          // 根據螢幕寬度調整輪播內容
          0: { slidesPerView: 1, spaceBetween: 0 },
          576: { slidesPerView: 1.2, spaceBetween: 15 },
          1200: { slidesPerView: 1.8, spaceBetween: 30 },
          1450: { slidesPerView: 2.2, spaceBetween: 30 },
        }}
        className="home-banner-swiper"
      >
        {bannerData.map((item) => {
          return (
            <SwiperSlide key={`home-banner-swiper-${item.id}`}>
              <img
                src={item.image}
                alt={item.description}
                height={480}
                width={856}
                className="home-banner-swiper-slide-img"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default HomeBannerSwiper;
