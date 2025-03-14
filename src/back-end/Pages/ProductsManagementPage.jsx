// 外部資源
import axios from 'axios';
import ReactHelmetAsync from '../../plugins/ReactHelmetAsync';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationBackend from '../components/PaginationBackend';
import ReactLoading from 'react-loading';

//內部資源
import DelProductModal from '../components/DelProductModal';
import ProductModal from '../components/ProductModal';


// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;


// 產品資料初始狀態
const defaultModalState = {
  imageUrl: '', //主圖網址
  title: '',
  category: '',
  unit: '',
  origin_price: '',
  price: '',
  description: '',
  content: {
    material_contents: '', //材質/內容物
    notes: '', //注意事項
    origin: '', //產地
    expiry_date: '', //保存期限shelf_life
  },
  is_enabled: 0,
  is_hot: 0, 
  imagesUrl: [''],
};


const ProductsManagementPage = () =>{

  const navigate = useNavigate();
  // 串接 API - 驗證登入:可以透過點擊按鈕的方式戳 API 來驗證使用者是否登入過
  const checkUserLogin = async () => {
    try {
      await axios.post(`${baseUrl}/api/user/check`);
    //   getProducts();//取得產品資料
    //   setIsAuth(true); //當使用者登入後就會跳轉到產品頁面 
    } catch (error) {
      alert('請先登入');
      navigate('/admin/login');
      console.error(error);
    }
  };

  // 判斷目前是否已是登入狀態，取出在 cookie 中的 token
  // 若想在登入頁面渲染時呼叫checkUserLogin裡的API>需要透過React hook：useEffect 戳一次API
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)D3Token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token; //將 token 帶到 axios 上：後續的axios就會帶上這行token
    checkUserLogin(); //戳checkUserLogin API :
  }, []);

  
  const [ isScreenLoading , setIsScreenLoading ] = useState(false);
  
  const [productList, setProductList] = useState([]); //先給 productList 一個狀態：後續會從API撈回資料塞回productList 中 
  
  
  //在登入成功時，呼叫：管理控制台- 產品（Products）> Get API
  const getProducts = async ( page = 1 ) => {
    setIsScreenLoading(true); //顯示 Loading 畫面
    try {
      const res = await axios.get(
        `${baseUrl}/api/${apiPath}/admin/products?page=${page}`
      );
      setProductList(res.data.products);

      //從 產品 API 取得頁面資訊getProduct，並存進狀態中（把res.data.Pagination 塞進去 setPageInfo 裡面）
      setPageInfo(res.data.pagination );
    } catch (error) {
      alert("取得產品資訊失敗，請稍作等待後，再重新嘗試操作");
    } finally {
      setIsScreenLoading(false); // 無論成功或失敗，都關閉 Loading 畫面
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

   //綁定產品 Modal 狀態:value={tempProduct.對應的變數} + onChange={handleModalInputChange}事件
   const[tempProduct,setTempProduct] = useState(defaultModalState);  

   //新增狀態做「編輯、新增Modal」開關功能控制，預設狀態：關閉（ 帶入false值 ）
   const [isProductModalOpen , setIsProductModalOpen ] = useState(false);

   //新增狀態做「刪除Modal」開關功能控制，預設狀態：關閉（ 帶入false值 ）
   const [isDelProductModalOpen , setIsDelProductModalOpen ] = useState(false);

   //開啟 modal 方法 | 新增一個狀態來判斷:判斷當前動作是新增產品還是編輯產品
   const[modalMode, setModalMode]= useState(null);

   //點擊[刪除]按鈕時，開啟刪除確認 Modal：delProductModalRef的開啟
   const handleOpenDelProductModal =(product) =>{
     setTempProduct(product);
     
     //改成用 isOpen 做開關判斷:不直接取得getInstance邏輯改成setIsDelProductModalOpen(true)：告訴Modal現在要開
     setIsDelProductModalOpen(true);
   }
  
   {/* 點擊「建立新的產品」＋「編輯」按鈕，會打開Ｍodal */}
    //宣告handleOpenProductModal(變數)：進行開關產品的Modal：
    const handleOpenProductModal =(mode , product) =>{
      setModalMode(mode);

      switch(mode){
        case 'create':
          setTempProduct(defaultModalState);
          break;

          case 'edit':
            setTempProduct(product);
            break;
          
          default:
            break;
      }

      setIsProductModalOpen(true);// 改成用 isOpen 做開關判斷 :不能直接取得getInstance邏輯 → 要改成：setIsProductModalOpen(true);：告訴Modal現在要開
    }
  
    
    // 控制分頁元件：新增一個「頁面資訊 pageInfo」的狀態 → 用來儲存頁面資訊
    const [ pageInfo , setPageInfo ] = useState({});

    //讀取當前頁面的「頁碼」 資料的判斷式條件＆動作：
    const handlePageChenge = (page) => {
      getProducts(page);
      window.scrollTo({ top: 380, behavior: 'auto' }); // 滑動回到頁面頂部
    }

    return (
      <>
        <ReactHelmetAsync title="後台系統-產品管理頁面"/>
        <div className="container">
          <div className="row pb-19">
            <div className="col-lg-12 pt-19">
              <div className=" titleDeco d-flex justify-content-between pt-19 pb-19 mb-8 rounded-3 ">
                <h1 className='ms-10'>商品管理</h1>
                <button 
                  onClick={()=>handleOpenProductModal('create')}
                  type="button" 
                  className="btn btn-primary me-10"
                >
                  新增商品
                </button>
              </div>

              <div className= "managementList pt-19 pb-19 ps-5 pe-5 rounded-3">
                {/* 沒商品時顯示商品管理頁面顯示： 目前尚未有任何商品資料 */}
                {productList.length === 0 ? (
                    <div className="text-center p-5">
                        <h2 className="text-neutral60">目前尚未有任何商品資料</h2>
                    </div>
                ) : (
                  // 商品管理有商品時呈現畫面
                  <table className="table"> 
                    <thead>
                        <tr className='rounded-3 shadow-sm'>
                        <th scope="col">產品類型</th>
                        <th scope="col">產品名稱</th>
                        <th scope="col" >原價</th>
                        <th scope="col" >售價</th>
                        <th scope="col" >庫存數量</th>
                        <th scope="col" >是否啟用</th>
                        <th scope="col" >熱銷狀態</th>
                        <th scope="col" className="text-center" >編輯資料</th>
                        </tr>
                    </thead>
                    <tbody>
                      {productList.map((product)=>(
                      <tr key={product.id} className="align-middle">
                          <th scope="row" className='text-neutral60'>{product.category}</th>
                          <td className='h6'>{product.title}</td>
                          <td className='text-neutral40 text-decoration-line-through'>{product.origin_price.toLocaleString()}</td>
                          <td>{product.price.toLocaleString()}</td>
                          <td>{product.qty}</td>
                          <td>{product.is_enabled? (
                          <span className="text-primary-dark">啟用中</span>
                              ) : (
                              <>
                                  <span className="text-neutral40">未啟用</span>
                              </>
                              )
                          }
                          </td>
                          <td>{product.is_hot? (
                            <span className="text-primary-dark">熱銷商品</span>
                              ) : (
                              <>
                                  <span className="text-neutral60">一般商品</span>
                              </>
                              )
                          }
                          </td>
                
                          {/* 編輯資料按鈕欄位 */}
                          <td className="text-center">
                            <div className="btn-group">
                              <button 
                                onClick={() => handleOpenProductModal('edit', product)}
                                type="button" 
                                className="btn btn-primary btn-outline-primary-dark"
                              >
                                編輯
                              </button>

                              <button 
                                onClick={()=>handleOpenDelProductModal(product)} 
                                type="button" 
                                className="btn btn-outline-danger"
                              >
                                刪除
                              </button>
                            </div>
                          </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* 分頁元件，條件設定只有當 productList 有數據時，才顯示分頁 */}
                {productList?.length > 0 && (
                    <PaginationBackend 
                      pageInfo={pageInfo} 
                      handlePageChenge={handlePageChenge} />
                  )}

                {/* 新增與編輯 modal */}
                <ProductModal
                    modalMode={modalMode}
                    getProducts={getProducts}
                    tempProduct={tempProduct}
                    isOpen={isProductModalOpen}
                    setIsOpen={setIsProductModalOpen} 
                />
                
                {/* 刪除產品 Modal */}
                <DelProductModal
                    tempProduct={tempProduct}
                    isOpen={isDelProductModalOpen}
                    setIsOpen={setIsDelProductModalOpen}
                    getProducts={getProducts}
                />

                  {/* 全螢幕Loading */}
                  { isScreenLoading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "fixed", //固定在畫面上，不會隨滾動條移動
                      inset: 0, //讓 div 充滿整個畫面
                      backgroundColor: "rgba(255,255,255,0.3)", //半透明白色背景
                      zIndex: 999, //確保 Loading 畫面顯示在最上層
                    }}
                  >
                    <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
                  </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default ProductsManagementPage;