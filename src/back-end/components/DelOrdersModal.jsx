import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

//環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

const DelOrdersModal = ({
  tempOrder,
  isOpen,
  setIsOpen,
  getOrders,
  deleteMode,
}) => {
  const navigate = useNavigate(); // 檢查使用者登入狀態

  // 檢查用戶是否登入
  const checkUserLogin = async () => {
    try {
      await axios.post(`${baseUrl}/api/user/check`);
    } catch (error) {
      alert("請先登入");
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)D3Token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token; //設定 axios token
    checkUserLogin(); // 檢查用戶登入狀態
    getOrders(); // 頁面載入時獲取訂單
  }, []);

  const delOrdersModalRef = useRef(null); // 透過 useRef 取得刪除確認 Modal 的 DOM

  // 初始化 Bootstrap Modal
  useEffect(() => {
    const modalInstance = new Modal(delOrdersModalRef.current, {
      backdrop: false,
    });

    if (isOpen) {
      modalInstance.show();
    } else {
      modalInstance.hide();
    }
  }, [isOpen]);

  // 點擊 Modal 關閉按鈕
  const handleCloseDelOrdersModal = () => {
    const modalInstance = Modal.getInstance(delOrdersModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  // 刪除訂單通用函數
  const removeOrder = async (url) => {
    try {
      await axios.delete(url);
      getOrders(); // 更新訂單列表
    } catch (error) {
      alert("刪除訂單失敗，請再試一次");
    }
  };

  // 單筆訂單刪除
  const handleDeleteOrderItem = () => {
    const url = `${baseUrl}/api/${apiPath}/admin/order/${tempOrder.id}`;
    removeOrder(url);
    handleCloseDelOrdersModal();
  };

  // 刪除所有訂單
  const handleDeleteOrdersList = () => {
    const url = `${baseUrl}/api/${apiPath}/admin/orders/all`;
    removeOrder(url);
    handleCloseDelOrdersModal();
  };

  return (
    <>
      {/* 刪除訂單（按鈕） Modal */}
      <div
        ref={delOrdersModalRef}
        className="modal fade"
        id="delOrdersModalRef"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <span className="material-symbols-outlined p-1">delete</span>
              <h4 className="modal-title">刪除訂單</h4>
              <button
                onClick={handleCloseDelOrdersModal}
                type="button"
                className="btn-close active"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mt-5 mb-5 text-center">
              {deleteMode === "single" ? (
                <>
                  確定要刪除這筆編號：
                  <span className="fw-bold text-secondary">
                    {tempOrder?.id}
                  </span>{" "}
                  訂單嗎？
                </>
              ) : (
                <>
                  確定要刪除
                  <span className="fw-bold text-secondary p-1 fs-5">
                    所有訂單
                  </span>
                  嗎？
                  <p className="p-1 mt-1">
                    此操作就像變了新的女友回不來喔（ 無法復原 ）!!
                  </p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCloseDelOrdersModal}
                type="button"
                className="btn btn-outline-neutral60 mt-3 mb-3"
              >
                取消
              </button>
              <button
                onClick={
                  deleteMode === "single"
                    ? handleDeleteOrderItem
                    : handleDeleteOrdersList
                }
                type="button"
                className="btn btn-danger mt-3 mb-3"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DelOrdersModal;
