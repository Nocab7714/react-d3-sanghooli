import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import ProductCategoryList from '../components/ProductCategoryList';
import HomeBannerSwiper from '../components/HomeBannerSwiper';
import NewProductsList from '../components/NewProductsList';
import HomepageProductFilter from '../components/HomepageProductFilter';
import RandomProduct from '../components/RandomProduct';

import adImg from '@/assets/img/other/ad01.png';

const HomePage = () => {
  // 透過 useSelector 取得 Redux state 存放的所有產品資料
  const products = useSelector((state) => state.products.products);

  // 各分類商品資料，每筆取前 6 個
  const [mostPopularProducts, setMostPopularProducts] = useState([]);
  const [valentineDayProducts, setValentineDayProducts] = useState([]);
  const [christmasProducts, setChristmasProducts] = useState([]);
  const [newProductsList, setNewProductsList] = useState([]);
  useEffect(() => {
    setMostPopularProducts(
      products
        ?.filter((product) => {
          return product.is_hot == true;
        })
        .slice(0, 6)
    );

    setValentineDayProducts(
      products
        ?.filter((product) => product?.tages?.includes('情人節'))
        .slice(0, 6)
    );

    setChristmasProducts(
      products
        ?.filter((product) => product?.tages?.includes('聖誕節'))
        .slice(0, 6)
    );

    setNewProductsList(
      products.slice(-10) // 取最後 10 項
    );
  }, [products]);

  return (
    <>
      <ReactHelmetAsync title="首頁" />
      {/* banner */}
      <section className="banner">
        <HomeBannerSwiper />
      </section>
      {/* home-search-form */}
      <section className="home-search-form bg-neutral20 py-6 py-md-10">
        <div className="container">
          <HomepageProductFilter />
        </div>
      </section>
      {/* home-product-list */}
      <section className="home-product-list py-10 py-md-19 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 pe-lg-13">
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={mostPopularProducts}
                  listTitle="最高人氣的禮物"
                  iconMaterial="local_fire_department"
                  path="/products-list"
                  autoShowSwiper={true}
                />
              </div>
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={valentineDayProducts}
                  listTitle="情人節的浪漫驚喜"
                  iconify="streamline:smiley-in-love"
                  path="/products-list"
                  autoShowSwiper={true}
                />
              </div>
              <div className="mb-10 mb-lg-19">
                <ProductCategoryList
                  products={christmasProducts}
                  listTitle="聖誕禮物交換趣"
                  iconify="mingcute:christmas-hat-line"
                  path="/products-list"
                  autoShowSwiper={true}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <img
                src={adImg}
                alt="免費禮物包裝與代寫卡片服務廣告"
                className="img-fluid mb-10 mb-lg-12"
              />
              {/* new-product */}
              <NewProductsList
                products={newProductsList}
                listTitle="新品上市"
                iconMaterial="local_fire_department"
              />
            </div>
          </div>
        </div>
      </section>
      {/* random-product */}
      <section className="random-product mb-10 mb-lg-19">
        <div className="container">
          <RandomProduct />
        </div>
      </section>
    </>
  );
};

export default HomePage;
