import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import Toast from "../../plugins/Toast.jsx";

// 環境變數
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

//商品分類選單的選項
const categoryOptions = [
  "食品與飲品",
  "電子與實用",
  "花卉與植物",
  "美妝與保養",
  "服飾與配件",
  "文具與書籍",
  "居家與生活",
  "嬰幼兒與兒童",
];

const festivalOptions = [
  "畢業季",
  "生日",
  "婚禮",
  "喬遷",
  "情人節",
  "母親節",
  "父親節",
  "兒童滿月",
  "春節",
  "兒童節",
  "中秋節",
  "聖誕節",
];

const relationOptions = [
  "父母",
  "父親",
  "母親",
  "祖父母",
  "子女",
  "男性朋友",
  "女性朋友",
  "男性情人",
  "女性情人",
  "丈夫",
  "妻子",
  "師長",
  "同事",
  "商業夥伴",
];

const ProductModal = ({
  modalMode,
  tempProduct,
  isOpen,
  setIsOpen,
  getProducts,
}) => {
  //不希望Modal改到tempProduct：再建立新的狀態，預設值帶入tempProduct

  const [modalData, setModalData] = useState({
    ...tempProduct,
    tages: tempProduct?.tages || [], //確保 tages 不為 undefined
  });

  const [toast, setToast] = useState({ show: false, title: "", icon: "" });

  useEffect(() => {
    if (modalMode === "create") {
      // 重新把ModalData設成最新的值 -> 清空表單資料
      setModalData({
        title: "",
        category: "",
        unit: "",
        qty: "",
        origin_price: "",
        price: "",
        description: "",
        // 新增 content 屬性
        content: {
          material_contents: "",
          expiry_date: "",
          origin: "",
          notes: "",
        },
        imageUrl: "",
        imagesUrl: [], // 初始值設為空陣列
        is_hot: false,
        is_enabled: false,
        tages: [], // 避免 undefined
      });
    } else {
      // 編輯模式帶入商品資料
      setModalData({
        ...tempProduct,
        // 修改useEffect初始化(modalData):在 useEffect 裡加上 is_hot 預設值false，避免 undefined
        is_hot: tempProduct.is_hot ?? false,
        tages: tempProduct?.tages || [],
      });
    }
  }, [tempProduct]); //當tempPeoduct更新後，重新讓setModalData也更新一份

  //以下為將ProductModal 邏輯對應的函式動作
  const productModalRef = useRef(null); //透過 useRef 取得 DOM

  //透過 useEffect ​的 hook，在頁面渲染後取得 productModalRef的 DOM元素
  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false, // 點擊Modal灰色區塊不進行關閉
    });
    Modal.getInstance(productModalRef.current); //取得Modal實例:Modal.getInstance(ref)
  }, []);

  //新增useEffect 判斷Modal開關狀態:如果是「開」的判斷式，並且在陣列帶入[isOpen]
  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(productModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]); //當isOpen有更新時， 判斷是否需要開modal

  {
    /* 點擊Ｍodal的取消＆Ｘ按鈕會進行關閉 */
  }
  //宣告handleCloseProductModal(變數)：進行開關產品的Modal：
  const handleCloseProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    //拿到Modal實例後，即可透過modalInstance.hide(); 關閉Modal
    modalInstance.hide();
    setIsOpen(false); //判斷Modal開關狀態:如果是「關」的調整方式
  };

  const handleModalInputChange = (e) => {
    const { value, name, checked, type } = e.target;

    // 如果修改的是 content 內的屬性
    if (
      ["material_contents", "expiry_date", "origin", "notes"].includes(name)
    ) {
      setModalData({
        ...modalData,
        content: {
          ...modalData.content, // ✅ 保留 content 內的其他屬性
          [name]: value,
        },
      });
    } else {
      // 如果修改的是 content 內的屬性
      setModalData({
        //展開TempProduct->改為：modalData
        ...modalData,
        //當值(type)為 checkbox 時，就會傳入`checked`值 ; 若type不為 checkbox 時，就會將`value`傳入`name`的屬性裡
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;

    const newImages = [...modalData.imagesUrl];

    newImages[index] = value;

    setModalData({
      ...modalData, //展開TempProduct -> 改為modalData
      imagesUrl: newImages,
    });
  };

  {
    /* 新增按鈕顯示條件：點擊時對陣列「新增」一個空字串 */
  }
  const handleAddImage = () => {
    const newImages = [...modalData.imagesUrl, " "]; //複製imagesUrl到newImages的新陣列裡

    setModalData({
      ...modalData,
      imagesUrl: newImages,
    });
  };

  {
    /* 刪除按鈕顯示條件：點擊時預設「移除」陣列中最後一個欄位 */
  }
  const handleRemoveImage = () => {
    const newImages = [...modalData.imagesUrl]; //複製imagesUrl到newImages的新陣列裡

    newImages.pop();

    setModalData({
      ...modalData,
      imagesUrl: newImages,
    });
  };

  {
    /* 串接新增商品 API */
  }
  const createProduct = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/${apiPath}/admin/product`, {
        data: {
          ...modalData,
          origin_price: Number(modalData.origin_price),
          price: Number(modalData.price),
          is_enabled: modalData.is_enabled ? 1 : 0,
          is_hot: modalData.is_hot ? 1 : 0,
        },
      });
      setToast({ show: true, title: res.data.message, icon: "success" });
    } catch (error) {
      // console.error("API Error:", error);
      // console.error("Error Response:", error.response?.data);
      setToast({
        show: true,
        title: `新增產品失敗！${error.response.data.message} `,
        icon: "error",
      });
    }
  };

  {
    /* 串接編輯商品 API */
  }
  const updateProduct = async () => {
    try {
      const res = await axios.put(
        `${baseUrl}/api/${apiPath}/admin/product/${modalData.id}`,
        {
          data: {
            ...modalData,
            origin_price: Number(modalData.origin_price),
            price: Number(modalData.price),
            is_enabled: modalData.is_enabled ? 1 : 0,
            is_hot: modalData.is_hot ? 1 : 0, //熱銷產品 is_hot
          },
        }
      );
      setToast({ show: true, title: res.data.message, icon: "success" });
    } catch (error) {
      setToast({
        show: true,
        title: `編輯產品失敗！${error.response.data.message} `,
        icon: "error",
      });
    }
  };

  // 更新 tages 的 onChange 處理
  const handleTagChange = (event) => {
    const { value, checked } = event.target;

    setModalData((prevData) => ({
      ...prevData,
      tages: checked
        ? [...(prevData?.tages || []), value] // 如果被勾選，新增進去，並確保 prevData?.tages 不為 undefined
        : prevData?.tages?.filter((tag) => tag !== value) || [], // 否則移除，且避免 `filter` 出錯
    }));
  };

  {
    /* 點擊Modal 的「確認」按鈕條件：會呼叫 「新增產品」的API指令 */
  }
  const handlUpdateProduct = async () => {
    if (!modalData.title || !modalData.category || !modalData.price) {
      setToast({
        show: true,
        title: "請填寫完整的產品資訊！",
        icon: "error",
      });
      return; // 如果欄位不完整，直接顯示錯誤，不執行 API
    }

    const apiCall = modalMode === "create" ? createProduct : updateProduct;
    try {
      await apiCall();
      getProducts();
      handleCloseProductModal(); //新增完產品，點擊[確認]按鈕後，要關閉 Modal 視窗(只在成功時關閉 Modal)
      setToast({ show: true, title: "產品已成功更新", icon: "success" });
    } catch (error) {
      // 失敗時僅顯示錯誤訊息，不關閉 Modal
      setToast({
        show: true,
        title: `更新產品失敗，請檢查輸入內容！ ${error.response.data.message} `, // API 失敗時僅顯示錯誤訊息，不關閉 Modal
        icon: "error",
      });
    }
  };

  // 撰寫主圖的圖片上傳功能：handleFileChange 監聽事件的函式
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; //獲取使用者選擇的第一個檔案

    //使用FormData格式上傳
    const formData = new FormData();
    //加入file-to-upload的欄位，並存入使用者選擇的檔案（file)
    formData.append("file-to-upload", file);

    try {
      const res = await axios.post(
        `${baseUrl}/api/${apiPath}/admin/upload`,
        formData
      );

      const uploadedImagerl = res.data.imageUrl;

      //如果 uploadedImagerl 上傳成功，將它 set 到 tempProduct->改為modalData 裡的 imageUrl
      setModalData({
        ...modalData, //複製一個tempProduct->改為modalData
        imageUrl: uploadedImagerl, //欄位代上imageUrl：值代入上傳的圖片uploadedImagerl
      });
    } catch (error) {
      alert("上傳圖片失敗，請確認圖片格式及大小的相關限制");
    }
  };

  return (
    <>
      {/* //加入產品 Modal */}
      <Toast
        show={toast.show}
        title={toast.title}
        icon={toast.icon}
        onClose={() => setToast({ show: false, title: "", icon: "" })}
      />

      <div
        ref={productModalRef}
        id="productModal"
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              {/* 調整產品 Modal 的標題、傳入的值 */}
              <h5 className="modal-title fs-4">
                {modalMode === "create" ? "新增產品" : "編輯產品"}
              </h5>
              <button
                onClick={handleCloseProductModal}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-4">
              <div className="row g-4">
                <div className="col-md-4">
                  {/* 主圖的圖片上傳功能 */}
                  <div className="mb-5">
                    <label htmlFor="fileInput" className="form-label">
                      {" "}
                      圖片上傳{" "}
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="form-control"
                      id="fileInput"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="primary-image" className="form-label">
                      主要商品形象圖
                    </label>
                    <div className="input-group mb-3">
                      <input
                        value={modalData.imageUrl}
                        onChange={handleModalInputChange}
                        name="imageUrl"
                        type="text"
                        id="primary-image"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <img
                      src={modalData.imageUrl}
                      alt={modalData.title}
                      className="img-fluid rounded-4"
                    />
                  </div>

                  {/* 副圖 */}
                  <div className="border border-2 border-dashed rounded-3 p-3">
                    {modalData.imagesUrl?.map((image, index) => (
                      <div key={index} className="mb-2">
                        <label
                          htmlFor={`imagesUrl-${index + 1}`}
                          className="form-label"
                        >
                          更多商品圖 {index + 1}
                        </label>
                        <input
                          value={image}
                          onChange={(e) => handleImageChange(e, index)}
                          id={`imagesUrl-${index + 1}`}
                          type="text"
                          placeholder={`請輸入圖片 ${index + 1}連結`}
                          className="form-control mb-2 rounded-4"
                        />
                        {image && (
                          <img
                            src={image}
                            alt=""
                            className="img-fluid mb-2 rounded-4 "
                          />
                        )}
                      </div>
                    ))}

                    {/* 撰寫產品 Modal 多圖按鈕顯示邏輯 */}
                    <div className="btn-group w-100">
                      {modalData.imagesUrl?.length < 5 &&
                        modalData.imagesUrl[modalData.imagesUrl.length - 1] !==
                          "" && (
                          <button
                            onClick={handleAddImage}
                            className="btn btn-primary w-100"
                          >
                            新增圖片
                          </button>
                        )}

                      {modalData.imagesUrl?.length >= 1 && (
                        <button
                          onClick={handleRemoveImage}
                          className="btn btn-outline-danger w-100"
                        >
                          取消圖片
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      標題
                    </label>
                    <input
                      value={modalData.title}
                      onChange={handleModalInputChange}
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                    />
                  </div>

                  <div className="row gx-4 gx-md-6 mb-4 mb-lg-6">
                    <div className="col-6 col-md-4">
                      <label htmlFor="category" className="form-label">
                        禮物類別
                      </label>
                      <select
                        className="form-select"
                        name="category"
                        value={modalData.category}
                        onChange={handleModalInputChange}
                      >
                        <option value="">商品分類</option>
                        {categoryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-6 col-md-4">
                      <label htmlFor="unit" className="form-label">
                        單位
                      </label>
                      <input
                        value={modalData.unit}
                        onChange={handleModalInputChange}
                        name="unit"
                        id="unit"
                        type="text"
                        className="form-control"
                        placeholder="請輸入單位"
                      />
                    </div>

                    <div className="col-6 col-md-4">
                      <label htmlFor="qty" className="form-label">
                        商品庫存數量
                      </label>
                      <input
                        value={modalData.qty}
                        onChange={handleModalInputChange}
                        name="qty"
                        id="qty"
                        type="text"
                        className="form-control"
                        placeholder="請輸入商品庫存數量"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-5">
                    <div className="col-6">
                      <label htmlFor="origin_price" className="form-label">
                        原價
                      </label>
                      <input
                        value={modalData.origin_price}
                        onChange={handleModalInputChange}
                        name="origin_price"
                        id="origin_price"
                        type="number"
                        className="form-control text-neutral60"
                        placeholder="請輸入原價"
                      />
                    </div>

                    <div className="col-6">
                      <label htmlFor="price" className="form-label">
                        售價
                      </label>
                      <input
                        value={modalData.price}
                        onChange={handleModalInputChange}
                        name="price"
                        id="price"
                        type="number"
                        className="form-control"
                        placeholder="請輸入售價"
                      />
                    </div>
                  </div>

                  {/* tag: 節慶 / 場合 */}
                  <div className="mt-10">
                    <h3 className="card-title fs-5 border-bottom border-neutral40 fw-semibold pb-4 mb-4">
                      節慶 / 場合
                    </h3>
                  </div>

                  <div className="col-12 mb-5">
                    <div className="row">
                      {festivalOptions.map((option) => (
                        <div
                          key={option}
                          className="form-check col-6 col-md-3 mb-2"
                        >
                          <div className="form-check text-neutral60">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`festival-${option}`}
                              value={option}
                              checked={modalData.tages?.includes(option)} // 確認 `tages` 中是否包含此選項
                              onChange={handleTagChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`festival-${option}`}
                            >
                              {option}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* tag: 送禮關係 */}
                  <div className="mt-10">
                    <h3 className="card-title fs-5 border-bottom border-neutral40 fw-semibold pb-4 mb-4">
                      送禮關係
                    </h3>
                  </div>

                  <div className="col-12 mb-5">
                    <div className="row">
                      {relationOptions.map((option) => (
                        <div
                          key={option}
                          className="form-check col-6 col-md-3 mb-2"
                        >
                          <div className="form-check text-neutral60">
                            <input
                              type="checkbox"
                              className="form-check-input "
                              id={`relation-${option}`}
                              value={option}
                              checked={modalData.tages?.includes(option)}
                              onChange={handleTagChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`relation-${option}`}
                            >
                              {option}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      商品說明
                    </label>
                    <textarea
                      value={modalData.description}
                      onChange={handleModalInputChange}
                      name="description"
                      id="description"
                      className="form-control"
                      rows={4}
                      placeholder="請輸入商品說明內容"
                    ></textarea>
                  </div>

                  <div className="mt-10">
                    <h3 className="card-title fs-5 border-bottom border-neutral40 fw-semibold pb-4 mb-4">
                      商品資訊
                    </h3>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="material_contents" className="form-label">
                      材質/內容物
                    </label>
                    <textarea
                      value={modalData.content.material_contents}
                      onChange={handleModalInputChange}
                      name="material_contents"
                      id="material_contents"
                      type="text"
                      rows={4}
                      className="form-control"
                      placeholder="請輸入商品的材質/內容物資訊"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="expiry_date" className="form-label">
                      保存期限
                    </label>
                    <input
                      value={modalData.content.expiry_date}
                      onChange={handleModalInputChange}
                      name="expiry_date"
                      id="expiry_date"
                      type="text"
                      className="form-control"
                      placeholder="可以輸入保存期限或方法內容"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="origin" className="form-label">
                      產地
                    </label>
                    <input
                      value={modalData.content.origin}
                      onChange={handleModalInputChange}
                      name="origin"
                      id="origin"
                      type="text"
                      className="form-control"
                      placeholder="請輸入商品產地資訊"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="material_contents" className="form-label">
                      注意事項
                    </label>
                    <textarea
                      value={modalData.content.notes}
                      onChange={handleModalInputChange}
                      name="notes"
                      id="notes"
                      type="text"
                      rows={4}
                      className="form-control"
                      placeholder="請輸入商品或使用上的注意事項內容"
                    ></textarea>
                  </div>

                  <div className="form-check">
                    <input
                      checked={modalData.is_enabled}
                      onChange={handleModalInputChange}
                      name="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      是否啟用
                    </label>
                  </div>

                  {/* 是否為熱銷產品 is_hot */}
                  <div className="form-check">
                    <input
                      checked={modalData.is_hot}
                      onChange={handleModalInputChange}
                      name="is_hot"
                      type="checkbox"
                      className="form-check-input"
                      id="isHotProduct"
                    />
                    <label className="form-check-label" htmlFor="isHotProduct">
                      是否為熱銷商品
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button
                onClick={handleCloseProductModal}
                type="button"
                className="btn btn-outline-neutral60 fs-6"
              >
                取消
              </button>
              <button
                onClick={handlUpdateProduct}
                type="button"
                className="btn btn-primary fs-6"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductModal;
