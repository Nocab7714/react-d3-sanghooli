// 外部資源
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactHelmetAsync from "../../plugins/ReactHelmetAsync";
import { useForm } from "react-hook-form";
import { AdminAuthContext } from "../../context/AdminAuthContext";

function AdminLoginPage() {
  // 透過 Context 取得 handleLogin 與 isLoggedIn
  const { handleLogin, isLoggedIn } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 使用 react-hook-form 處理表單驗證
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //確保 handleLogin 獲得的是 react-hook-form 處理後的表單資料
  const onSubmit = async (data) => {
    
    setIsLoading(true);
    try {
      await handleLogin(data); 
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/orders"); // 直接導向管理頁面
    }
  }, [isLoggedIn, navigate]);


  return (
    <>
      <ReactHelmetAsync title="後台系統-傳送門" />
      {/* //登入模板 */}
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5 ">SANGHOOI 後台登入</h1>
        <form
          onSubmit={handleSubmit(onSubmit)} //確保handleLogin 來自 useContext
          className="d-flex flex-column gap-3"
        >
          {/* Email 欄位 */}
          <div className="form-floating mb-3 mt-5">
            <input
              type="email"
              className={`form-control ${errors.username ? "is-invalid" : ""}`} // 根據錯誤顯示樣式
              id="email"
              name="username"
              placeholder="name@example.com"
              {...register("username", {
                required: "Email為必填欄位", // 驗證必填
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "請檢查Email格式，輸入是否正確", // 驗證Email格式
                },
              })}
            />
            <label htmlFor="username">Email address</label>
            {/* 錯誤提示 */}
            {errors.username && (
              <p className="text-danger my-2">{errors.username.message}</p>
            )}
          </div>

          {/* 密碼欄位 */}
          <div className="form-floating">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="Password"
              {...register("password", { required: "密碼為必填欄位" })}
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <p className="text-danger my-2">{errors.password.message}</p>
            )}
          </div>

          {/* 登入按鈕 */}
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={isLoading} // 登入後禁用按鈕，避免重複提交
            >
              {isLoading ? "登入中…" : "登入"}
            </button>
        </form>
      </div>
    </>
  );
}

export default AdminLoginPage;
