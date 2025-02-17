import { useState } from 'react';

const SearchInputComponent = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert('搜尋:' + searchValue);
    }
  };

  const handleClearInput = (e) => {
    e.preventDefault();
    setSearchValue('');
  };

  return (
    <>
      {/* 搜尋輸入框 */}
      <div className="input-group search-input-container">
        {!searchValue && (
          <span className="input-group-text  bg-white border-0 pe-0">
            <span className="material-symbols-outlined input-search-icon text-neutral40 fs-6 ">
              search
            </span>
          </span>
        )}

        <input
          type="search"
          className={`form-control border-0 shadow-none pe-0 ${
            searchValue ? 'ps-4' : 'ps-3'
          }`}
          placeholder="請輸入關鍵字"
          aria-label="Search"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            handleSearch(e);
          }}
        />

        {/* 根據輸入框是否有值切換按鈕 */}
        {searchValue ? (
          <a
            className="input-group-text input-clear-icon border-0 bg-white"
            href="#"
            onClick={(e) => {
              handleClearInput(e);
            }}
          >
            <span className="material-symbols-outlined fs-6 text-neutral80 ">
              cancel
            </span>
          </a>
        ) : (
          <button className="btn btn-primary " type="button">
            搜尋
          </button>
        )}
      </div>

      {/* Lg - 搜尋輸入框*/}
      {/* Lg 版的搜尋輸入框加入 style={{height: '58.19px'}} ，是為了防止切換輸入狀態時 cancel 高度造成的抖動問題*/}
      <div className="input-group input-group-lg search-input-container mt-5">
        {!searchValue && (
          <span className="input-group-text bg-white border-0 pe-0 ps-6">
            <span className="material-symbols-outlined input-search-icon text-neutral40 fs-6 ">
              search
            </span>
          </span>
        )}

        <input
          type="search"
          className={`form-control border-0 shadow-none pe-0 ${
            searchValue ? 'ps-6' : 'ps-3'
          }`}
          style={{ height: '58.19px' }}
          placeholder="請輸入關鍵字"
          aria-label="Search"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            handleSearch(e);
          }}
        />

        {/* 根據輸入框是否有值切換按鈕 */}
        {searchValue ? (
          <a
            className="input-group-text input-clear-icon border-0 bg-white"
            href="#"
            onClick={(e) => {
              handleClearInput(e);
            }}
          >
            <span className="material-symbols-outlined fs-6 text-neutral80 ">
              cancel
            </span>
          </a>
        ) : (
          <button className="btn btn-primary px-8 fs-5" type="button">
            搜尋
          </button>
        )}
      </div>
    </>
  );
};

export default SearchInputComponent;
