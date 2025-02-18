import { useState, useEffect } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

function SearchProduct() {
  const [products, setProducts] = useState([]); // 原始商品資料
  const [tempProducts, setTempProducts] = useState([]); // 篩選後的商品列表
  const [searchKeyword, setSearchKeyword] = useState(''); // 關鍵字
  const [festival, setFestival] = useState(''); // 節慶 / 場合
  const [relation, setRelation] = useState(''); // 送禮關係
  const [category, setCategory] = useState(''); // 禮物類別
  const [priceRange, setPriceRange] = useState(''); // 價格範圍
  const [sortOrder, setSortOrder] = useState(''); // 價格排序

  // 取得商品資料
  const getProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
      setProducts(res.data.products);
      setTempProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [sortOrder]);

  // 搜尋篩選商品
  const filterProducts = () => {
    let filteredProducts = [...products];

    // 關鍵字篩選
    if (searchKeyword) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.includes(searchKeyword)
      );
    }

    // 節慶篩選
    if (festival) {
      filteredProducts = filteredProducts.filter((product) =>
        product.tages?.includes(festival)
      );
    }

    // 送禮關係篩選
    if (relation) {
      filteredProducts = filteredProducts.filter((product) =>
        product.tages?.includes(relation)
      );
    }

    // 禮物類別篩選
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    // 價格範圍篩選
    if (priceRange) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;
        switch (priceRange) {
          case '500 元以下':
            return price < 500;
          case '500 ~ 1,000 元':
            return price >= 500 && price <= 1000;
          case '1,000 ~ 3,000 元':
            return price > 1000 && price <= 3000;
          case '3,000 元以上':
            return price > 3000;
          default:
            return true;
        }
      });
    }

    // 價格排序
    if (sortOrder) {
      filteredProducts.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    setTempProducts(filteredProducts);
  };

  return (
    <div className="container">
      <div className="row">
        {/* 篩選區塊 */}
        <div className="col-4">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-4">篩選</h5>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* 搜尋欄 */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="關鍵字"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>

              {/* 節慶 / 場合 */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={festival}
                  onChange={(e) => setFestival(e.target.value)}
                >
                  <option value="">節慶 / 場合</option>
                  <option value="畢業季">畢業季</option>
                  <option value="生日">生日</option>
                  <option value="婚禮">婚禮</option>
                  <option value="喬遷">喬遷</option>
                  <option value="情人節">情人節</option>
                  <option value="母親節">母親節</option>
                  <option value="父親節">父親節</option>
                  <option value="兒童滿月">兒童滿月</option>
                  <option value="春節">春節</option>
                  <option value="兒童節">兒童節</option>
                  <option value="中秋節">中秋節</option>
                  <option value="聖誕節">聖誕節</option>
                </select>
              </div>

              {/* 送禮關係 */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                >
                  <option value="">送禮關係</option>
                  <option value="父母">父母</option>
                  <option value="父親">父親</option>
                  <option value="母親">母親</option>
                  <option value="祖父母">祖父母</option>
                  <option value="子女">子女</option>
                  <option value="男性朋友">男性朋友</option>
                  <option value="女性朋友">女性朋友</option>
                  <option value="男性情人">男性情人</option>
                  <option value="女性情人">女性情人</option>
                  <option value="丈夫">丈夫</option>
                  <option value="妻子">妻子</option>
                  <option value="師長">師長</option>
                  <option value="同事">同事</option>
                  <option value="商業夥伴">商業夥伴</option>
                </select>
              </div>

              {/* 禮物類別 */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">禮物類別</option>
                  <option value="食品與飲品">食品與飲品</option>
                  <option value="電子與實用">電子與實用</option>
                  <option value="花卉與植物">花卉與植物</option>
                  <option value="美妝與保養">美妝與保養</option>
                  <option value="服飾與配件">服飾與配件</option>
                  <option value="文具與書籍">文具與書籍</option>
                  <option value="居家與生活">居家與生活</option>
                  <option value="嬰幼兒與兒童">嬰幼兒與兒童</option>
                </select>
              </div>

              {/* 價格範圍 */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">價格範圍</option>
                  <option value="500 元以下">500 元以下</option>
                  <option value="500 ~ 1,000 元">500 ~ 1,000 元</option>
                  <option value="1,000 ~ 3,000 元">1,000 ~ 3,000 元</option>
                  <option value="3,000 元以上">3,000 元以上</option>
                </select>
              </div>

              <button
                className="btn btn-warning w-100"
                type="button"
                onClick={filterProducts}
              >
                搜尋
              </button>
            </form>
          </div>
        </div>

        {/* 商品展示區 */}
        <div className="col-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>商品列表</h5>
            <select
              className="form-select w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">價格排序</option>
              <option value="asc">價格由低到高</option>
              <option value="desc">價格由高到低</option>
            </select>
          </div>
          <div className="mb-3">
            <p className="text-muted">目前搜尋結果共 {tempProducts.length} 件商品</p>
          </div>
          <div className="row">
            {tempProducts.length > 0 ? (
              tempProducts.map((product) => (
                <div className="col-4" key={product.id}>
                  <div className="card mb-3">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={product.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">價格：{product.price}</p>
                      {product.tages?.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="badge text-bg-primary me-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">目前沒有符合條件的商品。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchProduct;
