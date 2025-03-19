import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Redux actions
import { clearFilters } from '../../slices/productsSlice';

// Custom hooks
import useResponsive from '../hooks/useResponsive';
import useProductFilter from '../hooks/useProductFilter';
import usePagination from '../hooks/usePagination';
import useScrollToRef from '../hooks/useScrollToRef';

// Components
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import Breadcrumb from '../components/Breadcrumb';
import Pagination from '../components/Pagination';
import FilterForm from '../components/FilterForm';
import SearchResultHeader from '../components/SearchResultHeader';
import ProductsList from '../components/ProductsList';
import ProductCategoryList from '../components/ProductCategoryList';

// Constants
const breadcrumbItem = [
  { page: '首頁', link: '/' },
  { page: '產品列表', link: '/products-list' },
];

const ProductsListPage = () => {
  // 獲取響應式狀態
  const { isLarge, isMobile } = useResponsive();
  
  // 獲取 Redux 數據
  const products = useSelector((state) => state.products.products);
  const filteredProductsData = useSelector((state) => state.products.filteredProductsData);
  
  // 獲取熱門產品
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    if (products?.length) {
      setPopularProducts(products.filter((p) => p.is_hot).slice(0, 6));
    }
  }, [products]);
  
  // 使用滾動 hook
  const { ref: searchTitleRef, scrollToRef: scrollToSearchTitle } = useScrollToRef();
  
  // 使用產品篩選 hook
  const { filters, actions, filteredProducts } = useProductFilter(
    products,
    filteredProductsData
  );
  
  // 使用分頁 hook
  const { 
    currentPage, 
    setCurrentPage, 
    paginatedItems, 
    paginationData, 
    hasPagination 
  } = usePagination(filteredProducts);
  
  // 處理分頁切換
  const handlePageChange = (newPage) => {
    // 先設定新的頁碼
    setCurrentPage(newPage);
    
    // 確保在頁面內容更新後再滾動
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToSearchTitle();
      }, 100);
    });
  };
  
  // 整合篩選與滾動
  const handleFilterWithScroll = (e) => {
    actions.handleFilterChange(e);
    
    if (!isMobile) {
      scrollToSearchTitle();
    }
  };
  
  const handleSearchWithScroll = () => {
    actions.handleSearch(); // 觸發搜尋
    scrollToSearchTitle(); // 滾動到搜尋結果
  };
  
  // 清空篩選條件
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!location.state?.scrollToResults) {
      dispatch(clearFilters());
    }
  }, [location, dispatch]);
  
  return (
    <>
      <ReactHelmetAsync title="禮物清單" />
      <div className="py-10 py-md-19">
        {/* 橫幅區域 */}
        <div className="container mb-6 mb-md-10">
          <section className="products-list-banner rounded-4 d-flex align-items-md-center justify-content-center justify-content-md-start">
            <h2 className="text-white fs-4 fs-md-1 ms-md-19 mt-10 mt-md-0">
              禮物清單
            </h2>
          </section>
        </div>
        
        {/* 麵包屑導航 */}
        <section className="container mb-6 mb-md-10">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
        </section>
        
        <div className="container">
          <section className="productsList-list">
            <div className="row">
              {/* 篩選表單 */}
              <div className="col-xl-4 pe-lg-10 px-0">
                <FilterForm
                  filters={filters}
                  actions={{
                    ...actions,
                    handleFilterChange: handleFilterWithScroll,
                    handleSearch: handleSearchWithScroll
                  }}
                  isLarge={isLarge}
                />
              </div>
              
              {/* 產品列表區域 */}
              <div className="col-xl-8 mt-10 mt-xl-0">
                {/* 熱門產品 */}
                <div className="mb-10 mb-lg-19">
                  <ProductCategoryList
                    products={popularProducts}
                    listTitle="最高人氣的禮物"
                    iconMaterial="local_fire_department"
                    showIsHot={true}
                  />
                </div>
                
                {/* 搜索結果 */}
                <div className="mb-10 mb-lg-19">
                  <SearchResultHeader
                    ref={searchTitleRef}
                    resultsCount={filteredProducts.length}
                    sortOption={filters.sortOption}
                    onSortChange={actions.handleSortChange}
                  />
                  
                  <ProductsList
                    products={paginatedItems}
                    showIsHot={true}
                  />
                </div>
                
                {/* 分頁控制 */}
                {hasPagination && (
                  <Pagination
                    paginationData={paginationData}
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