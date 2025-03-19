import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setFilteredProductsData } from '../../slices/productsSlice';
import InputSearchDefault from '../components/form/InputSearchDefault';

import { festivalOptions, relationOptions, categoryOptions, priceRangeOptions } from '../constants/filterOptions';

const HomePageProductFilter = () => {
  const navigate = useNavigate();

  // 控制 select 與 inputSearch 的斷點
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 992);
  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    // 將當前的篩選條件存入 Redux 的 `filteredProductsData`
    dispatch(setFilteredProductsData(searchFormData));
    // 跳轉到商品列表頁，並滑動到搜尋結果標題視窗位置，顯示篩選後的商品
    navigate('/products-list', { state: { scrollToResults: true } });
  };

  return (
    <>
      <form>
        <div className="row gx-4 gx-md-6 mb-4 mb-lg-6 ">
          <div className="col-6 col-md-3 ">
            <select
              className={`form-select mb-4 mb-md-0 ${isLarge ? 'form-select-lg' : ''
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
              className={`form-select mb-4 mb-md-0 ${isLarge ? 'form-select-lg' : ''
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
    </>
  );
};

export default HomePageProductFilter;
