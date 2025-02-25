import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

import Pagination from '../components/Pagination.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import ProductCategoryList from '../components/ProductCategoryList';
import ProductCard from '../components/ProductCard';

// import crownIcon from '@/assets/img/illustration/crown.svg';

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



  
  const searchTitleRef = useRef(null);

  //  取得所有商品
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

    // 取得最高人氣的禮物區塊 6 筆商品資料
    const [mostPopularProducts, setMostPopularProducts] = useState([]);
    useEffect(() => {
      setMostPopularProducts(
        products
          ?.filter((product) => {
            return product.is_hot == true;
          })
          .slice(0, 6)
      );
    }, [products]);
  

  // 控制排序方式
  const [sortOption, setSortOption] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]); // 存放排序後的商品

  // 當 `products` 或 `sortOption` 改變時，重新排序
  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortOption === 2) return b.price - a.price; // 最高到最低
      if (sortOption === 3) return a.price - b.price; // 最低到最高
      return 0;
    });
    setSortedProducts(sorted);
  }, [products, sortOption]);

  // 控制分頁
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const total_pages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 排序變更時，重置到第一頁
  const handleSortChange = (e) => {
    setSortOption(Number(e.target.value));
    setCurrentPage(1);
  };

  // 換頁時滾動到標題
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (searchTitleRef.current) {
      searchTitleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
                  <ProductCategoryList
                    products={mostPopularProducts}
                    listTitle="最高人氣的禮物"
                    iconMaterial="local_fire_department"
                    showIsHot={true}
                  />
                </div>

                {/* products-search-result-list */}
                <div className="mb-10 mb-lg-19">
                  {/* Product-title */}
                  <div className="d-flex align-items-center justify-content-between mb-8 mb-md-10 ">
                    <div className="d-flex align-items-center text-nowrap">
                      <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
                        search
                      </span>
                      <h2
                        className="fs-5 fs-md-4 m-0 d-flex flex-column"
                        ref={searchTitleRef}
                        style={{ scrollMarginTop: '210px' }}
                      >
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
                      <select className="form-select" value={sortOption} onChange={handleSortChange}>
                        <option value={0} selected disabled>
                          請選擇價格排序
                        </option>
                        <option value={2}>價格最高到最低</option>
                        <option value={3}>價格最低到最高</option>
                      </select>
                    </div>
                  </div>
                  {/* Product-list */}
                  <ul className="list-unstyled row gy-10">
                    {paginatedProducts?.map((product) => {
                      return (
                        <li className="col-6 col-md-4" key={product.id}>
                          <ProductCard product={product} showIsHot={true} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* pagination */}
                {total_pages > 1 && (
                  <Pagination
                    paginationData={{
                      total_pages,
                      current_page: currentPage,
                      has_pre: currentPage > 1,
                      has_next: currentPage < total_pages,
                    }}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
