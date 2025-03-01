import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify-icon/react';

import ProductCard from './ProductCard';
import SwiperProducts from './SwiperProducts';

const ProductCategoryList = ({
  products,
  listTitle = '請設定列表 title 名稱',
  iconMaterial = false,
  iconify = false,
  path = false,
  showIsHot = false,
  autoShowSwiper = false,
}) => {
  // autoShowSwiper 為 true，則會啟用斷點監測，在斷點小於 768px 顯示 SwiperProducts 輪播元件，大於 768px 顯示格線系統渲染的 ProductCard 元件
  const [isShowSwiper, setIsShowSwiper] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsShowSwiper(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* GiftTitle */}
      <div className="d-flex align-items-center justify-content-between mb-8 mb-md-10 ">
        <div className="d-flex align-items-center">
          {iconMaterial ? (
            <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
              {iconMaterial}
            </span>
          ) : (
            ''
          )}
          {iconify ? (
            <>
              <Icon
                icon={iconify}
                width="32"
                height="32"
                style={{ color: '#DD4B4A' }}
                className=" d-none d-md-block me-2"
                strokeWidth={1.8}
              />
              <Icon
                icon={iconify}
                width="24"
                height="24"
                style={{ color: '#DD4B4A' }}
                className=" d-block d-md-none me-1"
              />
            </>
          ) : (
            ''
          )}
          <h2 className="fs-5 fs-md-4 m-0 ">{listTitle}</h2>
        </div>
        <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />
        {path ? (
          <Link
            to={path}
            className="fw-semibold d-flex link-neutral60 fs-6 fs-md-5 align-items-center"
          >
            查看更多
            <span className="ms-1 material-symbols-outlined">
              arrow_forward
            </span>
          </Link>
        ) : (
          ''
        )}
      </div>
      {/* GiftList */}
      {isShowSwiper === true && autoShowSwiper === true ? (
        <SwiperProducts carouselData={products} />
      ) : (
        <ul className="list-unstyled row gy-10">
          {products?.map((product, index) => {
            return (
              <li className="col-6 col-md-4" key={`gift-${index}`}>
                <ProductCard product={product} showIsHot={showIsHot} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ProductCategoryList;
