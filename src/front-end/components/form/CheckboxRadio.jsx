import PropTypes from "prop-types";

export default function CheckboxRadio({register, errors, id, labelText, type, name, rules, img = "", onClick, value}){
  return (
    <>
    <div className="form-check mb-3">
      <input
        {...register(name, rules)}
        type={type} 
        name={name}
        className={`form-check-input ${errors[id] ? 'is-invalid' : ''}`} 
        id={id} 
        aria-describedby={id}
        // onClick={onClick}
        value={value}
      />
      <label htmlFor={id} className="form-check-label">
        {img && <img src={img} className="card-img-top" alt={labelText}/>}
        {labelText}
      </label>
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
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  onClick: PropTypes.func,
  rules: PropTypes.object,
}