import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RandomProduct = () => {
  
  // 透過 useSelector 取得 Redux state 存放的所有產品資料
  const products = useSelector((state) => state.products.products);

  // 取得隨機商品的方法
  const navigate = useNavigate();
  const getRandomProduct = () => {
    // Math.random() * products.length：產生 0 到 products.length - 1 之間的隨機數。
    // Math.floor(...)：確保索引為整數（四捨五入取小）。
    // products?.[...]：確保 products 存在，避免 undefined 錯誤。
    // || null：如果 products 為空陣列或 undefined，則設為 null，避免報錯。
    const randomProduct =
      products?.[Math.floor(Math.random() * products.length)] || null;
    navigate(`product-details/${randomProduct?.id}`);
  };
  return (
    <>
      <div className="random-product-bg rounded-4 pt-6 pt-md-17 pb-0 pb-md-17 px-4 px-md-19 text-center text-md-start">
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
    </>
  );
};

export default RandomProduct;
