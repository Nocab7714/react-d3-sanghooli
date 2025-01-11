// 前面放外部資源
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap'; // bootstrap 5 的方法請要使用在各別引入
import axios from 'axios'; // 引入 axios

// 後面放內部資源
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env; // 將 env 解構出來並重新命名使用
import SearchProduct from '../components/searchProduct.jsx';

function App() {
  console.clear();


  // bootstrap modal 測試
  const modalRef = useRef(null); // modal dom
  const myModal = useRef(null); // modal 實體
  useEffect(() => {
    myModal.current = new Modal(modalRef.current);
  }, []);
  const modalShow = () => {
    myModal.current.show();
  }
  const modalHide = () => {
    myModal.current.hide();
  }


  // axios 與 env 測試
  console.log(`成功取得環境變數資源：${baseUrl},${apiPath}`);
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://randomuser.me/api/');
      console.log('axios 成功引入並取得資料', res);
    })();
  }, []);

  
  return (
    <>
      <div className="container mt-5 ">
        <button type="button" className="btn btn-primary mb-5" onClick={modalShow}>
          測試開啟 modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          ref={modalRef}
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={modalHide}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={modalHide}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <SearchProduct/>
      </div>
    </>
  );
}

export default App;
