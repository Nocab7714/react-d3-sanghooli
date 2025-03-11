// 外部資源
import { useState } from 'react';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';


const CouponManagementPage = () =>{
  const [couponList, setOrderList] = useState([]); 
  
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
                        {couponListList.map((data)=>(
                          <tr key={data.id}>
                            <td>{data.title}</td>
                            <td>{data.code}</td>
                            <td>{data.percent}</td>
                            <td>{data.due_date}</td>
                            <th scope="row">{data.is_enabled?(
                              <span className="text-success">已啟用</span>
                                ) : (
                                  <>
                                      <span className="text-danger">未啟用</span>
                                  </>
                                )}
                            </th>
                    
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

                </div>
              </div>
            </div>
          </div>
        </div>
    </>
    )
  }
  
  export default CouponManagementPage;
  