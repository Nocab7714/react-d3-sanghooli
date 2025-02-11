// 資源引入方式範例
// 1.外部資源（排序：React hooks -> 第三方工具庫）
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap'; // 引入 bootstrap 5 方法
import axios from 'axios'; // 引入 axios

// 2.環境變數提取
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env; // 將 env 解構出來並重新命名使用

// 3.內部資源（排序：元件 -> 工具/樣式等）
import BootstrapStyleExampleComponent from './front-end/components/BootstrapStyleExampleComponent.jsx';
import HeaderFront from './front-end/layout/HeaderFront.jsx';
import FooterFront from './front-end/layout/FooterFront.jsx';
import CartPage from './front-end/pages/CartPage.jsx';

function App() {
  return (
    <>
      <HeaderFront />
      <CartPage />
      <div className="container">
        <BootstrapStyleExampleComponent />
      </div>
      <FooterFront />
    </>
  );
}

export default App;
