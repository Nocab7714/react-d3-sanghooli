// 頁面元件引入
import HeaderBacked from "./HeaderBacked.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import GoToTop from "../components/GoToTop.jsx";
import FooterBacked from "./FooterBacked.jsx";
import { useContext, useEffect } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";

//外部元件
import AutoScrollToTop from "../../plugins/AutoScrollToTop.jsx";

function LayoutBacked() {
  const { isLoggedIn } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login"); // 未登入時導向登入頁面
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <AutoScrollToTop />
      <HeaderBacked />
      <div>
        <Outlet />
      </div>
      <FooterBacked />
      <GoToTop />
    </>
  );
}

export default LayoutBacked;
