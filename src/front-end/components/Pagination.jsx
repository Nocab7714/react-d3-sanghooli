import Swal from 'sweetalert2';

const Pagination = ({ paginationData, onPageChange }) => {
  if (!paginationData) {
    return null;
  }

  const { total_pages, current_page, has_pre, has_next } = paginationData;

  const goToPage = (page) => {
    if (page >= 1 && page <= total_pages && page !== current_page) {
      // 調用頁面變化處理函數
      onPageChange(page);
      
      // 強制滾動到上方
      // 這是一個備用方法，以防頁面組件的滾動邏輯失敗
      setTimeout(() => {
        const searchTitle = document.querySelector('[data-scroll-target="search-results"]');
        if (searchTitle) {
          const offsetTop = searchTitle.getBoundingClientRect().top + window.scrollY;
          const offsetAdjustment = 180;
          window.scrollTo({
            top: Math.max(0, offsetTop - offsetAdjustment),
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  };

  const handleEllipsisClick = () => {
    Swal.fire({
      title: '請輸入要跳轉的頁碼',
      input: 'number',
      inputAttributes: {
        min: 1,
        max: total_pages,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonText: '跳轉',
      cancelButtonText: '取消',
      customClass: {
        popup: 'custom-alert',
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn',
        input: 'custom-input',
      },
      preConfirm: (value) => {
        const pageNumber = Number(value);
        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > total_pages) {
          Swal.showValidationMessage('請輸入有效的頁碼！');
          return false;
        }
        return pageNumber;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        goToPage(result.value);
      }
    });
  };

  const generatePagination = () => {
    if (total_pages <= 5)
      return Array.from({ length: total_pages }, (_, i) => i + 1);

    if (current_page <= 3) return [1, 2, 3, '...', total_pages];

    if (current_page >= total_pages - 2)
      return [1, '...', total_pages - 2, total_pages - 1, total_pages];

    return [
      1,
      '...',
      current_page - 1,
      current_page,
      current_page + 1,
      '...',
      total_pages,
    ];
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination flex-wrap">
        {/* 第一頁按鈕 */}
        <li className={`page-item ${!has_pre ? 'disabled' : ''}`}>
          <button
            className="page-link"
            type="button"
            onClick={() => goToPage(1)}
            disabled={!has_pre}
          >
            <span className="material-symbols-outlined fs-6 align-middle">
              keyboard_double_arrow_left
            </span>
          </button>
        </li>

        {/* 上一頁按鈕 */}
        <li className={`page-item ${!has_pre ? 'disabled' : ''}`}>
          <button
            className="page-link"
            type="button"
            onClick={() => goToPage(current_page - 1)}
            disabled={!has_pre}
          >
            <span className="material-symbols-outlined fs-6 align-middle">
              chevron_left
            </span>
          </button>
        </li>

        {/* 生成頁碼 */}
        {generatePagination().map((page, index) => (
          <li
            key={index}
            className={`page-item ${page === current_page ? 'active' : ''}`}
          >
            {page === '...' ? (
              <button
                className="page-link"
                type="button"
                onClick={handleEllipsisClick}
              >
                ...
              </button>
            ) : (
              <button
                className="page-link"
                type="button"
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* 下一頁按鈕 */}
        <li className={`page-item ${!has_next ? 'disabled' : ''}`}>
          <button
            className="page-link"
            type="button"
            onClick={() => goToPage(current_page + 1)}
            disabled={!has_next}
          >
            <span className="material-symbols-outlined fs-6 align-middle">
              chevron_right
            </span>
          </button>
        </li>

        {/* 最後一頁按鈕 */}
        <li className={`page-item ${!has_next ? 'disabled' : ''}`}>
          <button
            className="page-link"
            type="button"
            onClick={() => goToPage(total_pages)}
            disabled={!has_next}
          >
            <span className="material-symbols-outlined fs-6 align-middle">
              keyboard_double_arrow_right
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;