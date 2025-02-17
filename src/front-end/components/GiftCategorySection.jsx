import { Link } from 'react-router-dom';
import crownIcon from '@/assets/img/illustration/crown.svg';

const GiftCategorySection = () => {
  return (
    <>
      {/* GiftTitle */}
      <div className="d-flex align-items-center justify-content-between mb-8 mb-md-10 ">
        <div className="d-flex align-items-center">
          <span className="material-symbols-outlined fs-4 fs-md-2 text-secondary me-1 me-md-2">
            local_fire_department
          </span>
          <h2 className="fs-5 fs-md-4 m-0 ">最高人氣的禮物</h2>
        </div>
        <div className="flex-grow-1 mx-3 mx-md-4 border-top border-neutral40" />
        <Link to="/products-list" className="fw-semibold d-flex link-neutral60 fs-6 fs-md-5 align-items-center">
          查看更多
          <span className="ms-1 material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
      {/* GiftList */}
      <ul className="list-unstyled row gy-10">
        {[
          ...Array(6)
            .keys()
            .map((num) => {
              return (
                <li className="col-6 col-md-4" key={`gift-${num}`}>
                  <div className="position-relative">
                    <button
                      type="button"
                      className="position-absolute btn btn-favorite p-2 "
                    >
                      <span className="material-symbols-outlined align-middle text-white">
                        favorite
                      </span>
                    </button>
                    <Link
                      to="/single-product/productID"
                      className="product-card"
                    >
                      <div className="card border-0 position-relative">
                        <div className="card-bg"></div>
                        <div className="position-relative z-3">
                          <div className="hot-sale position-absolute  translate-middle z-4">
                            <img
                              src={crownIcon}
                              alt="crown svg"
                              height="48"
                              width="48"
                            />
                          </div>
                          <img
                            src="https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190936754.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=To%2BG3QFz%2Foc2Al3qLnIeq4zoYXZFUxmUOxp57T6XTZYJZAb%2FwmcvpivJ0BVD1wCqg%2F9oPIBK4Q%2FQ%2F8sSYADDWXwfggt6MOwYBgOJJn%2FSE3rmJf6fwCBrsoQjzS9O%2BaNXFw4Q6tESMGYF3SSjhGBli%2FqiNy9%2FS%2FSwxJsBG4XyNgFu3%2FmfoIHiDGE7Ig28JWewVO9f3cHdRYOHuMNKKDGqEHQVAwxir%2BtwJdoDsE8dxrIpiiG79gFIj6YFsxKvwWK3D9Cbz7FABkAlBByhf4EjrEdh0Niog4g4ssuA62sngbFTmItN9DDmpP7ILdBOxqFDKa%2FvwNo4k%2B87ONQV%2FmXTRQ%3D%3D"
                            className="img-fluid rounded-4 mb-4 z-3"
                            alt=""
                            height="306"
                            width="306"
                          />
                        </div>
                        <div className="card-body z-3  p-0">
                          <span className="fs-7 fw-normal text-neutral60 mb-2">
                            食品與飲品
                          </span>
                          <p className="card-title fw-semibold fs-6 mb-3">
                            客製化鋼筆
                          </p>
                          <p className=" fs-7 text-primary-dark">
                            NT$
                            <span className="fs-6 fw-semibold me-4">2,200</span>
                            <span className="text-decoration-line-through text-neutral60">
                              NT$ 3,800
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </li>
              );
            }),
        ]}
      </ul>
    </>
  );
};

export default GiftCategorySection;
