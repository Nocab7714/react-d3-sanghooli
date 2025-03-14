import { NavLink, Link } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";

import logo from "@/assets/img/illustration/backendlogo-SANGHOOLI.webp";
import MarqueeTextBacked from "./MarqueeTextBacked";
import { AdminAuthContext } from "../../context/AdminAuthContext";

//定義未登入與登入的選單（路由）
const guestRoutes = [{ path: "/", name: "網站前台" }];
const loggedInRoutes = [
  { path: "/admin/orders", name: "訂單管理" },
  { path: "/admin/products", name: "商品管理" },
  { path: "/admin/coupon", name: "優惠券管理" },
];

const HeaderBacked = () => {
  // 控制修正 header 使用 fix top 的高度使用
  const headerRef = useRef(null); // 定義 ref
  const [headerHeight, setHeaderHeight] = useState(0);

  // ✅ 透過 Context 獲取登入狀態 & 登出函數
  const { isLoggedIn, handleLogout } = useContext(AdminAuthContext);

  // 計算 navbar 高度，確保下方區塊有足夠的間距
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
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
            paddingTop: "14px",
            paddingBottom: "14px",
            boxShadow: "0px 0px 12px 0px #00000014",
          }}
        >
          {/* 品牌 LOGO */}
          <div className="container-fluid">
            <Link
              className="navbar-brand py-0 active d-flex align-items-center ms-10"
              to={isLoggedIn ? "/admin/orders" : "/admin/login"} // 根據登入狀態變換路徑
            >
              <img
                className="d-block d-md-none"
                src={logo}
                alt="SANGHOOLI Logo"
                height="80"
              />
              <img
                className="d-none d-md-block"
                src={logo}
                alt="SANGHOOLI Logo"
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
                {/* 根據登入狀態顯示不同選單，登入狀態 navbar 顯示_使用 .map() 渲染導覽列按鈕 */}
                {(isLoggedIn ? loggedInRoutes : guestRoutes).map((item) => (
                  <li
                    key={item.path}
                    className="nav-item position-relative me-4 me-md-1 adminNav-deco gap-3 py-2"
                  >
                    {/* NavLink負責頁面切換： */}
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `d-inline-block fs-6 link-neutral60 px-4 py-3 mx-0 mx-md-1 gap-3 ${
                          isActive ? "active" : ""
                        }`
                      }
                      aria-current="page"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}

                {/* 登出按鈕 */}
                <li className="nav-item align-items-center">
                  {isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary pe-8 ps-8"
                    >
                      登出
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* 下方區塊用於補足 navbar 設定 fixed top 的空間 */}
      <div style={{ marginTop: `${headerHeight}px` }}></div>
    </>
  );
};

export default HeaderBacked;
