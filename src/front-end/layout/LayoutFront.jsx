import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../slices/productsSlice';

import HeaderFront from './HeaderFront.jsx';
import FooterFront from './FooterFront.jsx';
import GoToTop from '../components/GoToTop.jsx';
import ScreenLoading from '../../plugins/ScreenLoading';
import AutoScrollToTop from '../../plugins/AutoScrollToTop.jsx';
import Alert from '../../plugins/Alert.jsx';
import SectionLoading from '../../plugins/SectionLoading.jsx';
import Toast from '../../plugins/Toast.jsx';
import { asyncGetCart } from '../../slices/cartSlice.js';

function LayoutFront() {

  // 透過外層 Layout 取得所有商品資料，並存入 Redux > productsSlice > products 的資狀態中
  const isLoading = useSelector((state) => state.products.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetCart());
    dispatch(getProducts());
  },[dispatch])

  return (
    <>
      <AutoScrollToTop />
      <HeaderFront />
      <div className='position-relative'>
        <SectionLoading />
        <Outlet />
      </div>
      <FooterFront />
      <GoToTop />
      <ScreenLoading/>
      <Alert />
      <Toast />
    </>
  );
}

export default LayoutFront;
