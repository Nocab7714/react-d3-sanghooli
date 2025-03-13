import { NavLink, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/img/illustration/backendlogo-SANGHOOLI.png';
import MarqueeTextBacked from "./MarqueeTextBacked";

//定義未登入與登入的選單（路由）
const guestRoutes = [{ path: '/', name: '網站前台' }];
const loggedInRoutes = [
{ path: '/admin/orders', name: '訂單管理' },
{ path: '/admin/products', name: '商品管理' },
{ path: '/admin/coupon', name: '優惠券管理' },
];


const HeaderBacked = ()=>{

  // 控制修正 header 使用 fix top 的高度使用
  const headerRef = useRef(null);  // 定義 ref
  const [headerHeight, setHeaderHeight] = useState(0);

  //新增、控制登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // 根據 `isLoggedIn` 動態切換選單
  const menuItems = isLoggedIn ? [...guestRoutes, ...loggedInRoutes] : guestRoutes;

  const navigate = useNavigate();

  // 計算 navbar 高度，確保下方區塊有足夠的間距
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // 處理登入與登出
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/admin/orders'); // 只在登入頁才跳轉
};
  
  // 登出時重設狀態並回到首頁  
  const handleLogout = () => {
      setIsLoggedIn(false);
      navigate('/admin/login'); // 登出後回後台首頁
  };

  return(
   <>
    {/* 固定在頂部的 Navbar：登入狀態 navbar */}
    <div className="fixed-top">
      <MarqueeTextBacked
            headerRef={headerRef}
            headerHeight={headerHeight}
            setHeaderHeight={setHeaderHeight}
        />
        <nav
          ref={headerRef}
          className="navbar navbar-expand-md bg-white shadow-sm "
          style={{
            paddingTop: '14px',
            paddingBottom: '14px',
            boxShadow: '0px 0px 12px 0px #00000014',
          }}
        >
          {/* 品牌 LOGO */}
          <div className="container-fluid">
            <Link className="navbar-brand py-0 active d-flex align-items-center" to="/admin/login">
              <img
                className="d-block d-md-none"
                src={logo}
                alt="SANGHOOLI Logo"
                // width="148"
                height="80"
              />
              <img
                className="d-none d-md-block"
                src={logo}
                alt="SANGHOOLI Logo"
                // width="240"
                height="78"
              />
            </Link>

            {/* 漢堡選單按鈕 */}
            <button
              className="navbar-wrapper navbar-toggler bg-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* 導覽列內容 */}
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="header-Backedpage-links list-unstyled d-flex flex-column flex-md-row align-items-center my-4 my-md-6 ms-auto">
                
                {/* 根據登入狀態決定顯示哪些選單:登入狀態 navbar 顯示_使用 .map() 渲染導覽列按鈕 */}
                {(isLoggedIn ? loggedInRoutes : guestRoutes).map((item) => (
                  <li key={item.path} className="nav-item position-relative me-4 me-md-1 adminNav-deco gap-3 py-2">
                  
                    {/* NavLink負責頁面切換： */}
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        `d-inline-block fs-6 link-neutral60 px-4 py-3 mx-0 mx-md-1 gap-3 ${isActive ? 'active' : ''}`
                      }
                      aria-current="page" 
                    >
                        {item.name}
                    </NavLink>
                  </li>
                  )
                )}

                {/* 測試用的登入/登出按鈕 */}
                  <li className="nav-item align-items-center">
                  <button 
                    className="btn btn-primary material-symbols-outlined pe-8 ps-8" 
                    onClick={isLoggedIn ? handleLogout : handleLogin}>
                    {isLoggedIn ? '登出' : '施工中'}
                  </button>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>

    {/* 下方區塊用於補足 navbar 設定 fixed top 的空間 */}
    <div style={{ marginTop: `${headerHeight}px`}}></div>

   </>
  );
};

export default HeaderBacked