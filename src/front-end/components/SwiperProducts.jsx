// 外部資源
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ProductCard from './ProductCard';

function SwiperProducts({carouselData, autoplay = false}) {
  // const [carouselData] = useState([
  //   {
  //     category: '食品與飲品',
  //     content: {
  //       expiry_date: '兩年（請置於陰涼乾燥處，避免陽光直射）',
  //       material_contents: '高山手工龍井茶葉 75g/包、精美茶禮包裝盒',
  //       notes:
  //         '1.開封後請妥善密封保存，以免茶葉受潮影響風味。\n2.建議使用80~85°C溫水沖泡，以保留龍井茶最佳風味。\n3.若對咖啡因敏感者，建議避免於睡前飲用。',
  //       origin: '臺灣阿里山',
  //     },
  //     description:
  //       '品味東方韻味，傳遞典雅心意\n以精緻茶葉詮釋古法手工的細膩匠心，龍井茶香清幽，入口甘醇回甘。優雅的禮盒包裝，展現不凡品味，是饋贈或品茗自享的絕佳選擇。每一口茶湯，皆傳遞自然之純與手工之精。',
  //     id: '-OHDTDBLA1ArEUygf1RJ',
  //     imageUrl:
  //       'https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190256505.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gotiWuzf1X%2F9FNTrm0W0bP3mY9UuJky4QhwBshVcO%2B4GbteIbZkxlA8tVAGjMers5TleSRjIbgN7S2jtzDJGFeoDZDf3exk0%2FhSpJOO5OnvrTikHGgbvXzbiw0mqrrSFR0HM057cE%2BVDCM6rgjrO7BM%2FpMDPCyNaIluXrWf3RtsQ8R9cIJ%2BKYzSP9AcZPSFUfHWj0UYmGCIeCQ87UyMi%2FkrdQS6GmigV8JkR6uSJPOFsYH8S6R9cuDGuKranJ8XZvVRvBHURKRild5ayidv9vfADDd2XJ5W5mzFlQJBdK7Mh69Q5d6eb9KVHsEk35ePTP%2FBkq%2FifeKX61cqrrNWx4A%3D%3D',
  //     imagesUrl: [''],
  //     is_enabled: 1,
  //     is_hot: 0,
  //     origin_price: 1200,
  //     price: 1200,
  //     qty: 10,
  //     tages: ['春節', '中秋節', '父母', '祖父母', '父親', '母親'],
  //     title: '龍井茶禮盒',
  //     unit: '盒',
  //   },
  //   {
  //     category: '文具與書籍',
  //     content: {
  //       expiry_date: '無（正常使用即可長久保存）',
  //       material_contents:
  //         '鋼筆外觀材質－梨花木\n商品筆夾顏色 : 金\n附贈墨水(或筆芯)\n尺寸 : 長約14.2cm X 約1.3cm',
  //       notes:
  //         '1.每個作品皆為手工製作，且木材為天然材質，可能有細微差異。\n2.本產品除金屬配件外，為天然實木純手工製作，實木可能因氣溫、濕度等因素產生細微裂痕，避免商品置於極端溫溼度或是太陽曝曬環境。\n3.平常使用後應習慣上護木油或護木蠟以隔絕濕氣，除了保持木頭本身乾燥也會讓木頭越使用越漂亮。\n4.筆芯可在市面購買補充。\n5.使用完畢請蓋好筆帽以避免筆尖乾燥。',
  //       origin: '臺灣',
  //     },
  //     description:
  //       '書寫的不只是字，更是專屬的故事\n以高級木質感結合金屬雕刻工藝，打造專屬於您的姓名刻印。每一筆書寫，都展現尊貴與個人品味。這款鋼筆不僅是實用文具，書寫出無可取代的回憶與情感。',
  //     id: '-OHDTDWVJaUZrBTLLrtC',
  //     imageUrl:
  //       'https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190476085.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=O52jHyPXyZZ8B%2Fitx4giHdhQ0dIc9vuEsAcw%2F6j%2FZ%2FYfFncKFQbNQ8%2FK%2FiZRxuzEw0n9v1qVkEFcZsYtR%2FIpiCoVmhN241UszeYnZ3S8wkYLhDKucfFGIZ1WfmO2Qr6wNXUgBv7j0SP%2FvGS7%2B%2B%2BNpkgLNuWhWuro2H3tXYxrovpKm70tTaX5Hn7i9b5PvK6vPi4KpXwzCsKW0jsxBeZ0RsDKlHyJ5G0Aa9u2KNT2kJj40cAk3eZo%2FNE%2FpvsyOBY5dv3Db%2Bm5i1Oen4P%2BDoe8eQ6FmY2HX0uJ5fmFRQyZg2MJ%2F6yagdhyVSsxUqjUk%2BO3SqrxDhYZDoHRaA3DgKJQSw%3D%3D',
  //     imagesUrl: [''],
  //     is_enabled: 1,
  //     is_hot: 0,
  //     origin_price: 800,
  //     price: 800,
  //     qty: 10,
  //     tages: ['畢業季', '生日', '師長', '男性朋友', '女性朋友'],
  //     title: '客製化姓名鋼筆',
  //     unit: '隻',
  //   },
  //   {
  //     category: '食品與飲品',
  //     content: {
  //       expiry_date: '120天（未開封，避免高溫與直射陽光）',
  //       material_contents:
  //         '內餡口味：\n黑巧克力、牛奶巧克力、夏威夷果仁、玫瑰、蜂蜜、咖啡、酒釀櫻桃、芒果 、雪橙酒果、抹茶、夏威夷果籃、栗子、藍莓、軟糖、開心果內餡等多種口味（依實際包裝內容為準）',
  //       notes:
  //         '1.建議品嘗溫度12~20度，未食用完請冷藏保存\n2,本產品含有奶製品、果仁，不適合過敏體質者食用。\n3.開封後請盡快享用，避免吸濕影響風味。',
  //       origin: '臺灣屏東',
  //     },
  //     description:
  //       '細膩工藝，甜蜜滋味的極致體驗\n每一顆巧克力都由職人手工製作，從選豆到調溫，堅持用心打造。香濃滑順的口感與層次豐富的風味，是送禮或享受甜蜜時光的絕佳選擇。這份禮盒不僅傳遞美味，更融入了滿滿的心意與誠摯祝福。',
  //     id: '-OHDTDlNND8d62LJ1Jna',
  //     imageUrl:
  //       'https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190512210.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kbr3VdIKxwueZKKuI2TdIi3Xsmb9cuFtFEb8A5ymTFz9Sazvtuj8LfJvXyPSUazTmnD1BXpaLzSdiOlpfpC5yz7p79pXymQFYec4FMGB%2BaFWX8aGya%2Ffk2U155y3l%2Fc76QBcswmhahmsqbobj5XaLPhSfgQ%2BaGoXgdIC1ijRx6V%2BPtOz3gX7SuvHbWi%2BGsBSlM94fl3%2BEajYwzh7aK9Zc%2BOSobBYWkh3mQyeW3%2F1t6dOjInxZHVPONMf13548z9HN94nu3R5SIqZCKtPmoHm4sJiTszEQvvYhjGdrtA07izBO7yfEi4PkuZiCmx2WvTZQRsqKwTL8gEByOpKFjZvmw%3D%3D',
  //     imagesUrl: [''],
  //     is_enabled: 1,
  //     is_hot: 0,
  //     origin_price: 680,
  //     price: 680,
  //     qty: 10,
  //     tages: ['情人節', '生日', '聖誕節', '男性情人', '女性情人'],
  //     title: '手工巧克力禮盒',
  //     unit: '盒',
  //   },
  //   {
  //     category: '居家與生活',
  //     content: {
  //       expiry_date:
  //         '建議2年內使用，避免高溫與陽光直射\n一經使用，其香氣散發期可達一年。',
  //       material_contents:
  //         '容器使用手吹玻璃製成\n前調：琥珀、柑橘、蕨\n中調：木、玫瑰\n後調：麝香、苔蘚\n100%植物蠟、精油\n100%大豆蠟，使用無鉛棉芯作為燭芯。',
  //       notes:
  //         '1.停止使用高度低於1公分的蠟燭，以避免杯底過熱。\n2.請移除所有包裝後，即可使用。\n使用前務必將蠟燭蕊芯修剪至1公分內，避免黑煙。\n3.第一次使用，請燃燒至少1小時或待表面蠟池完全融化後再熄滅。\n4.離開時請熄滅燭火，並持續保持空氣流通。\n5.香精油請勿直接接觸皮膚，以避免產生過敏現象。\n6.使用時請遠離易燃物、易熔物、紙製品',
  //       origin: '義大利',
  //     },
  //     description:
  //       '療癒香氣，打造專屬儀式感\n這款蠟燭散發優雅而迷人的香氣，彷彿帶您穿越地中海的悠然生活，沉浸於自然與藝術的交織。無論是靜心閱讀、晚間放鬆，還是送給親友的貼心禮物，都能增添一抹愜意與品味。',
  //     id: '-OHDTE1RwNxy0DYMjY0X',
  //     imageUrl:
  //       'https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190604083.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pRraBz2fi3dd1O7f%2Bh8MhHII2kzdUWOOOiRYlJxr%2Ba0zG7yMYcVvogo0wcJ20IQvWAIHqlFhPxlnHSST0sG28EoD197C7%2B1sYyNIjaKj9cWbHGL8Nl8LF6qOW3%2BN811ug2N459as%2BonyhZumllK9ybOwDML82XMnPwD0A64G8WA1lCRxlCeQ5QWf5RRu%2BS7iIKmgOawQqeA0QnZxSk2DfLe6%2FBBk16JAgGu9%2FitCjDuZLUDhGcVF9qyXw1JatzsDlyHw0he%2FfJPzkj1ZhPmG7euibFQF96jVhTBtXAMrSbZbRH0I6c9zVsLAy5auyAMOsFW4syJNH2LGLr44OF30Jg%3D%3D',
  //     imagesUrl: [''],
  //     is_enabled: 1,
  //     is_hot: 0,
  //     origin_price: 450,
  //     price: 450,
  //     qty: 10,
  //     tages: [
  //       '婚禮',
  //       '中秋節',
  //       '聖誕節',
  //       '男性朋友',
  //       '女性朋友',
  //       '女性情人',
  //       '男性情人',
  //     ],
  //     title: '義式香氛蠟燭',
  //     unit: '件',
  //   },
  //   {
  //     category: '美妝與保養',
  //     content: {
  //       expiry_date: '未開封為三年，製造日期標示於外盒下方',
  //       material_contents: '容量：100ml\n平均持香時間：約4-6小時',
  //       notes:
  //         '1.香水為揮發型產品，建議使在手腕、耳後等脈搏部位不建議直接噴在衣物上使用，避免染色\n2.香水僅供外用，避免入眼。若不慎入眼，請清水沖洗並就醫\n3.為避免兒童誤食，請置於幼兒無法取得之處',
  //       origin: '法國',
  //     },
  //     description:
  //       '自信從氣味開始，魅力由此展現\n一款專為紳士設計的香水禮盒，融合木質與柑橘的清新調性，讓每個場合都能散發出迷人的氣場。無論是日常使用，還是作為特別場合的點綴，都能為你增添個人風格與獨特風範。',
  //     id: '-OHDTEHSWJ-i19XCEwNI',
  //     imageUrl:
  //       'https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190641789.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=L3egiGftDtK4uh28k87GAhpHO%2FUQ0k%2BocP1JhysUBxI13L2ZuGHgBLVaxxprjHj7cwbONFrpEjLjKziWnBRgekpTBwdNoLhme4gt%2BmbgJ7bSxemnqy31%2FptuoceyT0rovJG4eKnRy3NMH2xxGRYLPlL%2FR6oRkBfHs2LTQxUJN6EuOoqA91pqClsUlhSHsNYIo1tOYvpDma9sxEetJ20pAh%2Fpz6Ti2qLRXx3WKMn%2F171CRn4Ea%2B%2BGuWqH%2BAkZCp2KAWK%2FJHpgu2aLsb7pKNmwgd4cD7ZFJkJG5T0S8cHy85PhaYoPNK%2BcnbDHm26BXSCp6BtQ5OQaZpGAU3GDWltf9Q%3D%3D',
  //     imagesUrl: [''],
  //     is_enabled: 1,
  //     is_hot: 0,
  //     origin_price: 1200,
  //     price: 1200,
  //     qty: 10,
  //     tages: [
  //       '父親節',
  //       '生日',
  //       '情人節',
  //       '聖誕節',
  //       '男性情人',
  //       '男性朋友',
  //       '女性朋友',
  //     ],
  //     title: '男士香水禮盒',
  //     unit: '盒',
  //   },
  //   {
  //     category: '服飾與配件',
  //     content: {
  //       expiry_date: '無期限（正常使用條件下）',
  //       material_contents:
  //         '材質 : S925銀\n鍊長：41公分主鍊+5公分延長鍊身\n附精美禮盒 / 拭銀布 / 保證卡',
  //       notes:
  //         '1.飾品基於個人衛生考量,恕無法提供退換貨服務\n2/請避免接觸化學物質，如香水、清潔劑等，以維持銀飾光澤。\n3.建議配戴後以拭銀布輕拭，再存放於防氧化袋內。\n4.若出現氧化現象，可使用拭銀布輕輕擦拭恢復光澤。',
  //       origin: '臺灣',
  //     },
  //     description:
  //       '簡約而不簡單，讓飾品點綴妳的生活\n精緻的設計搭配高品質純銀材質，展現自然的低調光澤，無論日常搭配或正式場合，都能輕鬆駕馭。這不僅是一件飾品，更是一份溫暖心意，將純粹與永恆的美感帶給佩戴者。',
  //     id: '-OHDTEds5KBSY6FCkoLy',
  //     imageUrl:
  //       'https://storage.googleapis.com/vue-course-api.appspot.com/d3sanghooli/1736190727576.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XP53NZMYeviq5ByZJtBzGss5YNurZhsCZs287Q6CXKQmxrcFu%2BQMn69Uq5A8k3y%2B5O1uGHO8lUo5yLD2515hBu6kz3MRzLAz6E3X11hNz0UG%2FsNWnnSylhHYQ6IMcJHwTg6XKflshxQxOUjuLiX22qFPo61yibH5hpl2zbs4%2FBI3XeYG71pa3tjLmzLK9a21lgLxiL1n8IHaaYKWWXiDDhOczA1E81lRxWCo1D%2FDP7B7mn%2FDrGX5fRu3ZRUd6SgalaiPwHm9c%2BcBcvW85i08dm%2BFs7xSBd1ezHyAuSFR30bgWv8c8ARXwzoa6uN2ip%2Fv5vTO4%2BJGNfHMvvcnzv6zAQ%3D%3D',
  //     imagesUrl: [''],
  //     is_enabled: 1,
  //     is_hot: 0,
  //     origin_price: 3500,
  //     price: 2999,
  //     qty: 10,
  //     tages: ['情人節', '生日', '聖誕節', '女性情人', '妻子'],
  //     title: '純銀項鍊',
  //     unit: '條',
  //   },
  // ]);

  const swiperRef = useRef(null);

  const handlePrevSlide = () => {
    if (swiperRef.current.isBeginning) {
      swiperRef.current.slideTo(swiperRef.current.slides.length - 1);
    } else {
      swiperRef.current.slidePrev();
    }
    // swiperRef.current.slidePrev();
  };

  const handleNextSlide = () => {
    if (swiperRef.current.isEnd) {
      swiperRef.current.slideTo(0);
    } else {
      swiperRef.current.slideNext();
    }
    // swiperRef.current.slideNext();
    // console.log(swiperRef.current.el);
  };

  return (
    <>
      <div className="mx-auto position-relative swiper-products" style={{ maxWidth: '1500px' }}>
        <div className="d-none d-lg-flex">
          <div
            className="position-absolute translate-middle-y top-50 z-2"
            style={{ left: '2%' }}
          >
            <button
              type="button"
              className="btn btn-swiper-products rounded-circle p-2 d-flex"
              onClick={handlePrevSlide}
  
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          </div>
          <div
            className="position-absolute translate-middle-y top-50 z-2"
            style={{ right: '2%' }}
          >
            <button
              type="button"
              className="btn btn-swiper-products rounded-circle p-2 d-flex"
              onClick={handleNextSlide}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
            // pagination={{ clickable: true }}
            autoplay={autoplay}
            slidesPerView={1.2}
            spaceBetween={24}
            initialSlide={0}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              376: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },

              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {carouselData.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard key={item.id} product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default SwiperProducts;
