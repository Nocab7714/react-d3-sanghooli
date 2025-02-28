// 外部資源
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import C3Chart from '../../components/C3Chart';

// 內部資源

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL ;
const API_PATH = import.meta.env.VITE_API_PATH ;


const OrdersManagementPage = () =>{
  // const[tempProduct,setTempProduct] = React.useState({})
  const [productList, setProductList] = useState([]); //先給 productList 一個狀態：後續會從API撈回資料塞回productList 中 

  //獲取產品列表的 API 
 //在登入成功時，呼叫：管理控制台- 產品（Products）> Get API
 const getProducts = async () => {
   try {
     const res = await axios.get(
       `${BASE_URL}/v2/api/${API_PATH}/admin/products`
     );
     setProductList(res.data.products);
   } catch (error) {
     alert("取得產品失敗");
   }
 };
 

  {/* 串接新增商品 API */}
  const createProduct = async () => {
   try {
     await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`,{
       data:{
         ...tempProduct,
         origin_price:Number(tempProduct.origin_price),
         price:Number(tempProduct.price),
         is_enabled:tempProduct.is_enabled ? 1 : 0,
         is_hot:tempProduct.is_hot ? 1 : 0
       }
     }) ;
     getProducts(); // 新增後重新載入商品列表
   } catch (error) {
     alert('新增產品失敗');
   }
 }

 useEffect(() => {
   getProducts();  // 正確的：載入時獲取商品列表
 }, [])
  
  
  return (
      <>
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
              
              <div className='' >
                <div className= "managementList pt-19 pb-19 ps-5 pe-5 rounded-3">
                  <table className="table"> 
                    <thead>
                            <tr className='rounded-3'>
                            <th scope="col">訂單編號</th>

                            <th scope="col">付款狀態</th>
                            <th scope="col"   >訂購人姓名</th>
                            <th scope="col" >聯絡電話</th>
                            <th scope="col"  >聯絡信箱</th>
                            <th scope="col"  >收件地址</th>
                            <th scope="col"  >訂單成立時間</th>
                            <th className="text-center" scope="col" >編輯資料</th>
                            </tr>
                    </thead>
                    <tbody>
                          {productList.map((product)=>(
                          <tr key={orders.id}>
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
                              <td>{orders.address}</td>
                              <td>{orders.create_at}</td>
                    
                              {/* 編輯資料按鈕欄位 */}
                              <td className="text-center">
                                <div className="btn-group">
                                  <button type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                                  <button type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                                  </div>
                              </td>
                          </tr>
                          ))}
                    </tbody>
                  </table>

                    {/* 分頁元件 */}
                  <nav className="pagination-container d-flex justify-content-center mt-20 mb-20">
                    <ul className="pagination">
                        {/* 第一頁按鈕 */}
                          <li className="page-item">
                          <button className="page-link" type="button">
                              <span className="material-symbols-outlined fs-6 align-middle">
                              keyboard_double_arrow_left
                              </span>
                          </button>
                          </li>
                          
                          {/* 上一頁按鈕 */}
                          <li className="page-item">
                          <button className="page-link" type="button">
                              <span className="material-symbols-outlined fs-6 align-middle">
                              chevron_left
                              </span>
                          </button>
                          </li>

                          {/* 生成頁碼 */}
                          <li className="page-item">
                              <a className="page-link" href="#">
                              1
                              </a>
                          </li>
                          <li className="page-item">
                              <a className="page-link" href="#">
                              2
                              </a>
                          </li>
                          <li className="page-item">
                              <a className="page-link" href="#">
                              3
                              </a>
                          </li>

                          {/* 下一頁按鈕 */}
                          <li className="page-item">
                          <button className="page-link" type="button">
                              <span className="material-symbols-outlined fs-6 align-middle">
                              chevron_right
                              </span>
                          </button>
                          </li>
                          
                          {/* 最後一頁按鈕 */}
                          <li className="page-item">
                          <button className="page-link" type="button">
                              <span className="material-symbols-outlined fs-6 align-middle">
                              keyboard_double_arrow_right
                              </span>
                          </button>
                          </li>
                    </ul>
                  </nav>

                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
  
  export default OrdersManagementPage;
  