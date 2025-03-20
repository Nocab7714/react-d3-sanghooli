// 外部資源
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// 內部資源
import orderSuccess from "../../assets/img/illustration/orderSuccess.webp"
import CartStep from "../components/CartStep";
import NotFoundPage from "./NotFoundPage";
import { asyncSetLoading } from "../../slices/loadingSlice";
import ReactHelmetAsync from "../../plugins/ReactHelmetAsync";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function SuccessPage(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {orderId} = useParams();
  const [orderData, setOrderData] = useState({});

  const getOrder = useCallback(async(orderId) => {
    dispatch(asyncSetLoading(['sectionLoading', true]))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order/${orderId}`;
      const response = await axios.get(url);
      setOrderData(response.data.order)
      if (response.data.order.is_paid === false) {
        return navigate(`/payment/${orderId}`)
      }
    } catch (error) {
      console.error(error.response);
    } finally {
      dispatch(asyncSetLoading(['sectionLoading', false]))
    }
  }, [navigate, dispatch]) 

  useEffect(() => {
    getOrder(orderId);
    
  }, [orderId, getOrder])
  
  return (
    <>
      <ReactHelmetAsync title="訂購完成" />
      <div className="container py-lg-19">
        {
          orderData === null ? <NotFoundPage /> :
          orderData.id && (
            <>
              <CartStep step={3}/>
              <div className="d-flex flex-column align-items-center gap-5 py-19">
                <img src={orderSuccess} className="img-fluid" alt="" />
                <h1 className="fs-4 fs-xl-1">訂單付款成功！感謝您的購買！</h1>
                <p>訂單編號：{orderData.id}</p>
                <Link to='/products-list' className="btn btn-lg btn-primary w-70 w-md-50 w-xl-30">繼續挑選</Link>
              </div>
            </>
          )
        }        
      </div>
    </>
  )
}

// class OrderStatus {
//   // Private Fields
//   static #_UNKNOWN = 0;
//   static #_SUCCESS = 1;
//   static #_FAILED = 2;

//   static get UNKNOWN() { return this.#_UNKNOWN; }
//   static get SUCCESS() { return this.#_SUCCESS; }
//   static get FAILED() { return this.#_FAILED; }
// }