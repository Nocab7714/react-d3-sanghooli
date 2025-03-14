// 外部資源
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PaginationBackend from "../components/PaginationBackend";
import OrdersModal from "../components/OrdersModal";
import DelOrdersModal from "../components/DelOrdersModal";
import ReactLoading from "react-loading";

import C3Chart from "../components/C3Chart";
import ReactHelmetAsync from "../../plugins/ReactHelmetAsync";
import { createToast } from "../../slices/toastSlice";
import { asyncSetLoading } from "../../slices/loadingSlice";

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

//訂單初始狀態

const OrdersManagementPage = () => {
  const [ordersList, setOrdersList] = useState([]); //先給 ordersList 一個狀態：後續會從API撈回資料塞回ordersList 中
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 檢查用戶是否登入
  const checkUserLogin = async () => {
    try {
      await axios.post(`${baseUrl}/api/user/check`);
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "請先登入",
        })
      );
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

  // 在登入成功後，呼叫：管理控制台- 訂單（Orders）> Get API，取得訂單列表
  const getOrders = async (page = 1) => {
    dispatch(asyncSetLoading(["sectionLoading", true]));
    try {
      const res = await axios.get(
        `${baseUrl}/api/${apiPath}/admin/orders?page=${page}`
      );
      setOrdersList(res.data.orders);

      //從訂單 API 取得頁面資訊getOrders，並存進狀態中（把res.data.Pagination 塞進去 setPageInfo 裡面）
      setPageInfo(res.data.pagination);
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "取得訂單失敗，請稍作等待後，再重新嘗試操作！",
        })
      );
    } finally {
      dispatch(asyncSetLoading(["sectionLoading", false]));
      setIsScreenLoading(false); // 無論成功或失敗，都關閉 Loading 畫面
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  //綁定訂單 Modal 狀態
  const [tempOrder, setTempOrder] = useState(null);

  //新增狀態做「編輯Modal」開關功能控制，預設狀態：關閉（ 帶入false值 ）
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  //新增狀態做「刪除Modal」開關功能控制，預設狀態：關閉（ 帶入false值 ）
  const [isDelOrdersModalOpen, setIsDelOrdersModalOpen] = useState(false);

  //開啟 modal 方法
  const [modalMode, setModalMode] = useState(null);

  // 設定刪除模式 (single or all)
  const [deleteMode, setDeleteMode] = useState("single");

  // 打開刪除訂單的 Modal，並設置刪除模式
  const handleOpenDelOrdersModal = (order, mode) => {
    setTempOrder(order);
    setDeleteMode(mode);

    //改成用 isOpen 做開關判斷:不直接取得getInstance邏輯改成setIsDelProductModalOpen(true)：告訴Modal現在要開
    setIsDelOrdersModalOpen(true);
  };

  {
    /* 點擊「編輯」按鈕，開啟訂單Ｍodal */
  }
  //宣告handleOpenOrdersModal(變數)：進行開關產品的Modal：
  const handleOpenOrdersModal = (order, mode) => {
    setModalMode(mode); // 根據 mode 設定刪除模式
    setTempOrder(order); //// 設置 tempOrder，將當前選擇的訂單資料傳遞到 Modal 中
    setIsOrdersModalOpen(true); // 改成用 isOpen 做開關判斷 :不能直接取得
  };

  // 刪除「單一」訂單列表資料函式
  const removeOrderItem = async (orderItem_id) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.delete(
        `${baseUrl}/api/${apiPath}/admin/order/${orderItem_id}`
      );
      getOrders();
      dispatch(
        createToast({
          success: false,
          message: "此筆訂單已完成刪除",
        })
      );
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "該筆訂單刪除失敗，請再試一次",
        })
      );
    } finally {
      setIsScreenLoading(false);
      setIsDelOrdersModalOpen(false); // 刪除後關閉 Modal
    }
  };

  //刪除「全部」訂單列表資料函式
  const removeAllOrders = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.delete(
        `${baseUrl}/api/${apiPath}/admin/orders/all`
      );
      getOrders();
      dispatch(
        createToast({
          success: true,
          message: "所有訂單已刪除",
        })
      );
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "刪除訂單列表失敗，請稍後再試一次！",
        })
      );
    } finally {
      setIsScreenLoading(false);
      setIsDelOrdersModalOpen(false); // 刪除後關閉 Modal
    }
  };

  // 控制分頁元件：新增一個「頁面資訊 pageInfo」的狀態 → 用來儲存頁面資訊
  const [pageInfo, setPageInfo] = useState({});

  //讀取當前頁面的「頁碼」 資料的判斷式條件＆動作：
  const handlePageChenge = (page) => {
    getOrders(page);
    window.scrollTo({ top: 880, behavior: "auto" }); // 滑動回到頁面頂部
  };

  return (
    <>
      <ReactHelmetAsync title="後台系統-訂單管理頁面" />
      <div className="container">
        <div className="row pb-19">
          <div className="col-lg-12 pt-19 ">
            <div className=" titleDeco d-flex justify-content-between pt-19 pb-19 mb-8 rounded-3 ">
              <h1 className="ms-10">訂單管理</h1>
              <button
                onClick={() => handleOpenDelOrdersModal(null, "all")} // 當點擊按鈕時開啟 Modal，並設置刪除模式為 'all'
                type="button"
                className="btn btn-primary me-10"
                disabled={isScreenLoading} // 當處理中時禁用按鈕
              >
                {isScreenLoading ? "處理刪除中..." : "刪除全部訂單"}
              </button>
            </div>

            {/* 次要功能：最多銷售商品類別C3.js */}
            <div className="managementList mb-10 rounded-3 ">
              <div className="pt-10 pb-12 ps-5 pe-8">
                <h4 className="">最多銷售商品類別</h4>
                <div className="mt-8" id="chart">
                  <C3Chart />
                </div>
              </div>
            </div>

            <div>
              <div className="managementList pt-19 pb-19 ps-5 pe-5 rounded-3">
                {/* 沒商品時顯示商品管理頁面顯示： 目前尚未有任何商品資料 */}
                {ordersList.length === 0 ? (
                  <div className="text-center p-5">
                    <h2 className="text-neutral60">目前尚未有任何商品資料</h2>
                  </div>
                ) : (
                  // 商品管理有商品時呈現畫面
                  <div className="table-responsive">
                    <table className="table ">
                      <thead>
                        <tr className="rounded-3 shadow-sm">
                          <th scope="col">訂單編號</th>
                          <th scope="col">付款狀態</th>
                          <th scope="col">訂購人姓名</th>
                          <th scope="col">聯絡電話</th>
                          <th scope="col">聯絡信箱</th>
                          <th scope="col">收件地址</th>
                          <th scope="col">訂單成立時間</th>
                          <th className="text-center" scope="col">
                            編輯資料
                          </th>
                        </tr>
                      </thead>

                      {/* 單個訂單的刪除按鈕 */}
                      <tbody>
                        {ordersList.map((order) => (
                          <tr key={order.id} className="align-middle">
                            <td scope="row">{order.id}</td>
                            <td>
                              {order.is_paid ? (
                                <span className="text-success">已付款</span>
                              ) : (
                                <>
                                  <span className="text-danger">未付款</span>
                                </>
                              )}
                            </td>
                            <td>{order.user?.name}</td>
                            <td>{order.user?.tel}</td>
                            <td>{order.user?.email}</td>
                            <td>{order.user?.address}</td>
                            <td>
                              {order.create_at && !isNaN(order.create_at)
                                ? new Date(
                                    order.create_at * 1000
                                  ).toLocaleString()
                                : "時間無效"}
                            </td>

                            {/* 編輯資料按鈕欄位 */}
                            <td className="text-center">
                              <div className="btn-group">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenOrdersModal("edit", order)
                                  }
                                  className="btn btn-primary btn-outline-primary-dark"
                                >
                                  編輯
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenDelOrdersModal(order, "single")
                                  }
                                  className="btn btn-outline-danger"
                                >
                                  刪除
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 分頁元件，條件設定只有當 productList 有數據時，才顯示分頁 */}
                {ordersList?.length > 0 && (
                  <PaginationBackend
                    pageInfo={pageInfo}
                    handlePageChenge={handlePageChenge}
                  />
                )}

                {/* 新增與編輯 modal */}
                <OrdersModal
                  modalMode={modalMode}
                  tempOrder={tempOrder}
                  isOpen={isOrdersModalOpen}
                  setIsOpen={setIsOrdersModalOpen}
                  getOrders={getOrders}
                />

                {/* 呼叫刪除產品 Modal: DelOrdersModal 並傳遞必要的 props */}
                <DelOrdersModal
                  tempOrder={tempOrder}
                  isOpen={isDelOrdersModalOpen}
                  setIsOpen={setIsDelOrdersModalOpen}
                  getOrders={getOrders}
                  deleteMode={deleteMode} // 傳遞 deleteMode 給 DelOrdersModal
                  removeOrderItem={removeOrderItem}
                  removeAllOrders={removeAllOrders}
                />

                {/* 全螢幕Loading
                {isScreenLoading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "fixed", //固定在畫面上，不會隨滾動條移動
                      inset: 0, //讓 div 充滿整個畫面
                      backgroundColor: "rgba(255,255,255,0.3)", //半透明白色背景
                      zIndex: 999, //確保 Loading 畫面顯示在最上層
                    }}
                  >
                    <ReactLoading
                      type="spin"
                      color="black"
                      width="4rem"
                      height="4rem"
                    />
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersManagementPage;