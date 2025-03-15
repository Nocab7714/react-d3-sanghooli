import PropTypes from "prop-types";

export default function Select ({register, errors, id, rules, labelText, children, disabled = false, selectClassName}){
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <select id={id} className={`form-select ${selectClassName} ${errors[id] ? 'is-invalid' : ''}`} {...register(id, rules)} disabled={disabled}>
        { children }
      </select>
      {
        errors[id] && <div className="invalid-feedback">{errors?.[id]?.message}</div>
      }
    </>
  )
}
Select.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  labelText: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}