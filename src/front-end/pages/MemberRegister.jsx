import Breadcrumb from '../components/Breadcrumb.jsx'
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const breadcrumbItem = [
  {
    page: '首頁',
    link: '/',
  },
  {
    page: '註冊',
    link: '/member-register',
  },
]

function MemberRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // 用於確認密碼驗證
  const password = watch('password')

  const onSubmit = (data) => {
    console.log(data) // 處理註冊邏輯
  }

  return (
    <>
      <ReactHelmetAsync title="會員註冊" />
      <div className="container pt-19 pb-19">
        <div className="row justify-content-center">
          {/* <!-- 麵包屑Breadcrumbs --> */}
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
          <div className="col-lg-6">
            <h3 className="text-center mb-10 mt-10">註冊成為會員</h3>
            <form className="mb-22" onSubmit={handleSubmit(onSubmit)}>
              {/* 姓名 */}
              <div className="mb-6">
                <label htmlFor="name" className="form-label mb-3">
                  姓名
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? 'border-danger' : ''
                    }`}
                    id="name"
                    placeholder="請輸入姓名"
                    {...register('name', {
                      required: '姓名為必填',
                      minLength: {
                        value: 2,
                        message: '姓名至少需要2個字符',
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                      <span
                        className="d-flex align-items-center justify-content-center bg-danger rounded-circle text-white"
                        style={{
                          width: '20px',
                          height: '20px',
                          fontSize: '14px',
                        }}
                      >
                        !
                      </span>
                    </div>
                  )}
                </div>
                {errors.name && (
                  <div className="text-danger mt-1 small">
                    {errors.name.message}
                  </div>
                )}
              </div>
              {/* 電子郵件 */}
              <div className="mb-6">
                <label htmlFor="email" className="form-label mb-3">
                  電子郵件
                </label>
                <div className="position-relative">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? 'border-danger' : ''
                    }`}
                    id="email"
                    placeholder="請輸入電子郵件"
                    {...register('email', {
                      required: '電子郵件為必填',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: '請輸入有效的電子郵件地址',
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                      <span
                        className="d-flex align-items-center justify-content-center bg-danger rounded-circle text-white"
                        style={{
                          width: '20px',
                          height: '20px',
                          fontSize: '14px',
                        }}
                      >
                        !
                      </span>
                    </div>
                  )}
                </div>
                {errors.email && (
                  <div className="text-danger mt-1 small">
                    {errors.email.message}
                  </div>
                )}
              </div>
              {/* 密碼 */}
              <div className="mb-6">
                <label htmlFor="password" className="form-label mb-3">
                  密碼
                </label>
                <div className="position-relative">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? 'border-danger' : ''
                    }`}
                    id="password"
                    placeholder="請輸入密碼"
                    {...register('password', {
                      required: '密碼為必填',
                      minLength: {
                        value: 6,
                        message: '密碼至少需要6個字符',
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                        message: '密碼需包含大小寫字母和數字',
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                      <span
                        className="d-flex align-items-center justify-content-center bg-danger rounded-circle text-white"
                        style={{
                          width: '20px',
                          height: '20px',
                          fontSize: '14px',
                        }}
                      >
                        !
                      </span>
                    </div>
                  )}
                </div>
                {errors.password && (
                  <div className="text-danger mt-1 small">
                    {errors.password.message}
                  </div>
                )}
              </div>
              {/* 確認密碼 */}
              <div className="mb-10">
                <label htmlFor="confirmPassword" className="form-label mb-3">
                  確認密碼
                </label>
                <div className="position-relative">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? 'border-danger' : ''
                    }`}
                    id="confirmPassword"
                    placeholder="請再次輸入密碼"
                    {...register('confirmPassword', {
                      required: '請確認密碼',
                      validate: (value) =>
                        value === password || '兩次輸入的密碼不匹配',
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                      <span
                        className="d-flex align-items-center justify-content-center bg-danger rounded-circle text-white"
                        style={{
                          width: '20px',
                          height: '20px',
                          fontSize: '14px',
                        }}
                      >
                        !
                      </span>
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <div className="text-danger mt-1 small">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
              {/* 註冊按鈕 */}
              <button type="submit" className="btn btn-primary w-100">
                註冊
              </button>
            </form>
            {/* 登入連結 */}
            <div className="mt-4 text-center">
              <h3 className="mb-10">已經有帳號了?</h3>
              <Link to="/member-login" className="btn btn-primary w-100">
                點這裡登入
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberRegister
