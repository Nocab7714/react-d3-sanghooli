import PropTypes from "prop-types";

export default function CartStep({step = 1}){  
  const progressMap = [
    {
      step: 1,
      completionRate: '33%',
      title: 'Step1 : 購物車',
      description: '確認您的產品',
      icon: 'local_mall'
    },
    {
      step: 2,
      completionRate: '66%',
      title: 'Step2 : 填寫資料',
      description: '填寫訂購人相關資訊，進行客製化服務挑選並建立訂單',
      icon: 'description'
    },
    {
      step: 3,
      completionRate: '100%',
      title: 'Step3 : 訂單付款',
      description: '選擇您的付款方式並進行付款',
      icon: 'credit_card'
    },
  ];
  const progressBar = progressMap[step - 1].completionRate;
  return (
    <>
      <div className="text-neutral60 pt-6 mb-10">
        <a
          href="#"
          className="link-neutral60 d-inline-flex align-items-center gap-1 justify-content-start"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <h5 className="fw-semibold">回到首頁</h5>
        </a>
      </div>
      <div className="bg-white rounded-4 overflow-hidden mb-10 mb-xl-19">
      {/* 手機 */}
      <ul className="fs-7 d-flex d-lg-none py-5 mb-0 px-0 flex-wrap">
        {
          progressMap.filter((progressMap) => progressMap.step === step).map((item) => (
            <ol key={item.step} className="cart-step d-flex align-items-center gap-4 px-6">
              <span className={`material-symbols-outlined rounded-circle p-4 fs-2 ${item.step <= step ? 'text-primary-dark bg-primary-light' : 'text-neutral40 bg-neutral20'}`}>
                {item.icon}
              </span>
              <div className={`${item.step <= step ? '' : 'text-neutral40'}`}>
                <h6 className="fs-7">{item.title}</h6>
                <span>{item.description}</span>
              </div>
            </ol>
          ))
        }
      </ul>
      {/* 桌機 */}
      <ul className="fs-7 d-none d-lg-flex py-5 mb-0 px-0 flex-wrap">
        {
          progressMap.map((progressMap) => (
            <ol key={progressMap.step} className="cart-step d-flex align-items-center gap-4 px-6">
              <span className={`material-symbols-outlined rounded-circle p-4 fs-2 ${progressMap.step <= step ? 'text-primary-dark bg-primary-light' : 'text-neutral40 bg-neutral20'}`}>
                {progressMap.icon}
              </span>
              <div className={`${progressMap.step <= step ? '' : 'text-neutral40'}`}>
                <h6 className="fs-7">{progressMap.title}</h6>
                <span>{progressMap.description}</span>
              </div>
            </ol>
          ))
        }
      </ul>
      <div
        className="progress"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="33"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ height: "3px" }}
      >
        <div className="progress-bar" style={{ width: progressBar}}></div>
      </div>
    </div>
    </>
  )
}
CartStep.propTypes = {
  step: PropTypes.number.isRequired,
}
