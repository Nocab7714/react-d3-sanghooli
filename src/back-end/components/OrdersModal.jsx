import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { createToast } from "../../slices/toastSlice";
import { asyncSetLoading } from "../../slices/loadingSlice";

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

const OrdersModal = ({
  modalMode,
  tempOrder,
  isOpen,
  setIsOpen,
  getOrders,
}) => {
  //不希望Modal改到tempProduct：再建立新的狀態，預設值帶入tempProduct
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState(tempOrder || {});
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const ordersModalRef = useRef(null); //透過 useRef 取得 DOM：以下為將OrdersModal 邏輯對應的函式動作
  const modalInstance = useRef(null);

  // 訂單狀態選項
  const isPaidOptions = [
    { value: true, label: "已付款" },
    { value: false, label: "未付款" },
  ];

  //只在 isOpen 開啟時，才確保 modalData 會更新
  useEffect(() => {
    if (isOpen && tempOrder) {
      setModalData({
        ...tempOrder,
        is_paid: Boolean(tempOrder.is_paid), // 確保 is_paid 是布林值
        messages: tempOrder.messages ?? "", // 確保 messages 不為 null
      });
    }
  }, [isOpen, tempOrder]);

  //Modal實例初始化
  useEffect(() => {
    modalInstance.current = new Modal(ordersModalRef.current, {
      backdrop: false, // 點擊Modal灰色區塊不進行關閉
    });
  }, []);

  //新增useEffect 判斷Modal開關狀態:如果是「開」的判斷式，並且在陣列帶入[isOpen]
  useEffect(() => {
    if (isOpen && modalInstance.current) {
      modalInstance.current.show();
    } else if (!isOpen && modalInstance.current) {
      modalInstance.current.hide();
    }
  }, [isOpen]); //當isOpen有更新時， 判斷是否需要開modal

  const handleModalInputChange = (e) => {
    const { value, name } = e.target;
    const newValue = name === "is_paid" ? value === "true" : value;

    setModalData((prevData) => ({
      ...prevData,
      ...(name === "message"
        ? { [name]: newValue }
        : name === "is_paid"
        ? { [name]: newValue }
        : {
            user: {
              ...(prevData.user || {}), // 確保 user 存在
              [name]: newValue,
            },
          }),
    }));
  };

  // 取得訂單詳細資料
  const fetchOrderDetails = async (orderId) => {
    try {
      const res = await axios.get(`${baseUrl}/api/${apiPath}/order/${orderId}`);
      if (res.data?.order) {
        setModalData({
          ...res.data.order,
          is_paid: Boolean(res.data.order.is_paid),
          messages: res.data.order.messages ?? "",
          user: {
            name: res.data.order.user?.name || "",
            tel: res.data.order.user?.tel || "",
            email: res.data.order.user?.email || "",
            address: res.data.order.user?.address || "",
          },
        });
      }
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "取得訂單資料失敗！",
        })
      );
    }
  };

  // 監聽 modal 開啟時獲取訂單資料
  useEffect(() => {
    if (isOpen && tempOrder?.id) {
      fetchOrderDetails(tempOrder.id);
    }
  }, [isOpen, tempOrder?.id]);

  //* 串接編輯商品 API */
  const updateOrder = async () => {
    dispatch(asyncSetLoading(["sectionLoading", true]));
    setIsScreenLoading(true);
    try {
      const res = await axios.put(
        `${baseUrl}/api/${apiPath}/admin/order/${modalData.id}`,
        {
          data: {
            ...modalData,
            is_paid: Boolean(modalData.is_paid), // 確保 is_paid 是布林值
          },
        }
      );
      await getOrders(); // 重新取得訂單列表
      dispatch(
        createToast({
          success: true,
          message: "訂單已成功更新！",
        })
      );
      handleCloseOrdersModal();
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "更新訂單失敗！",
        })
      );
    } finally {
      dispatch(asyncSetLoading(["sectionLoading", false]));
      setIsScreenLoading(false);
    }
  };

  // 更新 tages 的 onChange 處理
  const handleTagChange = (event) => {
    const { value, checked } = event.target;

    setModalData((prevData) => ({
      ...prevData,
      tages: checked
        ? [...(prevData?.tages || []), value] // 如果被勾選，新增進去，並確保 prevData?.tages 不為 undefined
        : prevData?.tages?.filter((tag) => tag !== value) || [], // 否則移除，且避免 `filter` 出錯
    }));
  };

  // 點擊Modal 的「確認」按鈕條件
  const handlUpdateOrders = async () => {
    try {
      await updateOrder();
      setModalData((prev) => ({
        ...prev,
        is_paid: Boolean(prev.is_paid),
      }));

      dispatch(
        createToast({
          success: true,
          message: "訂單已成功更新！",
        })
      );
      handleCloseOrdersModal();
    } catch (error) {
      // 失敗時僅顯示錯誤訊息，不關閉 Modal
      dispatch(
        createToast({
          success: true,
          message: "更新訂單失敗，請檢查輸入內容！",
        })
      );
    }
  };

  // 點擊Ｍodal的取消＆Ｘ按鈕會進行關閉
  const handleCloseOrdersModal = () => {
    const modalInstance = Modal.getInstance(ordersModalRef.current);
    //拿到Modal實例後，即可透過modalInstance.hide(); 關閉Modal
    modalInstance.hide();
    setIsOpen(false); //判斷Modal開關狀態:如果是「關」的調整方式
  };

  return (
    <>
      <div
        ref={ordersModalRef}
        id="ordersModal"
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              {/* 調整訂單 Modal 的標題、傳入的值 */}
              <h5 className="modal-title fs-4"> 編輯訂單</h5>
              <button
                onClick={handleCloseOrdersModal}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>

            {/* 訂單內容 */}
            <div className="modal-body p-8">
              <div className="row gx-4 gx-md-6 mb-4 mb-lg-6">
                {/* 訂單狀態 */}
                <div className="mt-3 mb-3">
                  <h3 className="card-title fs-5 text-primary-dark border-bottom border-neutral40 fw-semibold pb-4 mb-4">
                    訂單狀態
                  </h3>
                </div>
                <div className="col-6 col-md-4">
                  <label htmlFor="order_id" className="form-label">
                    訂單編號
                  </label>
                  <input
                    value={modalData?.id || ""}
                    name="id"
                    id="order_id"
                    type="text"
                    className="form-control text-neutral40"
                    placeholder="訂單編號"
                    readOnly
                  />
                </div>

                <div className="col-6 col-md-4">
                  <label htmlFor="create_at" className="form-label">
                    訂單成立時間
                  </label>
                  <input
                    value={new Date(
                      modalData?.create_at * 1000
                    ).toLocaleString()}
                    name="create_at"
                    id="create_at"
                    type="text"
                    className="form-control text-neutral40"
                    placeholder="訂單成立時間"
                    readOnly
                  />
                </div>

                <div className="col-6 col-md-4">
                  <label htmlFor="is_paid" className="form-label">
                    付款狀態
                  </label>
                  <select
                    className="form-select"
                    name="is_paid"
                    value={String(modalData?.is_paid)}
                    onChange={handleModalInputChange} // 確保更新布林值
                  >
                    {isPaidOptions.map((option) => (
                      <option key={option.value} value={String(option.value)}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 訂購人資訊 */}
                <h3 className="card-title fs-5 text-primary-dark border-bottom border-neutral40 fw-semibold pb-4 mb-4 mt-10">
                  購買收件資訊
                </h3>

                <div className="pb-3">
                  <form className="border-bottom border-neutral40 border-lg-0">
                    <div className="row g-3">
                      <div className="col-12 col-md-4">
                        <label htmlFor="user_name" className="form-label">
                          姓名
                        </label>
                        <input
                          value={modalData?.user?.name || ""}
                          onChange={handleModalInputChange}
                          name="name"
                          id="user_name"
                          type="text"
                          className="form-control"
                          placeholder="請輸入您的真實姓名"
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="user_tel" className="form-label">
                          聯絡電話
                        </label>
                        <input
                          value={modalData?.user?.tel || ""}
                          onChange={handleModalInputChange}
                          name="tel"
                          id="user_tel"
                          type="text"
                          className="form-control"
                          placeholder="請輸入您的手機號碼"
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="user_email" className="form-label">
                          聯絡郵箱
                        </label>
                        <input
                          value={modalData?.user?.email || ""}
                          onChange={handleModalInputChange}
                          name="email"
                          id="user_email"
                          type="text"
                          className="form-control"
                          placeholder="EX:example@sanghooli.com"
                        />
                      </div>

                      <div className="col-12 col-md-12 mt-5 ">
                        <label htmlFor="user_address" className="form-label">
                          收件地址
                        </label>
                        <input
                          value={modalData?.user?.address || ""}
                          onChange={handleModalInputChange}
                          name="address"
                          id="user_address"
                          type="text"
                          className="form-control"
                          placeholder="請輸入方便接收商品配送的指定地址"
                        />
                      </div>

                      <div className="col-12 col-md-12 mt-5 ">
                        <label htmlFor="user_message" className="form-label">
                          訂單備註
                        </label>
                        <textarea
                          value={modalData?.message || ""}
                          onChange={handleModalInputChange}
                          name="message"
                          id="user_messages"
                          type="text"
                          className="form-control"
                          rows={4}
                          placeholder="提供給SANGHOOI管理者的訂購商品客製化細節訊息"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                {/* 訂購清單 */}
                <div className="mt-10 mb-3">
                  <h3 className="card-title fs-5 text-primary-dark border-bottom border-neutral40 fw-semibold pb-4 mb-4">
                    訂單明細
                  </h3>
                </div>
                <table className="table">
                  <thead>
                    <tr className="rounded-3">
                      <th scope="col">商品資料</th>
                      <th scope="col">單件價格</th>
                      <th scope="col">優惠代碼</th>
                      <th scope="col">數量</th>
                      <th scope="col">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalData?.products &&
                    Object.keys(modalData.products).length > 0 ? (
                      Object.values(modalData.products).map((item) => (
                        <tr
                          key={item.product_id}
                          className="align-items-center align-middle gap-3 mb-4"
                        >
                          {/* 商品資料 */}
                          <td>
                            <div className="d-flex align-items-center gap-4">
                              <img
                                className="cart-img rounded-3"
                                src={item.product?.imageUrl}
                                alt={item.product?.title}
                                width="80"
                              />
                              <div>
                                <span className="fs-7 text-neutral60">
                                  {item.product?.category}
                                </span>
                                <p className="h6 text-neutral80">
                                  {item.product?.title}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* 單件價格（優惠價＋原價） */}
                          <td>
                            <p className="h6 text-neutral80">
                              NT$ {item.product?.price?.toLocaleString()}
                            </p>
                            {item.product?.price !==
                              item.product?.origin_price && (
                              <del className="text-neutral40 fs-7">
                                NT${" "}
                                {item.product?.origin_price?.toLocaleString()}
                              </del>
                            )}
                          </td>

                          {/* 使用優惠券 */}
                          <td>
                            {item.coupon ? item.coupon?.code : "未使用優惠券"}
                          </td>

                          {/* 數量 */}
                          <td>{item.qty}</td>

                          {/* 小計 */}
                          <td>
                            NT${" "}
                            {(item.product?.price * item.qty).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          無訂單明細
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="col-12">
                  <div className="border-bottom pt-2">
                    <div className="d-flex justify-content-end align-items-center mb-4 pe-8">
                      <p className="me-17">總金額</p>
                      <p className="fw-bold">
                        NT$ <span>{modalData?.total?.toLocaleString()}</span>
                      </p>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mb-4 py-3 pe-8">
                      <p className="me-21">運費</p>
                      <p className="fw-bold">
                        NT$ <span>0</span>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end align-items-center mb-4 py-3 pe-8">
                    <h6 className="me-5">應付金額：</h6>
                    <p className="text-primary-dark fs-4 fw-bold">
                      NT$
                      <span className="ms-1">
                        {modalData?.total?.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal 底部按鈕 */}
            <div className="modal-footer border-top bg-light">
              <button
                onClick={handleCloseOrdersModal}
                type="button"
                className="btn btn-outline-neutral60 fs-6"
              >
                取消
              </button>
              <button
                onClick={handlUpdateOrders}
                type="button"
                className="btn btn-primary btn-outline-primary fs-6"
                disabled={isScreenLoading}
              >
                {isScreenLoading ? "更新中..." : "確認修改"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrdersModal;
