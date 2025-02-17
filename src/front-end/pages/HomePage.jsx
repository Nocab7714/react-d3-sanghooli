import { useState, useEffect } from 'react';
const selectData = ['資料01', '資料02', '資料03', '資料04', '資料05'];

import GiftCategorySectionComponent from '../components/GiftCategorySectionComponent';

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
              <div className="d-block d-lg-none">
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
              <div className="d-none d-lg-block">
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
      <section className="home-product-list py-10 py-md-19">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <GiftCategorySectionComponent />
            </div>
            <div className="col-lg-3">
              <img
                src="src\assets\img\other\ad01.png"
                alt="免費禮物包裝與代寫卡片服務廣告"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
