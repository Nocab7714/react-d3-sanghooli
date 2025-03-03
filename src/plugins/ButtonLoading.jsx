const ButtonLoading = ({ isLoading = false }) => {
  return (
    <>
      {isLoading && (
        <span className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
      )}
    </>
  );
};

export default ButtonLoading;
