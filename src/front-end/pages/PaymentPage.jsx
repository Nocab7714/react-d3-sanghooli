import { useEffect, useState } from "react";
import CartStep from "../components/CartStep";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import orderFail from "../../assets/img/illustration/orderFail.png"
import NotFoundPage from "./NotFoundPage";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../slices/loadingSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function PaymentPage(){
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  // const [isPaid, setIsPaid] = useState();
  const [isPaySuccess, setIsPaySuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();;
  
  const getOrder = async(orderId) => {
    dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order/${orderId}`;
      const response = await axios.get(url);
      console.log(response.data);
      setOrderData(response.data.order);
    } catch (error) {
      console.dir(error.response)
    } finally {
      dispatch(setGlobalLoading(false))
    }
  }

  const payOrder = async(orderId) => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/pay/${orderId}`;
      const response = await axios.post(url);
      console.log(response.data);
      navigate(`/success/${orderId}`)
    } catch (error) {
      console.dir(error.response);
      setIsPaySuccess(false);
    }
  }
  useEffect(() => {
    getOrder(orderId);
  }, [orderId])

  return (
    <>
      <main className="bg-neutral20">
        {
          orderData === null ? <NotFoundPage /> : 
          (orderData.id && isPaySuccess !== false ) && (
            <div className="container py-lg-19">
              <CartStep step={3}/>
              <h1 className="fs-3 fs-lg-1 mb-4">您的訂單資訊</h1>
              <div className="row pb-19">
                <div className="col-lg-8">
                  <div className="border-bottom border-neutral40 border-lg-0 pb-6">
                    <h4 className="bg-primary py-5 px-8 mb-0 fw-semibold fw-md-bold rounded-top-4">購買收件資訊</h4>
                    <div className="p-6 border border-primary fw-semibold p-8 rounded-bottom-4 bg-white">
                      <ul className="list-unstyled d-flex flex-column gap-5 border-bottom pb-10 mb-10">
                        <li>訂單編號：{orderData.id}</li>
                        <li>付款狀態：<span className={orderData.is_paid ? 'text-success' : 'text-danger'}>{orderData.is_paid ? '已付款' : '未付款'}</span></li>
                        <li>建立時間：{new Date(orderData.create_at * 1000).toLocaleString("zh-TW", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).replace(/\//g, "-")}</li>
                      </ul>
                      <ul className="list-unstyled d-flex flex-column gap-5 mb-10">
                        <li>聯絡電話：{orderData?.user?.tel}</li>
                        <li>聯絡郵箱：{orderData?.user?.email}</li>
                        <li>收件地址：{orderData?.user?.address}</li>
                        <li>訂單備註：{orderData.message}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mt-5 mt-lg-0 mt-xl-0 bg-white">
                    <h4 className="bg-primary py-5 px-8 mb-0 fw-semibold fw-md-bold rounded-top-4">訂單狀態</h4>
                    <div className="p-8 border border-primary rounded-bottom-4">
                      <h5 className="text-primary-dark pb-3 border-bottom border-primary-dark border-5 mb-5">進行付款</h5>
                      <p className="mb-20">訂單已成功建立，請確認您的訂單資訊是否正確，並於下方完成最後的付款成。</p>
                      <div className="d-flex justify-content-between align-items-center fw-bold border-bottom mb-10">
                        <h6>應付金額：</h6>
                        <span className="text-primary-dark fs-4">{orderData?.total?.toLocaleString()}</span>
                      </div>
                      <button type="button" className={`btn btn-lg btn-primary w-100 ${orderData.is_paid ? 'disabled' : ''}`} onClick={() => payOrder(orderId)}>前往付款</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          isPaySuccess === null ? '' : 
          isPaySuccess ? '' : (
            <div className="container py-lg-19">
              <CartStep step={3}/>
              <div className="d-flex flex-column align-items-center gap-5 mb-20">
                <img src={orderFail} className="img-fluid" alt="" />
                <h1>付款失敗！</h1>
                <p className="w-50">可能是網路連線問題導致交易失敗，請確認網路環境連線狀態是否穩定。<br />如有任何問題，請透過SANGHOOLI的服務信箱與我們聯繫，<br />我們將盡快協助處理您的問題，謝謝！</p>
                <p>SANGHOOLI 服務信箱：server2025@Sanghooli.com</p>
                <button onClick={() => navigate(0)} className="btn btn-lg btn-primary w-30">重新嘗試付款</button>
              </div>
            </div>
          )
        }
        
      </main>
    </>
  )
}