import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { asyncAddCart } from "../../slices/cartSlice";
import ButtonLoading from "../../plugins/ButtonLoading";

export default function WishListPage() {
  const dispatch = useDispatch();

  const actionLoading = useSelector((state) => state.loading.actionLoading);
  const products = useSelector((state) => state.products.products);
  const wishList = useSelector((state) => state.wishList);

  const wishListTrueId = Object.keys(wishList).filter((key) => wishList[key]);
  const wishListData = products.filter((product) =>
    wishListTrueId.includes(product.id)
  );

  return (
    <>
      <div className="bg-neutral20">
        <div className="container py-19">
          <div className="text-center pb-19">
            <h1>我的願望清單</h1>
            <p className="mt-4">{wishListData.length} 品項</p>
          </div>
          {
            wishListTrueId.length > 0 ? (
              <div className="row row-gap-6">
                {wishListData.map((product) => (
                  <div className="col-6 col-md-3 " key={product.id}>
                    <ProductCard product={product} />
                    <button
                      onClick={() =>
                        dispatch(asyncAddCart({ productId: product.id, qty: 1}))
                      }
                      type="button"
                      className="btn btn-primary fs-6 w-100 px-2 d-flex align-items-center justify-content-center"
                      // disabled={product.qty === 0 || actionLoading}
                    >
                      {/* <span className={actionLoading ? 'me-2' : ''}>
                        <ButtonLoading isLoading={actionLoading} />
                      </span> */}
                      <span className="material-symbols-outlined fs-5 align-middle  me-1">
                        local_mall
                      </span>
                      加入購物車
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              wishListTrueId.length === 0 ? (
                <div className="text-center">
                  <p className="mb-19">願望清單內沒有商品，將喜歡的商品加入吧！</p>
                  <Link to="/" type="button" className='btn btn-primary mb-19'>來去逛逛</Link>
                </div>
              ) : ""
            )
          }
          
        </div>
      </div>
    </>
  );
}
