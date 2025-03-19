import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { removeAlert } from "../slices/alertSlice";

function Alert(){
  const dispatch = useDispatch();
  const {show, title, text, icon, confirmText, confirmColor} = useSelector((state) => state.alert);

  useEffect(() => {
    if (!show) return;

    Swal.fire({
      icon,
      title,
      text,
      confirmButtonText: confirmText,
      customClass: {
        popup: "custom-alert",
        confirmButton: "custom-confirm-btn", // 這邊套用 CSS 來控制顏色
      },
    }).then((result) => {
      // 確認按鈕被點擊後，更新 show 狀態為 false
      if (result.isConfirmed){
        dispatch(removeAlert())
      }
    })
  }, [show, title, text, icon, confirmText, confirmColor, dispatch]);

  return null; // 不渲染任何內容
};

export default Alert;