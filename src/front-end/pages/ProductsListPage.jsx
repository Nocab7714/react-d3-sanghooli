import { useState, useEffect, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {clearFilters} from '../../slices/productsSlice';

import Pagination from '../components/Pagination.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import ProductCard from '../components/ProductCard';
import ProductCategoryList from '../components/ProductCategoryList';
import InputSearchDefault from '../components/form/InputSearchDefault';

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

  // 取得 Redux 內的所有商品
  const products = useSelector((state) => state.products.products);

  // 取得 Redux 內的篩選條件
  const filteredProductsData = useSelector(
    (state) => state.products.filteredProductsData
  );

  // 取得最高人氣的禮物區塊 (6 筆商品資料)
  const [mostPopularProducts, setMostPopularProducts] = useState([]);
  useEffect(() => {
    setMostPopularProducts(products?.filter((p) => p.is_hot).slice(0, 6));
  }, [products]);

  // 設定狀態，並初始化為 Redux 內的 `filteredProductsData`
  const [searchValue, setSearchValue] = useState(
    filteredProductsData.searchValue || ''
  );
  const [festival, setFestival] = useState(filteredProductsData.festival || '');
  const [relation, setRelation] = useState(filteredProductsData.relation || '');
  const [category, setCategory] = useState(filteredProductsData.category || '');
  const [priceRange, setPriceRange] = useState(
    filteredProductsData.priceRange || ''
  );
  const [sortOption, setSortOption] = useState(0);

  // 當 Redux 內的 `filteredProductsData` 更新時，更新 state
  useEffect(() => {
    setSearchValue(filteredProductsData.searchValue || '');
    setFestival(filteredProductsData.festival || '');
    setRelation(filteredProductsData.relation || '');
    setCategory(filteredProductsData.category || '');
    setPriceRange(filteredProductsData.priceRange || '');
  }, [filteredProductsData]);

  // 根據篩選條件過濾商品
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleFilterProducts = () => {
    let result = [...products];

    // 定義篩選條件
    const filters = {
      searchValue: (product) =>
        searchValue ? product.title.includes(searchValue) : true,
      festival: (product) =>
        festival ? product.tages?.includes(festival) : true,
      relation: (product) =>
        relation ? product.tages?.includes(relation) : true,
      category: (product) => (category ? product.category === category : true),
      priceRange: (product) => {
        if (!priceRange) return true;
        const price = product.price;
        const priceRanges = {
          '500 元以下': price < 500,
          '500 ~ 1,000 元': price >= 500 && price <= 1000,
          '1,000 ~ 3,000 元': price > 1000 && price <= 3000,
          '3,000 元以上': price > 3000,
        };
        return priceRanges[priceRange] ?? true;
      },
    };

    // 套用篩選條件
    result = result.filter((product) =>
      Object.values(filters).every((filter) => filter(product))
    );

    // 價格排序
    if (sortOption === 'HIGH_TO_LOW') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'LOW_TO_HIGH') {
      result.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(result);
  };

  // 當篩選條件變更時，自動執行篩選
  useEffect(() => {
    handleFilterProducts();
  }, [festival, relation, category, priceRange, sortOption, products]);

  /**
   * 分頁功能設定
   * 這部分負責處理分頁邏輯，包括：
   * 1. 設定每頁顯示的商品數量 (`itemsPerPage`)
   * 2. 計算總頁數 (`total_pages`)
   * 3. 依據當前頁數 (`currentPage`) 來分割 `filteredProducts`，取得當前頁面的商品 (`paginatedProducts`)
   */

  // 每頁顯示的商品數量
  const itemsPerPage = 12;

  // 當前頁碼 (預設為第一頁)
  const [currentPage, setCurrentPage] = useState(1);

  // 計算總頁數，`Math.ceil` 確保有多餘商品時仍能顯示完整的一頁
  const total_pages = Math.ceil(filteredProducts.length / itemsPerPage);

  // 依據 `currentPage` 來計算當前頁面應顯示的商品
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, // 計算當前頁面起始索引
    currentPage * itemsPerPage // 計算當前頁面結束索引
  );

  /**
   * 處理分頁變更
   * 當使用者切換頁碼時：
   * 1. 更新 `currentPage`
   * 2. 讓頁面自動捲動至搜尋結果標題 (`scrollToSearchTitle()`)，
   *    讓使用者可以立即看到新頁面的商品。
   */
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    scrollToSearchTitle();
  };

  /**
   * 商品篩選 - 更新篩選條件
   * 此函式負責處理 `<select>` 選單的變更，根據 `name` 屬性
   * 更新對應的狀態變數 (`setFestival`, `setRelation` 等)。
   *
   * 另外，此函式還會：
   * 1. 重置分頁 (將 `currentPage` 設為 `1`)，確保篩選後從第一頁開始顯示結果。
   * 2. 在桌機版時，自動捲動到搜尋結果標題，讓使用者看到篩選結果。
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target; // 從事件物件中取得 `name` 和 `value`

    // 根據 `name` 屬性更新對應的狀態
    switch (name) {
      case 'festival':
        setFestival(value);
        break;
      case 'relation':
        setRelation(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'priceRange':
        setPriceRange(value);
        break;
      default:
        break;
    }

    // 篩選後自動跳回第一頁，確保使用者從第一頁開始瀏覽篩選結果
    setCurrentPage(1);

    // 如果是桌機版本，則自動捲動到搜尋結果區域
    if (!isMobile) {
      scrollToSearchTitle();
    }
  };

  /**
   * 處理 `input` 內的關鍵字搜尋變更
   * 這個函式負責監聽使用者輸入的關鍵字，並即時更新 `searchValue` 狀態。
   */
  const handleSearchValueChange = (val) => {
    setSearchValue(val);
  };

  /**
   * 執行篩選並跳轉到搜尋結果區域
   * 此函式負責在使用者按下搜尋按鈕或按下 Enter 時觸發搜尋：
   * 1. 呼叫 `handleFilterProducts()` 來過濾符合條件的商品。
   * 2. 將分頁重置為第 1 頁，確保使用者從第一頁開始瀏覽結果。
   * 3. 自動捲動到搜尋結果標題 (`scrollToSearchTitle()`)，讓使用者立即看到結果。
   */
  const onSearch = () => {
    handleFilterProducts();
    setCurrentPage(1);
    scrollToSearchTitle();
  };

  // 當 `searchValue` 變為空白時，自動恢復所有商品
  useEffect(() => {
    if (searchValue === '') {
      handleFilterProducts();
    }
  }, [searchValue]);

  // 滾動到搜尋結果標題
  const searchTitleRef = useRef(null);
  const location = useLocation();

  const scrollToSearchTitle = () => {
    if (searchTitleRef.current) {
      const offsetTop =
        searchTitleRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetAdjustment = 180;
      window.scrollTo({
        top: offsetTop - offsetAdjustment,
        behavior: 'smooth',
      });
    }
  };

  // 確保畫面載入後才滾動
  useEffect(() => {
    if (location.state?.scrollToResults ) {
      setTimeout(() => {
        scrollToSearchTitle();
      }, 300); // 確保畫面載入完成
    }
  }, [location]);

  // 當進入商品列表頁時，根據是否來自首頁篩選功能來決定是否清除篩選條件
  const dispatch = useDispatch();
  useEffect(() => {
    if (!location.state?.scrollToResults) {
      dispatch(clearFilters()); // 清空篩選條件
    }
  }, [location, dispatch]);

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
                          onSearch={onSearch}
                        />
                      </div>

                      <div className="col-6 col-xl-12">
                        <select
                          className={`form-select ${
                            isLarge ? 'form-select-lg' : ''
                          }`}
                          name="festival"
                          value={festival}
                          onChange={handleFilterChange}
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
                          name="relation"
                          value={relation}
                          onChange={handleFilterChange}
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
                          name="category"
                          value={category}
                          onChange={handleFilterChange}
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
                          name="priceRange"
                          value={priceRange}
                          onChange={handleFilterChange}
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
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="">請選擇價格排序</option>
                        <option value="HIGH_TO_LOW">價格最高到最低</option>
                        <option value="LOW_TO_HIGH">價格最低到最高</option>
                      </select>
                    </div>
                  </div>

                  {/* 若無商品，顯示提示文字 */}
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
