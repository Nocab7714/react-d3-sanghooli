// 外部資源
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL ;
const API_PATH = import.meta.env.VITE_API_PATH ;


const ProductsManagementPage = () =>{

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
              <h1 className='ms-10'>商品管理</h1>
              <button type="button" className="btn btn-primary me-10">新增商品</button>
            </div>

            <div className= "managementList pt-19 pb-19 ps-5 pe-5 rounded-3">
            {/* 沒商品時顯示商品管理頁面顯示： 目前尚未有任何商品資料 */}
            {productList.length === 0 ? (
                <div className="text-center p-5">
                    <h2 className="text-neutral60">目前尚未有任何商品資料</h2>
                </div>
            ) : (
                // 商品管理有商品時呈現畫面
                <table className="table"> 
                  <thead>
                      <tr className='rounded-3'>
                      <th className="text-center"  scope="col">產品類型</th>
                      <th scope="col">產品名稱</th>
                      <th scope="col" >原價</th>
                      <th scope="col" >售價</th>
                      <th scope="col" >庫存數量</th>
                      <th scope="col" >是否啟用</th>
                      <th scope="col" >熱銷狀態</th>
                      <th scope="col" className="text-center" >編輯資料</th>
                      </tr>
                  </thead>
                  <tbody>
                    {productList.map((product)=>(
                    <tr key={product.id}>
                        <th scope="row">{product.category}</th>
                        <td>{product.title}</td>
                        <td>{product.origin_price}</td>
                        <td>{product.price}</td>
                        <td>{product.qty}</td>
                        <td>{product.is_enabled? (
                        <span className="text-success">啟用中</span>
                            ) : (
                            <>
                                <span className="text-danger">未啟用</span>
                            </>
                            )
                        }
                        </td>
                        <td>{product.is_hot? (
                        <span className="text-success">熱銷商品</span>
                            ) : (
                            <>
                                <span className="text-secondary">一般商品</span>
                            </>
                            )
                        }
                        </td>
              
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
              )}

            {/* 只有當 productList 有數據時，才顯示分頁 */}
            {/* {productList.length > 0 && (
              <> */}
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
             {/* </> */}
           {/* )} */}

           </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  
  export default ProductsManagementPage;