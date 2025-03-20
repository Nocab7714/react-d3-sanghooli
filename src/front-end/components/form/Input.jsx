import PropTypes from "prop-types";

export default function Input({register, errors, id, labelText, type, placeholder, rules, layoutClass, inputClass}){
  return (
    <>
    <div className={`mb-3 ${layoutClass}`}>
      <label htmlFor={id} className={`form-label ${errors[id]? 'is-invalid' : ''}`}>{labelText}</label>
      {
        errors[id] && (<span className="invalid-feedback d-inline">{errors?.[id]?.message}</span>)
      }
      <input
        {...register(id, rules)}
        type={type} 
        className={`form-control ${inputClass} ${errors[id] ? 'is-invalid' : ''}`} 
        id={id} 
        placeholder={placeholder}
        aria-describedby={id}
      />
      
    </div>
    </>
  )
}
Input.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  layoutClass: PropTypes.string,
  inputClass: PropTypes.string,
}