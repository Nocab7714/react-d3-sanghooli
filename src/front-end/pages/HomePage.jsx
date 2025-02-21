import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

const selectData = ['資料01', '資料02', '資料03', '資料04', '資料05'];
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import ProductCategoryList from '../components/ProductCategoryList';
import HomeBannerSwiper from '../components/HomeBannerSwiper';
import NewProductsList from '../components/NewProductsList';

import adImg from '@/assets/img/other/ad01.png';

const HomePage = () => {
  // 控制 select 切換 M / Lg Size
  const [isLarge, setIsLarge] = useState(true); // 預設為大尺寸
  useEffect(() => {
    // 設定 Bootstrap 5.3 的 md 斷點 (768px)
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 768); // 小於 768px 移除 lg
    };
    // 初始化時執行一次
    handleResize();
    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // input search
  // 之後要完全元件化
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert('搜尋:' + searchValue);
    }
  };

  const handleClearInput = (e) => {
    e.preventDefault();
    setSearchValue('');
  };

  // 取得所有商品
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // 各分類商品資料，每筆取前 6 個
  const [mostPopularProducts, setMostPopularProducts] = useState([]);
  const [valentineDayProducts, setValentineDayProducts] = useState([]);
  const [christmasProducts, setChristmasProducts] = useState([]);
  const [newProductsList, setNewProductsList] = useState([]);
  useEffect(() => {
    setMostPopularProducts(
      products
        ?.filter((product) => {
          return product.is_hot == true;
        })
        .slice(0, 6)
    );

    setValentineDayProducts(
      products
        ?.filter((product) => product?.tages?.includes('情人節'))
        .slice(0, 6)
    );

    setChristmasProducts(
      products
        ?.filter((product) => product?.tages?.includes('聖誕節'))
        .slice(0, 6)
    );

    setNewProductsList(
      products.slice(-10) // 取最後 10 項
    );
  }, [products]);

  // 取得隨機商品的方法
  const navigate = useNavigate();
  const getRandomProduct = () => {
    // Math.random() * products.length：產生 0 到 products.length - 1 之間的隨機數。
    // Math.floor(...)：確保索引為整數（四捨五入取小）。
    // products?.[...]：確保 products 存在，避免 undefined 錯誤。
    // || null：如果 products 為空陣列或 undefined，則設為 null，避免報錯。
    const randomProduct =
      products?.[Math.floor(Math.random() * products.length)] || null;
    navigate(`single-product/${randomProduct?.id}`);
  };

  return (
    <>
      <ReactHelmetAsync title="首頁" />
      {/* 預留空間 - 之後要改成 swiper 輪播 */}
      {/* banner */}
      <section className="banner">
        <HomeBannerSwiper />
      </section>
      {/* home-search-form */}
      <section className="home-search-form bg-neutral20 py-6 py-md-10">
        <div className="container">
          {/* 之後要修改為 react hook form 的元件 */}
          <form>
            <div className="row gx-4 gx-md-6 mb-4 mb-lg-6 ">
              <div className="col-6 col-md-3 ">
                <select
                  className={`form-select mb-4 mb-md-0 ${
                    isLarge ? 'form-select-lg' : ''
                  }`}
                >
                  <option value="" selected disabled>
                    場合/類別
                  </option>
                  {selectData.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-6 col-md-3">
                <select
                  className={`form-select mb-4 mb-md-0 ${
                    isLarge ? 'form-select-lg' : ''
                  }`}
                >
                  <option value="" selected disabled>
                    送禮關係
                  </option>
                  {selectData.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-6 col-md-3">
                <select
                  className={`form-select ${isLarge ? 'form-select-lg' : ''}`}
                >
                  <option value="" selected disabled>
                    禮物類別
                  </option>
                  {selectData.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-6 col-md-3">
                <select
                  className={`form-select ${isLarge ? 'form-select-lg' : ''}`}
                >
                  <option value="" selected disabled>
                    價格範圍
                  </option>
                  {selectData.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <div className="d-block d-md-none">
                <div className=" input-group search-input-container">
                  {!searchValue && (
                    <span className="input-group-text  bg-white border-0 pe-0">
                      <span className="material-symbols-outlined input-search-icon text-neutral40 fs-6 ">
                        search
                      </span>
                    </span>
                  )}

                  <input
                    type="search"
                    className={`form-control border-0 shadow-none pe-0 ${
                      searchValue ? 'ps-4' : 'ps-3'
                    }`}
                    placeholder="請輸入關鍵字"
                    aria-label="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      handleSearch(e);
                    }}
                  />

                  {searchValue ? (
                    <a
                      className="input-group-text input-clear-icon border-0 bg-white"
                      href="#"
                      onClick={(e) => {
                        handleClearInput(e);
                      }}
                    >
                      <span className="material-symbols-outlined fs-6 text-neutral80 ">
                        cancel
                      </span>
                    </a>
                  ) : (
                    <button className="btn btn-primary " type="button">
                      搜尋
                    </button>
                  )}
                </div>
              </div>
              <div className="d-none d-md-block">
                <div className=" input-group input-group-lg search-input-container mt-5">
                  {!searchValue && (
                    <span className="input-group-text bg-white border-0 pe-0 ps-6">
                      <span className="material-symbols-outlined input-search-icon text-neutral40 fs-6 ">
                        search
                      </span>
                    </span>
                  )}

                  <input
                    type="search"
                    className={`form-control border-0 shadow-none pe-0 ${
                      searchValue ? 'ps-6' : 'ps-3'
                    }`}
                    style={{ height: '58.19px' }}
                    placeholder="請輸入關鍵字"
                    aria-label="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      handleSearch(e);
                    }}
                  />
                  {searchValue ? (
                    <a
                      className="input-group-text input-clear-icon border-0 bg-white"
                      href="#"
                      onClick={(e) => {
                        handleClearInput(e);
                      }}
                    >
                      <span className="material-symbols-outlined fs-6 text-neutral80 ">
                        cancel
                      </span>
                    </a>
                  ) : (
                    <button className="btn btn-primary px-8 fs-5" type="button">
                      搜尋
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* home-product-list */}
      <section className="home-product-list py-10 py-md-19 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 pe-lg-13">
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={mostPopularProducts}
                  listTitle="最高人氣的禮物"
                  iconMaterial="local_fire_department"
                  path="/products-list"
                />
              </div>
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={valentineDayProducts}
                  listTitle="情人節的浪漫驚喜"
                  iconify="streamline:smiley-in-love"
                  path="/products-list"
                />
              </div>
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={christmasProducts}
                  listTitle="聖誕禮物交換趣"
                  iconify="mingcute:christmas-hat-line"
                  path="/products-list"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <img
                src={adImg}
                alt="免費禮物包裝與代寫卡片服務廣告"
                className="img-fluid mb-10 mb-lg-12"
              />
              {/* new-product */}
              <NewProductsList
                products={newProductsList}
                listTitle="新品上市"
                iconMaterial="local_fire_department"
              />
            </div>
          </div>
        </div>
      </section>
      {/* random-product */}
      <section className="random-product mb-10 mb-lg-19">
        <div className="container">
          <div className="random-product-bg rounded-4 pt-6 pt-md-17  pb-0 pb-md-17 px-4 px-md-19 text-center text-md-start">
            <h2 className="text-white fs-4 fs-md-2 mb-6 mb-md-10">
              <span className="d-block mb-4 mb-md-6">禮物選擇困難症？</span>
              <span className="d-block">交給我們隨機挑選一份驚喜！</span>
            </h2>
            {/* 透過方法連結到隨機商品路由 */}
            <button
              onClick={getRandomProduct}
              type="button"
              className="btn btn-primary btn-lg"
            >
              驚喜就在這裡
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
