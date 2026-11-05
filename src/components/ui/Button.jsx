const Button = ({
  className = "",
  text,
  variant = "solid",
  children,
  ...props
}) => {
  const baseStyle =
    " bg-action text-raised text-body min-w-15 cursor-pointer rounded-control p-2 duration-103 enabled:hover:scale-103 disabled:cursor-not-allowed disabled:opacity-50 ";
  return (
    <button
      {...props}
      className={` ${baseStyle} ${variant === "outlined" ? "border-accent text-fg! hover:bg-accent border bg-transparent duration-103 hover:text-white" : ""} ${className}`}
    >
      {children || text}
    </button>
  );
};
export default Button;
