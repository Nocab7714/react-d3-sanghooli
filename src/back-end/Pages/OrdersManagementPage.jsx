// 外部資源
import { useEffect, useState } from 'react';
import axios from 'axios';
import C3Chart from '../components/C3Chart';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import { useNavigate } from 'react-router-dom';
import PaginationBackend from '../components/PaginationBackend';
import ReactLoading from 'react-loading';


// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;


const OrdersManagementPage = () =>{

  const navigate = useNavigate();
  
  //驗證登入
  const checkUserLogin = async () => {
    try {
      await axios.post(`${baseUrl}/api/user/check`);
    } catch (error) {
      alert('請先登入');
      navigate('/admin/login');
    }
  };

  // 判斷目前是否已是登入狀態，取出在 cookie 中的 token
  // 若想在登入頁面渲染時呼叫checkUserLogin裡的API>需要透過React hook：useEffect 戳一次API
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)D3Token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token; //將 token 帶到 axios 上：後續的axios就會帶上這行token
    checkUserLogin(); //戳checkUserLogin API :
    getOrders(); // 頁面載入時獲取訂單
  }, []);

  const [ isScreenLoading , setIsScreenLoading ] = useState(false);

  const [orderList, setOrderList] = useState([]);//先給 orderList 一個狀態：後續會從API撈回資料塞回orderList 中 
  const [tempOrder, setTempOrder] = useState({});

 // 在登入成功時，呼叫：管理控制台- 訂單（Orders）> Get API
 const getOrders = async ( page = 1 ) => {
  setIsScreenLoading(true); //顯示 Loading 畫面
   try {
     const res = await axios.get(
       `${baseUrl}/api/${apiPath}/admin/orders?page=${page}`
     );
     console.log(res.data)
     setOrderList(res.data.orders);
     
     //從訂單 API 取得頁面資訊getOrders，並存進狀態中（把res.data.Pagination 塞進去 setPageInfo 裡面）
     setPageInfo(res.data.pagination);
   } catch (error) {
     alert("取得訂單失敗，請稍作等待後，再重新嘗試操作敗");
   } finally {
    setIsScreenLoading(false); // 無論成功或失敗，都關閉 Loading 畫面
  }
 };
 

  //串接更新訂單 API
  const updateOrder = async () => {
  setIsScreenLoading(true); //顯示 Loading 畫面
   try {
     await axios.put(`${baseUrl}/api/${apiPath}/admin/order/${tempOrder.id}`,{
       data:{
         ...tempOrder,
         origin_price:Number(tempOrder.origin_price),
        //  id:Number(tempOrder.products.id),
        //  price:Number(tempOrder.price),
         qty:Number(tempOrder.products?.qty || 1),
         is_paid:tempOrder.is_paid ? 1 : 0,
       }
     }) ;
     getOrders(); // 更新後重新載入訂單
   } catch (error) {
     alert('更新訂單資料失敗');
   } finally {
    setIsScreenLoading(false); // 無論成功或失敗，都關閉 Loading 畫面
  }
 }

  
  // 控制分頁元件：新增一個「頁面資訊 pageInfo」的狀態 → 用來儲存頁面資訊
  const [ pageInfo , setPageInfo ] = useState({});

  //讀取當前頁面的「頁碼」 資料的判斷式條件＆動作：
  const handlePageChenge = (page) => {
    getOrders(page);
    window.scrollTo({ top: 880, behavior: 'auto' }); // 滑動回到頁面頂部
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
                        <tr className='rounded-3 text-center'>
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
                        {orderList.map((order)=>(
                          <tr key={order.id} className="align-middle">
                            <td>{order.id}</td>
                            <th scope="row">{order.is_paid?(
                              <span className="text-success">已付款</span>
                                ) : (
                                  <>
                                      <span className="text-danger">未付款</span>
                                  </>
                                )}
                            </th>
                            <td>{order.user.name}</td>
                            <td>{order.user.tel}</td>
                            <td>{order.user.email}</td>
                            <td>{order.user.address}</td>
                            <td>{new Date(order.create_at * 1000).toLocaleString()}</td>
                    
                            {/* 編輯資料按鈕欄位 */}
                            <td className="text-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-primary btn-outline-primary-dark">編輯</button>
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
                    <PaginationBackend 
                      pageInfo={pageInfo} 
                      handlePageChenge={handlePageChenge} />
                  )}

                  {/* 全螢幕Loading */}
                  { isScreenLoading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "fixed", //固定在畫面上，不會隨滾動條移動
                      inset: 0, //讓 div 充滿整個畫面
                      backgroundColor: "rgba(255,255,255,0.3)", //半透明白色背景
                      zIndex: 999, //確保 Loading 畫面顯示在最上層
                    }}
                  >
                    <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
                  </div>
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
  