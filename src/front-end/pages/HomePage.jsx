import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredProductsData } from '../../slices/ProductsSlice.js';

import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import ProductCategoryList from '../components/ProductCategoryList';
import HomeBannerSwiper from '../components/HomeBannerSwiper';
import NewProductsList from '../components/NewProductsList';
import InputSearchDefault from '../components/form/InputSearchDefault';

import adImg from '@/assets/img/other/ad01.png';

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

const HomePage = () => {

  // 控制 select 與 inputSearch 的斷點
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 992);
  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 透過 useSelector 取得 Redux state 存放的所有產品資料
  const products = useSelector((state) => state.products.products);
  const [searchFormData, setSearchFormData] = useState({
    searchValue: '',
    festival: '',
    relation: '',
    category: '',
    priceRange: '',
  });

  const dispatch = useDispatch();

  const handleSearchValueChange = (val) => {
    setSearchFormData((prev) => ({ ...prev, searchValue: val }));
  };
  const handleFestivalChange = (e) => {
    setSearchFormData((prev) => ({ ...prev, festival: e.target.value }));
  };
  const handleRelationChange = (e) => {
    setSearchFormData((prev) => ({ ...prev, relation: e.target.value }));
  };
  const handleCategoryChange = (e) => {
    setSearchFormData((prev) => ({ ...prev, category: e.target.value }));
  };
  const handlePriceRangeChange = (e) => {
    setSearchFormData((prev) => ({ ...prev, priceRange: e.target.value }));
  };

  // 按下搜尋按鈕或 Enter 時，才更新 Redux 並轉址
  const handleSearch = () => {
    dispatch(setFilteredProductsData(searchFormData));
    console.log('已存入 Redux 的篩選條件:', searchFormData);
    navigate('/products-list');
  };

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
                  value={searchFormData.festival}
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
              <div className="col-6 col-md-3">
                <select
                  className={`form-select mb-4 mb-md-0 ${
                    isLarge ? 'form-select-lg' : ''
                  }`}
                  value={searchFormData.relation}
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
              <div className="col-6 col-md-3">
                <select
                  className={`form-select  ${isLarge ? 'form-select-lg' : ''}`}
                  value={searchFormData.category}
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
              <div className="col-6 col-md-3">
                <select
                  className={`form-select  ${isLarge ? 'form-select-lg' : ''}`}
                  value={searchFormData.priceRange}
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

            <InputSearchDefault
              size={isLarge ? 'lg' : 'standard'}
              value={searchFormData.searchValue}
              onChange={handleSearchValueChange}
              onSearch={handleSearch}
            />
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
                  autoShowSwiper={true}
                />
              </div>
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={valentineDayProducts}
                  listTitle="情人節的浪漫驚喜"
                  iconify="streamline:smiley-in-love"
                  path="/products-list"
                  autoShowSwiper={true}
                />
              </div>
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={christmasProducts}
                  listTitle="聖誕禮物交換趣"
                  iconify="mingcute:christmas-hat-line"
                  path="/products-list"
                  autoShowSwiper={true}
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
