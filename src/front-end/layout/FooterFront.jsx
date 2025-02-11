import { Icon } from '@iconify-icon/react';

const footerPageLinks = [
  {
    name: '關於我們',
    link: '#',
  },
  {
    name: '商品一覽',
    link: '#',
  },
  {
    name: '隱私權服務條款',
    link: '#',
  },
  {
    name: '購物流程與常見Q&A',
    link: '#',
  },
  {
    name: '後台登入',
    link: '#',
  },
];

const FooterFront = () => {
  return (
    <>
      <footer>
        <div className="bg-white border-top border-neutral40">
          <div className="container py-8 py-md-10">
            <div className="d-flex flex-column align-items-center">
              <div>
                <img
                  className="d-block d-md-none"
                  src="/src/assets/img/illustration/logo-SANGHOOLI.svg"
                  alt="SANGHOOLI Logo"
                  width="148"
                  height="32"
                />
                <img
                  className="d-none d-md-block"
                  src="/src/assets/img/illustration/logo-SANGHOOLI.svg"
                  alt="SANGHOOLI Logo"
                  width="185"
                  height="40"
                />
              </div>
              <ul className="footer-page-links list-unstyled d-flex flex-column flex-md-row align-items-center my-4 my-md-6">
                {footerPageLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      className="d-inline-block fs-6 link-neutral60 px-4 py-3 mx-0 mx-md-1 "
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="social-links list-unstyled d-flex mb-0">
                <li>
                  <a href="#" className="d-block rounded-3 mx-2" >
                    <Icon
                      icon="ri:instagram-fill"
                      width="20px"
                      height="20px"
                      style={{ verticalAlign: 'sub' }}
                    />
                  </a>
                </li>
                <li>
                  <a href="#" className="d-block rounded-3  mx-2">
                    <Icon
                      icon="bi:line"
                      width="20px"
                      height="20px"
                      style={{ verticalAlign: 'sub' }}
                    />
                  </a>
                </li>
                <li>
                  <a href="#" className="d-block rounded-3 mx-2">
                    <Icon
                      icon="uil:facebook"
                      width="20px"
                      height="20px"
                      style={{ verticalAlign: 'sub' }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sanghoolid3@gmail.com"
                    className="d-block rounded-3  mx-2"
                  >
                    <Icon
                      icon="ic:baseline-email"
                      width="20px"
                      height="20px"
                      style={{ verticalAlign: 'sub' }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-neutral80">
          <div className="container py-6">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <span className="text-neutral20 fs-7 mb-2 mb-md-0">
                Copyright © 2024 React D3 Team. All rights reserved.
              </span>
              <span className="text-neutral20 fs-7">
                僅個人作品練習，無任何商業用途
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
  s;
};

export default FooterFront;
