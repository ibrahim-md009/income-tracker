import Button from "./Button";
import { useStore } from "../../store/useStore";

const SaveBtn = ({ section, draft }) => {
  const updateSettings = useStore((s) => s.updateSettings);
  const saved = useStore((s) => s.settings[section]);

  const isSame = Object.keys(draft).every((key) => draft[key] === saved[key]);

  return (
    <Button
      onClick={() => updateSettings(section, draft)}
      disabled={isSame}
      text="حفظ التغييرات"
      className="w-30"
    />
  );
};
export default SaveBtn;
