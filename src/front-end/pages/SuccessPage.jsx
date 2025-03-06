import { Link, useNavigate, useParams } from "react-router-dom";
import orderSuccess from "../../assets/img/illustration/orderSuccess.png"
import orderFail from "../../assets/img/illustration/orderFail.png"
import CartStep from "../components/CartStep";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../slices/loadingSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function SuccessPage(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {orderId} = useParams();
  const [orderData, setOrderData] = useState({});
  // const [isValidOrderId, setIsValidOrderId] = useState(null);
  // const [orderData, setOrderData] = useState({});

  const getOrder = useCallback(async(orderId) => {
    dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order/${orderId}`;
      const response = await axios.get(url);
      console.log('try', response.data.order);
      setOrderData(response.data.order)
      if (response.data.order.is_paid === false) {
        return navigate(`/payment/${orderId}`)
      }
    } catch (error) {
      console.log('catch', error.response);
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }, [navigate, dispatch]) 

  useEffect(() => {
    getOrder(orderId);
    
  }, [orderId, getOrder])

  return (
    <>
      
      <div className="container py-lg-19">
        {
          orderData === null ? <NotFoundPage /> :
          orderData.id && (
            <>
              <CartStep step={3}/>
              <div className="d-flex flex-column align-items-center gap-5 py-19">
                <img src={orderSuccess} className="img-fluid" alt="" />
                <h1>訂單付款成功！感謝您的購買！</h1>
                <p>訂單編號：{orderData.id}</p>
                <Link to='/' className="btn btn-lg btn-primary w-30">繼續挑選</Link>
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