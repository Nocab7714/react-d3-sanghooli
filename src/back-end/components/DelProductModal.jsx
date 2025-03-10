// 外部資源
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';


// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

const DelProductModal= ({
    modalMode, 
    tempProduct,
    isOpen,
    setIsOpen,
    getProducts 
}) => {

//透過 useRef 取得 DOM
const delProductModalRef = useRef(null); //透過 useRef 取得刪除確認 Modal 的 DOM

//透過 useEffect ​的 hook，在頁面渲染後取得 productModalRef的 DOM元素
useEffect(()=>{
    //透過 useEffect 的 hook，在頁面渲染後初始化 Modal
    new Modal(delProductModalRef.current, {
        backdrop:false // 點擊Modal灰色區塊不進行關閉
    });
    
    },[])

//DelProductModal開關設定調整:新增useEffect 判斷
useEffect (()=>{
    if(isOpen){
        const modalInstance = Modal.getInstance(delProductModalRef.current);
        modalInstance.show();
    }
},[isOpen]) //新增一個狀態，決定是否要開啟


 {/* 點擊刪除產品的Ｍodal：delProductModalRef的關閉 */}
 const handleCloseDelProductModal =() =>{
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();

    setIsOpen(false);
  }

 {/* 串接刪除商品 API */}
 const deleteProduct = async () => {
    try {
      await axios.delete(`${baseUrl}/api/${apiPath}/admin/product/${tempProduct.id}`) ;
    } catch (error) {
      alert('刪除產品失敗');
    }
  };

 {/* 點擊刪除產品Modal的「刪除」鈕時，會觸發刪除API的函式 */}
 const handleDeleteProduct = async () => {
    try {
      await deleteProduct();

      getProducts(); //成功刪除產品deleteProduct()，需要呼叫getProducts();更新產品列表

      handleCloseDelProductModal(); //getProducts();更新成功後 > 把刪除的Ｍodal 關閉

    } catch (error) {
      alert('刪除產品失敗'); //如果刪除失敗：顯示「刪除產品失敗」的告警訊息
    }
  };



return(
  //加入刪除產品 Modal
    <div
        ref={delProductModalRef}
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
                onClick={handleCloseDelProductModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div className="modal-body">
            你是否要刪除 
            <span className="text-danger fw-bold">{tempProduct.title}</span>
        </div>
        <div className="modal-footer">
            <button
                onClick={handleCloseDelProductModal}
                type="button"
                className="btn btn-outline-neutral60"
            >
                取消
            </button>
            <button 
                onClick={handleDeleteProduct} 
                type="button" 
                className="btn btn-danger">
                刪除
            </button>
        </div>
        </div>
    </div>
    </div>
  )
};
export default DelProductModal;



