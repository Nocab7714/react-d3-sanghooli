import PropTypes from "prop-types";

export default function Textarea({register, errors, id, labelText, placeholder, rules, labelClassName, textareaClassName, ...props}){
  return (
    <>
    <div className="mb-3">
      <label htmlFor={id} className={`form-label ${labelClassName}`}>{labelText}</label>
      <textarea
        {...register(id, rules)}
        className={`form-control ${textareaClassName}`} 
        id={id} 
        placeholder={placeholder}
        aria-describedby={id}
        {...props} // 傳遞額外屬性，如 rows, cols 等
      />
      {
        errors[id] && (<div className="invalid-feedback">{errors?.[id]?.message}</div>)
      }
    </div>
    </>
  )
}
Textarea.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
  placeholder: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  labelClassName: PropTypes.string,
  textareaClassName: PropTypes.string,
}