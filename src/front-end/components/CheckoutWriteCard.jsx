// 外部資源
import { useEffect, useMemo } from "react"
import PropTypes from "prop-types"

// 內部資源
import CheckboxRadio from "./form/CheckboxRadio"
import Input from "./form/Input"
import Textarea from "./form/Textarea"
import Select from "./form/Select"

export default function CheckoutWriteCard({
  register,
  errors,
  setValue,
  clearErrors,
  watchForm  
}){
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

  useEffect(() => {
    if (watchForm.isWriteCard){      
      setValue('cardType', cardOptions[0].imgUrl)
      setValue('cardFont', "ff-noto-sans")
      setValue('wrapping', "免費包裝")
    }
  }, [watchForm.isWriteCard, cardOptions, setValue, clearErrors])

  return (
    <>
      <div className="row mb-3">
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
                  <div id={wrapping.id} className={`accordion-collapse collapse ${wrapping.title === "免費包裝" ? 'show' : ''}`} data-bs-parent="#accordionWrappingOptions">
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
    </>
  )
}
CheckoutWriteCard.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  watchForm: PropTypes.object.isRequired,
}