import { useEffect } from "react";
import Swal from "sweetalert2";

// icon 選項 : "success", "error", "warning", "info", "question"

const Toast = ({ show = false, title = "請設定 Toast 的標題", icon = "success", onClose }) => {
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
        if (onClose) {
          onClose(); // 這裡在 `Toast` 關閉後執行 `onClose`，重置 `show`
        }
      });
    }
  }, [show, icon, title, onClose]);

  return null;
};

export default Toast;