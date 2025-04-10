import { useState } from 'react';

import userImg01 from '@/assets/img/other/user01.webp';
import userImg02 from '@/assets/img/other/user02.webp';
import userImg03 from '@/assets/img/other/user03.webp';
import userImg04 from '@/assets/img/other/user04.webp';
import userImg05 from '@/assets/img/other/user05.webp';
import userImg06 from '@/assets/img/other/user06.webp';

const CustomerFeedback = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <section className="consumer-reviews py-10 py-md-19">
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center mb-6 mb-md-10">
            <h2 className="text-neutral60 fs-5 fs-md-4 fw-semibold fw-md-bold mb-2 mb-md-3">
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
            <p className="fs-6 fs-md-5 text-neutral60">(6則評價)</p>
          </div>
          <ul className="list-unstyled row gy-4 mb-6 mb-md-10  ">
            <li className="col-lg-4 ">
              <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
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
                    <span className="fs-7 fs-md-6 fw-semibold me-4 ">5.0</span>
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
              <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
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
                    <span className="fs-7 fs-md-6 fw-semibold me-4 ">5.0</span>
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
              <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
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
                    <span className="material-symbols-outlined material-filled text-neutral40 fs-6 fs-md-5 me-2 me-md-4 ">
                      kid_star
                    </span>
                    <span className="fs-7 fs-md-6 fw-semibold me-4 ">4.0</span>
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
            {showMore && (
              <>
                <li className="col-lg-4 ">
                  <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
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
                        送禮首選，絕對驚艷！
                      </h3>
                      <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                        這套紅酒禮盒實在太精美了！紅酒品質有保證，口感醇厚且果香明顯，連不常喝酒的朋友也讚不絕口。禮盒包裝高雅大方，送禮非常有面子。特別喜歡附贈的高腳杯，質感非常好，拿起來就能感受到分量。整體來說CP值超高，非常適合送禮或自用，強力推薦給大家！
                      </p>
                      <div className="d-flex align-items-center">
                        <img
                          src={userImg04}
                          alt="user04"
                          height="48"
                          width="48"
                          className="me-4"
                        />
                        <div>
                          <h4 className="fs-7 fw-normal">WineLover</h4>
                          <time className="fs-7 text-neutral60">
                            2024/11/15
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-lg-4 ">
                  <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
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
                        極致享受，值得擁有！
                      </h3>
                      <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                        這款紅酒禮盒簡直是送禮和自用的最佳選擇！紅酒風味迷人，喝起來層次豐富，帶有水果和香料的香氣，餘韻悠長。禮盒設計非常有質感，每個細節都展現了品牌的用心。附贈的酒杯也十分精美，使用時能提升整體的品酒體驗。我在朋友生日時送了這款禮盒，他收到後愛不釋手，還特地跟我說這是他收到過最好的禮物之一！
                      </p>
                      <div className="d-flex align-items-center">
                        <img
                          src={userImg05}
                          alt="user05"
                          height="48"
                          width="48"
                          className="me-4"
                        />
                        <div>
                          <h4 className="fs-7 fw-normal">Sophie1234</h4>
                          <time className="fs-7 text-neutral60">
                            2024/11/10
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="col-lg-4 ">
                  <div className="card border-0 rounded-4 p-4 p-md-8 h-100">
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
                        <span className="material-symbols-outlined material-filled text-neutral40 fs-6 fs-md-5 me-2 me-md-4 ">
                          kid_star
                        </span>
                        <span className="fs-7 fs-md-6 fw-semibold me-4 ">
                          4.0
                        </span>
                      </div>
                      <h3 className="card-title fs-6 fs-md-5 fw-semibold mb-4 mb-md-6">
                        高CP值的禮品選擇！
                      </h3>
                      <p className="card-text text-neutral60 fs-7 fs-md-6 mb-4 mb-md-6 multiline-ellipsis ">
                        非常滿意這款紅酒禮盒！酒的口感順滑，帶有豐富的果香和些許橡木香，入口後單寧適中，尾韻悠長。禮盒包裝設計精美，送禮非常有面子。最驚喜的是附贈的酒杯比想像中還要精緻，完全不像贈品等級，質感和手感都很好。整體來說物超所值，送禮自用兩相宜，絕對是節日送禮的優質選擇！
                      </p>
                      <div className="d-flex align-items-center">
                        <img
                          src={userImg06}
                          alt="user06"
                          height="48"
                          width="48"
                          className="me-4"
                        />
                        <div>
                          <h4 className="fs-7 fw-normal">JohnWineGuy</h4>
                          <time className="fs-7 text-neutral60">
                            2024/11/05
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex justify-content-center">
            <button
              onClick={toggleShowMore}
              className="btn link-neutral60 fs-6 fs-md-5 fw-semibold d-flex align-items-center border-0"
            >
              {showMore ? '顯示較少' : '查看更多'}
              <span className="material-symbols-outlined align-middle fw-semibold fs-5 fs--md-4 ms-1">
                {showMore ? 'keyboard_arrow_up' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerFeedback;
