import { useState, useEffect } from "react";

const InputSearch = ({ size = "standard", value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  // 父層若改變了 value，需同步更新 localValue
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const isLg = size === "lg";

  /** 
   * 使用者輸入文字時，只更新 localValue。
   * 若使用者把文字清到空值 newValue === ""，
   * 我們需要立即呼叫 onChange("") 讓父層知道現在沒有搜尋。
   */
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (newValue === "") {
      onChange(""); // 只要清空，就即時告訴父層
    }
  };

  /**
   * 按下 Enter 時，才把 localValue 傳回父層，真正觸發搜尋
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(localValue);
    }
  };

  /**
   * 點擊「清除」按鈕時
   * 1. 清空 localValue
   * 2. 同步清空父層
   */
  const handleClearInput = (e) => {
    e.preventDefault();
    setLocalValue("");
    onChange("");
  };

  return (
    <div
      className={`input-group search-input-container ${
        isLg ? "input-group-lg mt-5" : ""
      }`}
    >
      {/* 如果沒輸入任何文字，就顯示搜尋圖示 */}
      {!localValue && (
        <span
          className={`input-group-text bg-white border-0 pe-0 ${
            isLg ? "ps-6" : ""
          }`}
        >
          <span className="material-symbols-outlined input-search-icon text-neutral40 fs-6">
            search
          </span>
        </span>
      )}

      <input
        type="search"
        className={`form-control border-0 shadow-none pe-0 ${
          localValue ? (isLg ? "ps-6" : "ps-4") : "ps-3"
        }`}
        style={isLg ? { height: "58.19px" } : {}}
        placeholder="請輸入關鍵字"
        aria-label="Search"
        value={localValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {localValue ? (
        <a
          className="input-group-text input-clear-icon border-0 bg-white"
          href="#"
          onClick={handleClearInput}
        >
          <span className="material-symbols-outlined fs-6 text-neutral80">
            cancel
          </span>
        </a>
      ) : (
        <button
          className={`btn btn-primary ${isLg ? "px-8 fs-5" : ""}`}
          type="button"
          // 若想讓「搜尋按鈕」也能觸發搜尋，可加上:
          // onClick={() => onChange(localValue)}
        >
          搜尋
        </button>
      )}
    </div>
  );
};

export default InputSearch;
