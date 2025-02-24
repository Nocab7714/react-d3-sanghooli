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
      <div className="bg-white rounded-4 overflow-hidden mb-xl-19">
      <ul className="fs-7 d-flex py-5 mb-0 px-0 flex-wrap">
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