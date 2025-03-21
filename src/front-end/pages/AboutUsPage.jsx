import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init(
  {
    delay: 500, // 動畫延遲
    duration: 1000, // 動畫持續時間
    once: true, // 動畫只執行一次
    mirror: false, // 滾動回來時是否播放動畫
  }
);

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import Breadcrumb from '../components/Breadcrumb.jsx';
import aboutUs01Img from '@/assets/img/other/about-us-01.webp';
import aboutUs02Img from '@/assets/img/other/about-us-02.webp';
import aboutUs03Img from '@/assets/img/other/about-us-03.webp';
import searchIcon from '@/assets/img/illustration/search.webp';
import giftCardIcon from '@/assets/img/illustration/gift-card.webp';
import checkoutIcon from '@/assets/img/illustration/checkout.webp';

import aboutBannerBkg from '@/assets/img/banner/banner06.webp'
import userImg01 from '@/assets/img/other/user01.webp';
import userImg02 from '@/assets/img/other/user02.webp';
import userImg03 from '@/assets/img/other/user03.webp';

import ProductCard from '../components/ProductCard.jsx';

const breadcrumbItem = [
  {
    page: '首頁',
    link: '/',
  },
  {
    page: '關於我們',
    link: '/about-us',
  },
];

const AboutUsPage = () => {
  //  取得所有商品
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
        setProducts(getRandomProducts(res.data.products));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // 取得隨機 4 筆商品的方法
  const getRandomProducts = (products) => {
    if (!products || products.length === 0) return [];
    // 複製陣列，避免修改原始陣列
    const shuffled = [...products];
    // Fisher-Yates 洗牌演算法 ( 超過 100 筆的陣列適用 )
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // 取前 4 筆
    return shuffled.slice(0, 4);
  };

  return (
    <>
      <ReactHelmetAsync title="關於我們" />
      <div className=" pt-6 pt-md-10">
        {/* breadcrumb */}
        <div className="container mb-6 mb-md-10">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
        </div>
        {/* banner */}
        <section className="about-us-banner py-10 py-md-19" style={{backgroundImage: `url(${aboutBannerBkg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <div className="container">
            <div className="d-flex flex-column align-items-center justify-content-center" data-aos="fade-up">
              <div className="mb-10 mb-md-19">
                <h2 className="fs-3 fs-md-1 text-white mb-3 mb-md-4">
                  送對的禮物， <br className="d-block d-md-none" />
                  讓每一刻都值得被記住！
                </h2>
                <h3 className="fs-6 fs-md-5 text-white">
                  說出需求，挑選交給我們！
                </h3>
              </div>
              <div>
                <Link to="/products-list" className="btn btn-lg btn-primary">
                  來去挑禮物
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* 各式禮品供你挑選 */}
        <section className="py-10 py-md-19" data-aos="fade-up">
          <div className="container">
            <div className="text-center mb-5 mb-md-10">
              <p className="fs-7 fs-md-6">超多種類的禮物供你挑選</p>
              <h2 className="fs-4 fs-md-2">各式禮品供你挑選</h2>
            </div>
            <ul className="row gy-10 list-unstyled mb-10">
              {products.map((product) => {
                return (
                  <li className="col-6 col-md-3" key={`gift-${product.id}`}>
                    <ProductCard product={product} />
                  </li>
                );
              })}
            </ul>
            <div className="text-center ">
              <Link to="/products-list" className="btn btn-outline-neutral80">
                查看更多禮物
              </Link>
            </div>
          </div>
        </section>
        {/* 總是不知道該送什麼禮物嗎?  */}
        <section className=" bg-primary-light py-10 py-md-19">
          <div className="container">
            <div className="text-center mb-10 mb-md-19" data-aos="fade-up">
              <h2 className="fs-4 fs-md-2" >總是不知道該送什麼禮物嗎? </h2>
            </div>
            <div className="row justify-content-center ">
              <div className="col-xl-8">
                <div className="row mb-10 ">
                  <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                      <img
                        src={aboutUs01Img}
                        alt="一個男生很困惑的在電腦桌前選擇要買什麼禮物"
                        className="img-fluid rounded-4 mb-5"
                        width="400"
                        height="400"
                        data-aos="fade-up"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 d-flex flex-column align-items-center justify-content-center" >
                    <div className="bg-white rounded-4 p-8" data-aos="fade-up">
                      <h3 className="fs-5 fs-md-3 text-center mb-2 mb-md-3">
                        缺乏靈感與建議
                      </h3>
                      <p>
                        即使有預算和送禮對象， 仍然不知道該選什麼，
                        缺少貼心的推薦與靈感來源。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-none d-sm-block">
                  <div className="row mb-10">
                    <div className="col-sm-6 d-flex flex-column align-items-center justify-content-center ">
                      <div className="bg-white rounded-4 p-8" data-aos="fade-up">
                        <h3 className="fs-5 fs-md-3 text-center mb-2 mb-md-3">
                          缺乏個人化體驗
                        </h3>
                        <p>
                          難以找到能展現心意的禮物， 附帶個性化卡片的選項有限。
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="d-flex justify-content-center">
                        <img
                          src={aboutUs02Img}
                          alt="一個女生打開禮物後有只有一隻襪子讓她感到不高興"
                          className="img-fluid rounded-4 mb-5"
                          width="400"
                          height="400"
                          data-aos="fade-up"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-block d-sm-none">
                  <div className="row mb-10">
                    <div className="col-sm-6">
                      <div className="d-flex justify-content-center">
                        <img
                          src={aboutUs02Img}
                          alt="一個女生打開禮物後有只有一隻襪子讓她感到不高興"
                          className="img-fluid rounded-4 mb-5"
                          width="400"
                          height="400"
                          data-aos="fade-up"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 d-flex flex-column align-items-center justify-content-center ">
                      <div className="bg-white rounded-4 p-8" data-aos="fade-up">
                        <h3 className="fs-5 fs-md-3 text-center mb-2 mb-md-3">
                          缺乏個人化體驗
                        </h3>
                        <p>
                          難以找到能展現心意的禮物， 附帶個性化卡片的選項有限。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-10">
                  <div className="col-sm-6">
                    <div className="d-flex justify-content-center">
                      <img
                        src={aboutUs03Img}
                        alt="繁瑣的購物流程圖"
                        className="img-fluid rounded-4 mb-5"
                        width="400"
                        height="400"
                        data-aos="fade-up"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 d-flex flex-column align-items-center justify-content-center ">
                    <div className="bg-white rounded-4 p-8" data-aos="fade-up">
                      <h3 className="fs-5 fs-md-3 text-center mb-2 mb-md-3">
                        購物流程繁瑣
                      </h3>
                      <p>
                        部分平台的購物流程太複雜， 從篩選到結帳花費過多時間，
                        導致用戶購物體驗不佳。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 簡單三步驟 */}
        <section className="py-10 py-md-19">
          <div className="container">
            <div className="text-center mb-10 mb-md-19">
              <h2 className="fs-4 fs-md-2" data-aos="fade-up">簡單三步驟</h2>
            </div>
            <ul className="list-unstyled row  gx-xl-10 justify-content-center">
              <li className="col-md-4 col-xl-3 mb-19 mb-md-0">
                <div className="d-flex flex-column align-items-center" data-aos="fade-up">
                  <img
                    src={searchIcon}
                    alt="一隻放大鏡與一個紅色禮物盒 icon"
                    className="mb-10"
                    width="200"
                    height="200"
                  />
                  <h3 className="fs-5 fs-md-4 mb-2">一、瀏覽與篩選</h3>
                  <p>
                    根據對象、場合或預算，
                    <br />
                    快速篩選出適合的禮物。
                  </p>
                </div>
              </li>
              <li className="col-md-4 col-xl-3 mb-19 mb-md-0">
                <div className="d-flex flex-column align-items-center" data-aos="fade-up">
                  <img
                    src={giftCardIcon}
                    alt="一隻手拿著信件的 icon"
                    className="mb-10"
                    width="200"
                    height="200"
                  />
                  <h3 className="fs-5 fs-md-4 mb-2">二、個性化設計</h3>
                  <p>
                    選擇附贈卡片，並填寫專屬訊息，
                    <br />
                    提升禮物的專屬感。
                  </p>
                </div>
              </li>
              <li className="col-md-4 col-xl-3">
                <div className="d-flex flex-column align-items-center" data-aos="fade-up">
                  <img
                    src={checkoutIcon}
                    alt="一台購物車朝著箭頭的方向移動的 icon"
                    className="mb-10"
                    width="200"
                    height="200"
                  />
                  <h3 className="fs-5 fs-md-4 mb-2">三、快速結帳</h3>
                  <p>
                    選擇配送方式，確認付款，
                    <br />
                    並即時追蹤訂單狀態。
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        {/* SANGHOOLI 用戶評價 */}
        <section className="bg-primary-light py-10 py-md-19">
          <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center mb-6 mb-md-10" data-aos="fade-up">
              <h2 className="fs-4 fs-md-2 fw-semibold fw-md-bold mb-2 mb-md-3">
                消費者評價
              </h2>
              <h3 className="text-neutral80 fs-2 fs-md-1 mb-2 mb-md-3">5.0</h3>
              <div className="d-flex justify-content-center mb-2 mb-md-3">
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2 ">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 me-2">
                  kid_star
                </span>
                <span className="material-symbols-outlined material-filled text-primary fs-4 fs-md-2 fs-md-2 ">
                  kid_star
                </span>
              </div>
            </div>
            <ul className="list-unstyled row gy-4 mb-6 mb-md-10  ">
              <li className="col-lg-4 ">
                <div className="card border-0 rounded-4 p-4 p-md-8 h-100" data-aos="fade-up">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center mb-4 mb-md-6">
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2 ">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-2 me-md-4 ">
                        kid_star
                      </span>
                      <span className="fs-7 fs-md-6 fw-semibold me-4 ">
                        5.0
                      </span>
                    </div>
                    <h3 className="card-title fs-6 fs-md-5 fw-semibold mb-4 mb-md-6">
                      超乎期待的好禮盒！
                    </h3>
                    <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                      這款紅酒禮盒真的讓人驚喜！紅酒的香氣非常濃郁，果香和單寧的平衡非常好，喝起來口感柔順。包裝精美，酒杯的質感也很好，完全不像附贈品，整體非常有品味。朋友收到這份禮物後非常開心，表示要收藏這個禮盒留作紀念，真的很值得推薦！
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={userImg01}
                        alt="user01"
                        height="48"
                        width="48"
                        className="me-4"
                      />
                      <div>
                        <h4 className="fs-7 fw-normal">abc12345</h4>
                        <time className="fs-7 text-neutral60">2024/12/01</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="col-lg-4 ">
                <div className="card border-0 rounded-4 p-4 p-md-8 h-100" data-aos="fade-up">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center mb-4 mb-md-6">
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2 ">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-2 me-md-4 ">
                        kid_star
                      </span>
                      <span className="fs-7 fs-md-6 fw-semibold me-4 ">
                        5.0
                      </span>
                    </div>
                    <h3 className="card-title fs-6 fs-md-5 fw-semibold mb-4 mb-md-6">
                      質感超越期待！
                    </h3>
                    <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                      這款紅酒禮盒從包裝到內容都無可挑剔。紅酒入口細膩，尾韻果香濃郁但不過於強烈，整體非常平衡，令人難忘。禮盒設計大氣，酒杯質感也很高端，讓人感覺到滿滿的用心。我特地選這款禮盒作為送禮，用於家人聚會，大家都對這份禮物讚不絕口，真的很推薦這款產品！
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={userImg02}
                        alt="user02"
                        height="48"
                        width="48"
                        className="me-4"
                      />
                      <div>
                        <h4 className="fs-7 fw-normal">user8910xy</h4>
                        <time className="fs-7 text-neutral60">2024/11/28</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="col-lg-4 ">
                <div className="card border-0 rounded-4 p-4 p-md-8 h-100" data-aos="fade-up">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center mb-4 mb-md-6">
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2 ">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="material-symbols-outlined material-filled text-primary fs-6 fs-md-5 me-1 me-md-2">
                        kid_star
                      </span>
                      <span className="fs-7 fs-md-6 fw-semibold me-4 ">
                        5.0
                      </span>
                    </div>
                    <h3 className="card-title fs-6 fs-md-5 fw-semibold mb-4 mb-md-6">
                      細緻的設計與完美的口感！
                    </h3>
                    <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                      收到這款紅酒禮盒時，第一眼就被它的精緻包裝吸引。外盒設計大氣高雅，裡面的紅酒和酒杯擺放得非常用心。紅酒的品質更是令人驚艷，果香濃郁、酒體豐滿，入口後能感受到絲滑的口感和完美的平衡，尾韻悠長且令人回味。附贈的酒杯質感極佳，完全不像一般的附贈品，拿在手裡很有重量感和儀式感。我特地帶到朋友的生日派對上分享，所有人都對這款禮盒稱讚不已，甚至詢問在哪裡可以買到。無論是自己享用還是作為送禮選擇，這款紅酒禮盒都能滿足最挑剔的需求，絕對會再次購買！
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={userImg03}
                        alt="user03"
                        height="48"
                        width="48"
                        className="me-4"
                      />
                      <div>
                        <h4 className="fs-7 fw-normal">Ken0833</h4>
                        <time className="fs-7 text-neutral60">2024/11/20</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="text-center" data-aos="fade-up">
              <Link to="/products-list" className="btn btn-lg btn-primary">
                來去挑禮物
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUsPage;
