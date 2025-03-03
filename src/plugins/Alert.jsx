import { useEffect } from "react";
import Swal from "sweetalert2";

/**
 * Alert 元件 - 顯示彈出式提示框 (基於 SweetAlert2)
 *
 * @component
 * @example
 * // 基本使用方式 (成功訊息)
 * <Alert show={true} title="操作成功！" text="你的訂單已提交" icon="success" />
 *
 * @example
 * // 帶有錯誤圖示與自訂確認按鈕顏色
 * <Alert show={true} title="刪除確認" text="確定要刪除嗎？" icon="error" confirmColor="#ff4d4f" />
 *
 * @param {boolean} show - 是否顯示 Alert (當 `true` 時觸發彈窗)
 * @param {string} title - Alert 標題
 * @param {string} text - Alert 內容
 * @param {string} icon - 圖示類型 (可選值："success", "error", "warning", "info", "question")
 * @param {string} confirmText - 確認按鈕的文字 (預設："確定")
 * @param {string} confirmColor - 確認按鈕的顏色 (預設：`#3085d6` 藍色)
 * @returns {null} 此元件不渲染 DOM，只負責觸發 SweetAlert2
 */

const Alert = ({
  show = false,
  title = "請設定標題",
  text = "",
  icon = "success",
  confirmText = "確定",
  confirmColor = "#3085d6", // 預設為 SweetAlert2 的藍色
}) => {
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
    });
  }, [show, title, text, icon, confirmText, confirmColor]);

  return null; // 不渲染任何內容
};

export default Alert;