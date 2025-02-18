import { Outlet } from 'react-router-dom';
import HeaderBacked from './HeaderBacked.jsx';

function LayoutBacked() {
  return (
    <>
      <HeaderBacked />
      <Outlet />
    </>
  );
}

export default LayoutBacked;



