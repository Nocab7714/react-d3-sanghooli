// 頁面元件引入
import FrontLayout from '../App.jsx';
import NotFoundPage from '../front-end/pages/NotFoundPage.jsx';
import HomePage from '../front-end/pages/HomePage.jsx';
import AboutUsPage from '../front-end/pages/AboutUsPage.jsx';
import ProductsListPage from '../front-end/pages/ProductsListPage.jsx';
import SingleProductPage from '../front-end/pages/SingleProductPage.jsx';
import PrivacyPolicyPage from '../front-end/pages/PrivacyPolicyPage.jsx';
import HowToBuyPage from '../front-end/pages/HowToBuyPage.jsx';

import { createHashRouter } from 'react-router-dom';

// 路由表
const routes = [
  {
    path: '/',
    element: <FrontLayout />,
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
        path: 'single-product',
        element: <SingleProductPage />,
        children: [
          {
            path: ':id',
            element: <SingleProductPage />,
          }
        ]
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
        path : '*',
        element: <NotFoundPage />
      },

    ]
  },
];

const router = createHashRouter(routes);

export default router;