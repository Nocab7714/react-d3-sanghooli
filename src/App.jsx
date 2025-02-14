import { Outlet } from 'react-router-dom';

import HeaderFront from './front-end/layout/HeaderFront.jsx';
import FooterFront from './front-end/layout/FooterFront.jsx';
import GoToTop from './front-end/components/GoToTop.jsx';

import AutoScrollToTop from './plugins/AutoScrollToTop.jsx';

function App() {


  return (
    <>
      <AutoScrollToTop />
      <HeaderFront />
      <div>
        <Outlet />
      </div>
      <FooterFront />
      <GoToTop />
    </>
  );
}

export default App;
