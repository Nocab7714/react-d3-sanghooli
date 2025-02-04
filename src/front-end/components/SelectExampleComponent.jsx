// 資料驅動範例
const selectData = [
  '500 元以下',
  '500～1,000 元',
  '1,000～3,000 元',
  '3,000 元以上',
];

const SelectExampleComponent = () => {
  return (
    <>
      {/* select default-size */}
      <div className="mb-5">
        <select className="form-select">
          <option value="" selected disabled>
            請選擇價格範圍
          </option>
          {selectData.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {/* select no-selected disabled */}
      <div className="mb-5">
        <select className="form-select">
          <option value="" selected >
            請選擇價格範圍
          </option>
          {selectData.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {/* select Lg-size */}
      <div className="mb-5">
        <select className="form-select form-select-lg">
          <option value="" selected disabled>
            請選擇價格範圍
          </option>
          {selectData.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {/* select disabled */}
      <div className="mb-5">
        <select className="form-select" disabled>
          <option value="" selected disabled>
            請選擇價格範圍
          </option>
          {selectData.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default SelectExampleComponent;
