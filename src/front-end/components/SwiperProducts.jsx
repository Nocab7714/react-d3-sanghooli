// 外部資源
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ProductCard from './ProductCard';

function SwiperProducts({ carouselData, autoplay = false }) {
  const swiperRef = useRef(null);

  const handlePrevSlide = () => {
    if (swiperRef.current.isBeginning) {
      swiperRef.current.slideTo(swiperRef.current.slides.length - 1);
    } else {
      swiperRef.current.slidePrev();
    }
    // swiperRef.current.slidePrev();
  };

  const handleNextSlide = () => {
    if (swiperRef.current.isEnd) {
      swiperRef.current.slideTo(0);
    } else {
      swiperRef.current.slideNext();
    }
    // swiperRef.current.slideNext();
    // console.log(swiperRef.current.el);
  };

  return (
    <>
      <div
        className="mx-auto position-relative swiper-products"
        style={{ maxWidth: '1500px' }}
      >
        <div className="d-none d-lg-flex">
          <div
            className="position-absolute translate-middle-y top-50 z-2"
            style={{ left: '2%' }}
          >
            <button
              type="button"
              className="btn btn-swiper-products rounded-circle p-2 d-flex"
              onClick={handlePrevSlide}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          </div>
          <div
            className="position-absolute translate-middle-y top-50 z-2"
            style={{ right: '2%' }}
          >
            <button
              type="button"
              className="btn btn-swiper-products rounded-circle p-2 d-flex"
              onClick={handleNextSlide}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
            // pagination={{ clickable: true }}
            autoplay={autoplay}
            slidesPerView={1.2}
            spaceBetween={24}
            initialSlide={0}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              376: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },

              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {carouselData.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard key={item.id} product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default SwiperProducts;
