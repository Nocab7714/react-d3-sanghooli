import { Outlet } from 'react-router-dom';
// import { Outlet,ScrollRestoration } from 'react-router-dom';

import HeaderFront from './HeaderFront.jsx';
import FooterFront from './FooterFront.jsx';
import GoToTop from '../components/GoToTop.jsx';

import AutoScrollToTop from '../../plugins/AutoScrollToTop.jsx';

function LayoutFront() {
  return (
    <>
      <AutoScrollToTop />
      {/* <ScrollRestoration /> */}
      <HeaderFront />
      <div>
        <Outlet />
      </div>
      <FooterFront />
      <GoToTop />
    </>
  );
}

export default LayoutFront;
