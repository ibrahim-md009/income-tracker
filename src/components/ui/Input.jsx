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
      {label && <label className="text-fg text-body-s">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`bg-card text-fg text-body border-line-strong rounded-control border p-2 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
