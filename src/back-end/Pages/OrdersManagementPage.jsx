// 外部資源
import { useEffect, useState } from 'react';
import axios from 'axios';
import C3Chart from '../components/C3Chart';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import Pagination from '../components/PaginationBackend';

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;


const OrdersManagementPage = () =>{
  const [tempOrder, setTempOrder] = useState({});
  const [orderList, setOrderList] = useState([]);//先給 orderList 一個狀態：後續會從API撈回資料塞回orderList 中 

  //獲取產品列表的 API 
 //在登入成功時，呼叫：管理控制台- 訂單（Orders）> Get API
 const getOrders = async () => {
   try {
     const res = await axios.get(
       `${baseUrl}/api/${apiPath}/admin/orders`
     );
     setOrderList(res.data.orders);
   } catch (error) {
     alert("取得訂單失敗，請稍作等待後，再重新嘗試操作敗");
   }
 };
 

  //串接更新訂單 API
  const createOrder = async () => {
   try {
     await axios.put(`${baseUrl}/api/${apiPath}/admin/order/${tempOrder.id}`,{
       data:{
         ...tempOrder,
         origin_price:Number(tempOrder.origin_price),
         id:Number(tempOrder.products.id),
        //  price:Number(tempOrder.price),
         qty:Number(qty),
         is_paid:tempOrder.is_paid ? 1 : 0,
       }
     }) ;
     getOrders(); // 新增後重新載入訂單列表
   } catch (error) {
     alert('更新訂單資料失敗');
   }
 }

 useEffect(() => {
  getOrders();  // 正確的：載入時獲取訂單列表
 }, [])
  
  // 控制分頁元件：新增一個「頁面資訊 pageInfo」的狀態 → 用來儲存頁面資訊
  const [ pageInfo , setPageInfo ] = useState({});

  //讀取當前頁面的「頁碼」 資料的判斷式條件＆動作：
  const handlePageChenge = (page) => {
    getProducts(page);
  }
  
  return(
    <>
      <ReactHelmetAsync title="後台系統-訂單管理頁面" />
        <div className="container">
          <div className="row">
            <div className="col pt-19 pb-19">
              <div className=" titleDeco d-flex justify-content-between pt-19 pb-19 mb-8 rounded-3 ">
                <h1 className='ms-10'>訂單管理</h1>
                <button type="button" className="btn btn-primary me-10">刪除全部訂單</button>
              </div>
              

             {/* 次要功能：最多銷售商品類別C3.js */}
              <div className= "managementList mb-10 rounded-3">
              <div className= "pt-10 pb-12 ps-5 pe-8">
                  <h4 className="">最多銷售商品類別</h4>
                  <div className="mt-8" id="chart">
                  <C3Chart />
                  </div>
              </div>
              </div>
              
              <div>
                <div className= "managementList pt-19 pb-19 ps-5 pe-5 rounded-3">

                  {/* 沒商品時顯示商品管理頁面顯示： 目前尚未有任何商品資料 */}
                  {orderList.length === 0 ? (
                    <div className="text-center p-5">
                      <h2 className="text-neutral60">目前尚未有任何商品資料</h2>
                    </div>
                  ) : (
                    // 商品管理有商品時呈現畫面
                    <table className="table"> 
                      <thead>
                        <tr className='rounded-3'>
                          <th scope="col">訂單編號</th>
                          <th scope="col">付款狀態</th>
                          <th scope="col">訂購人姓名</th>
                          <th scope="col">聯絡電話</th>
                          <th scope="col">聯絡信箱</th>
                          <th scope="col">收件地址</th>
                          <th scope="col">訂單成立時間</th>
                          <th className="text-center" scope="col" >編輯資料</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderList.map((orders)=>(
                          <tr key={orders.id}>
                            <td>{orders.id}</td>
                            <th scope="row">{orders.is_paid?(
                              <span className="text-success">已付款</span>
                                ) : (
                                  <>
                                      <span className="text-danger">未付款</span>
                                  </>
                                )}
                            </th>
                            <td>{orders.user.name}</td>
                            <td>{orders.user.tel}</td>
                            <td>{orders.user.email}</td>
                            <td>{orders.user.address}</td>
                            <td>{orders.create_at}</td>
                    
                            {/* 編輯資料按鈕欄位 */}
                            <td className="text-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-primary">編輯</button>
                                <button type="button" className="btn btn-outline-danger">刪除</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    )}

                  {/* 分頁元件，條件設定只有當 productList 有數據時，才顯示分頁 */}
                  {orderList?.length > 0 && (
                    <Pagination pageInfo={pageInfo} handlePageChenge={handlePageChenge} />
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
    </>
    )
  }
  
  export default OrdersManagementPage;
  