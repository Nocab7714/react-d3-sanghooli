import { Link } from 'react-router-dom';

const NewProductsList = ({
  products,
  listTitle = '請設定列表 title 名稱',
  iconMaterial = false,
}) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4 mb-lg-6">
        <div className="d-flex align-items-center">
          <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
            {iconMaterial}
          </span>
          <h2 className="fs-5 fs-md-4 m-0 ">{listTitle}</h2>
        </div>
        <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />
      </div>

      {/* 最後一個品項沒有 border-bottom */}
      <ul className="list-unstyled">
        {products?.map((product) => {
          return (
            <li
              className="new-product-item "
              key={`new-product-item-${product.id}`}
            >
              <Link to={`/product-details/${product.id}`}>
                <div className="new-product-item-bg"></div>
                <div
                  className={`d-flex align-items-center border-neutral40 py-4 z-3 ${
                    product.id === products[products.length - 1].id
                      ? ''
                      : 'border-bottom'
                  }`}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="rounded-4 me-4 z-3"
                    width="80"
                    height="80"
                  />
                  <div className="d-flex flex-column z-3">
                    <p className="fs-7 text-primary-dark mb-1">
                      {product.category}
                    </p>
                    <p className="fs-6 fw-semibold text-neutral80">
                      {product.title}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NewProductsList;
