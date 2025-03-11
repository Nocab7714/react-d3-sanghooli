// 資料驅動範例
// 1. 請從外層傳入 paginationData 資料
// 2. 資料請使用 API Get 到的回傳的資料做驅動

const PaginationBackend = ({ pageInfo , handlePageChenge })=>{

  return (
      // 分頁元件模板版型放置處
      <div className="d-flex justify-content-center mt-19">
          <nav aria-label="Page navigation">
              <ul className="pagination flex-wrap">
                
                  {/* 第一頁按鈕 */}
                  <li className={`page-item ${pageInfo.current_page === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        type="button"
                        onClick={() => handlePageChenge(1)}
                    >
                        <span className="material-symbols-outlined fs-6 align-middle">
                            keyboard_double_arrow_left
                        </span>
                    </button>
                  </li>
                  
                  
                  {/* 前一頁按鈕 */}
                  <li className={`page-item ${!pageInfo.has_pre? 'disabled':''}`}>
                    <button 
                        type="button"
                        className="page-link"
                        onClick={()=> handlePageChenge(pageInfo.current_page - 1)}  
                    >
                        <span className="material-symbols-outlined fs-6 align-middle">
                            chevron_left
                            </span>
                        </button>
                  </li>

                  {/* 頁碼生成：透過 Array.from ＋map渲染的方式：將對應的長度的陣列(頁碼)印出，要記得加上key */}
                  { Array.from({length:pageInfo.total_pages}) .map((_,index)=>(
                      <li 
                        key={index} 
                        className={`page-item ${pageInfo.current_page === index + 1  && 'active'}`}>
                      {/* 取得前頁面資料的判斷式條件 */}
                          <button  
                              type="button"
                              className="page-link" 
                              onClick={()=> handlePageChenge(index + 1)} 
                          >
                          {/* 在頁碼處帶上:因為index 是從0開始，所以用+1方式，讓頁碼從 1 開始做顯示 */}
                          { index + 1 }
                          </button>
                      </li>
                  ))}

                 {/* 下一頁按鈕 */}
                  <li className={`page-item ${!pageInfo.has_next ? 'disabled':''}`}>
                      <button 
                          type="button"
                          className="page-link"
                          onClick={()=> handlePageChenge(pageInfo.current_page+1) } 
                      >
                          <span className="material-symbols-outlined fs-6 align-middle">
                            chevron_right
                          </span>
                      </button>

                
                  </li>

                  {/* 最後一頁按鈕 */}
                  <li className={`page-item ${pageInfo.current_page === pageInfo.total_pages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        type="button"
                        onClick={()=> handlePageChenge(pageInfo.total_pages) } 
                    >
                        <span className="material-symbols-outlined fs-6 align-middle">
                            keyboard_double_arrow_right
                        </span>
                    </button>
                  </li>
              </ul>
          </nav>
      </div>
  )
}

export default PaginationBackend;