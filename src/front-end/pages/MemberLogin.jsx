// 外部資源
import { useState, useRef, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync'

//視 麵包屑breadcrumb 階層保留對應資料
const breadcrumbItem = [
  {
    page: '首頁',
    link: '/',
  },
  {
    page: '登入',
    link: '/member-login',
  },
]

function MemberLogin() {
  return (
    <>
      <ReactHelmetAsync title="會員登入註冊" />
      <div className="container">
        <div className="row justify-content-center">
          {/* <!-- 麵包屑Breadcrumbs --> */}
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
          <div className="col-lg-6 col-12">
            <h3 className="text-center mb-10 mt-10">已經是會員了?</h3>
            <form className="mb-22">
              {/* 電子郵件 */}
              <div className="mb-6">
                <label htmlFor="mail" className="form-label mb-3">
                  電子郵件
                </label>
                <input
                  type="mail"
                  className="form-control"
                  id="mail"
                  placeholder="請輸入電子郵件"
                />
              </div>
              {/* 密碼 */}
              <div className="mb-10">
                <label htmlFor="password" className="form-label mb-3">
                  密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="請輸入密碼"
                />
              </div>
              {/* 登入按鈕 */}
              <button type="submit" className="btn btn-primary w-100">
                登入
              </button>
            </form>
            {/* 註冊連結 */}
            <div className="mt-4 mb-22 text-center">
              <h3 className="mb-10">首次用戶</h3>
              <button type="submit" className="btn btn-primary w-100 ">
                點這裡註冊成為會員
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberLogin
