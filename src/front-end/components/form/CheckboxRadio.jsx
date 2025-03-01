import PropTypes from "prop-types";

export default function CheckboxRadio({register, errors, id, labelText, type, rules}){
  return (
    <>
    <div className="form-check mb-3">
      <input
        {...register(id, rules)}
        type={type} 
        className={`form-check-input ${errors[id] ? 'is-invalid' : ''}`} 
        id={id} 
        aria-describedby={id}
      />
      <label htmlFor={id} className="form-check-label">{labelText}</label>
      {
        errors[id] && (<div className="invalid-feedback">{errors?.[id]?.message}</div>)
      }
    </div>
    </>
  )
}
CheckboxRadio.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  type: PropTypes.string.isRequired,
  rules: PropTypes.object,
}