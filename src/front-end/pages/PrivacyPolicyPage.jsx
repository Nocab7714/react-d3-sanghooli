import React, { useState } from "react";
const PrivacyPolicyPage = () => {
    const [activeLink, setActiveLink] = useState("privacy-policy"); // 預設選中 "隱私權政策"
  
    const handleClick = (id) => {
      setActiveLink(id);
    };

    return(
        <>
        <div className="container">
        <div className="row">
          <div className="col d-flex mt-19 mb-10">
            {/* <!-- 麵包屑Breadcrumbs --> */}
            <p className="fs-6 me-4 text-neutral40">首頁</p>
            <span className="material-symbols-outlined text-neutral40">keyboard_double_arrow_right</span>
            <p className="fs-6 text-neutral80 ms-4">隱私權服務條款</p>
            </div>
            </div>
      </div>
            
        <div className="container">
        <div className="row">
          {/* <!-- 錨點anchor Timeline 區塊（左側），在手機版隱藏 --> */}
          <div className="col-md-4 rounded-3 d-flex d-none d-md-block">
            <div className="timeline ps-10">
                <a href="#privacy-policy" 
                className={`timeline-item fs-5 mt-4 mb-4 ms-6 me-6 ${ activeLink === "privacy-policy" ? "active" :'' }`}
                onClick={() => handleClick('privacy-policy')} > 隱私權政策 </a>
                <a href="#service-policy" 
                className={`timeline-item fs-5 mt-4 mb-4 ms-6 me-6 ${activeLink === "service-policy" ? "active" : ""}`}
                onClick={() => handleClick("service-policy")} > 服務條款 </a>
            </div>
          </div>

          <div className="col-md-8 ps-5 mb-19 col-12">
            {/* <!-- 資訊說明區塊（右側） --> */}
            <h4 id="privacy-policy">隱私權政策</h4>
            <p className="fs-6 text-neutral60 mb-6 mt-6">我們深知您的隱私對您至關重要，因此致力於保護您的個人資料安全。以下為我們的隱私權政策概要：</p>
            <ol className="ordered-list fs-6">
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">資料蒐集</strong>
                    <p className="mt-2 mb-2">在您使用本網站時，我們可能會蒐集以下資訊：</p>
                    <ul>
                        <li className="mt-2 mb-2"><strong className="text-black">基本資訊：</strong> 
                        如姓名、聯絡方式、配送地址等，僅用於處理訂單及配送商品。</li>
                        <li className="mt-2 mb-2"><strong className="text-black">付款資訊：</strong> 
                        如信用卡號碼或支付帳戶資訊，我們不會儲存此類資料，交易由第三方支付平台安全處理。</li>
                        <li><strong className="text-black">網站互動數據：</strong> 
                        如瀏覽紀錄、點擊行為等，僅用於優化用戶體驗。</li>
                    </ul>
                </li>

                <li className="mb-2 mt-6 text-neutral60">
                    <strong className="text-black">資料使用</strong>
                    <p className="mt-2 mb-2">我們將蒐集的資訊用於以下目的：</p>
                    <ul>
                        <li className="mt-2 mb-2"> 確保您的訂單準時送達並通知相關進度。</li>
                        <li className="mt-2 mb-2">提供更精準的商品推薦和促銷活動。</li>
                        <li>維護網站安全性及改善服務品質。</li>
                    </ul>
                </li>

                <li className="mb-2 mt-6 text-neutral60">
                    <strong className="text-black">資料分享</strong>
                    <p className="mt-2 mb-2">我們絕不會向第三方出售您的個人資料。僅在以下情況下分享您的資訊：</p>
                    <ul>
                        <li className="mt-2 mb-2"> 為完成配送或付款需求與合作夥伴（如物流公司或支付平台）共享必要資訊。</li>
                        <li className="mt-2 mb-2"> 法律要求或執行合法權益時。</li>
                    </ul>
                </li>

                <li className="mb-2 mt-6 text-neutral60">
                    <strong className="text-black">資料安全</strong>
                    <p className="mt-2 mb-2">我們採用業界領先的加密技術及安全措施，確保您的個人資料不被未授權存取或洩露。</p>
                </li>

                <li className="mb-2 mt-6 text-neutral60">
                    <strong className="text-black">您的權利</strong>
                    <p className="mt-2 mb-2">您可隨時要求查詢、更正或刪除您的個人資料。如需協助，請聯繫我們的客服團隊。</p>
                </li>
            </ol>


            <h4 id="service-policy" className="mt-20 mb-6">服務條款</h4>
            <ol className="ordered-list fs-6">
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">接受條款</strong> 
                    <p className="mt-2 mb-4">當您使用本網站服務，即表示您已閱讀並同意本服務條款。若您不同意，請勿繼續使用本網站。</p>
                </li>
                
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">服務範圍</strong>
                    <p className="mt-2 mb-4">我們提供的服務包括但不限於：商品展示、線上購物、禮物配送及相關客製化服務。本網站有權隨時調整服務內容，恕不另行通知。</p>
                </li>

                <li className="mb-2 text-neutral60">
                    <strong className="text-black">用戶義務</strong>
                    <ul>
                        <li className="mt-2 mb-2">提供正確的個人資訊以完成訂單處理。</li>
                        <li className="mt-2 mb-4">禁止以非法或不當方式使用本網站，包括但不限於攻擊網站、散播惡意程式等行為。</li>
                    </ul>
                </li>
                <li className="mb-2 text-neutral60">
                    <strong className="text-black">訂單處理</strong>
                    <ul>
                        <li className="mt-2 mb-2"> 訂單一經確認即進入處理流程，若需修改或取消，請於訂單未出貨前聯繫客服。</li>
                        <li className="mt-2 mb-4"> 若因供應商或其他不可抗力因素導致商品無法供應，我們將主動通知並安排退款或替代方案。</li>
                    </ul>
                </li>

                <li className="mb-2 text-neutral60">
                    <strong className="text-black">責任限制</strong>
                    <p className="mt-2 mb-4">我們承諾盡力提供準確的商品資訊與服務，但不保證完全無誤，若有疑慮請聯繫客服。我們對因不可抗力（如天災、交通延誤等）導致的損失不負責。</p>
                </li>

                <li className="mb-2 text-neutral60">
                    <strong className="text-black">條款修改</strong>
                    <p className="mt-2 mb-4">本網站保留隨時修改服務條款的權利，最新版本將公佈於本頁面。繼續使用本網站即表示您接受修訂後的條款。</p>
                </li>
            </ol>
            <p className="text-neutral60 mt-10">如對隱私權政策或服務條款有任何疑問，歡迎隨時聯繫我們的客服團隊！</p>

          </div>
        </div>
      </div>
      
      </>
    );
  };
  
  export default PrivacyPolicyPage;