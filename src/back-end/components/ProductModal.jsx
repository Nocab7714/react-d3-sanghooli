// 外部資源
import axios from "axios";
import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";

import { createToast } from "../../slices/toastSlice";

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
  const dispatch = useDispatch();
  const productModalRef = useRef(null);
  const fileInputRef = useRef(null);

  // 設定 React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      unit: "",
      qty: "",
      origin_price: "",
      price: "",
      description: "",
      content: {
        material_contents: "",
        expiry_date: "",
        origin: "",
        notes: "",
      },
      imageUrl: "",
      imagesUrl: [],
      is_hot: false,
      is_enabled: false,
      tages: [],
    },
  });

  // 監聽 imagesUrl 以便控制新增和刪除按鈕
  const imagesUrl = watch("imagesUrl");

  // 初始化 Modal 及監聽開關狀態
  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false,
    });
    Modal.getInstance(productModalRef.current);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(productModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  // 當 Modal 開啟時，根據模式重置表單
  useEffect(() => {
    if (isOpen) {
      if (modalMode === "create") {
        reset({
          title: "",
          category: "",
          unit: "",
          qty: "",
          origin_price: "",
          price: "",
          description: "",
          content: {
            material_contents: "",
            expiry_date: "",
            origin: "",
            notes: "",
          },
          imageUrl: "",
          imagesUrl: [],
          is_hot: false,
          is_enabled: false,
          tages: [],
        });
      } else {
        // 編輯模式：設定表單初始值
        reset({
          ...tempProduct,
          is_hot: tempProduct.is_hot ?? false,
          is_enabled: tempProduct.is_enabled ?? false,
          tages: tempProduct?.tages || [],
          content: tempProduct.content || {
            material_contents: "",
            expiry_date: "",
            origin: "",
            notes: "",
          },
          imagesUrl: tempProduct.imagesUrl || [],
        });
      }
    }
  }, [isOpen, modalMode, tempProduct, reset]);

  // 關閉 Modal
  const handleCloseProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 新增圖片欄位
  const handleAddImage = () => {
    const currentImages = watch("imagesUrl") || [];
    setValue("imagesUrl", [...currentImages, ""]);
  };

  // 移除最後一個圖片欄位
  const handleRemoveImage = () => {
    const currentImages = watch("imagesUrl") || [];
    const newImages = [...currentImages];
    newImages.pop();
    setValue("imagesUrl", newImages);
  };

  // 新增商品 API
  const createProduct = async (formData) => {
    try {
      const res = await axios.post(`${baseUrl}/api/${apiPath}/admin/product`, {
        data: {
          ...formData,
          origin_price: Number(formData.origin_price),
          price: Number(formData.price),
          qty: Number(formData.qty),
          is_enabled: formData.is_enabled ? 1 : 0,
          is_hot: formData.is_hot ? 1 : 0,
        },
      });
      dispatch(createToast(res.data));
      return true;
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: `新增產品失敗！${error.response.data.message} `,
        })
      );
      return false;
    }
  };

  // 編輯商品 API
  const updateProduct = async (formData) => {
    try {
      await axios.put(
        `${baseUrl}/api/${apiPath}/admin/product/${formData.id}`,
        {
          data: {
            ...formData,
            origin_price: Number(formData.origin_price),
            price: Number(formData.price),
            qty: Number(formData.qty),
            is_enabled: formData.is_enabled ? 1 : 0,
            is_hot: formData.is_hot ? 1 : 0,
          },
        }
      );
      dispatch(
        createToast({
          success: true,
          message: "商品資訊已編輯更新成功",
        })
      );
      return true;
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "商品編輯、更新失敗",
        })
      );
      console.error(error);
      return false;
    }
  };

  // 表單提交處理
  const onSubmit = async (data) => {
    if (!data.title || !data.category || !data.price) {
      dispatch(
        createToast({
          success: false,
          message: "請填寫完整的產品資訊！",
        })
      );
      return;
    }

    const apiCall = modalMode === "create" ? createProduct : updateProduct;
    try {
      const success = await apiCall(data);
      if (success) {
        getProducts();
        handleCloseProductModal();
        dispatch(
          createToast({
            success: true,
            message: "產品已成功更新！",
          })
        );
      }
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: `更新產品失敗，請檢查輸入內容！`,
        })
      );
    }
  };

  // 主圖的圖片上傳功能
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file-to-upload", file);

    try {
      const res = await axios.post(
        `${baseUrl}/api/${apiPath}/admin/upload`,
        formData
      );
      dispatch(
        createToast({
          success: true,
          message: "上傳圖片成功",
        })
      );

      const uploadedImageUrl = res.data.imageUrl;
      setValue("imageUrl", uploadedImageUrl);
    } catch (error) {
      dispatch(
        createToast({
          success: false,
          message: "上傳圖片失敗，請確認圖片格式及大小的相關限制",
        })
      );
      console.error(error);
    }
  };

  return (
    <>
      <div
        ref={productModalRef}
        id="productModal"
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-4">
                    {/* 主圖的圖片上傳功能 */}
                    <div className="mb-5">
                      <label htmlFor="fileInput" className="form-label">
                        圖片上傳
                      </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="form-control"
                        id="fileInput"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="primary-image" className="form-label">
                        主要商品形象圖
                      </label>
                      <div className="input-group mb-3">
                        <Controller
                          name="imageUrl"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              id="primary-image"
                              className="form-control"
                              placeholder="請輸入圖片連結"
                            />
                          )}
                        />
                      </div>
                      {watch("imageUrl") && (
                        <img
                          src={watch("imageUrl")}
                          alt={watch("title")}
                          className="img-fluid rounded-4"
                        />
                      )}
                    </div>

                    {/* 副圖 */}
                    <div className="border border-2 border-dashed rounded-3 p-3">
                      {imagesUrl?.map((image, index) => (
                        <div key={index} className="mb-2">
                          <label
                            htmlFor={`imagesUrl-${index + 1}`}
                            className="form-label"
                          >
                            更多商品圖 {index + 1}
                          </label>
                          <Controller
                            name={`imagesUrl.${index}`}
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                id={`imagesUrl-${index + 1}`}
                                type="text"
                                placeholder={`請輸入圖片 ${index + 1}連結`}
                                className="form-control mb-2 rounded-4"
                              />
                            )}
                          />
                          {image && (
                            <img
                              src={image}
                              alt=""
                              className="img-fluid mb-2 rounded-4"
                            />
                          )}
                        </div>
                      ))}

                      {/* 多圖按鈕 */}
                      <div className="btn-group w-100">
                        {imagesUrl?.length < 5 &&
                          (!imagesUrl.length ||
                            imagesUrl[imagesUrl.length - 1] !== "") && (
                            <button
                              type="button"
                              onClick={handleAddImage}
                              className="btn btn-primary w-100"
                            >
                              新增圖片
                            </button>
                          )}

                        {imagesUrl?.length >= 1 && (
                          <button
                            type="button"
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
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: "此欄位必填！" }}
                        render={({ field }) => (
                          <input
                            {...field}
                            id="title"
                            type="text"
                            className={`form-control ${
                              errors.title ? "is-invalid" : ""
                            }`}
                            placeholder="請輸入標題"
                          />
                        )}
                      />
                      {errors.title && (
                        <div className="invalid-feedback">
                          {errors.title.message}
                        </div>
                      )}
                    </div>

                    <div className="row gx-4 gx-md-6 mb-4 mb-lg-6">
                      <div className="col-6 col-md-4">
                        <label htmlFor="category" className="form-label">
                          禮物類別
                        </label>
                        <Controller
                          name="category"
                          control={control}
                          rules={{ required: "此欄位必填！" }}
                          render={({ field }) => (
                            <select
                              {...field}
                              className={`form-select ${
                                errors.category ? "is-invalid" : ""
                              }`}
                            >
                              <option value="">商品分類</option>
                              {categoryOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        {errors.category && (
                          <div className="invalid-feedback">
                            {errors.category.message}
                          </div>
                        )}
                      </div>

                      <div className="col-6 col-md-4">
                        <label htmlFor="unit" className="form-label">
                          單位
                        </label>
                        <Controller
                          name="unit"
                          control={control}
                          rules={{
                            required: "此欄位必填！",
                            pattern: {
                              value: /^[\u4e00-\u9fa5]+$/,
                              message: "請確認輸入的「單位」格式是否正確",
                            },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="unit"
                              type="text"
                              className={`form-control ${
                                errors.unit ? "is-invalid" : ""
                              }`}
                              placeholder="請輸入單位 (限中文)"
                            />
                          )}
                        />
                        {errors.unit && (
                          <div className="invalid-feedback">
                            {errors.unit.message}
                          </div>
                        )}
                      </div>

                      <div className="col-6 col-md-4">
                        <label htmlFor="qty" className="form-label">
                          商品庫存數量
                        </label>
                        <Controller
                          name="qty"
                          control={control}
                          rules={{
                            required: "此欄位必填！",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "請確認輸入的「數量」格式是否正確",
                            },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="qty"
                              type="text"
                              className={`form-control ${
                                errors.qty ? "is-invalid" : ""
                              }`}
                              placeholder="請輸入庫存數量 (限數值)"
                            />
                          )}
                        />
                        {errors.qty && (
                          <div className="invalid-feedback">
                            {errors.qty.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row g-3 mb-5">
                      <div className="col-6">
                        <label htmlFor="origin_price" className="form-label">
                          原價
                        </label>
                        <Controller
                          name="origin_price"
                          control={control}
                          rules={{ required: "此欄位必填！" }}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="origin_price"
                              type="number"
                              className={`form-control text-neutral60 ${
                                errors.origin_price ? "is-invalid" : ""
                              }`}
                              placeholder="請輸入原價"
                            />
                          )}
                        />
                        {errors.origin_price && (
                          <div className="invalid-feedback">
                            {errors.origin_price.message}
                          </div>
                        )}
                      </div>

                      <div className="col-6">
                        <label htmlFor="price" className="form-label">
                          售價
                        </label>
                        <Controller
                          name="price"
                          control={control}
                          rules={{ required: "此欄位必填！" }}
                          render={({ field }) => (
                            <input
                              {...field}
                              id="price"
                              type="number"
                              className={`form-control ${
                                errors.price ? "is-invalid" : ""
                              }`}
                              placeholder="請輸入售價"
                            />
                          )}
                        />
                        {errors.price && (
                          <div className="invalid-feedback">
                            {errors.price.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* tag: 節慶 / 場合 */}
                    <div className="mt-10">
                      <h3 className="card-title fs-5 border-bottom border-neutral40 fw-semibold pb-4 mb-4">
                        節慶 / 場合
                      </h3>
                    </div>

                    <div className="mb-5">
                      <div className="row">
                        {festivalOptions.map((option) => (
                          <div
                            key={option}
                            className="form-check col-6 col-md-3 mb-2"
                          >
                            <div className="form-check text-neutral60">
                              <Controller
                                name="tages"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`festival-${option}`}
                                    value={option}
                                    checked={field.value?.includes(option)}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const newValue = checked
                                        ? [...(field.value || []), option]
                                        : (field.value || []).filter(
                                            (tag) => tag !== option
                                          );
                                      field.onChange(newValue);
                                    }}
                                  />
                                )}
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

                    <div className="mb-5">
                      <div className="row">
                        {relationOptions.map((option) => (
                          <div
                            key={option}
                            className="form-check col-6 col-md-3 mb-2"
                          >
                            <div className="form-check text-neutral60">
                              <Controller
                                name="tages"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`relation-${option}`}
                                    value={option}
                                    checked={field.value?.includes(option)}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const newValue = checked
                                        ? [...(field.value || []), option]
                                        : (field.value || []).filter(
                                            (tag) => tag !== option
                                          );
                                      field.onChange(newValue);
                                    }}
                                  />
                                )}
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
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            id="description"
                            className="form-control"
                            rows={4}
                            placeholder="請輸入商品說明內容"
                          ></textarea>
                        )}
                      />
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
                      <Controller
                        name="content.material_contents"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            id="material_contents"
                            rows={4}
                            className="form-control"
                            placeholder="請輸入商品的材質/內容物資訊"
                          ></textarea>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="expiry_date" className="form-label">
                        保存期限
                      </label>
                      <Controller
                        name="content.expiry_date"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            id="expiry_date"
                            type="text"
                            className="form-control"
                            placeholder="可以輸入保存期限或方法內容"
                          />
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="origin" className="form-label">
                        產地
                      </label>
                      <Controller
                        name="content.origin"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            id="origin"
                            type="text"
                            className="form-control"
                            placeholder="請輸入商品產地資訊"
                          />
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="notes" className="form-label">
                        注意事項
                      </label>
                      <Controller
                        name="content.notes"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            id="notes"
                            rows={4}
                            className="form-control"
                            placeholder="請輸入商品或使用上的注意事項內容"
                          ></textarea>
                        )}
                      />
                    </div>

                    <div className="form-check">
                      <Controller
                        name="is_enabled"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="checkbox"
                            className="form-check-input"
                            id="isEnabled"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                      <label className="form-check-label" htmlFor="isEnabled">
                        是否啟用
                      </label>
                    </div>

                    <div className="form-check">
                      <Controller
                        name="is_hot"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="checkbox"
                            className="form-check-input"
                            id="isHotProduct"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isHotProduct"
                      >
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
                <button type="submit" className="btn btn-primary fs-6">
                  確認
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;

ProductModal.propTypes = {
  modalMode: PropTypes.string,
  tempProduct: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    unit: PropTypes.string,
    origin_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    content: PropTypes.shape({
      material_contents: PropTypes.string,
      expiry_date: PropTypes.string,
      origin: PropTypes.string,
      notes: PropTypes.string,
    }),
    is_enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    is_hot: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    imageUrl: PropTypes.string,
    imagesUrl: PropTypes.array,
    tages: PropTypes.array,
  }),
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};
