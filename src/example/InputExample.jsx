// 僅為 input 樣式範例，不包含 label
const InputExample = () => {
  return (
    <>
      {/* input-group-calculate-disabled */}
      <div className="input-group-calculate mb-5 position-relative ">
        <button
          className="btn btn-sub position-absolute translate-middle rounded-1 p-1 "
          type="button"
          disabled
        >
          <span className="material-symbols-outlined align-middle fs-5">
            remove
          </span>
        </button>
        <input
          type="number"
          className="form-control position-absolute text-center"
          defaultValue="1"
          aria-label="product quantity"
          readOnly
        />
        <button
          className="btn btn-add position-absolute translate-middle rounded-1 p-1  "
          type="button"
        >
          <span className="material-symbols-outlined align-middle fs-5">add</span>
        </button>
      </div>
      {/* input-group-calculate */}
      <div className="input-group-calculate mb-5 position-relative ">
        <button
          className="btn btn-sub position-absolute translate-middle rounded-1 p-1 "
          type="button"
        >
          <span className="material-symbols-outlined align-middle fs-5">
            remove
          </span>
        </button>
        <input
          type="number"
          className="form-control position-absolute text-center"
          defaultValue="99"
          aria-label="product quantity"
          readOnly
        />
        <button
          className="btn btn-add position-absolute translate-middle rounded-1 p-1  "
          type="button"
        >
          <span className="material-symbols-outlined align-middle fs-5">add</span>
        </button>
      </div>
      {/* input-group-calculate-lg-disabled */}
      <div className="input-group-calculate input-group-calculate-lg mb-5 position-relative ">
        <button
          className="btn btn-sub position-absolute translate-middle rounded-1 p-2 "
          type="button"
          disabled
        >
          <span className="material-symbols-outlined align-middle fs-4">
            remove
          </span>
        </button>
        <input
          type="number"
          className="form-control position-absolute "
          defaultValue="1"
        />
        <button
          className="btn btn-add position-absolute translate-middle rounded-1 p-2  "
          type="button"
        >
          <span className="material-symbols-outlined align-middle fs-4">add</span>
        </button>
      </div>
      {/* input-group-calculate-lg */}
      <div className="input-group-calculate input-group-calculate-lg mb-5 position-relative ">
        <button
          className="btn btn-sub position-absolute translate-middle rounded-1 p-2 "
          type="button"
        >
          <span className="material-symbols-outlined align-middle fs-4">
            remove
          </span>
        </button>
        <input
          type="number"
          className="form-control position-absolute text-center"
          defaultValue="99"
          aria-label="product quantity"
          readOnly
        />
        <button
          className="btn btn-add position-absolute translate-middle rounded-1 p-2  "
          type="button"
        >
          <span className="material-symbols-outlined align-middle fs-4">add</span>
        </button>
      </div>

      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="文字"
        aria-label="form-control-lg "
      />
      <input
        className="form-control mt-5"
        type="text"
        placeholder="文字"
        aria-label="default input "
      />
      <input
        className="form-control mt-5 mb-5"
        type="text"
        placeholder="文字"
        aria-label="default input "
        disabled
      />
    </>
  );
};

export default InputExample;
