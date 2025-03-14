import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Modal } from 'bootstrap';
import Toast from '../../plugins/Toast.jsx';

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

const OrdersModal = ({
    modalMode, 
    tempOrder,
    isOpen,
    setIsOpen,
    getOrders
}) =>{
    //不希望Modal改到tempOrder：再建立新的狀態，預設值帶入tempOrder
    const [modalData, setModalData] = useState(tempOrder || {}); 
    const [toast, setToast] = useState({ show: false, title: '', icon: '' });
    const [isScreenLoading, setIsScreenLoading] = useState(false);
    // const [cartOrderList, setCartOrderList] = useState(null);

    // 訂單狀態選項
    const isPaidOptions = [true, false]; // 使用 true or false

    //透過 useRef 取得 DOM：以下為將OrdersModal 邏輯對應的函式動作
    const ordersModalRef = useRef(null); 
    const modalInstance = useRef(null);


//當 tempOrder 變更時，更新 modalData
useEffect(()=>{
    if (!tempOrder) {
        setModalData({}); // 重新把ModalData設成最新的值，並確保 modalData 不會是 null
    } else {
        setModalData({
            ...tempOrder, //複製一份tempPeoduct
            is_paid: Boolean(tempOrder.is_paid), // 預設未付款
            messages: tempOrder.messages ?? "",  // 確保 messages 有值
        });
    }
},[tempOrder]) //當tempOrder更新後，重新讓setModalData也更新一份


//透過 useEffect ​的 hook，在頁面渲染後取得 ordersModalRef的 DOM元素
useEffect(()=>{
    modalInstance.current = new Modal(ordersModalRef.current, {
    backdrop:false // 點擊Modal灰色背景區塊不進行關閉
    });
    Modal.getInstance(ordersModalRef.current);//取得Modal實例:Modal.getInstance(ref)
},[])

//新增useEffect 判斷Modal開關狀態:如果是「開」的判斷式，並且在陣列帶入[isOpen]
useEffect(()=>{
    if(isOpen && modalInstance.current ){
        modalInstance.current.show();
    } else if (!isOpen && modalInstance.current) {
        modalInstance.current.hide();
    }
}, [isOpen]); //當isOpen有更新時， 判斷是否需要開modal

// 取得訂單詳細資料
const fetchOrderDetails = async (orderId) => {
    if (!orderId) return;  // 確保不會發送錯誤請求
    try {
      const res = await axios.get(`${baseUrl}/api/${apiPath}/order/${orderId}`);
      setModalData(res.data.order);
    } catch (error) {
      console.error('取得訂單資料失敗:', error);
      alert('取得訂單資料失敗！')
    //   setToast({
    //     show: true,
    //     title: '取得訂單資料失敗！',
    //     icon: 'error',
    //   });
    }
  };

  // 監聽 modal 開啟並獲取訂單資料
useEffect(() => {
    if (isOpen && modalData?.id) {
      fetchOrderDetails(modalData.id);
    }
  }, [isOpen, modalData?.id]);
 

  // 更新訂單
const updateOrder = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.put(`${baseUrl}/api/${apiPath}/admin/order/${modalData.id}`, {
        data: {
          ...modalData,
          is_paid:Boolean(modalData?.is_paid),// 將 is_paid 轉換為 true/false
        },
      });
  
      // 確保 getOrders() 在 modal 關閉前完成
      await getOrders(); // 更新訂單列表
      
      setToast({ show: true, title: res.data.message, icon: 'success'});
        handleCloseOrdersModal();
    } catch (error) {
      alert('更新訂單資料失敗！')
    //   setToast({
    //     show: true,
    //     title: `更新訂單資料失敗！${error.response?.data?.message || '請稍後再試'}`,
    //     icon: 'error',
    //   });
    } finally {
      setIsScreenLoading(false);
    }
  };


   {/* 點擊Modal 的「確認修改」按鈕條件：會呼叫 「」的API指令 */}
    const handlUpdateOrders = async () => {
    try{
        await updateOrder() ;
        setModalData(prev => ({ 
            ...prev, 
            is_paid: Boolean(prev.is_paid) 
        }));

        // setToast({ show: true, title: '訂單已成功更新', icon: 'success' });
        handleCloseOrdersModal(); //點擊[確認]按鈕後，要關閉 Modal 視窗(只在成功時關閉 Modal)

    } catch (error){
        alert('更新訂單失敗，請檢查輸入內容！');
        // 失敗時僅顯示錯誤訊息，不關閉 Modal
        // setToast({
        //     show: true,
        //     title: `訂單產品失敗，請檢查輸入內容！ ${error.response.data.message} `, // API 失敗時僅顯示錯誤訊息，不關閉 Modal
        //     icon: 'error',
        //   });
    }
};



