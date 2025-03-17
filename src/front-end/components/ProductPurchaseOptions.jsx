// 這個元件目前用於在 ProductDetailsPage.jsx，視窗小於 768px(md) 時顯示
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

import InputCalculate from '../components/form/InputCalculate.jsx';
import ButtonLoading from '../../plugins/ButtonLoading.jsx';

import { asyncGetCart } from '../../slices/cartSlice.js';
import { asyncToggleWishList } from '../../slices/wishListSlice.js';
import { createToast } from '../../slices/toastSlice.js';

const ProductPurchaseOptions = ({ productId, product }) => {
  const [isLoadingAddCart, setIsLoadingAddCart] = useState(false); // 加入購物車按鈕 loading 狀態
  const [productQty, setProductQty] = useState(1); // 加入購物車商品數量
  const [productStockQty, setProductStockQty] = useState(0); // 商品庫存數量

  // 當單項商品換頁後，更新商品庫存數量，並將可加入的商品數量改為 1 (初始狀態)
  useEffect(() => {
    setProductStockQty(product.qty);
    setProductQty(1);
  }, [productId]);

  // 加入購物車
  const dispatch = useDispatch();
  const addCartItem = async (productId) => {
    setIsLoadingAddCart(true);
    try {
      const res = await axios.post(`${baseUrl}/api/${apiPath}/cart`, {
        data: {
          product_id: productId,
          qty: Number(productQty),
        },
      });
      dispatch(createToast(res.data));
      dispatch(asyncGetCart());
    } catch (error) {
      console.error(error);
      const { success, message } = error.response.data;
      dispatch(createToast({ success, message: `加入購物車失敗！${message}` }));
    } finally {
      setIsLoadingAddCart(false);
    }
  };

  // 願望清單
  const wishList = useSelector((state) => state.wishList);

  return (
    <>
      <div className="product-quantity-selector-mobile bg-white d-block d-md-none sticky-bottom">
        <div className="pt-4 pb-6 px-3">
          {/* product-quantity-selector */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <InputCalculate
              productQty={productQty}
              setProductQty={setProductQty}
              productStockQty={productStockQty}
            />
            <span className="fs-6 text-neutral60">庫存尚有{product.qty}件</span>
          </div>
          {/* add-to-cart & add-to-favorite */}
          <div className="row g-4">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-neutral60 fs-6 w-100 px-2 d-flex align-items-center justify-content-center"
                onClick={() => dispatch(asyncToggleWishList(product.id))}
              >
                <span
                  className={`material-symbols-outlined fs-5 align-middle me-1 ${
                    wishList[product.id] ? 'material-filled' : ''
                  }`}
                >
                  favorite
                </span>
                {wishList[product.id] ? '已收藏' : '加入願望清單'}
              </button>
            </div>
            <div className="col-6">
              <button
                onClick={() => addCartItem(product.id)}
                type="button"
                className="btn btn-primary fs-6 w-100 px-2 d-flex align-items-center justify-content-center"
                disabled={product.qty === 0 || isLoadingAddCart}
              >
                <span className={isLoadingAddCart ? 'me-2' : ''}>
                  <ButtonLoading isLoading={isLoadingAddCart} />
                </span>
                <span className="material-symbols-outlined fs-5 align-middle me-1">
                  local_mall
                </span>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPurchaseOptions;
