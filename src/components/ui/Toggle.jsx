const Toggle = ({ enabled = false, onChange, disabled = false }) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!enabled);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${disabled ? "cursor-not-allowed opacity-50" : ""} ${enabled ? "bg-action" : "bg-paper-200 border border-stone-300"}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${enabled ? "-translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
};

export default Toggle;
