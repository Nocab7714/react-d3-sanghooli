import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
import CheckboxRadio from "../components/form/CheckboxRadio";
import CartStep from "../components/CartStep";
import { asyncGetCart } from "../../slice/cartSlice";
import EmptyBasket from "../components/EmptyBasket";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutPage(){
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // defaultValues: {

    // },
    mode: 'onTouched'
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    console.log(errors);
    const { message, ...user } = data;
    const userInfo = {
      data: {
        user,
        message,
      }
    }
    checkout(userInfo)
  })

  // 客戶購物 - 結帳
  const checkout = async(data) => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order`;
      const response = await axios.post(url, data);
      console.log(response.data);
      
      alert(response.data.message);
      dispatch(asyncGetCart());
      navigate(`/payment/${response.data.orderId}`)
    } catch (error) {
      console.dir(error)
    }
  }

  useEffect(() => {
    dispatch(asyncGetCart)
  }, [dispatch])

  return (
    <>
      <main className="bg-neutral20">
        <div className="container py-lg-19">
          {
            cart?.carts?.length > 0 ? (
              <>
                <CartStep step={2}/>
                <h1 className="fs-3 fs-lg-1 mb-4">填寫訂單資訊</h1>
                <div className="row pb-19">        
                  <div className="col-lg-8">
                    <form onSubmit={onSubmit} className="h6 border-bottom border-neutral40 border-lg-0 pb-6">
                      <legend className="bg-primary py-5 px-8 mb-0 fw-semibold fw-md-bold rounded-top-4">購買收件資訊</legend>
                      <div className="p-8 border border-primary bg-white">
                        <Input
                          register={register}
                          errors={errors}
                          id="name"
                          labelText="姓名"
                          type="text"
                          placeholder="請輸入您的真實姓名"
                          rules={{
                            required: "（ 必填！確認收件人身份，以便配送時核對身分 ）"
                          }}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id="tel"
                          labelText="連絡電話"
                          type="text"
                          placeholder="請輸入您的手機號碼"
                          rules={{
                            required: "（ 必填！供配送人員聯繫收件人，確認配送時間或地址正確性 ）",
                            pattern: {
                              value: /^(0[2-8]\d{7}|09\d{8})$/,
                              message: "聯絡電話 格式不正確"
                            }
                          }}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id="email"
                          labelText="聯絡郵箱"
                          type="email"
                          placeholder="EX :  example@snnghooli.com"
                          rules={{
                            required: "（ 必填！請填寫常用電子郵件 ）",
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "聯絡郵箱 格式不正確"
                            }
                          }}
                        />
                        <Input
                          register={register}
                          errors={errors}
                          id="address"
                          labelText="收件地址"
                          type="text"
                          placeholder="請輸入方便接收商品配送的指定地址"
                          rules={{
                            required: "（ 必填！請填寫正確且完整的地址 ）",
                          }}
                        />
                      </div>
                      <Textarea
                        register={register}
                        errors={errors}
                        id="message"
                        labelText={<span>訂單備註＿給賣家的訊息</span>}
                        placeholder="下列商品須提供客製化細節，請依照備註須知內容填寫。填寫時，別忘了標示是哪一件商品的備註內容。"
                        rules={{}}
                        labelClassName="bg-primary py-5 px-8 d-block mb-0 fs-5 fs-md-4 fw-semibold fw-md-bold"
                        textareaClassName="border-primary rounded-top-0 rounded-bottom-4 p-8"
                        rows="5"
                      />
                      <CheckboxRadio
                        register={register}
                        errors={errors}
                        id="isWriteCard"
                        labelText={<>是否填寫電子賀卡<span className="text-neutral40 fs-7 ms-2">勾選後請在下方處填寫挑選＆挑選</span></>}
                        type="checkbox"
                        rules={{}}
                      />
                      <CheckboxRadio
                        register={register}
                        errors={errors}
                        id="isCheckPrivacy"
                        labelText={<>我已閱讀並同意本網站的<Link to='/privacy-policy'>隱私權服務條款</Link></>}
                        type="checkbox"
                        rules={{
                          required: "（ 必填 ）"
                        }}
                      />
                      <div className="d-flex flex-wrap flex-xl-nowrap gap-5">
                        <Link to='/cart' className="btn btn-lg btn-outline-primary w-100 w-xl-50">回到購物車</Link>
                        <button type="submit" className="btn btn-lg btn-primary w-100 w-xl-50 ">提交訂單，前往付款</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-4">
                    <div className="mt-6 mt-lg-0 mt-xl-0 bg-white">
                      <h4 className="bg-primary py-5 px-8 mb-0 fw-semibold fw-md-bold rounded-top-4">您的訂單明細</h4>
                      <div className="p-8 border border-primary rounded-bottom-4">
                        <div className="d-flex justify-content-between border-bottom pb-2 mb-4">
                          <h6>商品名稱</h6>
                          <h6>數量</h6>
                        </div>
                        {
                          cart?.carts?.map((cartItem) => (
                            <div key={cartItem.id} className="d-flex align-items-start gap-3 mb-4">
                              <img className="cart-img" src={cartItem.product.imageUrl} alt={cartItem.product.title} />
                              <div className="flex-fill">
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="h6 text-neutral80">{cartItem.product.title}</p>
                                  <p>{cartItem.qty}</p>
                                </div>
                                <span className="fs-7 text-neutral60">{cartItem.product.category}</span>
                                <p className="fs-7">NT$ {cartItem.product.price * cartItem.qty}</p>
                                {
                                  (cartItem.product.price !== cartItem.product.origin_price) && (
                                    <del className="text-neutral40 fs-7">
                                      NT$ {cartItem.product.origin_price * cartItem.qty}
                                    </del>
                                  )
                                }
                              </div>
                            </div>
                          ))
                        }
                        <div className="border-top border-bottom py-5">
                          <h6 className="mb-6">訂單明細資訊</h6>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <p>總金額</p>
                            <p className="fw-bold">NT$ <span>{cart?.total}</span></p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p>運費</p>
                            <p className="fw-bold">NT$ <span>0</span></p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-4">
                          <h6>應付金額：</h6>
                          <p className="text-primary-dark fs-4 fw-bold">NT$<span className="ms-1">{cart?.final_total}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              cart?.carts?.length === 0 ? <EmptyBasket /> : ''
            )
          }
        </div>
      </main>
    </>
  )
}