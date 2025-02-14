import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap'; // bootstrap 5 的方法請要使用在各別引入

// bootstrap modal 測試
const ModalTest = () => {

  const modalRef = useRef(null); // modal dom
  const myModal = useRef(null); // modal 實體
  useEffect(() => {
    myModal.current = new Modal(modalRef.current);
  }, []);
  const modalShow = () => {
    myModal.current.show();
  };
  const modalHide = () => {
    myModal.current.hide();
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-5"
        onClick={modalShow}
      >
        測試開啟 modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={modalHide}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={modalHide}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTest;
