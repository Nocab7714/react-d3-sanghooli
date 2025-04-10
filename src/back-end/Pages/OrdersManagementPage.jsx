// 外部資源
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PaginationBackend from '../components/PaginationBackend';
import OrdersModal from '../components/OrdersModal';
import DelOrdersModal from '../components/DelOrdersModal';

import C3Chart from '../components/C3Chart';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import { createToast } from '../../slices/toastSlice';
import { asyncSetLoading } from '../../slices/loadingSlice';

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

const OrdersManagementPage = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [tempOrder, setTempOrder] = useState(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isDelOrdersModalOpen, setIsDelOrdersModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState('single');
  const [modalMode, setModalMode] = useState(null);
  const [pageInfo, setPageInfo] = useState({});

  const dispatch = useDispatch();

  // 獲取訂單列表函數 - 使用 useCallback 以便於在依賴項中使用
  const getOrders = useCallback(
    async (page = 1) => {
      dispatch(asyncSetLoading(['sectionLoading', true]));
      try {
        const res = await axios.get(
          `${baseUrl}/api/${apiPath}/admin/orders?page=${page}`
        );
        setOrdersList(res.data.orders);
        setPageInfo(res.data.pagination);
      } catch (error) {
        dispatch(
          createToast({
            success: false,
            message: '取得訂單失敗，請稍作等待後，再重新嘗試操作！',
          })
        );
        console.error(error);
      } finally {
        dispatch(asyncSetLoading(['sectionLoading', false]));
        setIsScreenLoading(false);
      }
    },
    [dispatch]
  );

  // 初始化頁面 - 檢查登入並獲取訂單
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)D3Token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    getOrders();
  }, [getOrders]); // 添加 getOrders 作為依賴項

  // 打開刪除訂單的 Modal
  const handleOpenDelOrdersModal = (order, mode) => {
    setTempOrder(order);
    setDeleteMode(mode);
    setIsDelOrdersModalOpen(true);
  };

  // 打開編輯訂單的 Modal
  const handleOpenOrdersModal = (order) => {
    setModalMode('edit');
    setTempOrder(order);
    setIsOrdersModalOpen(true);
  };

  // 刪除單一訂單
  const removeOrderItem = async (orderItem_id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(
        `${baseUrl}/api/${apiPath}/admin/order/${orderItem_id}`
      );
      getOrders();
      dispatch(
        createToast({
          success: true,
          message: '此筆訂單已完成刪除',
        })
      );
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: '該筆訂單刪除失敗，請再試一次',
        })
      );
      console.error(error);
    } finally {
      setIsScreenLoading(false);
      setIsDelOrdersModalOpen(false);
    }
  };

  // 刪除全部訂單
  const removeAllOrders = async () => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${baseUrl}/api/${apiPath}/admin/orders/all`);
      getOrders();
      dispatch(
        createToast({
          success: true,
          message: '所有訂單已刪除',
        })
      );
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: '刪除訂單列表失敗，請稍後再試一次！',
        })
      );
      console.error(error);
    } finally {
      setIsScreenLoading(false);
      setIsDelOrdersModalOpen(false);
    }
  };

  // 處理分頁變更
  const handlePageChange = (page) => {
    getOrders(page);
    window.scrollTo({ top: 880, behavior: 'auto' });
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
                onClick={() => handleOpenDelOrdersModal(null, 'all')}
                type="button"
                className="btn btn-primary me-10"
                disabled={isScreenLoading}
              >
                {isScreenLoading ? '處理刪除中...' : '刪除全部訂單'}
              </button>
            </div>

            {/* 次要功能：最多銷售商品類別C3.js */}
            <div className="managementList mb-10 rounded-3 ">
              <div className="pt-10 pb-12 ps-8 pe-8">
                <h4 className="">最多銷售商品類別</h4>
                <div className="mt-8" id="chart">
                  <C3Chart />
                </div>
                <div className="mt-3 text-muted ps-5">
                  <small>
                    *
                    此圖表顯示各產品類別的總銷售數量，幫助您了解哪些產品類別最受歡迎
                  </small>
                </div>
              </div>
            </div>

            <div>
              <div className="managementList pt-19 pb-19 ps-5 pe-5 rounded-3">
                {/* 沒商品時顯示商品管理頁面顯示： 目前尚未有任何商品資料 */}
                {ordersList.length === 0 ? (
                  <div className="text-center p-5">
                    <h2 className="text-neutral60">目前尚未有任何訂單資料</h2>
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
                        {ordersList.map((order, index) => (
                          <tr key={index} className="align-middle">
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
                                : '時間無效'}
                            </td>

                            {/* 編輯資料按鈕欄位 */}
                            <td className="text-center">
                              <div className="btn-group">
                                <button
                                  type="button"
                                  onClick={() => handleOpenOrdersModal(order)}
                                  className="btn btn-primary btn-outline-primary-dark"
                                >
                                  編輯
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenDelOrdersModal(order, 'single')
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

                {/* 分頁元件，條件設定只有當 OrderList 有數據時，才顯示分頁 */}
                {ordersList?.length > 0 && (
                  <PaginationBackend
                    pageInfo={pageInfo}
                    handlePageChange={handlePageChange}
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
                  deleteMode={deleteMode}
                  removeOrderItem={removeOrderItem}
                  removeAllOrders={removeAllOrders}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersManagementPage;
