import { useState, useRef } from 'react';
import MarqueeText from './MarqueeText';
import { Link, NavLink } from 'react-router-dom';

const HeaderFront = () => {
  // 控制修正 header 使用 fix top 的高度使用
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <div className="fixed-top">
        <MarqueeText
          headerRef={headerRef}
          headerHeight={headerHeight}
          setHeaderHeight={setHeaderHeight}
        />
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
            <Link className="navbar-brand py-0" to="/">
              <img
                className="d-block d-md-none"
                src="/src/assets/img/illustration/logo-SANGHOOLI.svg"
                alt="SANGHOOLI Logo"
                width="148"
                height="32"
              />
              <img
                className="d-none d-md-block"
                src="/src/assets/img/illustration/logo-SANGHOOLI.svg"
                alt="SANGHOOLI Logo"
                width="240"
                height="52"
              />
            </Link>
            <ul className="navbar-nav flex-row">
              {/* 未登入狀態 navbar 顯示 - 登入按鈕*/}
              {/* <li className="nav-item me-2 me-md-4">
                <NavLink to="/" className="btn btn-outline-neutral60">
                  登入
                </NavLink>
              </li> */}
              {/* 登入狀態 navbar 顯示 - 會員名稱*/}
              <li className="nav-item  position-relative me-4 me-md-1">
                <NavLink className="nav-link link-neutral80" to="/">
                  <span className="material-symbols-outlined material-filled align-middle fs-3 ">
                    face
                  </span>
                  <span className=" align-middle ms-2 d-none d-md-inline-block">
                    周大俠 先生
                  </span>
                </NavLink>
              </li>
              <li className="nav-item  position-relative me-4 me-md-1">
                <NavLink className="nav-link link-neutral80" to="/">
                  <span className="material-symbols-outlined align-middle fs-3 ">
                    favorite
                  </span>
                  {/* 願望清單項目數量 badge */}
                  {/* <span
                    className="position-absolute translate-middle badge rounded-pill text-bg-secondary text-white z-3"
                    style={{ top: '8px' }}
                  >
                    99+
                  </span> */}
                </NavLink>
              </li>
              <NavLink className="nav-item position-relative me-4">
                <a className="nav-link link-neutral80" to="/">
                  <span className="material-symbols-outlined align-middle fs-3 ">
                    local_mall
                  </span>
                  {/* 購物車項目數量 badge */}
                  {/* <span
                    className="position-absolute translate-middle badge rounded-pill text-bg-secondary text-white z-3"
                    style={{ top: '8px' }}
                  >
                    1
                  </span> */}
                </a>
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
      {/* 下方區塊用於補足 navbar 設定 fixed top 的空間 */}
      <div style={{ marginTop: `${headerHeight}px` }}></div>
    </>
  );
};

export default HeaderFront;
