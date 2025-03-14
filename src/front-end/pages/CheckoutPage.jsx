import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
import CheckboxRadio from "../components/form/CheckboxRadio";
import CartStep from "../components/CartStep";
import { asyncGetCart } from "../../slices/cartSlice";
import EmptyBasket from "../components/EmptyBasket";
import { createAlert } from "../../slices/alertSlice";
import Select from "../components/form/Select";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutPage(){
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {total, final_total, coupon} = useSelector((state) => state.cart);

  const navigate = useNavigate();

  // 填寫電子賀卡
  const cardOptions = useMemo(() => [
    {
      id: "thankYouCard",
      title: "感謝有你",
      imgUrl: "https://plus.unsplash.com/premium_photo-1687362969326-c53c113b7f14?q=80&w=1114&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "babyCard",
      title: "寶寶祝福",
      imgUrl: "https://plus.unsplash.com/premium_photo-1677655144023-2e694294ae26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "birthdayCard",
      title: "生日祝賀",
      imgUrl: "https://plus.unsplash.com/premium_vector-1727221171580-8970874006af?q=80&w=1054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "loveCard",
      title: "甜蜜說愛",
      imgUrl: "https://plus.unsplash.com/premium_vector-1734199565387-b771e2c42853?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "allPurposeCard",
      title: "萬用祝福",
      imgUrl: "https://plus.unsplash.com/premium_vector-1726587876647-d303ca6e5a09?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ], [])

  const fontOptions = useMemo(() => [
    {
      name: "Noto Sans (預設)",
      font: "ff-noto-sans"
    },
    {
      name: "Merienda",
      font: "ff-merienda"
    },
    {
      name: "Silkscreen",
      font: "ff-silkscreen"
    },
    {
      name: "Fontdiner Swanky",
      font: "ff-fontdiner-swanky"
    },
  ], []) 

  const wrappingOptions = useMemo(() => [
    {
      id: "free-wrapping",
      title: "免費包裝",
      imgUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      material: "包裝紙、緞帶、貼紙",
      size: "-",
      note: "不含紙袋"
    },
    {
      id: "small-wrapping",
      title: "精緻包裝 S",
      imgUrl: "https://plus.unsplash.com/premium_photo-1668703459364-670c3ebaf2c0?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      material: "小禮盒、緞帶、貼紙、防塵紙、紙袋",
      size: "22 * 22 * 10.5",
      note: "免費提供紙袋"
    },
    {
      id: "medium-wrapping",
      title: "精緻包裝 M",
      imgUrl: "https://plus.unsplash.com/premium_photo-1668703459364-670c3ebaf2c0?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      material: "中禮盒、緞帶、貼紙、防塵紙、紙袋",
      size: "35 * 30.5 * 13",
      note: "免費提供紙袋"
    },
  ], [])

  const [cardBackground, setCardBackground] = useState(cardOptions[0].imgUrl);
  const [selectedFont, setSelectedFont] = useState("Noto Sans (預設)")

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    clearErrors
  } = useForm({
    defaultValues: {
      // cardType: cardOptions[0].imgUrl,
      // cardFont: "ff-noto-sans"
    },
    mode: 'onTouched'
  })

  const watchForm = useWatch({
    control,
  })
  
  useEffect(() => {
    if (watchForm.isWriteCard === false){
      setValue('cardContent', null)
      setValue('cardFont', null)
      setValue('cardFrom', null)
      setValue('cardRecipient', null)
      setValue('cardType', null)
      setValue('wrapping', null)
      clearErrors(['cardContent', 'cardFont', 'cardFrom', 'cardRecipient', 'cardType']);
    } 
    if (watchForm.isWriteCard){
      setValue('cardType', cardOptions[0].imgUrl)
      setValue('cardFont', "ff-noto-sans")
      setValue('wrapping', "免費包裝")
    }
  }, [watchForm.isWriteCard, cardOptions, setValue, clearErrors])
  
  const onSubmit = handleSubmit((data) => {
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
      dispatch(asyncGetCart());
      dispatch(createAlert(response.data))
      navigate(`/payment/${response.data.orderId}`)
    } catch (error) {
      console.dir(error.response.data);
      dispatch(createAlert(error.response.data))
    }
  }

  useEffect(() => {
    dispatch(asyncGetCart({skipSectionLoading: false}));
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
                <div className="pb-19">        
                  <form onSubmit={onSubmit} className="h6 border-bottom border-neutral40 border-lg-0 pb-6">
                    <div className="row">
                      <div className="col-lg-8">
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
                              <div className="d-flex justify-content-between align-items-center fs-7 mb-5 mb-md-6">
                                <p>總金額</p>
                                <p className="fw-bold">NT$ <span>{cart?.total.toLocaleString()}</span></p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center fs-7 mb-5 mb-md-6">
                                <p>運費</p>
                                <p className="fw-bold">NT$ <span>0</span></p>
                              </div>
                              {
                                (coupon && coupon !== "100%") && (
                                  <div className="d-flex justify-content-between align-items-center fs-7 mb-5 mb-md-6">
                                    <p className="text-neutral60">優惠券</p>
                                    <span className="fw-semibold">
                                      -NT${" "}
                                      { Math.floor(total - final_total).toLocaleString() }
                                    </span>
                                  </div>
                                )
                              }
                            </div>
                            <div className="d-flex justify-content-between align-items-center my-4">
                              <h6>應付金額：</h6>
                              <p className="text-primary-dark fs-4 fw-bold">NT$<span className="ms-1">{ Math.floor(cart?.final_total).toLocaleString()}</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CheckboxRadio
                      register={register}
                      errors={errors}
                      id="isWriteCard"
                      name="isWriteCard"
                      labelText={<>是否填寫電子賀卡<span className="text-neutral40 fs-7 ms-2">勾選後請在下方處填寫挑選＆挑選</span></>}
                      type="checkbox"
                      rules={{}}
                    />
                    {
                      watchForm.isWriteCard && (
                        <div className="row">
                          <div className="col-lg-8">
                            <h4>自製賀卡傳遞心意</h4>
                            <div className="d-flex overflow-auto">
                              {
                                cardOptions.map((card) => (
                                  <CheckboxRadio
                                    key={card.id}
                                    register={register}
                                    errors={errors}
                                    id={card.id}
                                    name="cardType"
                                    labelText={card.title}
                                    type="radio"
                                    img={card.imgUrl}
                                    // onClick={() => setCardBackground(card.imgUrl)}
                                    rules={{
                                      required: "（ 必填 ）"
                                    }}
                                    value={card.imgUrl}
                                  />
                                ))
                              }
                            </div>
                            <div className="row">
                              <div className="col-xl-8" >
                                <div className="p-6 rounded-4" style={{backgroundImage: `url(${watchForm.cardType})`, backgroundPosition: "center", backgroundSize: "cover"}}>
                                  <Input
                                    register={register}
                                    errors={errors}
                                    id="cardRecipient"
                                    labelText="Dear"
                                    type="text"
                                    placeholder="收禮人暱稱"
                                    rules={{
                                      required: "（ 必填 ）",
                                    }}
                                    inputClass={`bg-white bg-opacity-75 ${watchForm.cardFont}`}
                                  />
                                  <Textarea
                                    register={register}
                                    errors={errors}
                                    id="cardContent"
                                    labelText=""
                                    labelClassName="d-none"
                                    placeholder="寫下祝福的話"
                                    textareaClassName={`bg-white bg-opacity-75 p-8 ${watchForm.cardFont}`}
                                    rows="5"
                                    rules={{
                                      required: "（ 必填 ）",
                                    }}
                                  />
                                  <Input
                                    register={register}
                                    errors={errors}
                                    id="cardFrom"
                                    labelText="From"
                                    type="text"
                                    placeholder="我的暱稱"
                                    rules={{
                                      required: "（ 必填 ）",
                                    }}
                                    layoutClass="w-50 ms-auto"
                                    inputClass={`bg-white bg-opacity-75 ${watchForm.cardFont}`}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="pt-6">
                                  <Select
                                    register={register}
                                    errors={errors}
                                    id="cardFont"
                                    rules={{}}
                                    labelText="字體"
                                    selectClassName={watchForm.cardFont}
                                  >
                                    {
                                      fontOptions.map((font) => (
                                        <option key={font.font} value={font.font} className={font.font}>{font.name}</option>
                                      ))
                                    }
                                  </Select>
                                </div>
                              </div>
                            </div>                        
                          </div>
                          <div className="col-lg-4">
                            <h4>禮品包裝服務</h4>
                            <div className="accordion" id="accordionWrappingOptions">
                              {
                                wrappingOptions.map((wrapping) => (
                                  <div key={wrapping.id} className="accordion-item">
                                    <h2 className="accordion-header">
                                      <div className={`accordion-button p-0  ${watchForm.wrapping === wrapping.title ? "" : "collapsed"}`} data-bs-toggle="collapse" data-bs-target={`#${wrapping.id}`} aria-expanded={watchForm.wrapping === wrapping.title ? 'true' : 'false'} aria-controls={wrapping.id}>
                                        <div className="form-check w-100 mb-0 lh-normal ps-8">
                                          <input
                                            {...register("wrapping")}
                                            type="radio"
                                            id={wrapping.title}
                                            className="form-check-input mt-3"
                                            value={wrapping.title}
                                          />
                                          <label htmlFor={wrapping.title} className="form-check-label w-100 py-2">{wrapping.title}</label>
                                        </div>
                                      </div>
                                      
                                    </h2>
                                    <div id={wrapping.id} className={`accordion-collapse collapse ${watchForm.wrapping === wrapping.title ? 'show' : ''}`} data-bs-parent="#accordionWrappingOptions">
                                      <div className="accordion-body">
                                        <img className="img-fluid mb-3" src={wrapping.imgUrl} alt={wrapping.title} />
                                        <p className="mb-3">服務細項說明</p>
                                        <ul className="list-unstyled d-flex flex-column gap-2">
                                          <li>包裝耗材：{wrapping.material}</li>
                                          <li>禮盒尺寸 (cm)：{wrapping.size}</li>
                                          <li>備註：{wrapping.note}</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      )
                    }
                    <div className="row">
                      <div className="col-lg-8">
                        <CheckboxRadio
                          register={register}
                          errors={errors}
                          id="isCheckPrivacy"
                          name="isCheckPrivacy"
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
                      </div>
                    </div>
                  </form>
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