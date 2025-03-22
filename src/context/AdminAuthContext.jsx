import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//內部資源
import { createToast } from "../slices/toastSlice";
import { asyncSetLoading } from "../slices/loadingSlice";

// 環境變數
const { VITE_BASE_URL: baseUrl } = import.meta.env;

// 建立 Context
export const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 狀態管理
  const dispatch = useDispatch();

  //登入資訊
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  //驗證登入
  const checkUserLogin = async () => {
    try {
      // 如果 token 不存在，直接跳轉到登入頁面
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)D3Token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (!token) {
        navigate("/admin/login"); // 沒有 token，導向登入頁面
        return;
      }

      axios.defaults.headers.common["Authorization"] = token; //將 token 帶到 axios 上

      await axios.post(`${baseUrl}/api/user/check`);
      setIsLoggedIn(true);
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "登入失敗，請稍後再試！",
        })
      );
    } finally {
      setIsLoggedIn(false);
    }
  };

  // 觸發 checkUserLogin 在載入時進行驗證
  useEffect(() => {
    checkUserLogin(); // 初次加載時驗證用戶登入狀態
  }, []);

  //處理表單輸入
  const handleInputChange = (event) => {
    const { value, name } = event.target; // 將點擊後觸發的 event 事件的 value 和 name 解構出來

    setAccount({
      ...account,
      [name]: value,
    });
  };

  // 處理登入，data 是表單經過驗證後的資料
  const handleLogin = async (data) => {
    dispatch(asyncSetLoading(["sectionLoading", true]));
    try {
      const res = await axios.post(`${baseUrl}/admin/signin`, data);
      const { token, expired } = res.data;

      //將 token 存入 cookie
      document.cookie = `D3Token=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;

      setIsLoggedIn(true);
      dispatch(createToast(res.data));
      navigate("/admin/orders"); // 登入後導向訂單管理
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "登入失敗，請稍後再試！",
        })
      );
    } finally {
      dispatch(asyncSetLoading(["sectionLoading", false]));
    }
  };

  // 登出函式＋登出時重設狀態並回到首頁
  const handleLogout = async () => {
    dispatch(asyncSetLoading(["sectionLoading", true]));
    try {
      await axios.post(`${baseUrl}/logout`);

      //確保登出時清除 token
      document.cookie =
        "D3Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

      // 清除狀態
      setIsLoggedIn(false);
      navigate("/admin/login"); // 登出後導向登入頁面
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(asyncSetLoading(["sectionLoading", false]));
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isLoggedIn,
        account,
        handleInputChange,
        handleLogin,
        handleLogout,
        checkUserLogin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
