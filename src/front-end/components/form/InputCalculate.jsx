const InputCalculate = ({
  inputSize = 'm',
  productQty,
  setProductQty,
  productStockQty,
}) => {
  return (
    <>
      <div
        className={`input-group-calculate position-relative ${
          inputSize === 'lg' ? 'input-group-calculate-lg' : ''
        }`}
      >
        <button
          onClick={() => setProductQty((prevProductQty) => prevProductQty - 1)}
          className={`btn btn-sub position-absolute translate-middle rounded-1 ${
            inputSize === 'lg' ? 'p-2' : 'p-1'
          }`}
          type="button"
          disabled={productQty < 2}
        >
          <span
            className={`material-symbols-outlined align-middle ${
              inputSize === 'lg' ? 'fs-4' : 'fs-5'
            }`}
          >
            remove
          </span>
        </button>
        <input
          type="number"
          name="productQty"
          className="form-control position-absolute text-center"
          value={productQty}
          aria-label="product quantity"
          disabled={productQty <= 0}
          readOnly
        />
        <button
          onClick={() => setProductQty((prevProductQty) => prevProductQty + 1)}
          className={`btn btn-add position-absolute translate-middle rounded-1 ${
            inputSize === 'lg' ? 'p-2' : 'p-1'
          }`}
          type="button"
          disabled={productQty >= productStockQty || productQty === 0}
        >
          <span
            className={`material-symbols-outlined align-middle ${
              inputSize === 'lg' ? 'fs-4' : 'fs-5'
            }`}
          >
            add
          </span>
        </button>
      </div>
    </>
  );
};

export default InputCalculate;
