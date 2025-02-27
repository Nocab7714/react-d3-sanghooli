import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

import userImg01 from '@/assets/img/other/user01.png';
import userImg02 from '@/assets/img/other/user02.png';
import userImg03 from '@/assets/img/other/user03.png';

import Breadcrumb from '../components/Breadcrumb.jsx';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import InputCalculate from '../components/InputCalculate.jsx';
import SwiperProducts from '../components/SwiperProducts.jsx';

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [productTitle, setProductTitle] = useState('');
  const [productStockQty, setProductStockQty] = useState(0);
  const { id: product_id } = useParams();
  const [breadcrumbItem, setBreadcrumbItem] = useState([
    {
      page: '首頁',
      link: '/',
    },
    {
      page: '產品列表',
      link: '/products-list',
    },
  ]);

  // 取得單一商品資料
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/${apiPath}/product/${product_id}`
        );
        setProduct(res.data.product);
        setProductTitle(res.data.product.title);
        setProductStockQty(res.data.product.qty);
        setBreadcrumbItem((prev) => [
          ...prev.slice(0, 2), 
          { page: res.data.product.title, link: `/single-product/${res.data.product.id}` }, 
        ]);
      } catch (error) {
        alert('取得產品失敗');
      } finally {
      }
    };
    getProduct();
  }, [product_id]);

  // 加入購物車
  const [productQty, setProductQty] = useState(1);
  const addCartItem = async (product_id) => {
    try {
      await axios.post(`${baseUrl}/api/${apiPath}/cart`, {
        data: {
          product_id,
          qty: Number(productQty),
        },
      });
      alert(`成功將商品加入購物車,數量${productQty}`);
    } catch (error) {
      alert('加入購物車失敗');
      console.log(error);
    } finally {
      // console.log(typeof productQty ,productQty)
    }
  };

  //  取得所有商品
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
        setProducts(getRandomProducts(res.data.products));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // 取得隨機 10 筆商品的方法
  const getRandomProducts = (products) => {
    if (!products || products.length === 0) return [];
    // 複製陣列，避免修改原始陣列
    const shuffled = [...products];
    // Fisher-Yates 洗牌演算法 ( 超過 100 筆的陣列適用 )
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // 取前 10 筆
    return shuffled.slice(0, 10);
  };
  
  return (
    <>
      <ReactHelmetAsync title={productTitle} />
      <div>
        {/* breadcrumb */}
        <div className="container pt-10 pt-md-19 mb-6 mb-md-10">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
        </div>
        <div className="container pb-10 pb-md-19">
          <section className="product-info">
            <div className="row">
              {/* product-img */}
              <div className="col-xl-6">
                <img
                  src={product.imageUrl}
                  alt={product.id}
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
                <p className="text-neutral60 mb-6 mb-md-8">
                  {product.description}
                </p>
                {/* product-info */}
                <div className="card rounded-4 border-neutral40  mb-6 mb-md-8">
                  <div className="card-body p-8">
                    <h3 className="card-title fs-6 fs-md-5 border-bottom border-neutral40 fw-semibold pb-4 mb-4 ">
                      商品資訊
                    </h3>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="card-text fs-7 text-neutral60">
                        材質/內容物
                      </p>
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
                    {/* 熱門度 - 區塊表劉 */}
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
                      {/* 未收藏狀態按鈕 */}
                      <button
                        type="button"
                        className="btn btn-outline-neutral60 w-100"
                      >
                        <span className="material-symbols-outlined align-middle me-1">
                          favorite
                        </span>
                        加入願望清單
                      </button>
                      {/* 已收藏狀態按鈕 */}
                      {/* <button
                      type="button"
                      className="btn btn-outline-neutral60 w-100"
                    >
                      <span className="material-symbols-outlined material-filled align-middle me-1 ">
                        favorite
                      </span>
                      已收藏
                    </button> */}
                    </div>

                    <div className="col-6">
                      <button
                        onClick={() => addCartItem(product.id)}
                        type="button"
                        className="btn btn-primary w-100"
                        disabled={product.qty === 0}
                      >
                        <span className="material-symbols-outlined align-middle me-1">
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
        </div>
        {/* product-recommendations-swiper */}
        <section className="product-recommendations-swiper pt-10 pt-md-19">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between mb-8 mb-md-10 ">
              <h2 className="fs-5 fs-md-4 m-0 ">你可能會喜歡的商品</h2>
              <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />
            </div>
          </div>
        </section>
        <div className="pb-10 pb-md-19">
          <SwiperProducts carouselData={products} autoplay={true}/>
        </div>

        {/* consumer-reviews */}
        <section className="consumer-reviews py-10 py-md-19">
          <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center mb-6 mb-md-10">
              <h2 className="text-neutral60 fs-5 fs-md-4 fw-semibold fw-md-bold mb-2 mb-md-3">
                消費者評價
              </h2>
              <h3 className="text-neutral80 fs-2 fs-md-1 mb-2 mb-md-3">5.0</h3>
              <div className="d-flex justify-content-center mb-2 mb-md-3">
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2 ">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 ">
                  kid_star
                </span>
              </div>
              <p className="fs-6 fs-md-5 text-neutral60">(5則評價)</p>
            </div>
            <ul className="list-unstyled row gy-4 mb-6 mb-md-10  ">
              <li className="col-lg-4 ">
                <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center mb-4 mb-md-6">
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2 ">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-2 me-md-4 ">
                        kid_star
                      </span>
                      <span className="fs-7 fs-md-6 fw-semibold me-4 ">
                        5.0
                      </span>
                    </div>
                    <h3 className="card-title fs-6 fs-md-5 fw-semibold mb-4 mb-md-6">
                      超乎期待的好禮盒！
                    </h3>
                    <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                      這款紅酒禮盒真的讓人驚喜！紅酒的香氣非常濃郁，果香和單寧的平衡非常好，喝起來口感柔順。包裝精美，酒杯的質感也很好，完全不像附贈品，整體非常有品味。朋友收到這份禮物後非常開心，表示要收藏這個禮盒留作紀念，真的很值得推薦！
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={userImg01}
                        alt="user01"
                        height="48"
                        width="48"
                        className="me-4"
                      />
                      <div>
                        <h4 className="fs-7 fw-normal">abc12345</h4>
                        <time className="fs-7 text-neutral60">2024/12/01</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="col-lg-4 ">
                <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center mb-4 mb-md-6">
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2 ">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-2 me-md-4 ">
                        kid_star
                      </span>
                      <span className="fs-7 fs-md-6 fw-semibold me-4 ">
                        5.0
                      </span>
                    </div>
                    <h3 className="card-title fs-6 fs-md-5 fw-semibold mb-4 mb-md-6">
                      質感超越期待！
                    </h3>
                    <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                      這款紅酒禮盒從包裝到內容都無可挑剔。紅酒入口細膩，尾韻果香濃郁但不過於強烈，整體非常平衡，令人難忘。禮盒設計大氣，酒杯質感也很高端，讓人感覺到滿滿的用心。我特地選這款禮盒作為送禮，用於家人聚會，大家都對這份禮物讚不絕口，真的很推薦這款產品！
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={userImg02}
                        alt="user02"
                        height="48"
                        width="48"
                        className="me-4"
                      />
                      <div>
                        <h4 className="fs-7 fw-normal">user8910xy</h4>
                        <time className="fs-7 text-neutral60">2024/11/28</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="col-lg-4 ">
                <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center mb-4 mb-md-6">
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2 ">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-neutral40 fs-6 fs-md-5 me-2 me-md-4 ">
                        kid_star
                      </span>
                      <span className="fs-7 fs-md-6 fw-semibold me-4 ">
                        4.0
                      </span>
                    </div>
                    <h3 className="card-title fs-6 fs-md-5 fw-semibold mb-4 mb-md-6">
                      細緻的設計與完美的口感！
                    </h3>
                    <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                      收到這款紅酒禮盒時，第一眼就被它的精緻包裝吸引。外盒設計大氣高雅，裡面的紅酒和酒杯擺放得非常用心。紅酒的品質更是令人驚艷，果香濃郁、酒體豐滿，入口後能感受到絲滑的口感和完美的平衡，尾韻悠長且令人回味。附贈的酒杯質感極佳，完全不像一般的附贈品，拿在手裡很有重量感和儀式感。我特地帶到朋友的生日派對上分享，所有人都對這款禮盒稱讚不已，甚至詢問在哪裡可以買到。無論是自己享用還是作為送禮選擇，這款紅酒禮盒都能滿足最挑剔的需求，絕對會再次購買！
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={userImg03}
                        alt="user03"
                        height="48"
                        width="48"
                        className="me-4"
                      />
                      <div>
                        <h4 className="fs-7 fw-normal">Ken0833</h4>
                        <time className="fs-7 text-neutral60">2024/11/20</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              <Link
                to="/products-list"
                className="link-neutral60 fs-6 fs-md-5 fw-semibold d-flex align-items-center "
              >
                查看更多
                <span className="material-symbols-outlined align-middle fw-semibold fs-5 fs--md-4 ms-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>
        {/* 手機板 product-quantity-selector*/}
        <div className="product-quantity-selector-mobile bg-white d-block d-md-none sticky-bottom">
          <div className="pt-4 pb-6 px-3">
            {/* product-quantity-selector */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <InputCalculate
                productQty={productQty}
                setProductQty={setProductQty}
                productStockQty={productStockQty}
              />
              <span className="fs-6 text-neutral60">
                庫存尚有{product.qty}件
              </span>
            </div>
            {/* add-to-cart & add-to-favorite */}
            <div className="row g-4">
              <div className="col-6">
                {/* 未收藏狀態按鈕 */}
                <button
                  type="button"
                  className="btn btn-outline-neutral60 fs-6 w-100 px-2"
                >
                  <span className="material-symbols-outlined fs-5 align-middle  me-1">
                    favorite
                  </span>
                  加入願望清單
                </button>
                {/* 已收藏狀態按鈕 */}
                {/* <button
                      type="button"
                      className="btn btn-outline-neutral60 fs-6 w-100 px-2"
                    >
                      <span className="material-symbols-outlined material-filled align-middle fs-5 me-1 ">
                        favorite
                      </span>
                      已收藏
                    </button> */}
              </div>

              <div className="col-6">
                <button
                  onClick={() => addCartItem(product.id)}
                  type="button"
                  className="btn btn-primary fs-6 w-100 px-2"
                  disabled={product.qty === 0}
                >
                  <span className="material-symbols-outlined fs-5 align-middle me-1">
                    local_mall
                  </span>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
