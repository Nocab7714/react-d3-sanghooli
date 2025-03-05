// 外部資源
import { useEffect } from "react";
import axios from "axios";
import SwiperProducts from "../components/SwiperProducts";

// 內部資源
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber";
import EmptyBasket from "../components/EmptyBasket";
import CartStep from "../components/CartStep";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCart } from "../../slices/cartSlice";
import { setGlobalLoading } from "../../slices/loadingSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const updateCart = async (cartId, productId, qty) => {
    dispatch(setGlobalLoading(true))
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
      dispatch(setGlobalLoading(false))
    }
  };

  const deleteCartOne = async(cartId) => {
    dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      await axios.delete(url);
      dispatch(asyncGetCart());
    } catch (error) {
      console.dir(error)
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }

  // 找出出現最多次數的 category
  const mostFrequentCategory = cart?.carts?.length ? (
    Object.entries( // 轉換為一個二維陣列，如 [["category1", count1], ["category2", count2], ...]
      cart.carts.reduce((acc, item) => {  // 統計每個 category 出現的次數，並返回一個 categorySummary 物件
        acc[item.product.category] = (acc[item.product.category] || 0) + 1;
        return acc;
      }, {})  
    ).reduce((a, b) => (b[1] > a[1] ? b : a), ["", 0])[0]
    // .reduce(...) 用來找出出現最多次數的 category，並將結果返回  // [0] 用來獲取 category 的名稱
  ) : null; // 如果 cart 沒有資料則設為 null


  // 根據 mostFrequentCategory，隨機取出 10 個同類商品
  const randomProducts = (() => {
    // 取得 mostFrequentCategory 的所有產品
    const filteredProducts = mostFrequentCategory === null 
      ? products.products 
      : products.products.filter((item) => item.category === mostFrequentCategory);
  
    // 若 filteredProducts 產品數量小於 count 的 10 筆，就回傳所有 filteredProducts
    if (filteredProducts.length < 10) return filteredProducts;
  
    // 產生 10 個不重複的隨機索引
    const selectedIndexes = new Set();
    while (selectedIndexes.size < 10) {
      const randomIndex = Math.floor(Math.random() * filteredProducts.length);
      selectedIndexes.add(randomIndex);
    }
  
    // 根據這些索引，從 filteredProducts 陣列中取出對應的產品
    return Array.from(selectedIndexes).map((index) => filteredProducts[index]);
  })();

  useEffect(() => {
    dispatch(asyncGetCart());
  }, [dispatch]);

  return (
    <>
      <main className="bg-neutral20">
        <div className="container pt-6 pb-10 py-lg-19">
          <section>
            {
              cart?.carts?.length > 0 ? (
                // {/* 購物車 */}
                // {/* 流程 */}
                <>
                  <CartStep step={1}/>
                  <div className="">
                    <h1 className="fs-3 fs-lg-1 mb-4">購物車</h1>
                    {/* 內容 - 手機 */}
                    {
                      cart?.carts?.map((cartItem) => (
                        <div key={cartItem.id} className="d-flex align-items-center gap-3 py-4 border-bottom d-md-none">
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
                              <button type="button" className="btn border-0 p-1" onClick={() => deleteCartOne(cartItem.id)}>
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div>
                                NT$ {cartItem.product.price * cartItem.qty} <br />
                                {
                                  (cartItem.product.price !== cartItem.product.origin_price) && (
                                    <del className="text-neutral60">
                                      NT$ {cartItem.product.origin_price * cartItem.qty}
                                    </del>
                                  )
                                }
                              </div>
                              <div className="d-flex position-relative" style={{maxWidth: '116px'}}>
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
                                <input type="number" className="form-control border-neutral40-hover text-center py-2" value={cartItem.qty} min='1' max='999' onChange={(e) =>
                                    updateCart(
                                      cartItem.id,
                                      cartItem.product.id,
                                      e.target.value
                                    )
                                  }/>
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
                                  <span className="material-symbols-outlined">add</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
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
                            {cart?.carts?.map((cartItem) => (
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
                                  {
                                    (cartItem.product.price !== cartItem.product.origin_price) && (
                                      <>
                                      
                                      <del className="text-neutral60 ms-md-2">
                                        NT$ {cartItem.product.origin_price.toLocaleString()}
                                      </del>
                                      </>
                                    )
                                  }
                                </td>
                                <td className="">
                                  <div className="d-flex position-relative" style={{maxWidth: '116px'}}>
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
                                    <input type="number" className="form-control border-neutral40-hover text-center py-2" value={cartItem.qty} min='1' max='999' onChange={(e) =>
                                        updateCart(
                                          cartItem.id,
                                          cartItem.product.id,
                                          e.target.value
                                        )
                                      }/>
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
                                      <span className="material-symbols-outlined">add</span>
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  NT$ {formatNumber(cartItem.total)}
                                </td>
                                <td>
                                  <button type="button" className="btn border-0 p-1" onClick={() => deleteCartOne(cartItem.id)}>
                                    <span className="material-symbols-outlined">delete</span>
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
                              <span className="fw-semibold">NT$ {formatNumber(cart.total)}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center fs-7 mb-5 mb-md-6">
                              <p className="text-neutral60">運費</p>
                              <span className="fw-semibold">NT$ 0</span>
                            </div>
                            <div className="input-group">
                              <input type="text" className="form-control" placeholder="輸入折扣代碼或禮品卡" aria-label="輸入折扣代碼或禮品卡" aria-describedby="button-addon2" />
                              <button className="btn btn-primary" type="button" id="button-addon2">套用</button>
                            </div>
                          </div>
                          <div className="p-4 p-md-8">
                            <div className="d-flex justify-content-between align-items-center mb-5 mb-md-6">
                              <p className="text-neutral60 fs-7">應付金額</p>
                              <span className="text-primary-dark h5 fw-semibold text-primary-dark">NT$ {formatNumber(cart.final_total)}</span>
                            </div>
                            <Link to='/checkout' className="btn btn-primary w-100">下一步</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // {/* 購物車 - 空狀態 */}
                cart?.carts?.length === 0 ? <EmptyBasket /> : ''
              )
            }
          </section>
        </div>
        <section className="py-10 py-lg-19">
          <div className="container d-flex align-items-center gap-3 mb-8 mb-10">
            <h5 className="fw-semibold">你可能會喜歡的商品</h5>
            <div className="border-top border-neutral40 flex-grow-1"></div>
          </div>
          <SwiperProducts carouselData={randomProducts}/>
        </section>
      </main>
    </>
  );
}
export default CartPage;
