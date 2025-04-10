// 這個元件目前用於在 ProductDetailsPage.jsx，視窗小於 768px(md) 時顯示
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

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

  // 當 product 或 productId 變更時更新商品庫存數量和重置選擇數量
  useEffect(() => {
    // 確保 product 是有效物件且 product.qty 存在才設置
    if (product && typeof product.qty !== 'undefined') {
      // 將字串轉為數字
      const qtyNumber = Number(product.qty);
      setProductStockQty(qtyNumber);
      setProductQty(1);
    }
  }, [product, productId]);

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
              inputSize="m"
            />
            <span className="fs-6 text-neutral60">
              庫存尚有{Number(product.qty)}件
            </span>
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
                disabled={Number(product.qty) <= 0 || isLoadingAddCart}
              >
                <span className={isLoadingAddCart ? 'me-2' : ''}>
                  <ButtonLoading isLoading={isLoadingAddCart} />
                </span>
                <span className="material-symbols-outlined fs-5 align-middle me-1">
                  local_mall
                </span>
                {Number(product.qty) <= 0 ? '已售完' : '加入購物車'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPurchaseOptions;

ProductPurchaseOptions.propTypes = {
  productId: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    origin_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
    content: PropTypes.shape({
      material_contents: PropTypes.string,
      expiry_date: PropTypes.string,
      origin: PropTypes.string,
      notes: PropTypes.string,
    }),
  }),
};
