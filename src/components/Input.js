export default function Inputs(props) {
  const { id, hint, name, min, onChange, type, className, label, value } =
    props;
  return (
    <>
      <label htmlFor={id} label={label} className="d-flex ustify-content-start">
        {label}
      </label>
      <input
        id={id}
        name={name}
        min={min}
        placeholder={hint}
        onChange={onChange}
        value={value}
        type={type}
        className={className}
      />
    </>
  );
}
