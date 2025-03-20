import ProductCard from './ProductCard';

const ProductsList = ({ products, showIsHot = true }) => {
  return (
    <ul className="list-unstyled row gy-10">
      {products.length > 0 ? (
        products.map((product) => (
          <li className="col-6 col-md-4" key={product.id}>
            <ProductCard product={product} showIsHot={showIsHot} />
          </li>
        ))
      ) : (
        <div className="col-12 text-center py-6">
          <p className="text-muted fs-5">沒有找到對應的商品</p>
        </div>
      )}
    </ul>
  );
};

export default ProductsList;