import { Icon } from '@iconify-icon/react';

const BootstrapStyleExample = () => {
  return (
    <>
      <h3 className="mt-20">切版樣式說明</h3>
      <hr />
      <div className="my-10">
        <h4>*顏色設定 $theme-colors</h4>
        <p className="mb-5">
          備註：關於顏色的部分設定色碼與 guideline
          顏色不同，但先以目前設計稿上的色碼為主。
        </p>
        <div className="py-5 bg-primary"></div>
        <div className="py-5 bg-primary-light"></div>
        <div className="py-5 bg-primary-dark"></div>
        <div className="py-5 bg-secondary"></div>
        <div className="py-5 bg-neutral80"></div>
        <div className="py-5 bg-neutral60"></div>
        <div className="py-5 bg-neutral40"></div>
        <div className="py-5 bg-neutral20"></div>
      </div>
      <hr />
      <div className="my-10">
        <h4>*間距設定 $spacers</h4>
        <ul>
          <li> 0: 0,</li>
          <li> 1: $spacer * .25, //4px</li>
          <li> 2: $spacer * .5, //8px </li>
          <li> 3: $spacer * .75, //12px</li>
          <li> 4: $spacer , //16px</li>
          <li> 5: $spacer * 1.25, //20px</li>
          <li> 6: $spacer * 1.5, //24px</li>
          <li> 7: $spacer * 1.75, //28px</li>
          <li> 8: $spacer * 2, //32x</li>
          <li> 9: $spacer * 2.25, //36x</li>
          <li> 10: $spacer * 2.5, //40x</li>
          <li> 11: $spacer * 2.75, //44px</li>
          <li> 12: $spacer * 3, //48x</li>
          <li> 13: $spacer * 3.25, //52px</li>
          <li> 14: $spacer * 3.5, //56px</li>
          <li> 15: $spacer * 3.625, //58x </li>
          <li>16: $spacer * 3.75, //60x</li>
          <li>17: $spacer * 4, //64x</li>
          <li>18: $spacer * 4.5, //72x </li>
          <li>19: $spacer * 5, //80x</li>
          <li>20: $spacer * 6, //96x </li>
          <li>21: $spacer * 6.25, //100x</li>
          <li>22: $spacer * 7.5, //120x </li>
          <li>23: $spacer * 7.75, //124px</li>
          <li>24: $spacer * 8.75, //140px</li>
          <li>25: $spacer * 9.25, //148x</li>
          <li>
            如果需要額外新增其他的 spacer 數值，請在下方按照範例方式直接增加。
            // ex. 165: $spacer * 10.3125, //165px
          </li>
        </ul>
      </div>
      <hr />
      <div className="my-10">
        <h4>*字體 $font-family-sans-serify</h4>
        <p className="display-3">Noto Sans TC</p>
        <hr />
        <h4>*文字大小 .h1~.h6</h4>
        <p className="h1">h1. Bootstrap heading</p>
        <p className="h2">h2. Bootstrap heading</p>
        <p className="h3">h3. Bootstrap heading</p>
        <p className="h4">h4. Bootstrap heading</p>
        <p className="h5">h5. Bootstrap heading</p>
        <p className="h6">h6. Bootstrap heading</p>
        <p className="h7">
          h7. Bootstrap heading <span>(ps .h7 目前還沒有找到設定點)</span>
        </p>
        <p></p>
        <hr />
        <h4>*文字大小 $font-sizes</h4>
        <p className="fs-1">.fs-1 text</p>
        <p className="fs-2">.fs-2 text</p>
        <p className="fs-3">.fs-3 text</p>
        <p className="fs-4">.fs-4 text</p>
        <p className="fs-5">.fs-5 text</p>
        <p className="fs-6">.fs-6 text</p>
        <p className="fs-7">.fs-7 text</p>
        <hr />
        <h4>*文字大小 $display-font-sizes</h4>
        <p>直接使用預設的 display-2 即可 </p>
        <p className="display-2">Display Heading</p>
      </div>
      <hr />
      <div className="my-10">
        <h4>*圓角設定 $border-radius</h4>
        <p className="mb-5">目前看設計稿大致上都是 8px 和 12px 的圓角設定</p>
        <div className="rounded-3 bg-primary d-inline-block p-10 me-5">
          8px 圓角用<code> .rounded-3</code>
        </div>
        <div className="rounded-4 bg-primary d-inline-block p-10">
          12px 圓角用 <code>.rounded-4</code>
        </div>
      </div>
      <hr />
      <div className="my-10">
        <h4 className="mb-5">*全域樣式設定</h4>
        <ul>
          <li>
            網頁背景色：<code>$body-bg: $white !default;</code>
          </li>
          <li>
            整體文字顏色：<code>$body-color: $neutral80;</code>
          </li>
          <li>
            已關閉 RFS 功能，關閉後所有的網頁內容皆不會受到 RFS 的影響。
            <code>$enable-rfs: false;</code>
          </li>
          <li>
            a 標籤文字下方線條 : <code>$link-decoration: none;</code>
            <br />
            <a href="#">範例連結</a>
          </li>
          <li>
            文字 - 基本字體：<code>$font-family-base: !default; </code>
          </li>
          <li>
            內文 - 字重：<code>$font-weight-base</code>
            <ul>
              <li>設計稿中幾乎都使用的是字重為 400、600、700 等三種。</li>
              <li className="fw-normal">
                400 字重 <code>.fw-normal</code>
              </li>
              <li className="fw-semibold">
                600 字重 <code>.fw-semibold</code>
              </li>
              <li className="fw-bold">
                700 字重 <code>.fw-bold</code>
              </li>
              <li>
                基本字體字重<code>$font-weight-base</code>設定依照 default
                為設定為 400
              </li>
            </ul>
          </li>
          <li>
            內文 - 行高：<code>$line-height-base: 1.5 !default;</code>
          </li>
          <li>
            標題 - 字重：
            <ul>
              <li>h1~h4 為 700 字重</li>
              <li>h5~h7 為 600 字重</li>
              <li>
                標題 - 字重 : 依照多數標題設定 700 字重。
                <code> $headings-font-weight: 700;</code>
              </li>
            </ul>
          </li>
          <li>
            標題 - 行高：<code>$headings-line-height: 1.2 !default;</code>
          </li>
          <li>
            標題、段落 -字距：<code>letter-spacing</code> 目前在設計稿上看不到，設定放在 _base.scss 當中，待與教練確認
          </li>
        </ul>
      </div>
      <hr />
      <div className="my-10">
        <h4 className="mb-5">*icons</h4>
        <div className="mb-5">
          <h5>Material icon</h5>
          <a target="_blank" href="https://fonts.google.com/icons">
            Material icon 網站
          </a>
          <div>
            <span className="material-symbols-outlined"> favorite</span>
            <span className="material-symbols-outlined material-filled">
              favorite
            </span>
            <p>
              -說明：只使用 <code>.material-symbols-outlined</code> 為空心的
              icon，若再加上<code>material-filled</code>可變為實心的 icon。
            </p>
            <p>
              -可以直接在 icon 的 class 上透過 .fs-* 的 BS 文字樣式設定 icon
              大小
            </p>
            <span className="material-symbols-outlined material-filled fs-1">
              favorite
            </span>
            <p>-該樣式設定路徑放在_font.scss</p>
          </div>
        </div>
        <div>
          <h5>iconify</h5>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://iconify.design/docs/iconify-icon/react.html#iconify-icon-for-react"
              >
                iconify for React
              </a>
            </li>
            <li>
              {' '}
              <a target="_blank" href="https://icon-sets.iconify.design/">
                iconify icon 搜尋
              </a>
            </li>
          </ul>
          iconify icon 搜尋的方式
          <ul>
            <li>先在設計稿確定 icon 名稱</li>
            <li>
              進到「 iconify icon 搜尋」頁面以後，透過右上角「Search
              icons」才可以搜得到需要的 icon{' '}
            </li>
            <li>
              點擊需要的 icon 後，在下方列表選擇 react ，之後再複製 ICON
              的原件標籤就可以使用
            </li>
          </ul>
          iconify icon 注意事項
          <ul>
            <li>目前 iconify icon 已經透過 npm 頁面安裝到專案中</li>
            <li>
              需要使用的頁面或元件要先在最上方 import icon 進來。
              <code>
                {JSON.stringify(`import { Icon } from '@iconify-icon/react';`)}
              </code>
            </li>
            <li>
              目前測試過 ICON 的顏色不能夠直接帶 BS
              設定的變數，需要直接設定"色碼"
            </li>
          </ul>
          <Icon
            icon="streamline:smiley-in-love"
            width="24"
            height="24"
            style={{ color: '#DD4B4A' }}
          />
        </div>
      </div>
    </>
  );
};

export default BootstrapStyleExample;
