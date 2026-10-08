const Button = ({ className = "", text, ...props }) => {
  return (
    <button
      {...props}
      className={`cursor-pointer rounded-lg bg-amber-800 px-1 py-1 text-white duration-103 enabled:hover:scale-103 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {text}
    </button>
  );
};
export default Button;
