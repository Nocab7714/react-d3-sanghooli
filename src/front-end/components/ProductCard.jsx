import { Link } from 'react-router-dom';
import crownIcon from '@/assets/img/illustration/crown.svg';
import { formatNumber } from '../../utils/formatNumber';

// props 備註說明
// product 為傳入單項商品資料
// showIsHot 為傳入自訂義狀態，是否顯示熱銷，若未傳入值套用預設值為 false，則全部商品即便 product.is_hot 為 true，也還是不會顯示熱銷圖標
// 若 showIsHot 為 true，會再經由 product.is_hot 屬性來判斷是否顯示該項商品的熱銷圖標

const ProductCard = ({ product, showIsHot = false }) => {
  // 缺少加入願望清單的方法
  const addToFavorite = (id) => {
    console.log(`傳入加入願望清單的商品 id：「${id}」`);
  };

  return (
    <>
      <div className="position-relative">
        <button
          onClick={() => {
            addToFavorite(product.id);
          }}
          type="button"
          className="position-absolute btn btn-favorite p-2 "
        >
          <span className="material-symbols-outlined align-middle text-white">
            favorite
          </span>
        </button>
        <Link to={`/single-product/${product.id}`} className="product-card">
          <div className="card border-0 position-relative">
            <div className="card-bg"></div>
            <div className="position-relative z-3">
              {showIsHot ? (
                product.is_hot ? (
                  <div className="hot-sale position-absolute  translate-middle z-4">
                    <img
                      src={crownIcon}
                      alt="crown svg"
                      height="48"
                      width="48"
                    />
                  </div>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              <img
                src={product.imageUrl}
                className="img-fluid rounded-4 mb-4 z-3"
                alt={product.title}
                height="306"
                width="306"
              />
            </div>
            <div className="card-body z-3  p-0">
              <span className="fs-7 fw-normal text-neutral60 mb-2">
                {product.category}
              </span>
              <p className="card-title fw-semibold fs-6 mb-3">
                {product.title}
              </p>
              <p className=" fs-7 text-primary-dark">
                NT$
                <span className="fs-6 fw-semibold me-4">
                  {formatNumber(product.price)}
                </span>
                {product.price !== product.origin_price && (
                  <span className="text-decoration-line-through text-neutral60">
                    NT$ {formatNumber(product.origin_price)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
