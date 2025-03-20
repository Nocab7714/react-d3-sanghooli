// DelCouponModal.jsx
import { useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { createToast } from '../../slices/toastSlice'

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env

export default function DelCouponModal({
  tempCoupon,
  isOpen,
  setIsOpen,
  getCoupons,
}) {
  const dispatch = useDispatch()
  const delCouponModalRef = useRef(null)

  // 初始化 Modal
  useEffect(() => {
    new Modal(delCouponModalRef.current, { backdrop: false })
  }, [])

  // isOpen === true 時，打開 Modal
  useEffect(() => {
    if (isOpen) {
      Modal.getInstance(delCouponModalRef.current).show()
    }
  }, [isOpen])

  // 關閉 Modal
  const handleClose = () => {
    Modal.getInstance(delCouponModalRef.current).hide()
    setIsOpen(false) // 設成 false，父元件就知道 Modal 已關閉
  }

  // 呼叫後端刪除 API
  const handleDeleteCoupon = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/${apiPath}/admin/coupon/${tempCoupon.id}`
      )
      dispatch(createToast({ success: true, message: '刪除優惠券成功' }))
      getCoupons() // 刪除成功後重新抓取列表
      handleClose() // 關閉 Modal
    } catch (error) {
      dispatch(createToast({ success: false, message: '刪除優惠券失敗' }))
    }
  }

  return (
    <div
      ref={delCouponModalRef}
      className="modal fade"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">刪除優惠券</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            確定要刪除
            <span className="text-secondary fw-bold"> {tempCoupon.title} </span>
            這個優惠券嗎？刪除後將無法復原！
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-neutral60"
              onClick={handleClose}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteCoupon}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
