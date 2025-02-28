import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../slices/ProductsSlice.js';

import HeaderFront from './HeaderFront.jsx';
import FooterFront from './FooterFront.jsx';
import GoToTop from '../components/GoToTop.jsx';

import AutoScrollToTop from '../../plugins/AutoScrollToTop.jsx';


function LayoutFront() {

  // 透過外層 Layout 取得所有商品資料
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
    </>
  );
}

export default LayoutFront;
