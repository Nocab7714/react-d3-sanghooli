const HeaderFront = () => {
  return (
    <>
      {/* 未登入狀態 navbar */}
      {/* <nav
        className="navbar navbar-expand-md bg-white fixed-top"
          style={{ paddingTop: '14px', paddingBottom: '14px' , boxShadow: '0px 0px 12px 0px #00000014'}}
      >
        <div className="container">
          <a className="navbar-brand py-0" href="#">
            <img
              className="d-block d-md-none"
              src="/src/assets/img/illustration/logo-SANGHOOLI.svg"
              alt="SANGHOOLI Logo"
              width='148'
              height='32'
            />
            <img
              className="d-none d-md-block"
              src="/src/assets/img/illustration/logo-SANGHOOLI.svg"
              alt="SANGHOOLI Logo"
              width='240'
              height='52'
            />
          </a>

          <ul className="navbar-nav flex-row">
            <li className="nav-item me-2 me-md-4">
              <a href="#" className="btn btn-outline-neutral60">
                登入
              </a>
            </li>
            <li className="nav-item  position-relative me-4 me-md-1">
              <a className="nav-link link-neutral80" href="#">
                <span className="material-symbols-outlined align-middle fs-3 ">
                  favorite
                </span>
                <span
                  className="position-absolute translate-middle badge rounded-pill text-bg-secondary text-white z-3"
                  style={{ top: '8px' }}
                >
                  99+
                </span>
              </a>
            </li>
            <li className="nav-item position-relative me-4">
              <a className="nav-link link-neutral80" href="#">
                <span className="material-symbols-outlined align-middle fs-3 ">
                  local_mall
                </span>
                <span
                  className="position-absolute translate-middle badge rounded-pill text-bg-secondary text-white z-3"
                  style={{ top: '8px' }}
                >
                  1
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav> */}
      {/* 登入狀態 navbar */}
      <nav
        className="navbar navbar-expand-md bg-white shadow-sm fixed-top"
        style={{ paddingTop: '14px', paddingBottom: '14px' , boxShadow: '0px 0px 12px 0px #00000014'}}
      >
        <div className="container">
          <a className="navbar-brand py-0" href="#">
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
          </a>
          <ul className="navbar-nav flex-row">
          <li className="nav-item  position-relative me-4 me-md-1">
              <a className="nav-link link-neutral80" href="#">
                <span className="material-symbols-outlined material-filled align-middle fs-3 ">face</span>
                <span className=" align-middle ms-2 d-none d-md-inline-block"> 周大俠 先生</span>
              </a>
            </li>
            <li className="nav-item  position-relative me-4 me-md-1">
              <a className="nav-link link-neutral80" href="#">
                <span className="material-symbols-outlined align-middle fs-3 ">
                  favorite
                </span>
                <span
                  className="position-absolute translate-middle badge rounded-pill text-bg-secondary text-white z-3"
                  style={{ top: '8px' }}
                >
                  99+
                </span>
              </a>
            </li>
            <li className="nav-item position-relative me-4">
              <a className="nav-link link-neutral80" href="#">
                <span className="material-symbols-outlined align-middle fs-3 ">
                  local_mall
                </span>
                <span
                  className="position-absolute translate-middle badge rounded-pill text-bg-secondary text-white z-3"
                  style={{ top: '8px' }}
                >
                  1
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* 補足 navbar 設定 fixed top 的空間 */}
      <div className="d-none d-md-block" style={{ height: '80px' }}></div>
      <div className="d-block d-md-none" style={{ height: '73.4px' }}></div>
    </>
  );
};

export default HeaderFront;
