import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { resetToast } from "../slices/toastSlice";

function Toast(){
  const dispatch = useDispatch();
  const { id, show, title, icon} = useSelector((state) => state.toast)

  useEffect(() => {
    if (show) { // 只有當 `show` 為 `true` 時才觸發
      Swal.fire({
        toast: true,
        icon: icon,
        title: title,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "custom-toast", // 設定 class 來調整顏色
          timerProgressBar: "custom-progress-bar", // 設定計時進度條的樣式
        },
      }).then(() => {
        dispatch(resetToast());
      });
    }
  }, [id, show, icon, title, dispatch]);

  return null;
};

export default Toast;