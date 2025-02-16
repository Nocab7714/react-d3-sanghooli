import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../components/Pagination.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';

const breadcrumbItem = [
  {
    page: '首頁',
    link: '/',
  },
  {
    page: '產品列表',
    link: '/products-list',
  },
];

const selectData = ['資料01', '資料02', '資料03', '資料04', '資料05'];

const ProductsListPage = () => {
  const [paginationData, setPaginationData] = useState({
    total_pages: 0, // 總頁數
    current_page: 0, // 當前頁數
    has_pre: false, // 是否有上一頁
    has_next: false, // 是否有下一頁
    // "category": "" // 類別屬性用於前台商品列表篩選使用
  });

  // 模擬 API 請求
  const fetchPageData = (page) => {
    // 這裡應該是 API 請求，例如 fetch(`/api?page=${page}`)
    console.log(`Fetching data for page ${page}`);

    // 假設 API 回應的分頁資訊
    setPaginationData({
      total_pages: 30,
      current_page: page,
      has_pre: page > 1,
      has_next: page < 30,
    });
  };

  useEffect(() => {
    fetchPageData(paginationData.current_page);
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

  // 控制 select 切換 M / Lg Size
  const [isLarge, setIsLarge] = useState(true); // 預設為大尺寸
  useEffect(() => {
    // 設定 Bootstrap 5.3 的 md 斷點 (992px)
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 992); // 小於 768px 移除 lg
    };
    // 初始化時執行一次
    handleResize();
    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <ReactHelmetAsync title="禮物清單" />
      <div className="py-10 py-md-19">
        {/* banner */}
        <div className="container mb-6 mb-md-10">
          <section className="products-list-banner rounded-4 d-flex align-items-md-center justify-content-center justify-content-md-start ">
            <h2 className="text-white fs-4 fs-md-1 ms-md-19 mt-10 mt-md-0">
              禮物清單
            </h2>
          </section>
        </div>

        {/* breadcrumb */}
        <section className="container mb-6 mb-md-10">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
        </section>

        {/* productsList-list */}
        <div className="container ">
          <section className="productsList-list">
            <div className="row ">
              <div className="col-xl-4 pe-lg-10 px-0">
                {/* search-form */}
                <div className="productsList-search-form bg-neutral20 px-3 px-sm-6 px-xl-8 py-6 py-xl-8 sticky-top ">
                  <form>
                    <h3 className="fs-4 mb-6">篩選</h3>
                    <div className="row gy-4 gy-xl-6 gx-4 gx-xl-0">
                      <div className="col-12">
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
                              placeholder="關鍵字"
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
                              <button
                                className="btn btn-primary "
                                type="button"
                              >
                                搜尋
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="d-none d-lg-block">
                          <div className=" input-group input-group-lg search-input-container ">
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
                              placeholder="關鍵字"
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
                              <button
                                className="btn btn-primary px-8 fs-5"
                                type="button"
                              >
                                搜尋
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
                        >
                          <option value="" selected disabled>
                            類別/場合
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
                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
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
                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
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
                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
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
                  </form>
                </div>
              </div>
              <div className="col-xl-8 mt-10 mt-xl-0">
                {/* products-is-hot */}
                <div className="mb-10 mb-lg-19">
                  {/* Product-title */}
                  <div className="d-flex align-items-center justify-content-between mb-8 mb-md-10 ">
                    <div className="d-flex align-items-center">
                      <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
                        crown
                      </span>
                      <h2 className="fs-5 fs-md-4 m-0 ">
                        由 SANGHOOLI 精心挑選！ 禮品買家推薦排名
                      </h2>
                    </div>
                    <div className="flex-grow-1 ms-3 ms-md-4 border-top border-neutral40" />
                  </div>
                  {/* Product-list */}
                  <ul className="list-unstyled row gy-10">
                    {[
                      ...Array(6)
                        .keys()
                        .map((num) => {
                          return (
                            <li className="col-6 col-md-4" key={`gift-${num}`}>
                              <div className="position-relative">
                                <button
                                  type="button"
                                  className="position-absolute btn btn-favorite p-2 "
                                >
                                  <span className="material-symbols-outlined align-middle text-white">
                                    favorite
                                  </span>
                                </button>
                                <Link
                                  to="/single-product/productID"
                                  className="product-card"
                                >
                                  <div className="card border-0 position-relative">
                                    <div className="card-bg"></div>
                                    <div className="position-relative z-3">
                                      <div className="hot-sale position-absolute  translate-middle z-4">
                                        <img
                                          src="/react-d3-sanghooli/img/illustration/crown.svg"
                                          alt="crown svg"
                                          height="48"
                                          width="48"
                                        />
                                      </div>
                                      <img
                                        src="https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190936754.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=To%2BG3QFz%2Foc2Al3qLnIeq4zoYXZFUxmUOxp57T6XTZYJZAb%2FwmcvpivJ0BVD1wCqg%2F9oPIBK4Q%2FQ%2F8sSYADDWXwfggt6MOwYBgOJJn%2FSE3rmJf6fwCBrsoQjzS9O%2BaNXFw4Q6tESMGYF3SSjhGBli%2FqiNy9%2FS%2FSwxJsBG4XyNgFu3%2FmfoIHiDGE7Ig28JWewVO9f3cHdRYOHuMNKKDGqEHQVAwxir%2BtwJdoDsE8dxrIpiiG79gFIj6YFsxKvwWK3D9Cbz7FABkAlBByhf4EjrEdh0Niog4g4ssuA62sngbFTmItN9DDmpP7ILdBOxqFDKa%2FvwNo4k%2B87ONQV%2FmXTRQ%3D%3D"
                                        className="img-fluid rounded-4 mb-4 z-3"
                                        alt=""
                                        height="306"
                                        width="306"
                                      />
                                    </div>
                                    <div className="card-body z-3  p-0">
                                      <span className="fs-7 fw-normal text-neutral60 mb-2">
                                        食品與飲品
                                      </span>
                                      <p className="card-title fw-semibold fs-6 mb-3">
                                        客製化鋼筆
                                      </p>
                                      <p className=" fs-7 text-primary-dark">
                                        NT$
                                        <span className="fs-6 fw-semibold me-4">
                                          2,200
                                        </span>
                                        <span className="text-decoration-line-through text-neutral60">
                                          NT$ 3,800
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </li>
                          );
                        }),
                    ]}
                  </ul>
                </div>

                {/* products-search-result-list */}
                <div className="mb-10 mb-lg-19">
                  {/* Product-title */}
                  <div className="d-flex align-items-center justify-content-between mb-8 mb-md-10 ">
                    <div className="d-flex align-items-center text-nowrap">
                      <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
                        search
                      </span>
                      <h2 className="fs-5 fs-md-4 m-0 d-flex flex-column">
                        目前搜尋結果
                        <span className="fs-7 text-neutral60 fw-normal mt-1 d-md-none d-block">
                          100 個結果
                        </span>
                      </h2>
                    </div>
                    <span className="fs-7 text-neutral60 ms-2 d-md-block d-none">
                      100 個結果
                    </span>

                    <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />
                    <div>
                      <select className="form-select ">
                        <option value="" selected disabled>
                          價格最低到最高
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
                  {/* Product-list */}
                  <ul className="list-unstyled row gy-10">
                    {[
                      ...Array(12)
                        .keys()
                        .map((num) => {
                          return (
                            <li
                              className="col-6 col-md-4"
                              key={`product-${num}`}
                            >
                              <div className="position-relative">
                                <button
                                  type="button"
                                  className="position-absolute btn btn-favorite p-2 "
                                >
                                  <span className="material-symbols-outlined align-middle text-white">
                                    favorite
                                  </span>
                                </button>
                                <Link
                                  to="/single-product/productID"
                                  className="product-card"
                                >
                                  <div className="card border-0 position-relative">
                                    <div className="card-bg"></div>
                                    <div className="position-relative z-3">
                                      <div className="hot-sale position-absolute  translate-middle z-4">
                                        <img
                                          src="/react-d3-sanghooli/img/illustration/crown.svg"
                                          alt="crown svg"
                                          height="48"
                                          width="48"
                                        />
                                      </div>
                                      <img
                                        src="https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190936754.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=To%2BG3QFz%2Foc2Al3qLnIeq4zoYXZFUxmUOxp57T6XTZYJZAb%2FwmcvpivJ0BVD1wCqg%2F9oPIBK4Q%2FQ%2F8sSYADDWXwfggt6MOwYBgOJJn%2FSE3rmJf6fwCBrsoQjzS9O%2BaNXFw4Q6tESMGYF3SSjhGBli%2FqiNy9%2FS%2FSwxJsBG4XyNgFu3%2FmfoIHiDGE7Ig28JWewVO9f3cHdRYOHuMNKKDGqEHQVAwxir%2BtwJdoDsE8dxrIpiiG79gFIj6YFsxKvwWK3D9Cbz7FABkAlBByhf4EjrEdh0Niog4g4ssuA62sngbFTmItN9DDmpP7ILdBOxqFDKa%2FvwNo4k%2B87ONQV%2FmXTRQ%3D%3D"
                                        className="img-fluid rounded-4 mb-4 z-3"
                                        alt=""
                                        height="306"
                                        width="306"
                                      />
                                    </div>
                                    <div className="card-body z-3  p-0">
                                      <span className="fs-7 fw-normal text-neutral60 mb-2">
                                        食品與飲品
                                      </span>
                                      <p className="card-title fw-semibold fs-6 mb-3">
                                        客製化鋼筆
                                      </p>
                                      <p className=" fs-7 text-primary-dark">
                                        NT$
                                        <span className="fs-6 fw-semibold me-4">
                                          2,200
                                        </span>
                                        <span className="text-decoration-line-through text-neutral60">
                                          NT$ 3,800
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </li>
                          );
                        }),
                    ]}
                  </ul>
                </div>
                {/* pagination */}
                <Pagination
                  paginationData={paginationData}
                  onPageChange={fetchPageData}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
