// 外部資源
import React, { useState } from "react";
import BreadcrumbComponent from '../components/BreadcrumbComponent.jsx';


//視 麵包屑breadcrumb 階層保留對應資料
const breadcrumbItem = [
  {
    page: '首頁',
    link: '#',
  },
  {
    page: '購物流程與常見Q&A',
    link: '#',
  },
];


const HowToBuyPage = () => {
  
    const [activeLink, setActiveLink] = useState("shipping"); // 預設選中 "配送方式"
  
    const handleClick = (id) => {
      setActiveLink(id);
    };

    return(
        <>
        <div className="container">
        <div className="row">
          <div className="col d-flex mt-19 mb-10">
            
            {/* <!-- 麵包屑Breadcrumbs --> */}
            <BreadcrumbComponent  breadcrumbItem={breadcrumbItem} />

            </div>
            </div>
      </div>
            
        <div className="container">
        <div className="row">
          {/* <!-- 錨點anchor Timeline 區塊（左側），在手機版隱藏 --> */}
          <div className="col-md-4 rounded-3 d-flex d-none d-md-block">
            <div className="timeline ps-10">
                <a href="#shipping" 
                className={`timeline-item fs-5 mt-4 mb-4 ms-6 me-6 ${ activeLink === "shipping" ? "active" :'' }`}
                onClick={() => handleClick('shipping')} > 配送方式 </a>
                <a href="#return-policy" 
                className={`timeline-item fs-5 mt-4 mb-4 ms-6 me-6 ${activeLink === "return-policy" ? "active" : ""}`}
                onClick={() => handleClick("return-policy")} > 退換貨規則 </a>
            </div>
          </div>

          <div className="col-md-8 ps-5 mb-19 mt-4 col-12">
            {/* <!-- 資訊說明區塊（右側） --> */}
            <h4 id="shipping">配送方式</h4>
            <p className="fs-6 text-neutral60 mb-6 mt-6">我們提供靈活的配送選項，確保禮物準時送達：</p>
            <ol className="ordered-list fs-6">
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">標準配送：</strong> 
                    訂單確認後 3-5 個工作日內送達，適合計劃送禮的場合。</li>
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">快速配送：</strong>
                    當天出貨，最快 24 小時內送達（僅限部分地區）。</li>
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">指定日期配送：</strong>
                    選擇您希望的日期，精準將禮物送到收禮人手中。</li>
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">國際配送：</strong>
                    支持部分國家和地區，讓禮物跨越距離傳遞心意。</li>
                <li className="text-neutral60">所有商品都將採用安全包裝，確保完整無損地送到您手中。</li>
            </ol>

            <h4 id="return-policy" className="mt-19">退換貨規則</h4>
            <p className="fs-6 text-neutral60 mb-6 mt-6">我們致力於提供滿意的購物體驗，若需退換貨請參考以下規則：</p>
            <ol className="ordered-list fs-6">
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">退換貨期限：</strong> 
                    收到商品後 7 天內可申請退換貨（以簽收日為準）。</li>
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">申請條件：</strong>
                    商品需保持全新狀態，包含完整包裝、吊牌及附贈品。</li>
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">退換貨流程：</strong>
                    <ul>
                        <li className="mt-2 mb-2">聯繫客服提供訂單編號及問題說明。</li>
                        <li>客服確認後提供退貨地址或安排換貨處理。</li>
                    </ul>
                </li>
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">不適用退換貨情況：</strong>
                    <ul>
                        <li className="mt-2 mb-2" >個人化商品（如客製卡片）不接受退換，除非產品有明顯瑕疵。</li>
                        <li>因個人使用不當導致的損壞恕不受理。</li>
                    </ul>
                </li>
                <li className="text-neutral60">如需協助，歡迎隨時聯繫我們的客服團隊，我們將竭誠為您服務！</li>
            </ol>
          </div>
        </div>
      </div>
      
      </>
    );
  };
  
  export default HowToBuyPage;