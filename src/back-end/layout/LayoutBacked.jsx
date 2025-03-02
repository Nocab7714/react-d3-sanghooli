// 頁面元件引入
import HeaderBacked from './HeaderBacked.jsx';
import { Outlet } from 'react-router-dom';
import GoToTop from '../components/GoToTop.jsx';
import FooterBacked from './FooterBacked.jsx';

//外部元件
import AutoScrollToTop from '../../plugins/AutoScrollToTop.jsx';


function LayoutBacked() {
  return (
    <>
      <AutoScrollToTop />
      <HeaderBacked />

      <div>
        <Outlet />
      </div>
      
      <FooterBacked />
      <GoToTop />
    </>
  );
}

export default LayoutBacked;



