// 頁面元件引入
// 前台
import LayoutFront from '../front-end/layout/LayoutFront.jsx'
import NotFoundPage from '../front-end/pages/NotFoundPage.jsx'
import HomePage from '../front-end/pages/HomePage.jsx'
import AboutUsPage from '../front-end/pages/AboutUsPage.jsx'
import ProductsListPage from '../front-end/pages/ProductsListPage.jsx'
import SingleProductPage from '../front-end/pages/SingleProductPage.jsx'
import PrivacyPolicyPage from '../front-end/pages/PrivacyPolicyPage.jsx'
import HowToBuyPage from '../front-end/pages/HowToBuyPage.jsx'
import CartPage from '../front-end/pages/CartPage.jsx'
import CheckoutPage from '../front-end/pages/CheckoutPage.jsx'
import PaymentPage from '../front-end/pages/PaymentPage.jsx'
import SuccessPage from '../front-end/pages/SuccessPage.jsx'
import WishListPage from '../front-end/pages/WishListPage.jsx'

// 後台
import LayoutBacked from '../back-end/layout/LayoutBacked.jsx'
import AdminLoginPage from '../back-end/Pages/AdminLoginPage.jsx'
import OrdersManagementPage from '../back-end/Pages/OrdersManagementPage.jsx'
import ProductsManagementPage from '../back-end/Pages/ProductsManagementPage.jsx'
import CouponManagementPage from '../back-end/Pages/CouponManagementPage.jsx'

import { createHashRouter } from 'react-router-dom'
import MemberLogin from '../front-end/pages/MemberLogin.jsx'
import LayoutFront from '../front-end/layout/LayoutFront.jsx'
import NotFoundPage from '../front-end/pages/NotFoundPage.jsx'
import HomePage from '../front-end/pages/HomePage.jsx'
import AboutUsPage from '../front-end/pages/AboutUsPage.jsx'
import ProductsListPage from '../front-end/pages/ProductsListPage.jsx'
import SingleProductPage from '../front-end/pages/SingleProductPage.jsx'
import PrivacyPolicyPage from '../front-end/pages/PrivacyPolicyPage.jsx'
import HowToBuyPage from '../front-end/pages/HowToBuyPage.jsx'
import CartPage from '../front-end/pages/CartPage.jsx'
import CheckoutPage from '../front-end/pages/CheckoutPage.jsx'
import PaymentPage from '../front-end/pages/PaymentPage.jsx'
import SuccessPage from '../front-end/pages/SuccessPage.jsx'
import WishListPage from '../front-end/pages/WishListPage.jsx'

// 後台
import LayoutBacked from '../back-end/layout/LayoutBacked.jsx'
import AdminLoginPage from '../back-end/Pages/AdminLoginPage.jsx'
import OrdersManagementPage from '../back-end/Pages/OrdersManagementPage.jsx'
import ProductsManagementPage from '../back-end/Pages/ProductsManagementPage.jsx'
import CouponManagementPage from '../back-end/Pages/CouponManagementPage.jsx'

import { createHashRouter } from 'react-router-dom'
import { AdminAuthProvider } from '../context/AdminAuthContext.jsx'

// 路由表
const routes = [
  {
    // 前台路由設定
    path: '/',
    element: <LayoutFront />,
    children: [
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
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'payment/:orderId',
        element: <PaymentPage />,
      },
      {
        path: 'success/:orderId',
        element: <SuccessPage />,
      },
      {
        path: 'wish-list',
        element: <WishListPage />,
      },
      {
        path: 'member-login',
        element: <MemberLogin />,
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'payment/:orderId',
        element: <PaymentPage />,
      },
      {
        path: 'success/:orderId',
        element: <SuccessPage />,
      },
      {
        path: 'wish-list',
        element: <WishListPage />,
      },
      // {
      //   path : '*',
      //   element: <NotFoundPage />
      // },
    ],
  },
  {
    // 後台路由設定
    path: '/admin',
    element: (
      //確保 Admin 頁面有 Provider
      <AdminAuthProvider>
        <LayoutBacked />
      </AdminAuthProvider>
    ),

    children: [
      {
        path: 'login',
        element: <AdminLoginPage />, // 新增後台登入頁面
      },
      {
        path: 'orders',
        element: <OrdersManagementPage />, // 新增訂單管理頁面
      },
      {
        path: 'products',
        element: <ProductsManagementPage />, // 新增產品登入頁面
      },
      {
        path: 'coupon',
        element: <CouponManagementPage />, // 新增產品登入頁面
      },
    ],
  },
  //最後放置 catch-all 路由:
  //Catch-All路由:通常用來處理所有未被定義的 API 路徑，並回應 404 錯誤
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

const router = createHashRouter(routes)

export default router
