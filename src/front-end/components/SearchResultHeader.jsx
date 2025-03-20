import { forwardRef } from 'react';
import { sortOptions } from '../constants/filterOptions';

const SearchResultHeader = forwardRef(
  ({ resultsCount, sortOption, onSortChange }, ref) => {
    return (
      <div
        className="d-flex align-items-center justify-content-between mb-8 mb-md-10"
        ref={ref}
        data-scroll-target="search-results"
      >
        <div className="d-flex align-items-center text-nowrap">
          <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
            search
          </span>
          <h2 className="fs-5 fs-md-4 m-0 d-flex flex-column">
            目前搜尋結果
            <span className="fs-7 text-neutral60 fw-normal mt-1 d-md-none d-block">
              {resultsCount} 個結果
            </span>
          </h2>
        </div>

        <span className="fs-7 text-neutral60 ms-2 d-md-block d-none">
          {resultsCount} 個結果
        </span>

        <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />

        <div>
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);

SearchResultHeader.displayName = 'SearchResultHeader';

export default SearchResultHeader;
