import cartEmptyImg from '../../assets/img/illustration/cart-empty.png';
export default function EmptyBasket(){
  return (
    <>
      <div className="text-center py-6 py-lg-19 mb-10">
        <img src={cartEmptyImg} alt="cartEmpty image" className='cart-img mb-2'/>
        <p className='mb-4'>購物車目前尚無商品</p>
        <button type="button" className='btn btn-primary'>立即購物</button>
      </div>
    </>
  )
}