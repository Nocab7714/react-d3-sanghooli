// 外部資源
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import SwiperProducts from "../components/SwiperProducts";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

// 內部資源
import EmptyBasket from "../components/EmptyBasket";
import CartStep from "../components/CartStep";
import { asyncGetCart } from "../../slices/cartSlice";
import { asyncSetLoading } from "../../slices/loadingSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CartPage() {
  const { carts, total, final_total, cartCategories, coupon } = useSelector(
    (state) => state.cart
  );
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const updateCart = async (cartId, productId, qty) => {
    dispatch(asyncSetLoading(["sectionLoading", true]));
    try {
      qty = Number(qty);
      if (isNaN(qty) || qty < 1) qty = 1;
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      const data = {
        data: {
          product_id: productId,
          qty: qty,
        },
      };
      await axios.put(url, data);
      dispatch(asyncGetCart());
    } catch (error) {
      console.dir(error);
    } finally {
      dispatch(asyncSetLoading(["sectionLoading", false]));
    }
  };

  const deleteCartOne = async (cartId) => {
    dispatch(asyncSetLoading(["sectionLoading", true]));
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      await axios.delete(url);
      dispatch(asyncGetCart());
    } catch (error) {
      console.dir(error);
    } finally {
      dispatch(asyncSetLoading(["sectionLoading", false]));
    }
  };

  // 根據當前購物車類別，隨機取出 10 個同類商品
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const getRecommendedProducts = useCallback(
    (categories) => {
      // 取得與參數 categories 相同的所有產品
      const filteredProducts =
        categories?.length === 0 || categories === "all"
          ? [...products]
          : products.filter((item) => categories.includes(item.category));

      // 如果 filteredProducts 不足 10 筆，則從其他類別的產品補足
      if (filteredProducts.length < 10) {
        const otherProducts = products.filter(
          (item) => !categories.includes(item.category)
        );

        // 隨機選取缺少的數量
        while (filteredProducts.length < 10 && otherProducts.length > 0) {
          const randomIndex = Math.floor(Math.random() * otherProducts.length);
          filteredProducts.push(otherProducts[randomIndex]);
          otherProducts.splice(randomIndex, 1); // 避免重複選取
        }
        setRecommendedProducts(filteredProducts);
        return;
      }

      // 產生 10 個不重複的隨機索引
      const selectedIndexes = new Set();
      while (selectedIndexes.size < 10) {
        const randomIndex = Math.floor(Math.random() * filteredProducts.length);
        selectedIndexes.add(randomIndex);
      }

      // 根據這些索引，從 filteredProducts 陣列中取出對應的產品
      setRecommendedProducts(
        Array.from(selectedIndexes).map((index) => filteredProducts[index])
      );
      return;
    },
    [products]
  );

  useEffect(() => {
    if (cartCategories) {
      getRecommendedProducts(cartCategories);
    } else {
      getRecommendedProducts("all"); // 使用 'all' 類別
    }
  }, [getRecommendedProducts]);
  // 只當頁面載入時觸發 getRecommendedProducts 就好，不要每次 cartCategories 更新時觸發 getRecommendedProducts，因此不填入 cartCategories 依賴。

  // 使用優惠券
  const [isCouponValid, setIsCouponValid] = useState(null);
  const [couponResult, setCouponResult] = useState({
    text: "",
    className: ""
  });
  console.log('coupon', coupon);
  
  
  const { register, control, reset } = useForm({
    defaultValues: {
      coupon: coupon === "100%" ? "" : coupon
    }
  });
  const watchForm = useWatch({
    control,
  });

  const applyCoupon = useCallback(async () => {   
    if(watchForm.coupon === "" ) return; 
    try {
      const url = `${BASE_URL}/api/${API_PATH}/coupon`;
      const data = {
        data: {
          code: watchForm.coupon,
        },
      };
      const response = await axios.post(url, data);
      setIsCouponValid(response.data.success);
      setCouponResult({
        text: "您的優惠券已成功套用！",
        className: "text-success"
      })
      dispatch(asyncGetCart());
    } catch (error) {
      console.dir(error);
      setIsCouponValid(error.response.data.success);
      setCouponResult({
        text: "輸入的優惠代碼無效，請重新檢查是否輸入有誤或是已過期！",
        className: "text-secondary"
      })
    }
  }, [dispatch, watchForm.coupon]) 

  const removeCoupon = useCallback(async () => {    
    try {
      const url = `${BASE_URL}/api/${API_PATH}/coupon`;
      const data = {
        data: {
          code: "100%",  // 此原價優惠碼設定有效日期至 2100-01-01 00:00:00 UTC
        },
      };
      await axios.post(url, data);
      reset({coupon: ""})
      setIsCouponValid(null);
      setCouponResult({
        text: "已移除優惠券！",
        className: "text-success"
      })
      dispatch(asyncGetCart());
    } catch (error) {
      console.dir(error);
      setCouponResult({
        text: "優惠券移除失敗，請與客服人員聯絡！",
        className: "text-secondary"
      })
    }
  }, [dispatch, reset]) 

  useEffect(() => {
    if (coupon === "100%") return
    if (coupon){
      applyCoupon()
    }
  }, [coupon, applyCoupon])

  useEffect(() => {
    if (coupon === "100%") return
    reset({ coupon })
  }, [coupon, reset])

  useEffect(() => {
    dispatch(asyncGetCart({ skipSectionLoading: false }));
  }, [dispatch]);

  return (
    <>
      <main className="bg-neutral20">
        <div className="container pt-6 pb-10 py-lg-19">
          <section>
            {carts?.length > 0 ? (
              // {/* 購物車 */}
              // {/* 流程 */}
              <>
                <CartStep step={1} />
                <div className="">
                  <h1 className="fs-3 fs-lg-1 mb-4">購物車</h1>
                  {/* 內容 - 手機 */}
                  {carts?.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="d-flex align-items-center gap-3 py-4 border-bottom d-md-none"
                    >
                      <img
                        className="cart-img"
                        src={cartItem.product.imageUrl}
                        alt={cartItem.product.title}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="h6 text-neutral80">
                              {cartItem.product.title}
                            </p>
                            <span className="fs-7 text-neutral60">
                              {cartItem.product.category}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="btn border-0 p-1"
                            onClick={() => deleteCartOne(cartItem.id)}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            NT$ {cartItem.product.price * cartItem.qty} <br />
                            {cartItem.product.price !==
                              cartItem.product.origin_price && (
                              <del className="text-neutral60">
                                NT${" "}
                                {cartItem.product.origin_price * cartItem.qty}
                              </del>
                            )}
                          </div>
                          <div
                            className="d-flex position-relative"
                            style={{ maxWidth: "116px" }}
                          >
                            <button
                              type="button"
                              className="bg-white bg-primary-light-hover position-absolute top-50 translate-middle-y p-1 d-flex border-0 ms-2 rounded-1"
                              onClick={() =>
                                updateCart(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty - 1
                                )
                              }
                              disabled={cartItem.qty === 1}
                            >
                              <span className="material-symbols-outlined">
                                remove
                              </span>
                            </button>
                            <input
                              type="number"
                              className="form-control border-neutral40-hover text-center py-2"
                              value={cartItem.qty}
                              min="1"
                              max="999"
                              onChange={(e) =>
                                updateCart(
                                  cartItem.id,
                                  cartItem.product.id,
                                  e.target.value
                                )
                              }
                            />
                            <button
                              type="button"
                              className="bg-white bg-primary-light-hover position-absolute top-50 end-0 translate-middle-y p-1 d-flex border-0 me-2 rounded-1"
                              onClick={() =>
                                updateCart(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty + 1
                                )
                              }
                            >
                              <span className="material-symbols-outlined">
                                add
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* 內容 - 桌機 */}
                  <div className="row">
                    <div className="col-lg-8 d-none d-md-block ">
                      <table className="table align-middle">
                        <thead>
                          <tr>
                            <th scope="col">產品資訊</th>
                            <th scope="col">單價</th>
                            <th scope="col">數量</th>
                            <th scope="col">小計</th>
                            <th scope="col">刪除</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carts?.map((cartItem) => (
                            <tr key={cartItem.id}>
                              <th scope="row">
                                <Link
                                  to={`/single-product/${cartItem.product.id}`}
                                  className="d-flex align-items-center gap-3 gap-lg-4"
                                >
                                  <img
                                    className="cart-img"
                                    src={cartItem.product.imageUrl}
                                    alt={cartItem.product.title}
                                  />
                                  <div>
                                    <p className="h6 text-neutral80">
                                      {cartItem.product.title}
                                    </p>
                                    <span className="fs-7 text-neutral60">
                                      {cartItem.product.category}
                                    </span>
                                  </div>
                                </Link>
                              </th>
                              <td>
                                NT$ {cartItem.product.price.toLocaleString()}
                                {cartItem.product.price !==
                                  cartItem.product.origin_price && (
                                  <>
                                    <del className="text-neutral60 ms-md-2">
                                      NT${" "}
                                      {cartItem.product.origin_price.toLocaleString()}
                                    </del>
                                  </>
                                )}
                              </td>
                              <td className="">
                                <div
                                  className="d-flex position-relative"
                                  style={{ maxWidth: "116px" }}
                                >
                                  <button
                                    type="button"
                                    className="bg-white bg-primary-light-hover position-absolute top-50 translate-middle-y p-1 d-flex border-0 ms-2 rounded-1"
                                    onClick={() =>
                                      updateCart(
                                        cartItem.id,
                                        cartItem.product.id,
                                        cartItem.qty - 1
                                      )
                                    }
                                    disabled={cartItem.qty === 1}
                                  >
                                    <span className="material-symbols-outlined">
                                      remove
                                    </span>
                                  </button>
                                  <input
                                    type="number"
                                    className="form-control border-neutral40-hover text-center py-2"
                                    value={cartItem.qty}
                                    min="1"
                                    max="999"
                                    onChange={(e) =>
                                      updateCart(
                                        cartItem.id,
                                        cartItem.product.id,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="bg-white bg-primary-light-hover position-absolute top-50 end-0 translate-middle-y p-1 d-flex border-0 me-2 rounded-1"
                                    onClick={() =>
                                      updateCart(
                                        cartItem.id,
                                        cartItem.product.id,
                                        cartItem.qty + 1
                                      )
                                    }
                                  >
                                    <span className="material-symbols-outlined">
                                      add
                                    </span>
                                  </button>
                                </div>
                              </td>
                              <td>NT$ {cartItem.total.toLocaleString()}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn border-0 p-1"
                                  onClick={() => deleteCartOne(cartItem.id)}
                                >
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-lg-4">
                      {/* 訂單明細 */}
                      <div className="bg-white rounded-4 mt-6 mt-sm-0">
                        <div className="p-4 border-bottom p-md-8">
                          <h5 className="mb-5 fs-md-4 mb-md-6">訂單明細</h5>
                          <div className="d-flex justify-content-between align-items-center fs-7 mb-4">
                            <p className="text-neutral60">總金額</p>
                            <span className="fw-semibold">
                              NT$ {total.toLocaleString()}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center fs-7 mb-5 mb-md-6">
                            <p className="text-neutral60">運費</p>
                            <span className="fw-semibold">NT$ 0</span>
                          </div>
                          {isCouponValid === null
                            ? ""
                            : isCouponValid && (
                                <div className="d-flex justify-content-between align-items-center fs-7 mb-5 mb-md-6">
                                  <p className="text-neutral60">優惠券</p>
                                  <span className="fw-semibold">
                                    -NT${" "}
                                    {Math.floor((total - final_total)).toLocaleString()}
                                  </span>
                                </div>
                              )}
                          <div className="input-group search-input-container mb-2">
                            <input
                              {...register("coupon")}
                              type="text"
                              className="form-control border-0"
                              placeholder="輸入折扣代碼或禮品卡"
                              aria-label="輸入折扣代碼或禮品卡"
                              aria-describedby="button-addon2"
                              disabled={coupon !== "100%" && coupon !== ""}
                            />
                            {
                              (coupon === "100%" || coupon === "") ? (
                                <button
                                className="btn btn-primary"
                                type="button"
                                id="button-addon2"
                                onClick={applyCoupon}
                                >
                                套用
                                </button>
                              ) : (
                                <button
                                  className="btn position-absolute top-0 end-0 border-0"
                                  type="button"
                                  id="button-addon2"
                                  onClick={removeCoupon}
                                >
                                  <span className="material-symbols-outlined material-filled">cancel</span>
                                </button>
                              )
                            }
                          </div>
                          <span className={couponResult.className}>{couponResult.text}</span>
                        </div>
                        <div className="p-4 p-md-8">
                          <div className="d-flex justify-content-between align-items-center mb-5 mb-md-6">
                            <p className="text-neutral60 fs-7">應付金額</p>
                            <span className="text-primary-dark h5 fw-semibold text-primary-dark">
                              NT$ {Math.floor(final_total).toLocaleString()}
                            </span>
                          </div>
                          <Link
                            to="/checkout"
                            className="btn btn-primary w-100"
                          >
                            下一步
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : // {/* 購物車 - 空狀態 */}
            carts?.length === 0 ? (
              <EmptyBasket />
            ) : (
              ""
            )}
          </section>
        </div>
        <section className="py-10 py-lg-19">
          <div className="container d-flex align-items-center gap-3 mb-8 mb-10">
            <h5 className="fw-semibold">你可能會喜歡的商品</h5>
            <div className="border-top border-neutral40 flex-grow-1"></div>
          </div>
          <SwiperProducts carouselData={recommendedProducts} />
        </section>
      </main>
    </>
  );
}
export default CartPage;
