// 外部資源
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import PaginationBackend from '../components/PaginationBackend';

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;


const CouponManagementPage = () =>{
  const navigate = useNavigate();

  //驗證登入
  const checkUserLogin = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/user/check`);
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
    getCoupons(); // 頁面載入時獲取優惠券
  }, []);

  const [ isScreenLoading , setIsScreenLoading ] = useState(false);
  const [couponList, setCouponList] = useState([]);//先給 couponList一個狀態：後續會從API撈回資料塞回couponList 中 
  const [tempCoupon, setTempCoupon] = useState({});

   // 在登入成功時，呼叫：管理控制台 - 優惠卷 (Coupon)> Get API
 const getCoupons = async ( page = 1 ) => {
  setIsScreenLoading(true); //顯示 Loading 畫面
   try {
     const res = await axios.get(
       `${baseUrl}/api/${apiPath}/admin/coupons?page=${page}`
     );
     console.log(res.data)
     setCouponList(res.data.coupons);
     
     //從優惠券 API 取得頁面資訊getCoupons，並存進狀態中（把res.data.Pagination 塞進去 setPageInfo 裡面）
     setPageInfo(res.data.pagination);
   } catch (error) {
     alert("取得優惠券失敗，請稍作等待後，再重新嘗試操作敗");
   } finally {
    setIsScreenLoading(false); // 無論成功或失敗，都關閉 Loading 畫面
  }
 };

 //串接更新優惠券 API
const updateCoupon = async () => {
  setIsScreenLoading(true); //顯示 Loading 畫面
   try {
     await axios.put(`${baseUrl}/api/${apiPath}/admin/coupon/${tempCoupon.id}`,{
       data:{
         ...tempCoupon,
        title,
        is_enabled:tempCoupon.is_enabled ? 1 : 0,
        percent,
        due_date:Number(tempCoupon.due_date),
        code
       }
     }) ;
     getCoupons(); // 更新後重新載入優惠券
   } catch (error) {
     alert('更新優惠券資料失敗');
   } finally {
    setIsScreenLoading(false); // 無論成功或失敗，都關閉 Loading 畫面
  }
 }

 // 控制分頁元件：新增一個「頁面資訊 pageInfo」的狀態 → 用來儲存頁面資訊
const [ pageInfo , setPageInfo ] = useState({});

//讀取當前頁面的「頁碼」 資料的判斷式條件＆動作：
const handlePageChenge = (page) => {
  getCoupons(page);
  window.scrollTo({ top: 100, behavior: 'auto' }); // 滑動回到頁面頂部
}


  return(
    <>
      <ReactHelmetAsync title="後台系統-優惠券管理頁面" />
        <div className="container">
          <div className="row">
            <div className="col pt-19 pb-19">
              <div className=" titleDeco d-flex justify-content-between pt-19 pb-19 mb-8 rounded-3 ">
                <h1 className='ms-10'>優惠券管理</h1>
                <button type="button" className="btn btn-primary me-10">新增優惠券</button>
              </div>
              
              <div>
                <div className= "managementList pt-19 pb-19 ps-5 pe-5 rounded-3">

                  {/* 沒優惠券時顯示商品管理頁面顯示： 目前尚未有任何商品資料 */}
                  {couponList.length === 0 ? (
                    <div className="text-center p-5">
                      <h2 className="text-neutral60">目前尚未有任何優惠券資料</h2>
                    </div>
                  ) : (
                    // 商品管理有商品時呈現畫面
                    <table className="table">  
                      <thead>
                        <tr className='rounded-3'>
                          <th scope="col">優惠券名稱</th>
                          <th scope="col">優惠券代碼</th>
                          <th scope="col">訂單折扣</th>
                          <th scope="col">使用期限</th>
                          <th scope="col">啟用狀態</th>
                          <th className="text-center" scope="col" >編輯資料</th>
                        </tr>
                      </thead>
                      <tbody>
                        {couponList.map((data)=>(
                          <tr key={data.id} className="align-middle">
                            <td>{data.title}</td>
                            <td>{data.code}</td>
                            <td>{data.percent}%</td>
                            <td>{new Date(data.due_date * 1000).toLocaleString()}</td>
                            <th scope="row">{data.is_enabled?(
                              <span className="text-primary-dark">已啟用</span>
                                ) : (
                                  <>
                                      <span className="text-neutral40">未啟用</span>
                                  </>
                                )}
                            </th>
                    
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
                    {couponList?.length > 0 && (
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
  
  export default CouponManagementPage;
  