import { DollarSign } from "lucide-react";

const FieldWithIcon = ({ label, Icon = DollarSign, children }) => {
  return (
    <div className="w-full">
      {label ? (
        <label className="text-fg text-body-s mb-1.5 block font-medium">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <Icon
          size={18}
          className="text-fg-muted pointer-events-none absolute inset-s-3.5 top-1/2 -translate-y-1/2"
        />
        {children}
      </div>
    </div>
  );
};
export default FieldWithIcon;
