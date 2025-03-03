const ButtonLoading = ({ isLoading = false }) => {
  return (
    <>
      {isLoading && (
        <span class="spinner-border spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </span>
      )}
    </>
  );
};

export default ButtonLoading;
