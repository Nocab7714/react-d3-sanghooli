// 資源引入方式範例
// 1.外部資源（排序：React hooks -> 第三方工具庫）
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap'; // 引入 bootstrap 5 方法
import axios from 'axios'; // 引入 axios

// 2.環境變數提取
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env; // 將 env 解構出來並重新命名使用

// 3.內部資源（排序：元件 -> 工具/樣式等）
import SearchProductComponent from './components/SearchProductComponent.jsx';
import ModalTestComponent from './components/ModalTestComponent.jsx';
import AxiosTestComponent from './components/AxiosTestComponent.jsx';
import BootstrapStyleTestComponent from './components/BootstrapStyleTestComponent.jsx';

import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <>
      <div className="container mt-5 ">
        <h2>元件引入測試</h2>
        <p>記得不要急著拆元件，做完全部功能後再拆元件!!</p>
        {/* <ModalTestComponent /> */}
        {/* <SearchProductComponent /> */}
        {/* <AxiosTestComponent /> */}
        <BootstrapStyleTestComponent />
        <hr />
        <h2> 頁面引入測試</h2>
        {/* <HomePage /> */}
      </div>
    </>
  );
}

export default App;
