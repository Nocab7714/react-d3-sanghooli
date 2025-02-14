import { useState, useEffect } from 'react';
const selectData = ['資料01', '資料02', '資料03', '資料04', '資料05'];
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import { Link } from 'react-router-dom';

import GiftCategorySection from '../components/GiftCategorySection';

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

  return (
    <>
      <ReactHelmetAsync title="首頁" />
      {/* 預留空間 - 之後要改成 swiper 輪播 */}
      {/* banner */}
      <section className="banner">
        <div className="container">
          <div className="d-flex justify-content-center">
            <img
              src="src\assets\img\banner\banner01.png"
              alt=""
              height="480"
              className="img-fluid"
              style={{ maxHeight: '480px' }}
            />
          </div>
        </div>
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
          <div className="row ">
            <div className="col-lg-9 pe-lg-13">
              <div className="mb-10 mb-lg-19">
                <GiftCategorySection />
              </div>
              <div className="mb-10 mb-lg-19">
                <GiftCategorySection />
              </div>
            </div>

            <div className="col-lg-3">
              <img
                src="src\assets\img\other\ad01.png"
                alt="免費禮物包裝與代寫卡片服務廣告"
                className="img-fluid mb-10 mb-lg-12"
              />

              {/* new-product */}
              <div>
                <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-6">
                  <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
                      local_fire_department
                    </span>
                    <h2 className="fs-5 fs-md-4 m-0 ">新品上市</h2>
                  </div>
                  <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />
                </div>
                {/* 最後一個品項沒有 border-bottom */}
                <ul className="list-unstyled">
                  {[
                    ...Array(10)
                      .keys()
                      .map((num) => {
                        return (
                          <li className="new-product-item ">
                            <Link to="/single-product/productID">
                              <div className="new-product-item-bg"></div>
                              <div className="d-flex align-items-center  border-bottom border-neutral40 py-4 z-3">
                                <img
                                  src="https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190936754.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=To%2BG3QFz%2Foc2Al3qLnIeq4zoYXZFUxmUOxp57T6XTZYJZAb%2FwmcvpivJ0BVD1wCqg%2F9oPIBK4Q%2FQ%2F8sSYADDWXwfggt6MOwYBgOJJn%2FSE3rmJf6fwCBrsoQjzS9O%2BaNXFw4Q6tESMGYF3SSjhGBli%2FqiNy9%2FS%2FSwxJsBG4XyNgFu3%2FmfoIHiDGE7Ig28JWewVO9f3cHdRYOHuMNKKDGqEHQVAwxir%2BtwJdoDsE8dxrIpiiG79gFIj6YFsxKvwWK3D9Cbz7FABkAlBByhf4EjrEdh0Niog4g4ssuA62sngbFTmItN9DDmpP7ILdBOxqFDKa%2FvwNo4k%2B87ONQV%2FmXTRQ%3D%3D"
                                  alt=""
                                  className="rounded-4 me-4 z-3"
                                  width="80"
                                  height="80"
                                />
                                <div className="d-flex flex-column z-3">
                                  <p className="fs-7 text-primary-dark mb-1">
                                    食品與飲品
                                  </p>
                                  <p className="fs-6 fw-semibold text-neutral80">
                                    龍井茶禮盒
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      }),
                  ]}
                </ul>
              </div>
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
            <Link
              to="/single-product/RandomProductID"
              className="btn btn-primary btn-lg"
            >
              驚喜就在這裡
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
