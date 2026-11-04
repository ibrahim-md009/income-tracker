const Input = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  placeholder = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`border-accent bg-paper-50 rounded-lg border p-2 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
