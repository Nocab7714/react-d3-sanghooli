import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

import Breadcrumb from '../components/Breadcrumb.jsx';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import ProductDetails from '../components/ProductDetails.jsx';
import ProductPurchaseOptions from '../components/ProductPurchaseOptions.jsx';
import SwiperProducts from '../components/SwiperProducts.jsx';
import CustomerFeedback from '../components/CustomerFeedback.jsx';
import { asyncSetLoading } from '../../slices/loadingSlice.js';

const ProductDetailsPage = () => {
  const [breadcrumbItem, setBreadcrumbItem] = useState([
    {
      page: '首頁',
      link: '/',
    },
    {
      page: '產品列表',
      link: '/products-list',
    },
  ]); // 麵包屑元件資料
  const [productTitle, setProductTitle] = useState(''); // 商品頁面 title

  // 取得單一商品資料
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const [product, setProduct] = useState({}); // 存放取得的單項商品資料
  useEffect(() => {
    const getProduct = async () => {
      dispatch(asyncSetLoading(['globalLoading', true]));
      try {
        const res = await axios.get(
          `${baseUrl}/api/${apiPath}/product/${productId}`
        );
        setProduct(res.data.product);
        setProductTitle(res.data.product.title);
        setBreadcrumbItem((prev) => [
          ...prev.slice(0, 2),
          {
            page: res.data.product.title,
            link: `/single-product/${res.data.product.id}`,
          },
        ]);
      } catch (error) {
        console.error(error);
        navigate('/404');
      } finally {
        dispatch(asyncSetLoading(['globalLoading', false]));
      }
    };
    getProduct();
  }, [productId]);

  //  取得隨機 10 筆商品（將隨機商品資料傳入商品輪播使用）
  const products = useSelector((state) => state.products.products);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setRandomProducts(getRandomProducts(products));
    }
  }, [products]);

  const getRandomProducts = (products) => {
    if (!products || products.length === 0) return [];
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    1;
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
          <ProductDetails product={product} productId={productId} />
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
          <SwiperProducts carouselData={randomProducts} autoplay={true} />
        </div>
        {/* consumer-reviews */}
        <CustomerFeedback />
        {/* 視窗小於 768px(md) 時顯示該元件，用於操作商品購買選項（調整商品數量、加入購物車、願望清單）*/}
        <ProductPurchaseOptions product={product} productId={productId} />
      </div>
    </>
  );
};

export default ProductDetailsPage;
