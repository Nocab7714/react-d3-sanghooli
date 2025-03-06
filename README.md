# SANGHOOLI 上厚禮 | 精選禮品購物平台

![SANGHOOLI 上厚禮](./public/img/og-image.png)

上厚禮是專為解決送禮煩惱而生的精選禮品電商平台。我們提供多元化的禮物選擇，從節慶、生日到紀念日，從個人禮品到企業贈禮，幫您挑選最貼心的禮物。精心包裝、快速配送，讓您的心意完美傳達，成為每個特別時刻的最佳選擇。

## 專案特點

- 豐富的禮品分類與選擇
- 個性化推薦系統
- 直覺易用的購物體驗
- 響應式設計，支援桌面與行動裝置
- 資料視覺化呈現（使用 D3.js 和 C3.js）
- 流暢的頁面轉場與互動效果

## 技術堆疊

本專案使用以下技術開發：

- **核心框架**：
  - [Vite](https://vitejs.dev/) `6.0.7` - 快速的前端構建工具
  - [React](https://react.dev/) `18.3.1` - 用戶界面構建庫
  - [Bootstrap](https://getbootstrap.com/) `5.3.3` - 響應式前端框架

- **狀態管理**：
  - [Redux](https://redux.js.org/) - 狀態管理容器
  - [Redux Toolkit](https://redux-toolkit.js.org/) - Redux 官方推薦的工具集

- **路由與表單**：
  - [React Router](https://reactrouter.com/) - 頁面路由管理
  - [React Hook Form](https://react-hook-form.com/) - 高效表單處理

- **數據處理與視覺化**：
  - [Axios](https://axios-http.com/) - HTTP 請求處理
  - [D3.js](https://d3js.org/) - 強大的數據視覺化庫
  - [C3.js](https://c3js.org/) - 基於 D3 的圖表庫

- **用戶體驗增強**：
  - [Swiper](https://swiperjs.com/) - 現代觸控滑動組件
  - [AOS](https://michalsnik.github.io/aos/) - 滾動動畫效果
  - [SweetAlert2](https://sweetalert2.github.io/) - 美觀的通知彈窗
  - [react-loading](https://www.npmjs.com/package/react-loading) - 加載動畫組件

- **其他工具**：
  - [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) - 動態管理文檔頭信息
  - [prop-types](https://www.npmjs.com/package/prop-types) - 組件屬性類型檢查

## 安裝與使用

### 前置需求

- Node.js 18.x 或更高版本
- npm 或 yarn 或 pnpm

### 安裝步驟

1. 克隆儲存庫
   ```bash
   git clone https://github.com/nocab7714/react-d3-sanghooli.git
   cd react-d3-sanghooli
   ```

2. 安裝依賴
   ```bash
   npm install
   # 或使用 yarn
   yarn install
   # 或使用 pnpm
   pnpm install
   ```

3. 啟動開發服務器
   ```bash
   npm run dev
   # 或使用 yarn
   yarn dev
   # 或使用 pnpm
   pnpm dev
   ```

4. 構建生產版本
   ```bash
   npm run build
   # 或使用 yarn
   yarn build
   # 或使用 pnpm
   pnpm build
   ```

## 預覽

開發模式下，應用程序默認運行在 http://localhost:5173

## 專案結構

```
react-d3-sanghooli/
├── dist/                 # 構建輸出目錄
├── node_modules/         # 相依套件
├── public/               # 靜態資源目錄
│   └── img/              # 圖片資源
├── src/                  # 源代碼目錄
│   ├── assets/           # 靜態資源
│   │   ├── img/          # 圖片資源
│   │   └── scss/         # SCSS 樣式
│   │       ├── base/     # 基礎樣式
│   │       ├── components/ # 元件樣式
│   │       ├── layout/   # 佈局樣式
│   │       └── pages/    # 頁面特定樣式
│   │           ├── back-end/ # 後台頁面樣式
│   │           └── front-end/ # 前台頁面樣式
│   ├── back-end/         # 後台管理系統
│   │   ├── components/   # 後台元件
│   │   ├── layout/       # 後台佈局
│   │   └── Pages/        # 後台頁面
│   ├── example/          # 範例代碼
│   ├── front-end/        # 前台介面
│   │   ├── components/   # 前台元件
│   │   ├── layout/       # 前台佈局
│   │   └── pages/        # 前台頁面
│   ├── plugins/          # 插件
│   ├── routes/           # 路由配置
│   ├── slice/            # Redux slice
│   ├── utils/            # 工具函數
│   ├── main.jsx          # 應用入口點
│   └── store.js          # Redux store 配置
├── .env                  # 環境變數
├── .gitignore            # Git 忽略文件
├── eslint.config.js      # ESLint 配置
├── index.html            # HTML 模板
└── README.md             # 專案說明文檔
```

## 貢獻者

- [YiJing](https://github.com/YJC0731)
- [LaryZenZen](https://github.com/LaryZenZen)
- [yujouwu](https://github.com/yujouwu)
- [Nocab Wang](https://github.com/Nocab7714)

## 相關連結

- 專案網站：[SANGHOOLI-上厚禮](https://nocab7714.github.io/react-d3-sanghooli/)
- 聯絡我們：[sanghooliD3@gmail.com](sanghooliD3@gmail.com)

---

© 2025 SANGHOOLI-上厚禮. 保留所有權利。
