import { useState, useEffect } from 'react';

const useProductFilter = (products, initialFilters = {}) => {
  const [searchValue, setSearchValue] = useState(
    initialFilters.searchValue || ''
  );
  const [festival, setFestival] = useState(initialFilters.festival || '');
  const [relation, setRelation] = useState(initialFilters.relation || '');
  const [category, setCategory] = useState(initialFilters.category || '');
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || '');
  const [sortOption, setSortOption] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 更新篩選條件
  useEffect(() => {
    setSearchValue(initialFilters.searchValue || '');
    setFestival(initialFilters.festival || '');
    setRelation(initialFilters.relation || '');
    setCategory(initialFilters.category || '');
    setPriceRange(initialFilters.priceRange || '');
  }, [initialFilters]);

  const handleFilterProducts = () => {
    let result = [...products];

    // 定義篩選條件
    const filters = {
      searchValue: (product) =>
        searchValue ? product.title.includes(searchValue) : true,
      festival: (product) =>
        festival ? product.tages?.includes(festival) : true,
      relation: (product) =>
        relation ? product.tages?.includes(relation) : true,
      category: (product) => (category ? product.category === category : true),
      priceRange: (product) => {
        if (!priceRange) return true;
        const price = product.price;
        const priceRanges = {
          '500 元以下': price < 500,
          '500 ~ 1,000 元': price >= 500 && price <= 1000,
          '1,000 ~ 3,000 元': price > 1000 && price <= 3000,
          '3,000 元以上': price > 3000,
        };
        return priceRanges[priceRange] ?? true;
      },
    };

    // 套用篩選條件
    result = result.filter((product) =>
      Object.values(filters).every((filter) => filter(product))
    );

    // 價格排序
    if (sortOption === 'HIGH_TO_LOW') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'LOW_TO_HIGH') {
      result.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(result);
  };

  // 當篩選條件變更時，自動執行篩選 (但不包括 searchValue)
  useEffect(() => {
    handleFilterProducts();
  }, [festival, relation, category, priceRange, sortOption, products]);

  // 當 searchValue 變為空白時，自動恢復所有商品
  useEffect(() => {
    if (searchValue === '') {
      handleFilterProducts();
    }
  }, [searchValue]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'festival':
        setFestival(value);
        break;
      case 'relation':
        setRelation(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'priceRange':
        setPriceRange(value);
        break;
      default:
        break;
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
  };

  const handleSearch = () => {
    // 明確執行搜尋（當按下 Enter 或點擊搜尋按鈕時調用）
    handleFilterProducts();
  };

  return {
    filters: {
      searchValue,
      festival,
      relation,
      category,
      priceRange,
      sortOption,
    },
    actions: {
      handleFilterChange,
      handleSearchValueChange,
      handleSortChange,
      handleSearch,
    },
    filteredProducts,
  };
};

export default useProductFilter;
