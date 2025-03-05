// 注意 !!
// InputSearchDefault.jsx 與 InputSearch.jsx 的差異在於 input 輸入內容不會有動態切換樣式的效果
// （例如搜尋 button 變成 clear button、search icon 消失）

import { useState, useEffect } from 'react';

const InputSearchDefault = ({ size = 'standard', value, onChange, onSearch }) => {
  // localValue 是 input 內部的本地狀態，用來同步顯示輸入框的值
  const [localValue, setLocalValue] = useState(value);

  // 監聽外部傳入的 value，如果有變化，則同步更新 localValue
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 判斷是否為大尺寸（lg），用來動態切換 `input-group-lg` 樣式
  const isLg = size === 'lg';

  // 當使用者輸入時，更新 `localValue` 並通知 `onChange` 父元件
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue); // 立即更新本地狀態
    onChange(newValue); // 將變更通知 HomePage.jsx

    // 如果使用者清空輸入框，立即觸發 `onChange('')` 確保 Redux 知道 searchValue 為空
    if (newValue === '') {
      onChange('');
    }
  };

  // 按下 Enter 鍵時，觸發 `onSearch` 搜尋
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 阻止表單提交
      onSearch(); // 執行搜尋（Redux 更新 + 轉址）
    }
  };

  return (
    <div className={`input-group search-input-container ${isLg ? 'input-group-lg mt-5' : ''}`}>
      {/* 搜尋 icon */}
      <span className={`input-group-text bg-white border-0 pe-0 ${isLg ? 'ps-6' : ''}`}>
        <span className="material-symbols-outlined input-search-icon text-neutral40 fs-6">
          search
        </span>
      </span>

      {/* 輸入框 */}
      <input
        type="search"
        className="form-control border-0 shadow-none pe-0 ps-3"
        style={isLg ? { height: '58.19px' } : {}} // 若為 lg，則設定高度
        placeholder="請輸入關鍵字"
        aria-label="Search"
        value={localValue}
        onChange={handleInputChange} // 輸入變更時執行
        onKeyDown={handleKeyDown} // 按下 Enter 時執行搜尋
      />

      {/* 搜尋按鈕 - 觸發 `onSearch` */}
      <button
        className={`btn btn-primary ${isLg ? 'px-8 fs-5' : ''}`}
        type='button'
        onClick={onSearch} // 只有按鈕點擊時才會執行搜尋
      >
        搜尋
      </button>
    </div>
  );
};

export default InputSearchDefault;
