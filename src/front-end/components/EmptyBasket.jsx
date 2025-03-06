import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/img/illustration/cart-empty.png';
export default function EmptyBasket(){
  return (
    <>
      <div className="text-neutral60 mb-10">
        <a
          href="#"
          className="link-neutral60 d-inline-flex align-items-center gap-1 justify-content-start"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <h5 className="fw-semibold">回到首頁</h5>
        </a>
      </div>
      <div className="text-center py-6 py-lg-19 mb-10">
        <img src={cartEmptyImg} alt="cartEmpty image" className='cart-img mb-2'/>
        <p className='mb-4'>購物車目前尚無商品</p>
        <Link to="/" type="button" className='btn btn-primary'>立即購物</Link>
      </div>
    </>
  )
}