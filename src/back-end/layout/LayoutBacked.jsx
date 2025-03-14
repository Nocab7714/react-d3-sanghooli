// 頁面元件引入
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";

import HeaderBacked from "./HeaderBacked.jsx";
import FooterBacked from "./FooterBacked.jsx";
import ScreenLoading from "../../plugins/ScreenLoading";
import SectionLoading from "../../plugins/SectionLoading.jsx";
import Toast from "../../plugins/Toast.jsx";

//外部元件
import AutoScrollToTop from "../../plugins/AutoScrollToTop.jsx";
import GoToTop from "../components/GoToTop.jsx";

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

      <Toast />
      <div className="position-relative">
        <SectionLoading />
        <Outlet />
      </div>
      <FooterBacked />
      <GoToTop />
      <ScreenLoading />
    </>
  );
}

export default LayoutBacked;
