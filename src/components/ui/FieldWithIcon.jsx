import { DollarSign } from "lucide-react";
const FieldWithIcon = ({ label, Icon = DollarSign, children }) => {
  return (
    <div className="bg-card relative w-full">
      <div className="flex flex-col">
        {label ? <label className="mb-1 font-medium">{label}</label> : null}
        <Icon className="rounded-control absolute right-3 bottom-2 w-6 bg-gray-300 p-1" />

        {children}
      </div>
    </div>
  );
};
export default FieldWithIcon;
