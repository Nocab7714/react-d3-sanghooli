// 外部資源
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// 內部資源

// 環境變數
const { VITE_BASE_URL: baseUrl } = import.meta.env;

function AdminLoginPage() {
  // 控制登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  //登入資訊
  const [account, setAccount] = useState({
    username: '',
    password: '',
});

  const navigate = useNavigate();

  // 使用 react-hook-form 處理表單驗證
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // 檢查登入狀態:處理輸入變動
  const handleInputChange = (event) => {
    const { value, name } = event.target; // 將點擊後觸發的 event 事件的 value 和 name 解構出來

    setAccount({
      ...account,
      [name]: value,
    });
  };

  // 處理登入與登出，data 是表單經過驗證後的資料
  const handleLogin = async (data) => {
    //event.preventDefault(); //移除預設觸發行為：防止表單預設提交

    try{
      const res = await axios.post(`${baseUrl}/admin/signin`,data); 
      
      //透過解構方式，取得：token , expired 資料
      const { token, expired } = res.data;

      //將 token 存入 cookie
      document.cookie = `D3Token=${token}; expires=${new Date(expired)}`; 
      axios.defaults.headers.common['Authorization'] = token;
      
      alert('登入成功');
      setIsLoggedIn(true);
      navigate('/admin/orders'); //確保後台登入直接進到訂單管理頁面
    } catch(error){
      alert("登入失敗，請稍作等待後，再嘗試重新登入");
      }
    };

    return (
     <>
      <ReactHelmetAsync title="後台系統-傳送門" />
       {/* //登入模板 */}
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-5 ">SANGHOOI 後台登入</h1>
            <form 
              onSubmit={handleSubmit(handleLogin)}
              className="d-flex flex-column gap-3"
            >

               {/* Email 欄位 */}
              <div className="form-floating mb-3 mt-5">
                  <input 
                    type="email"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`} // 根據錯誤顯示樣式
                    id="email" 
                    name="username" 
                    placeholder="name@example.com"
                    // value={account.username} 
                    // onChange={handleInputChange} 
                    {...register('username', {
                      required: 'Email為必填欄位', // 驗證必填
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: '請檢查Email格式，輸入是否正確', // 驗證Email格式
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
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                  id="password" 
                  name="password" 
                  placeholder="Password"
                  // value={account.password} 
                  // onChange={handleInputChange} 
                  {...register('password', { required: '密碼為必填欄位' })}
                />
                  <label htmlFor="password">Password</label>
                  {errors.password && (
                     <p className="text-danger my-2">{errors.password.message}</p>
                  )}
              </div>

               {/* 登入按鈕 */}
              {isLoggedIn ? ('') : (
                <button
                  type="submit"  
                  className="btn btn-primary mt-3"
                  disabled={isLoggedIn} // 登入後禁用按鈕，避免重複提交
                >
                  {isLoggedIn ? '已登入' : '登入'}
                </button>
              )}
          </form>
      </div>
     </>
    );
  }
  
  export default AdminLoginPage;
  