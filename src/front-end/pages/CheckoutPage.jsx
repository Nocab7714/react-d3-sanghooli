import { useForm } from "react-hook-form";
import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
import CheckboxRadio from "../components/form/CheckboxRadio";
import { Link } from "react-router-dom";
import CartStep from "../components/CartStep";

export default function CheckoutPage(){

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

    
  })
  return (
    <>
      <div className="container">
        <CartStep step={2}/>
        <h1 className="fs-3 fs-lg-1 mb-4">填寫訂單資訊</h1>
        <div className="d-flex flex-wrap flex-xl-nowrap gap-xl-10">        
          <form onSubmit={onSubmit} className="w-100 w-xl-70">
            <legend className="bg-primary py-4 px-5 mb-0 fw-semibold fw-md-bold">購買收件資訊</legend>
            <div className="p-5 border border-primary">
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
              labelClassName="bg-primary py-4 px-5 d-block mb-0 fs-5 fs-md-4 fw-semibold fw-md-bold"
              textareaClassName="border-primary rounded-0 p-6"
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
              <Link to='/cart' className="btn btn-outline-primary rounded-0 w-100 w-xl-50">回到購物車</Link>
              <button type="submit" className="btn btn-primary rounded-0 w-100 w-xl-50 ">提交訂單，前往付款</button>
            </div>
          </form>
          <div className="w-100 w-xl-30 mt-5 mt-xl-0">
            <h4 className="bg-primary py-4 px-5 mb-0 fw-semibold fw-md-bold">您的訂單</h4>
            <div className="p-5 border border-primary">
              <p>商品名稱</p>
              <p>數量</p>
              <img src="" alt="" />
              <p className="h6 text-neutral80">手工植物蠟燭</p>
              <span>1</span>
              <span className="fs-7 text-neutral60">居家與生活</span>
              <p>NT 原價</p>
              <span>NT 特價</span>
            </div>
              
          </div>
        </div>
      </div>
    </>
  )
}