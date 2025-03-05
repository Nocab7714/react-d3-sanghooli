import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../slices/productsSlice';

import HeaderFront from './HeaderFront.jsx';
import FooterFront from './FooterFront.jsx';
import GoToTop from '../components/GoToTop.jsx';
import ScreenLoading from '../../plugins/ScreenLoading';
import AutoScrollToTop from '../../plugins/AutoScrollToTop.jsx';


function LayoutFront() {

  // 透過外層 Layout 取得所有商品資料，並存入 Redux > productsSlice > products 的資狀態中
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  },[dispatch])

  return (
    <>
      <AutoScrollToTop />
      <HeaderFront />
      <div>
        <Outlet />
      </div>
      <FooterFront />
      <GoToTop />
      <ScreenLoading isLoading={isLoading}/>
    </>
  );
}

export default LayoutFront;
