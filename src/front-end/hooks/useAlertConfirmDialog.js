import Swal from 'sweetalert2';

function useAlertConfirmDialog() {
  const confirm = async ({
    title,
    text = '',
    icon = 'question',
    showCancel = true,
    confirmText = '確定',
    cancelText = '取消',
    confirmClass = 'custom-confirm-btn',
    cancelClass = 'custom-cancel-btn',
  }) => {
    const result = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: showCancel,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      customClass: {
        popup: 'custom-alert',
        confirmButton: confirmClass,
        cancelButton: cancelClass,
      },
      // buttonsStyling: false,
    });
    return result.isConfirmed;
  };

  const alert = async ({
    title,
    text = '',
    icon = 'success',
    confirmText = '確定',
    confirmClass = 'custom-confirm-btn',
  }) => {
    await Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: confirmText,
      customClass: {
        popup: 'custom-alert',
        confirmButton: confirmClass,
      },
    });
  };
  return { confirm, alert };
}
export default useAlertConfirmDialog;
