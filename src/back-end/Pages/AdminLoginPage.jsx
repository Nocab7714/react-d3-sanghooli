import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const routes = [{ path: '/', name: '回到首頁' }];

const { VITE_BASE_URL: baseUrl } = import.meta.env;


function AdminLoginPage() {
   
  //登入資訊
    const [account, setAccount] = useState({
        username: '',
        password: '',
      });

    const handleInputChange = (event) => {
    const { value , name } = event.target; // 將點擊後觸發的 event 事件的 value 和 name 解構出來
    
    setAccount({
        ...account,
        [name]:value,
      });
    };
    
    const navigate = useNavigate();
    const handleLogin = async (event)=>{
      event.preventDefault(); //移除預設觸發行為：防止表單預設提交
    
      try{
        const res = await axios.post(`${baseUrl}/admin/signin`,account);
        
        //透過解構方式，取得：token , expired 資料
        const { token, expired } = res.data;

        //將 token 存進 cookie，確保不同頁面可存取
        document.cookie = `D3Token=${token}; expires=${new Date(expired)}`; 

        // 發送請求前，需要在headers 裡帶入 token 資料，後續動作的請求都會自動帶上Token資料
        axios.defaults.headers.common['Authorization'] = token;
        
        alert('登入成功');
        navigate('/admin/orders'); //後台登入直接進到訂單管理頁面

      } catch(error){
        alert("登入失敗，請稍作等待後，再嘗試重新登入");
        }
      };


    return (
     <>
       {/* //已完成的登入模板 */}
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-5 ">SANGHOOI 後台登入</h1>
            <form 
              onSubmit={handleLogin} 
              className="d-flex flex-column gap-3"
            >
              <div className="form-floating mb-3 mt-5">
                  <input 
                  type="email"
                  className="form-control" 
                  id="username" 
                  name="username" 
                  placeholder="name@example.com"
                  value={account.username} 
                  onChange={handleInputChange} 
                  />
                  <label htmlFor="username">Email address</label>
              </div>
              <div className="form-floating">
                <input 
                  type="password" 
                  className="form-control"
                  id="password" 
                  name="password" 
                  placeholder="Password"
                  value={account.password} 
                  onChange={handleInputChange} 
                  />
                  <label htmlFor="password">Password</label>
              </div>
              <button type="submit" className="btn btn-primary mt-3">登入</button>
          </form>
      </div>

        {/* 顯示動態內容 */}
        <Outlet/>
     </>
    );
  }
  
  export default AdminLoginPage;
  