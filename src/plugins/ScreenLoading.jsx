// ScreenLoading 元件
// 此元件用於顯示全螢幕的 **載入動畫**，適合用於 AJAX 請求、資料加載、畫面切換時的過渡效果。

import ReactLoading from 'react-loading';
import 'animate.css';

import logo from '@/assets/img/illustration/logo-SANGHOOLI.svg';
import { useSelector } from 'react-redux';

const ScreenLoading = () => {
  const { globalLoading } = useSelector((state) => state.loading)
  return (
    <>
      { globalLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.8)',
            // backgroundColor: 'rgba(102, 47, 241, 0.8)',
            zIndex: 9999,
          }}
        >
          <div className="d-flex flex-column align-items-center">
            <img
              className="img-fluid animate__animated animate__pulse animate__infinite"
              src={logo}
              alt="logo-SANGHOOLI.svg"
              width={240}
              height={52}
            />
            <div className="d-flex">
              <span className="fs-7 fw-bold me-2"> Loading </span>
              <ReactLoading
                type="bubbles"
                color="#282828"
                width="1.5rem"
                height="1.5rem"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScreenLoading;
