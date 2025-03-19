import InputSearchDefault from './form/InputSearchDefault';
import { festivalOptions, relationOptions, categoryOptions, priceRangeOptions } from '../constants/filterOptions';

const FilterForm = ({ 
  filters, 
  actions, 
  isLarge 
}) => {
  const { searchValue, festival, relation, category, priceRange } = filters;
  const { handleFilterChange, handleSearchValueChange, handleSearch } = actions;

  return (
    <div className="productsList-search-form bg-neutral20 px-3 px-sm-6 px-xl-8 py-6 py-xl-8 sticky-top">
      <form onSubmit={(e) => e.preventDefault()}>
        <h3 className="fs-4 mb-6">篩選</h3>
        <div className="row gy-4 gy-xl-6 gx-4 gx-xl-0">
          <div className="col-12">
            <InputSearchDefault
              size={isLarge ? 'lg' : 'standard'}
              value={searchValue}
              onChange={handleSearchValueChange}
              onSearch={handleSearch}
            />
          </div>

          <div className="col-6 col-xl-12">
            <select
              className={`form-select ${isLarge ? 'form-select-lg' : ''}`}
              name="festival"
              value={festival}
              onChange={handleFilterChange}
            >
              <option value="">節慶 / 場合</option>
              {festivalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-6 col-xl-12">
            <select
              className={`form-select ${isLarge ? 'form-select-lg' : ''}`}
              name="relation"
              value={relation}
              onChange={handleFilterChange}
            >
              <option value="">送禮關係</option>
              {relationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-6 col-xl-12">
            <select
              className={`form-select ${isLarge ? 'form-select-lg' : ''}`}
              name="category"
              value={category}
              onChange={handleFilterChange}
            >
              <option value="">禮物類別</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-6 col-xl-12">
            <select
              className={`form-select ${isLarge ? 'form-select-lg' : ''}`}
              name="priceRange"
              value={priceRange}
              onChange={handleFilterChange}
            >
              <option value="">價格範圍</option>
              {priceRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;