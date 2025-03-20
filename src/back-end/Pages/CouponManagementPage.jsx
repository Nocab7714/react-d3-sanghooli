// 外部資源
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'
import PaginationBackend from '../components/PaginationBackend'
import { createToast } from '../../slices/toastSlice'
import { Modal } from 'bootstrap'
import DelCouponModal from '../components/DelCouponModal'
import { useDispatch, useSelector } from 'react-redux'
import { asyncSetLoading } from '../../slices/loadingSlice'

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env

const CouponManagementPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() // 用於觸發 toast
  // 優惠券列表、分頁資訊
  const [couponList, setCouponList] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  // 從 Redux 獲取 sectionLoading 狀態
  const { sectionLoading } = useSelector((state) => state.loading)
  // Loading 狀態
  const [isScreenLoading, setIsScreenLoading] = useState(false)
  const [modalType, setModalType] = useState('') // 'create' 或 'edit'
  const [tempCoupon, setTempCoupon] = useState({})
  // 管理「刪除優惠券 Modal」的顯示
  const [isDelModalOpen, setIsDelModalOpen] = useState(false)
  // 優惠券時間
  const [dateTime, setDateTime] = useState(new Date())

  // React Hook Form
  const {
    register,
    handleSubmit: couponHookFormSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  // 當 tempCoupon 更新時，更新表單值
  useEffect(() => {
    if (tempCoupon) {
      setValue('title', tempCoupon.title || '')
      setValue('code', tempCoupon.code || '')
      setValue('percent', tempCoupon.percent || 0)
      setValue('is_enabled', tempCoupon.is_enabled || false)

      // 日期需要特殊處理為 yyyy-MM-dd 格式
      if (tempCoupon.due_date) {
        const date = new Date(tempCoupon.due_date)
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        setValue('due_date', formattedDate)
      }
    }
  }, [tempCoupon, setValue])

  // 表單提交處理
  const onSubmit = (data) => {
    const formattedData = {
      ...tempCoupon,
      title: data.title,
      code: data.code,
      percent: Number(data.percent),
      is_enabled: data.is_enabled,
      due_date: new Date(data.due_date).getTime(),
    }

    if (modalType === 'create') {
      createCoupon(formattedData)
    } else if (modalType === 'edit') {
      updateCoupon(formattedData)
    }
    closeModal()
  }

  // 驗證登入
  const checkUserLogin = async () => {
    try {
      await axios.post(`${baseUrl}/api/user/check`)
    } catch (error) {
      alert('請先登入')
      navigate('/admin/login')
    }
  }

  // 取出 Cookie 中的 Token，設置到 axios headers
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)D3Token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    axios.defaults.headers.common['Authorization'] = token
    checkUserLogin()
    getCoupons()
  }, [])

  // 取得優惠券清單
  const getCoupons = async (page = 1) => {
    dispatch(asyncSetLoading(['sectionLoading', true]))

    try {
      const res = await axios.get(
        `${baseUrl}/api/${apiPath}/admin/coupons?page=${page}`
      )
      setCouponList(res.data.coupons)
      setPageInfo(res.data.pagination)
    } catch (error) {
      dispatch(
        createToast({ success: false, message: '取得優惠券失敗，請稍後再試' })
      )
    } finally {
      dispatch(asyncSetLoading(['sectionLoading', false]))
    }
  }

  // 分頁點擊
  const handlePageChange = (page) => {
    getCoupons(page)
    window.scrollTo({ top: 100, behavior: 'auto' })
  }

  // ================== Modal 狀態與邏輯 ==================
  const couponModalRef = useRef(null) // 綁定 Modal 容器

  // 初始化 Bootstrap Modal
  useEffect(() => {
    // 只要第一次進入頁面時，new 一次即可
    new Modal(couponModalRef.current, {
      backdrop: 'true', // 點 backdrop 可改成 true/false
    })
  }, [])

  // 開啟 Modal
  const openModal = (type, couponData = null) => {
    setModalType(type)

    if (type === 'create') {
      const currentDate = new Date()
      setDateTime(currentDate)
      // 新增時，表單初始化
      setTempCoupon({
        title: '',
        code: '',
        percent: 0,
        due_date: currentDate.getTime(),
        is_enabled: false,
      })
    } else if (type === 'edit' && couponData) {
      setModalType('edit')
      setDateTime(new Date(couponData.due_date))
      // 編輯時，帶入該筆優惠券的資料
      setTempCoupon({
        ...couponData,
        // 後端若傳回 1/0，需轉為 true/false 方便 checkbox 顯示
        is_enabled: couponData.is_enabled === 1 ? true : false,
      })
    }

    // 顯示 Modal
    Modal.getInstance(couponModalRef.current).show()
  }

  // 關閉 Modal  並重置表單
  const closeModal = () => {
    Modal.getInstance(couponModalRef.current).hide()
    reset() // 重置表單
  }

  // ================== 新增、編輯、刪除優惠券 ==================
  // 新增優惠券
  const createCoupon = async (couponData) => {
    dispatch(asyncSetLoading(['sectionLoading', true]))
    try {
      await axios.post(`${baseUrl}/api/${apiPath}/admin/coupon`, {
        data: {
          ...couponData,
          is_enabled: couponData.is_enabled ? 1 : 0,
          due_date: Number(couponData.due_date),
        },
      })
      dispatch(createToast({ success: true, message: '新增優惠券成功' }))
      getCoupons() // 重新撈取列表
    } catch (error) {
      dispatch(createToast({ success: false, message: '新增優惠券失敗' }))
    } finally {
      dispatch(asyncSetLoading(['sectionLoading', false]))
    }
  }

  // 編輯優惠券
  const updateCoupon = async (couponData) => {
    dispatch(asyncSetLoading(['sectionLoading', true]))
    try {
      await axios.put(
        `${baseUrl}/api/${apiPath}/admin/coupon/${couponData.id}`,
        {
          data: {
            ...couponData,
            is_enabled: couponData.is_enabled ? 1 : 0,
            due_date: Number(couponData.due_date),
          },
        }
      )
      dispatch(createToast({ success: true, message: '更新優惠券成功' }))
      getCoupons()
    } catch (error) {
      dispatch(createToast({ success: false, message: '更新優惠券失敗' }))
    } finally {
      dispatch(asyncSetLoading(['sectionLoading', false]))
    }
  }

  // 刪除優惠券
  const handleOpenDelCouponModal = (coupon) => {
    setTempCoupon(coupon) // 設定要刪除的優惠券
    setIsDelModalOpen(true) // 打開 DelCouponModal
  }

  // ================== 畫面呈現 ==================
  return (
    <>
      <ReactHelmetAsync title="後台系統-優惠券管理頁面" />
      <div className="container">
        <div className="row">
          <div className="col pt-19 pb-19">
            <div className="titleDeco d-flex justify-content-between pt-19 pb-19 mb-8 rounded-3">
              <h1 className="ms-10">優惠券管理</h1>
              <button
                type="button"
                className="btn btn-primary me-10"
                onClick={() => openModal('create')}
              >
                新增優惠券
              </button>
            </div>

            <div>
              <div className="managementList pt-19 pb-19 ps-5 pe-5 rounded-3">
                {/* 如果 couponList 沒資料 */}
                {couponList.length === 0 ? (
                  <div className="text-center p-5">
                    <h2 className="text-neutral60">目前尚未有任何優惠券資料</h2>
                  </div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr className="rounded-3 shadow-sm">
                        <th scope="col">優惠券名稱</th>
                        <th scope="col">優惠券代碼</th>
                        <th scope="col">訂單折扣</th>
                        <th scope="col">使用期限</th>
                        <th scope="col">啟用狀態</th>
                        <th className="text-center" scope="col">
                          編輯資料
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {couponList.map((data) => (
                        <tr key={data.id} className="align-middle">
                          <td>{data.title}</td>
                          <td>{data.code}</td>
                          <td>{data.percent}%</td>
                          <td>
                            {new Date(data.due_date).toLocaleDateString(
                              'zh-TW'
                            )}
                          </td>
                          <td>
                            {data.is_enabled ? (
                              <span className="text-primary-dark">已啟用</span>
                            ) : (
                              <span className="text-neutral40">未啟用</span>
                            )}
                          </td>

                          {/* 編輯、刪除按鈕 */}
                          <td className="text-center">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-primary btn-outline-primary-dark"
                                onClick={() => openModal('edit', data)}
                              >
                                編輯
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => handleOpenDelCouponModal(data)}
                              >
                                刪除
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {/* 刪除優惠券 Modal */}
                <DelCouponModal
                  tempCoupon={tempCoupon}
                  isOpen={isDelModalOpen}
                  setIsOpen={setIsDelModalOpen}
                  getCoupons={getCoupons}
                />

                {/* 分頁元件，只有在有數據時顯示 */}
                {couponList?.length > 0 && (
                  <PaginationBackend
                    pageInfo={pageInfo}
                    handlePageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal：新增 / 編輯優惠券 */}
      <div
        ref={couponModalRef}
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <form onSubmit={couponHookFormSubmit(onSubmit)}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'create' ? '新增優惠券' : '編輯優惠券'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* 優惠券名稱 */}
                <div className="mb-3">
                  <label className="form-label">優惠券名稱</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? 'is-invalid' : ''
                    }`}
                    {...register('title', {
                      required: '優惠券名稱為必填',
                      minLength: { value: 2, message: '名稱至少需要2個字元' },
                      maxLength: { value: 20, message: '名稱不可超過20個字元' },
                    })}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title.message}
                    </div>
                  )}
                </div>
                {/* 優惠券代碼 */}
                <div className="mb-3">
                  <label className="form-label">優惠券代碼</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.code ? 'is-invalid' : ''
                    }`}
                    {...register('code', {
                      required: '優惠券代碼為必填',
                      pattern: {
                        value: /^[A-Z0-9]{4,12}$/,
                        message: '代碼須為4-12位大寫英文字母或數字',
                      },
                    })}
                  />
                  {errors.code && (
                    <div className="invalid-feedback">
                      {errors.code.message}
                    </div>
                  )}
                </div>
                {/* 訂單折扣(%) */}
                <div className="mb-3">
                  <label className="form-label">訂單折扣(%)</label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.percent ? 'is-invalid' : ''
                    }`}
                    {...register('percent', {
                      required: '折扣比例為必填',
                      min: { value: 1, message: '折扣至少為1%' },
                      max: { value: 99, message: '折扣不可超過99%' },
                    })}
                  />
                  {errors.percent && (
                    <div className="invalid-feedback">
                      {errors.percent.message}
                    </div>
                  )}
                </div>
                {/* 使用期限 */}
                <div className="mb-3">
                  <label className="form-label">使用期限</label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.due_date ? 'is-invalid' : ''
                    }`}
                    {...register('due_date', {
                      required: '使用期限為必填',
                      validate: (value) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const selectedDate = new Date(value)
                        return selectedDate >= today || '日期不能早於今天'
                      },
                    })}
                  />
                  {errors.due_date && (
                    <div className="invalid-feedback">
                      {errors.due_date.message}
                    </div>
                  )}
                </div>
                {/* 是否啟用 */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isEnabled"
                    {...register('is_enabled')}
                  />
                  <label className="form-check-label" htmlFor="isEnabled">
                    是否啟用
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-neutral60 fs-6 "
                  onClick={closeModal}
                >
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  {modalType === 'create' ? '確認' : '確認'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CouponManagementPage
