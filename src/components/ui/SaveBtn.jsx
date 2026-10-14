import Button from "./Button";
import { useStore } from "../../store/useStore";

const SaveBtn = ({ section, changes }) => {
  const updateSettings = useStore((s) => s.updateSettings);
  const saved = useStore((s) => s.settings[section]);

  const isSame = JSON.stringify(changes) === JSON.stringify(saved);

  return (
    <Button
      onClick={() => updateSettings(section, changes)}
      disabled={isSame}
      text="حفظ التغييرات"
      className="w-30"
    />
  );
};
export default SaveBtn;
