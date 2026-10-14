const Button = ({ className = "", text, variant = "solid", ...props }) => {
  const baseStyle =
    "min-w-15 cursor-pointer rounded-lg p-1 duration-103 enabled:hover:scale-103 disabled:cursor-not-allowed disabled:opacity-50 ";
  return (
    <button
      {...props}
      className={` ${baseStyle} ${variant === "outlined" ? "border-accent text-accent hover:bg-accent border bg-transparent duration-103 hover:text-white" : " bg-accent text-white"} ${className}`}
    >
      {text}
    </button>
  );
};
export default Button;
