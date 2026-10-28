const FieldWithIcon = ({ label, Icon, children }) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        {label ? <label className="mb-1 font-medium">{label}</label> : null}
        <Icon className="absolute right-3 bottom-2 w-6 rounded-lg bg-gray-300 p-1" />

        {children}
      </div>
    </div>
  );
};
export default FieldWithIcon;