{/* 點擊Ｍodal的取消＆Ｘ按鈕會進行關閉 */}
//宣告handleCloseOrdersModal(變數)：進行開關產品的Modal：
const handleCloseOrdersModal =() =>{
    const modalInstance = Modal.getInstance(ordersModalRef.current);
      //拿到Modal實例後，即可透過modalInstance.hide(); 關閉Modal
      modalInstance.hide();
      setIsOpen(false); //判斷Modal開關狀態:如果是「關」的調整方式
  }

  // 處理輸入變更
  const handleModalInputChange =(e)=>{
    const { value , name } = e.target;

    let newValue;
    if (name === "is_paid") {
        newValue = value === "true"; // 轉換成布林值
    } else {
        newValue = value;
    }

    // 更新modalData
    setModalData((prevData)=>({
        //modalData.is_paid 能正確反映當前訂單的付款狀態設定
        ...prevData,
        ...(name === "message"
            ? { [name]: newValue } // 如果是 message，直接更新 modalData
            : { user: { ...prevData.user, [name]: newValue } }) // 其他欄位更新 user 內的資料
    }));
};


    return(
        <>
          <Toast
            show={toast.show}
            title={toast.title}
            icon={toast.icon}
            onClose={() => setToast({ show: false, title: '', icon: '' })}
          />

        <div 
            ref={ordersModalRef} 
            id='ordersModal' 
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
                        aria-label="Close">
                    </button>
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
                                value={modalData?.id|| ''}
                                onChange={handleModalInputChange}
                                name="order_id"
                                id="order_id"
                                type="text"
                                className="form-control text-neutral40"
                                placeholder="訂單編號"
                            />
                        </div>

                        <div className="col-6 col-md-4">
                            <label htmlFor="create_at" className="form-label">
                                訂單成立時間
                            </label>
                            <input
                                value={new Date(modalData?.create_at * 1000).toLocaleString()}
                                onChange={handleModalInputChange}
                                name="create_at"
                                id="create_at"
                                type="text"
                                className="form-control text-neutral40"
                                placeholder="訂單成立時間"
                            />
                        </div>

                        <div className="col-6 col-md-4">
                                <label htmlFor="is_paid" className="form-label"> 
                                    付款狀態
                                </label>
                                <select
                                    className="form-select"
                                    name="is_paid"
                                    value={String(modalData?.is_paid ?? false)} 
                                    onChange={handleModalInputChange} // 確保更新布林值
                                    >
                                    {isPaidOptions.map((option) => (
                                        <option key={option.toString()} value={option.toString()}>
                                            {option ? '已付款' : '未付款'}
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
                                        value={modalData?.user?.name|| ''}
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
                                        value={modalData?.user?.tel|| ''}
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
                                        value={modalData?.user?.email|| ''}
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
                                        value={modalData?.user?.address|| ''}
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
                                        value={modalData?.message|| ''}
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
                                <tr className='rounded-3'>
                                <th scope="col">商品資料</th>
                                <th scope="col" >單件價格</th>
                                <th scope="col" >優惠代碼</th>
                                <th scope="col" >數量</th>
                                <th scope="col" >小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modalData?.products && Object.keys(modalData.products).length > 0 ? (
                                    Object.values(modalData.products).map((item) => (
                                        <tr key={item.product_id} className="align-items-center align-middle gap-3 mb-4">
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
                                                        <span className="fs-7 text-neutral60">{item.product?.category}</span>
                                                        <p className="h6 text-neutral80">{item.product?.title}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 單件價格（優惠價＋原價） */}
                                            <td>
                                                <p className="h6 text-neutral80">NT$ {item.product?.price?.toLocaleString()}</p>
                                                {item.product?.price !== item.product?.origin_price && (
                                                    <del className="text-neutral40 fs-7">
                                                        NT$ {item.product?.origin_price?.toLocaleString()}
                                                    </del>
                                                )}
                                            </td>

                                            {/* 使用優惠券 */}
                                            <td>{item.coupon ? item.coupon?.code : "未使用優惠券"}</td>
                                            
                                            {/* 數量 */}
                                            <td>{item.qty}</td>

                                            {/* 小計 */}
                                            <td>NT$ {(item.product?.price * item.qty).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">無訂單明細</td>
                                    </tr>
                                )}
                            </tbody> 
                        </table>

                        <div className="col-12">
                            <div className="border-bottom pt-2">
                                <div className="d-flex justify-content-end align-items-center mb-4 pe-8">
                                    <p className="me-17">總金額</p>
                                    <p className="fw-bold">NT$ <span>{modalData?.total?.toLocaleString()}</span></p>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-4 py-3 pe-8">
                                    <p className="me-21">運費</p>
                                    <p className="fw-bold">NT$ <span>0</span></p>
                                </div>
                            </div>
                                <div className="d-flex justify-content-end align-items-center mb-4 py-3 pe-8">
                                    <h6 className="me-5">應付金額：</h6>
                                    <p className="text-primary-dark fs-4 fw-bold">NT$<span className="ms-1">{modalData?.total?.toLocaleString()}</span></p>
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
                    {isScreenLoading ? '更新中...' : '確認修改'}
                </button>
                </div>
                

            </div>
          </div>
        </div>
        </>
    )
};
export default OrdersModal;