// 頁面元件引入
import HeaderBacked from './HeaderBacked.jsx';
import FooterBacked from './FooterBacked.jsx';
import GoToTop from '../components/GoToTop.jsx';

//外部元件
import AutoScrollToTop from '../../plugins/AutoScrollToTop.jsx';


function LayoutBacked() {
  return (
    <>
      <AutoScrollToTop />
      <HeaderBacked />
      
      <FooterBacked />
      <GoToTop />
    </>
  );
}

export default LayoutBacked;



