const Input = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  placeholder = "",
  error = "",
  ...props
}) => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      {label && <label className="text-fg text-body-s">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`bg-card text-fg text-body border-line-strong rounded-control border w-full min-w-0 p-2 ${
          error ? "border-money-out!" : ""
        } ${className}`}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && <p className="text-money-out text-caption">{error}</p>}
    </div>
  );
};

export default Input;
