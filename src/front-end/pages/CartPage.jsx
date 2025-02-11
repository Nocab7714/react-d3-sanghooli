// 外部資源
import { useEffect, useState } from 'react';
import axios from 'axios';
import SwiperComponent from '../components/SwiperComponent';

// 內部資源
import cartEmpty from '../../assets/img/illustration/cart-empty.png';

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CartPage(){
    // 取得購物車列表
  const [cart, setCart] = useState([]);
  const [basketQty, setBasketQty] = useState(0);

  const getCart = async() => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const response = await axios.get(url);
      const cartData = response.data.data;
      setCart(cartData);
      setBasketQty(cartData.carts?.reduce((sum, cart) => sum + cart.qty, 0));
    } catch (error) {
      console.dir(error);
    }
  }

  useEffect(() => {
    getCart();
  }, [])

  return (
    <>
      <main className="bg-neutral20">
        <div className="container">
          <div className='text-neutral60 pt-6 pb-10 py-lg-19'>
            <a href="#" className="link-neutral60 d-inline-flex align-items-center gap-1 justify-content-start">
              <span className="material-symbols-outlined">arrow_back</span>
              <h5 className="fw-semibold">回到首頁</h5>
            </a>
          </div>
          <section>
            
            {/* 購物車 */}
            {/* 流程 */}
            <div className="bg-white rounded-4 overflow-hidden">
              <ul className='fs-7 d-flex py-5 mb-0 px-0 flex-wrap'>
                <ol className='cart-step d-flex align-items-center gap-4 px-6'>
                  <span className="material-symbols-outlined text-primary-dark bg-primary-light rounded-circle p-4 fs-2">local_mall</span>
                  <div>
                    <h6 className='fs-7'>Step1 : 購物車</h6>
                    <span>確認您的產品</span>
                  </div>
                </ol>
                <ol className='cart-step d-flex align-items-center gap-4 px-6'>
                  <span className="material-symbols-outlined text-primary-dark bg-primary-light rounded-circle p-4 fs-2">local_mall</span>
                  <div>
                    <h6 className='fs-7'>Step2 : 填寫資料</h6>
                    <span>填寫訂購人相關資訊，進行客製化服務挑選並建立訂單</span>
                  </div>
                </ol>
                <ol className='cart-step d-flex align-items-center gap-4 px-6'>
                  <span className="material-symbols-outlined text-primary-dark bg-primary-light rounded-circle p-4 fs-2">local_mall</span>
                  <div>
                    <h6 className='fs-7'>Step3 : 訂單付款</h6>
                    <span>選擇您的付款方式並進行付款</span>
                  </div>
                </ol>
              </ul>
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style={{height: '3px'}}>
                <div className="progress-bar" style={{width: '33%'}}></div>
              </div>
            </div>
            {/* 內容 */}
            <h3 className='fs-lg-1'>購物車</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品資訊</th>
                  <th scope="col">單價</th>
                  <th scope="col">數量</th>
                  <th scope="col">小計</th>
                  <th scope="col">刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </table>
            {/* 購物車 - 空狀態 */}
            {/* <div className="text-center py-6 py-lg-19 mb-10">
              <img src={cartEmpty} alt="cartEmpty image" className='cart-img mb-2'/>
              <p className='mb-4'>購物車目前尚無商品</p>
              <button type="button" className='btn btn-primary'>立即購物</button>
            </div> */}
          </section>
        </div>
        <section className='py-10 py-lg-19'>
          <div className="container d-flex align-items-center gap-3 mb-8 mb-10">
            <h5 className="fw-semibold">你可能會喜歡的商品</h5>
            <div className="border-top border-neutral40 flex-grow-1"></div>
          </div>
          <SwiperComponent />
        </section>
        
      </main>
      
    </>
  )
}
export default CartPage