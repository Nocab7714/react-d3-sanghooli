import { useState, useRef } from 'react';

import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import bannerImg01 from '@/assets/img/banner/banner01.png'
import bannerImg02 from '@/assets/img/banner/banner02.png'
import bannerImg03 from '@/assets/img/banner/banner03.png'

const HomeBannerSwiper = () =>{

  const [bannerData] = useState([
    {
      id: 1,
      image:
      bannerImg01,

      description:
        '在金黃的麥田中，微風輕拂，她的笑容如陽光般溫暖，眼神裡藏著自由的詩篇',
    },
    {
      id: 2,
      image:
      bannerImg02,
      description:
        '披著厚重的毛大衣，她的冷靜目光如冬夜星辰般深邃，隱約透著堅毅的溫柔',
    },
    {
      id: 3,
      image:
      bannerImg03,
      description:
        '粉紅色的夢境中，她靜靜傾聽音樂的旋律，彷彿置身於一場溫暖的靈魂漫遊',
    },
    {
      id: 4,
      image:
      bannerImg01,

      description:
        '在金黃的麥田中，微風輕拂，她的笑容如陽光般溫暖，眼神裡藏著自由的詩篇',
    },
    {
      id: 5,
      image:
      bannerImg02,
      description:
        '披著厚重的毛大衣，她的冷靜目光如冬夜星辰般深邃，隱約透著堅毅的溫柔',
    },
    {
      id: 6,
      image:
      bannerImg03,
      description:
        '粉紅色的夢境中，她靜靜傾聽音樂的旋律，彷彿置身於一場溫暖的靈魂漫遊',
    },
  ]);

  return (<>
     <Swiper
          modules={[ Pagination, Autoplay]}
          // navigation
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          slidesPerView={3}
          spaceBetween={40}
          loop={true}
          // initialSlide={2}
         
        >
          {bannerData.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <img
                  src={item.image}
                  alt={item.description}
                  className="home-banner-swiper-slide-img"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
  </>)
}

export default HomeBannerSwiper