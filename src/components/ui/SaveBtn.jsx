import Button from "./Button";
import { useStore } from "../../store/useStore";

const SaveBtn = ({ field, value, state }) => {
  const { onChange } = useStore();

  return (
    <Button
      onClick={() => onChange(field, value)}
      disabled={value.trim() === state || !value.trim()}
      text="حفظ التغييرات"
      className="w-30"
    />
  );
};
export default SaveBtn;
