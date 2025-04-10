import { Link } from 'react-router-dom';
import crownIcon from '@/assets/img/illustration/crown.svg';
import { formatNumber } from '../../utils/formatNumber';
import { useDispatch, useSelector } from 'react-redux';
import { asyncToggleWishList } from '../../slices/wishListSlice';
import PropTypes from 'prop-types';
// import './_product-card.scss';

// props 備註說明
// product 為傳入單項商品資料
// showIsHot 為傳入自訂義狀態，是否顯示熱銷，若未傳入值套用預設值為 false，則全部商品即便 product.is_hot 為 true，也還是不會顯示熱銷圖標
// 若 showIsHot 為 true，會再經由 product.is_hot 屬性來判斷是否顯示該項商品的熱銷圖標

const ProductCard = ({ product, showIsHot = false }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);

  return (
    <div className="position-relative">
      {showIsHot && product.is_hot ? (
        <div className="hot-sale">
          <img src={crownIcon} alt="crown svg" height="48" width="48" />
        </div>
      ) : (
        ''
      )}

      <button
        onClick={() => {
          dispatch(asyncToggleWishList(product.id));
        }}
        type="button"
        className="position-absolute btn btn-favorite p-2 "
      >
        <span
          className={`material-symbols-outlined align-middle text-white ${
            wishList[product.id] ? 'material-filled' : ''
          }`}
        >
          favorite
        </span>
      </button>

      <Link to={`/product-details/${product.id}`} className="product-card">
        <div className="card border-0 position-relative">
          <div className="card-bg"></div>
          <div className="product-image-container">
            <img
              src={product.imageUrl}
              className="product-image"
              alt={product.title}
              width={306}
              height={306}
            />
          </div>
          <div className="card-body z-3 p-0">
            <span className="fs-7 fw-normal text-neutral60 mb-2">
              {product.category}
            </span>
            <p className="card-title fw-semibold fs-6 mb-3">{product.title}</p>
            <div className="d-flex justify-content-between">
              <p className="fs-7 text-primary-dark">
                NT$
                <span className="fs-6 fw-semibold me-4">
                  {product.price.toLocaleString()}
                </span>
                {product.price !== product.origin_price && (
                  <span className="text-decoration-line-through text-neutral60">
                    NT$ {formatNumber(product.origin_price)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    is_hot: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    origin_price: PropTypes.number.isRequired,
  }).isRequired,
  showIsHot: PropTypes.bool,
};
