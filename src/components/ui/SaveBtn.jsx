import Button from "./Button";
import { useStore } from "../../store/useStore";
import { useSaveSettings } from "../../hooks/useSaveSettings";

const SaveBtn = ({ section, draft }) => {
  const saved = useStore((s) => s.settings[section]);

  const isSame = Object.keys(draft).every((key) => draft[key] === saved[key]);

  const save = useSaveSettings(section);
  return (
    <Button
      onClick={() => save(draft)}
      disabled={isSame}
      text="حفظ التغييرات"
      className="w-30"
    />
  );
};
export default SaveBtn;
