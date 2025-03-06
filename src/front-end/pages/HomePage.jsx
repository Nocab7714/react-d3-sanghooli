import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredProductsData } from '../../slice/productsSlice';

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
  // 商品篩選 - 定義商品篩選條件
  const [searchFormData, setSearchFormData] = useState({
    searchValue: '',
    festival: '',
    relation: '',
    category: '',
    priceRange: '',
  });

  // 商品篩選 - 更新篩選條件
  // 這個函式負責處理表單輸入變更，並動態更新 `searchFormData`。
  // 適用於 `<select>` (event 物件) 及 `InputSearchDefault` (直接傳遞值)。
  const handleInputChange = (eOrValue) => {
    // 來自 InputSearchDefault 的輸入
    // `InputSearchDefault` 會直接傳遞輸入的值，而不是 event 物件
    if (typeof eOrValue === 'string') {
      setSearchFormData((prev) => ({ ...prev, searchValue: eOrValue }));
    } else {
      // 來自 `<select>` 選單的輸入
      // `eOrValue` 是 event 物件，從 `event.target` 取得 `name` 和 `value`
      const { name, value } = eOrValue.target;
      setSearchFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 商品篩選 - 提交篩選條件並跳轉至產品列表頁面
  // 這個函式在使用者按下搜尋按鈕或按 Enter 時執行
  const dispatch = useDispatch();
  const handleSearch = () => {
    // 1. 將當前的篩選條件存入 Redux 的 `filteredProductsData`
    dispatch(setFilteredProductsData(searchFormData));
    // 2. 在開發階段，確認 Redux 是否正確儲存篩選條件
    // console.log('已存入 Redux 的篩選條件:', searchFormData);
    // 3. 跳轉到商品列表頁，並滑動到搜尋結果標題視窗位置，顯示篩選後的商品
    navigate('/products-list', { state: { scrollToResults: true } });
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
                  name="festival"
                  value={searchFormData.festival}
                  onChange={handleInputChange}
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
                  name="relation"
                  value={searchFormData.relation}
                  onChange={handleInputChange}
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
                  name="category"
                  value={searchFormData.category}
                  onChange={handleInputChange}
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
                  name="priceRange"
                  value={searchFormData.priceRange}
                  onChange={handleInputChange}
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
              onChange={handleInputChange}
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
