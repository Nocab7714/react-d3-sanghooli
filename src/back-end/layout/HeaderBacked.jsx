import { NavLink, Outlet , Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import logo from '@/assets/img/illustration/backendlogo-SANGHOOLI.png';


const routes = [
  { 
    path: '/', 
    name: '回到首頁' 
  },
  // {
  //   name: '訂單管理',
  //   link: '/admin/order',
  // },
  // {
  //   name: '商品管理',
  //   link: '/admin/product',
  // },
  // {
  //   name: '優惠券管理',
  //   link: '/admin/product',
  // },
];


const HeaderBacked = ()=>{

  const headerRef = useRef(null);  // 定義 ref
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //新增登入狀態

  // 計算 navbar 高度，確保下方區塊有足夠的間距
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // 定義未登入與登入的路由
  const guestRoutes = [{ path: '/', name: '回到首頁' }];
  const loggedInRoutes = [
    { path: '/admin/order', name: '訂單管理' },
    { path: '/admin/product', name: '商品管理' },
    { path: '/admin/coupon', name: '優惠券管理' },
  ];

  return(
  <>
    <div className="fixed-top">
        {/* 登入狀態 navbar */}
        <nav
          ref={headerRef}
          className="navbar navbar-expand-md bg-white shadow-sm "
          style={{
            paddingTop: '14px',
            paddingBottom: '14px',
            boxShadow: '0px 0px 12px 0px #00000014',
          }}
        >
          <div className="container">
            <Link className="navbar-brand py-0 active" to="/admin/login">
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

            <ul className="header-Backedpage-links list-unstyled d-flex flex-column flex-md-row align-items-center my-4 my-md-6">
              {/* 根據登入狀態決定顯示哪些選單:登入狀態 navbar 顯示_使用 .map() 渲染導覽列按鈕 */}
              {(isLoggedIn ? loggedInRoutes : guestRoutes).map((route) => (
                <li key={route.path} className="nav-item position-relative me-4 me-md-1">
                
                  {/* NavLink負責頁面切換： */}
                  <NavLink 
                    to={routes.path}
                    className="d-inline-block fs-6 link-neutral60 px-4 py-3 mx-0 mx-md-1" 
                    aria-current="page" 
                  >
                      {routes.name}
                  </NavLink>
                </li>
                )
              )}

              {/* 測試用的登入/登出按鈕 */}
                <li className="nav-item ms-4">
                  <NavLink to='/'
                    className="btn material-symbols-outlined"
                    onClick={() => setIsLoggedIn(!isLoggedIn)}
                  >
                    {isLoggedIn ? '登出' : '回到首頁'}
                  </NavLink>
                </li>
            </ul>
          </div>
        </nav>
    </div>
      {/* 下方區塊用於補足 navbar 設定 fixed top 的空間 */}
      <div style={{ marginTop: `${headerHeight}px` }}></div>
    
      <Outlet/>
    </>
  );
};

export default HeaderBacked