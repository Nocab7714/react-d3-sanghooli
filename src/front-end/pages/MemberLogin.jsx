// 暫時保留登入頁面切版，未來視情況開發

import Breadcrumb from '../components/Breadcrumb.jsx';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const breadcrumbItem = [
  {
    page: '首頁',
    link: '/',
  },
  {
    page: '登入',
    link: '/member-login',
  },
];

function MemberLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // 處理登入邏輯
  };

  return (
    <>
      <ReactHelmetAsync title="會員登入註冊" />
      <div className="container pt-19 pb-19">
        <div className="row justify-content-center">
          {/* <!-- 麵包屑Breadcrumbs --> */}
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
          <div className="col-lg-6">
            <h3 className="text-center mb-10 mt-10">已經是會員了?</h3>
            <form className="mb-22" onSubmit={handleSubmit(onSubmit)}>
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
              <div className="mb-10">
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
                        message: '密碼至少需要6個字',
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
              {/* 登入按鈕 */}
              <button type="submit" className="btn btn-primary w-100">
                登入
              </button>
            </form>
            {/* 註冊連結 */}
            <div className="mt-4 text-center">
              <h3 className="mb-10">首次用戶</h3>
              <Link to="/member-register" className="btn btn-primary w-100">
                點這裡註冊成為會員
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberLogin;
