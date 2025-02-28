import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Pagination from '../components/Pagination.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import ProductCard from '../components/ProductCard';
import ProductCategoryList from '../components/ProductCategoryList';
import InputSearchDefault from '../components/form/InputSearchDefault';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

const breadcrumbItem = [
  { page: '首頁', link: '/' },
  { page: '產品列表', link: '/products-list' },
];

// 篩選條件選單的選項
const festivalOptions = [
  '畢業季',
  '生日',
  '婚禮',
  '喬遷',
  '情人節',
  '母親節',
  '父親節',
  '兒童滿月',
  '春節',
  '兒童節',
  '中秋節',
  '聖誕節',
];
const relationOptions = [
  '父母',
  '父親',
  '母親',
  '祖父母',
  '子女',
  '男性朋友',
  '女性朋友',
  '男性情人',
  '女性情人',
  '丈夫',
  '妻子',
  '師長',
  '同事',
  '商業夥伴',
];
const categoryOptions = [
  '食品與飲品',
  '電子與實用',
  '花卉與植物',
  '美妝與保養',
  '服飾與配件',
  '文具與書籍',
  '居家與生活',
  '嬰幼兒與兒童',
];
const priceRangeOptions = [
  '500 元以下',
  '500 ~ 1,000 元',
  '1,000 ~ 3,000 元',
  '3,000 元以上',
];

const ProductsListPage = () => {
  // 商品搜尋關鍵字
  const [searchValue, setSearchValue] = useState('');

  // 控制 select 與 inputSearch 的斷點
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 判斷是否為行動裝置
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 小工具：捲動到搜尋結果標題
  const scrollToSearchTitle = () => {
    if (searchTitleRef.current) {
      searchTitleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const searchTitleRef = useRef(null);

  // 取得所有商品
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // 取得最高人氣的禮物區塊 (6 筆)
  const [mostPopularProducts, setMostPopularProducts] = useState([]);
  useEffect(() => {
    setMostPopularProducts(products?.filter((p) => p.is_hot).slice(0, 6));
  }, [products]);

  // 篩選條件
  const [festival, setFestival] = useState('');
  const [relation, setRelation] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortOption, setSortOption] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false); // 控制關鍵字搜尋

  // 分頁
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const total_pages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 商品篩選
  useEffect(() => {
    let result = [...products];

    // 關鍵字搜尋
    if (searchValue && triggerSearch) {
      result = result.filter((product) => product.title.includes(searchValue));
    }

    // 節慶 / 場合
    if (festival) {
      result = result.filter((product) => product.tages?.includes(festival));
    }
    // 送禮關係
    if (relation) {
      result = result.filter((product) => product.tages?.includes(relation));
    }
    // 禮物類別
    if (category) {
      result = result.filter((product) => product.category === category);
    }
    // 價格範圍
    if (priceRange) {
      result = result.filter((product) => {
        const price = product.price;
        switch (priceRange) {
          case '500 元以下':
            return price < 500;
          case '500 ~ 1,000 元':
            return price >= 500 && price <= 1000;
          case '1,000 ~ 3,000 元':
            return price > 1000 && price <= 3000;
          case '3,000 元以上':
            return price > 3000;
          default:
            return true;
        }
      });
    }

    // 價格排序
    if (sortOption === 1) {
      // 最高到最低
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 2) {
      // 最低到最高
      result.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(result);
  }, [
    searchValue,
    triggerSearch,
    festival,
    relation,
    category,
    priceRange,
    sortOption,
    products,
  ]);

  // 當關鍵字清空時，自動執行一次篩選
  useEffect(() => {
    if (searchValue === '') {
      setTriggerSearch((prev) => !prev);
    }
  }, [searchValue]);

  // 分頁行為：切換頁碼時，捲動到搜尋結果標題
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToSearchTitle();
  };

// 3️⃣ `select` 變更時，行動版不滑動，桌機才會滑動
const handleFestivalChange = (e) => {
  setFestival(e.target.value);
  setCurrentPage(1);
  if (!isMobile) scrollToSearchTitle(); // 只有桌機才會滑動
};

const handleRelationChange = (e) => {
  setRelation(e.target.value);
  setCurrentPage(1);
  if (!isMobile) scrollToSearchTitle();
};

const handleCategoryChange = (e) => {
  setCategory(e.target.value);
  setCurrentPage(1);
  if (!isMobile) scrollToSearchTitle();
};

const handlePriceRangeChange = (e) => {
  setPriceRange(e.target.value);
  setCurrentPage(1);
  if (!isMobile) scrollToSearchTitle();
};

// 4️⃣ `input` 關鍵字搜尋時，桌機 & 行動版都會滑動
const handleSearchValueChange = (val) => {
  setSearchValue(val);
  if (val === '') {
    setTriggerSearch(false);
  } else {
    setTriggerSearch(true);
  }
  setCurrentPage(1);
  scrollToSearchTitle(); // 桌機 & 行動版都會滑動
};

  return (
    <>
      <ReactHelmetAsync title="禮物清單" />

      <div className="py-10 py-md-19">
        <div className="container mb-6 mb-md-10">
          <section className="products-list-banner rounded-4 d-flex align-items-md-center justify-content-center justify-content-md-start">
            <h2 className="text-white fs-4 fs-md-1 ms-md-19 mt-10 mt-md-0">
              禮物清單
            </h2>
          </section>
        </div>

        <section className="container mb-6 mb-md-10">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
        </section>

        <div className="container">
          <section className="productsList-list">
            <div className="row">
              <div className="col-xl-4 pe-lg-10 px-0">
                <div className="productsList-search-form bg-neutral20 px-3 px-sm-6 px-xl-8 py-6 py-xl-8 sticky-top">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <h3 className="fs-4 mb-6">篩選</h3>
                    <div className="row gy-4 gy-xl-6 gx-4 gx-xl-0">
                      <div className="col-12">
                        <InputSearchDefault
                          size={isLarge ? 'lg' : 'standard'}
                          value={searchValue}
                          onChange={handleSearchValueChange}
                        />
                      </div>

                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
                          value={festival}
                          onChange={handleFestivalChange}
                        >
                          <option value="">節慶 / 場合</option>
                          {festivalOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
                          value={relation}
                          onChange={handleRelationChange}
                        >
                          <option value="">送禮關係</option>
                          {relationOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
                          value={category}
                          onChange={handleCategoryChange}
                        >
                          <option value="">禮物類別</option>
                          {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
                          value={priceRange}
                          onChange={handlePriceRangeChange}
                        >
                          <option value="">價格範圍</option>
                          {priceRangeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-xl-8 mt-10 mt-xl-0">
                {/* 最高人氣的禮物 */}
                <div className="mb-10 mb-lg-19">
                  <ProductCategoryList
                    products={mostPopularProducts}
                    listTitle="最高人氣的禮物"
                    iconMaterial="local_fire_department"
                    showIsHot={true}
                  />
                </div>

                <div className="mb-10 mb-lg-19">
                  <div className="d-flex align-items-center justify-content-between mb-8 mb-md-10">
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
                          {filteredProducts.length} 個結果
                        </span>
                      </h2>
                    </div>
                    <span className="fs-7 text-neutral60 ms-2 d-md-block d-none">
                      {filteredProducts.length} 個結果
                    </span>

                    <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />
                    <div>
                      <select
                        className="form-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(Number(e.target.value))}
                      >
                        <option value={0}>請選擇價格排序</option>
                        <option value={1}>價格最高到最低</option>
                        <option value={2}>價格最低到最高</option>
                      </select>
                    </div>
                  </div>

                  {/* ★ 若無商品，顯示提示文字 */}
                  <ul className="list-unstyled row gy-10">
                    {paginatedProducts.length > 0 ? (
                      paginatedProducts.map((product) => (
                        <li className="col-6 col-md-4" key={product.id}>
                          <ProductCard product={product} showIsHot={true} />
                        </li>
                      ))
                    ) : (
                      <div className="col-12 text-center py-6">
                        <p className="text-muted fs-5">沒有找到對應的商品</p>
                      </div>
                    )}
                  </ul>
                </div>

                {/* 分頁 */}
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
