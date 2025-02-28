// 頁面元件引入
// 前台
import LayoutFront from '../front-end/layout/LayoutFront.jsx';
import NotFoundPage from '../front-end/pages/NotFoundPage.jsx';
import HomePage from '../front-end/pages/HomePage.jsx';
import AboutUsPage from '../front-end/pages/AboutUsPage.jsx';
import ProductsListPage from '../front-end/pages/ProductsListPage.jsx';
import SingleProductPage from '../front-end/pages/SingleProductPage.jsx';
import PrivacyPolicyPage from '../front-end/pages/PrivacyPolicyPage.jsx';
import HowToBuyPage from '../front-end/pages/HowToBuyPage.jsx';
import CartPage from '../front-end/pages/CartPage.jsx';
import CheckoutPage from '../front-end/pages/CheckoutPage.jsx';
import SuccessPage from '../front-end/pages/SuccessPage.jsx';

// 後台
import LayoutBacked from '../back-end/layout/LayoutBacked.jsx';
import AdminLoginPage from '../back-end/Pages/AdminLoginPage.jsx';
import OrdersManagementPage from '../back-end/Pages/OrdersManagementPage.jsx'
import ProductsManagementPage from '../back-end/Pages/ProductsManagementPage.jsx'


import { createHashRouter } from 'react-router-dom';




// 路由表
const routes = [
  { 
    // 前台路由設定
    path: '/',
    element: <LayoutFront />,
    children:[
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about-us',
        element: <AboutUsPage />,
      },
      {
        path: 'products-list',
        element: <ProductsListPage />,
      },
      {
        path: 'single-product/:id',
        element: <SingleProductPage />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: 'how-to-buy',
        element: <HowToBuyPage />,
      },
      {
        path : 'cart',
        element: <CartPage />
      },
      {
        path : 'checkout',
        element: <CheckoutPage />
      },
      {
        path : 'success/:orderId',
        element: <SuccessPage />
      },
      {
        path : '*',
        element: <NotFoundPage />
      },
    ]
  },
  { 
    // 後台路由設定
    path: '/admin',
    element: <LayoutBacked />,
    children:[
      { 
        path: 'login', 
        element: <AdminLoginPage /> // 新增後台登入頁面
      },
      { 
        path: 'order', 
        element: <OrdersManagementPage /> // 新增訂單管理頁面
      },
      { 
        path: 'product', 
        element: <ProductsManagementPage /> // 新增產品登入頁面
      },      
      {
        path : '*',
        element: <NotFoundPage />
      },
    ]
  },
];

const router = createHashRouter(routes);

export default router;