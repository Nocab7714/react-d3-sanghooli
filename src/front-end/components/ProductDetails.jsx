import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

import InputCalculate from '../components/form/InputCalculate.jsx';
import ButtonLoading from '../../plugins/ButtonLoading.jsx';

import { asyncGetCart } from '../../slices/cartSlice.js';
import { asyncToggleWishList } from '../../slices/wishListSlice.js';
import { createToast } from '../../slices/toastSlice.js';

const ProductDetails = ({ product, productId }) => {
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
      <section className="product-details">
        <div className="row">
          {/* product-img */}
          <div className="col-xl-6">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="img-fluid rounded-4 mb-10 mb-xl-0"
              height="636"
              width="636"
            />
          </div>
          <div className="col-xl-5 ms-xl-14 ">
            <h2 className="fs-3 fs-md-1 mb-6 mb-md-8">{product.title}</h2>
            {/* product-ratings */}
            <div className="d-flex align-items-center  mb-6 mb-md-8">
              <span className="material-symbols-outlined material-filled text-primary fs-5 fs-md-4 me-2 ">
                kid_star
              </span>
              <span className="material-symbols-outlined material-filled text-primary fs-5 fs-md-4 me-2">
                kid_star
              </span>
              <span className="material-symbols-outlined material-filled text-primary fs-5 fs-md-4 me-2">
                kid_star
              </span>
              <span className="material-symbols-outlined material-filled text-primary fs-5 fs-md-4 me-2">
                kid_star
              </span>
              <span className="material-symbols-outlined material-filled text-primary fs-5 fs-md-4 me-4 ">
                kid_star
              </span>
              <span className="fs-6 fs-md-5 fw-semibold me-4 ">5.0</span>
              <span className="fs-7  text-neutral60">(5則評價)</span>
            </div>
            {/* product-description */}
            <p className="text-neutral60 mb-6 mb-md-8">{product.description}</p>
            {/* product-info */}
            <div className="card rounded-4 border-neutral40  mb-6 mb-md-8">
              <div className="card-body p-8">
                <h3 className="card-title fs-6 fs-md-5 border-bottom border-neutral40 fw-semibold pb-4 mb-4 ">
                  商品資訊
                </h3>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="card-text fs-7 text-neutral60">材質/內容物</p>
                  <p className="card-text fs-7 fw-semibold text-end w-md-75 w-50">
                    {product?.content?.material_contents}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="card-text fs-7 text-neutral60">保存期限</p>
                  <p className="card-text fs-7 fw-semibold text-end w-md-75 w-50">
                    {product?.content?.expiry_date}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="card-text fs-7 text-neutral60">產地</p>
                  <p className="card-text fs-7 fw-semibold text-end w-md-75 w-50">
                    {product?.content?.origin}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text fs-7 text-neutral60">注意事項</p>
                  <p className="card-text fs-7 fw-semibold text-end w-md-75 w-50">
                    {product?.content?.notes}
                  </p>
                </div>
                {/* 熱門度 - 區塊保留 */}
                {/* <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text fs-7 text-neutral60">熱門度</p>
                      <p className="card-text fs-7 fw-semibold text-end w-md-75 w-50">
                        已售出 50 次
                      </p>
                    </div> */}
              </div>
            </div>
            {/* product-price */}
            <p className="d-flex align-items-center fs-5 fs-md-3 fw-semibold fw-md-bold text-primary-dark  mb-0 mb-md-8">
              NT$&nbsp;
              <span className="me-4 me-md-6">{product.price}</span>
              {product.origin_price !== product.price && (
                <span className="fs-6 fs-md-5 fw-normal text-decoration-line-through text-neutral60">
                  NT$&nbsp;{product.origin_price}
                </span>
              )}
            </p>
            <div className="d-none d-md-block">
              {/* product-quantity-selector */}
              <div className="d-flex align-items-center mb-0 mb-md-8">
                <div className="me-6">
                  <InputCalculate
                    inputSize="lg"
                    productQty={productQty}
                    setProductQty={setProductQty}
                    productStockQty={productStockQty}
                  />
                </div>
                <span className="fs-6 text-neutral60">
                  庫存尚有{product.qty}件
                </span>
              </div>
              {/* add-to-cart & add-to-favorite */}
              <div className="row">
                <div className="col-6">
                  {/* 願望清單按鈕 */}
                  <button
                    type="button"
                    className="btn btn-outline-neutral60 w-100 d-flex align-items-center justify-content-center"
                    onClick={() => dispatch(asyncToggleWishList(product.id))}
                  >
                    <span
                      className={`material-symbols-outlined align-middle me-1 ${
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
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    disabled={product.qty === 0 || isLoadingAddCart}
                  >
                    <span className={isLoadingAddCart ? 'me-3' : ''}>
                      <ButtonLoading isLoading={isLoadingAddCart} />
                    </span>
                    <span className="material-symbols-outlined  me-1">
                      local_mall
                    </span>
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
