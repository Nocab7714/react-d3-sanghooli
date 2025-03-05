import { useEffect } from "react";
import Swal from "sweetalert2";

/**
 * Toast 元件 - 顯示右上角的即時通知 (基於 SweetAlert2)
 *
 * @component
 * @example
 * // 基本使用方式 (成功提示)
 * <Toast show={true} title="操作成功！" icon="success" />
 *
 * @example
 * // 錯誤提示，並在關閉後執行 callback
 * <Toast show={true} title="發生錯誤！" icon="error" onClose={() => console.log("Toast 關閉")} />
 *
 * @param {boolean} show - 是否顯示 Toast (當 `true` 時觸發通知)
 * @param {string} title - Toast 顯示的標題
 * @param {string} icon - 圖示類型 (可選值："success", "error", "warning", "info", "question")
 * @param {function} [onClose] - 可選，Toast 關閉後執行的函式
 * @returns {null} 此元件不渲染 DOM，只負責觸發 SweetAlert2
 */

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