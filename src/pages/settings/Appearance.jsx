import Button from "../../components/ui/Button";
import SettingsLayout from "../../components/layout/SettingsLayout";
import { useStore } from "../../store/useStore";
import { useSaveSettings } from "../../hooks/useSaveSettings";

const themes = [
  {
    id: "light",
    title: "فاتح",
    bg: "bg-page",
  },
  {
    id: "dark",
    title: "داكن",
    bg: "bg-[#101322]",
  },
  {
    id: "system",
    title: "تلقائي حسب جهازك",
    bg: "bg-[linear-gradient(to_right,#000000_50%,#f5f1e8_50%)]",
  },
];

const colors = [
  { hex: "#92400e", bg: "bg-[#92400e]" },
  { hex: "#32a852", bg: "bg-[#32a852]" },
  { hex: "#44f20f", bg: "bg-[#44f20f]" },
  { hex: "#0f88f2", bg: "bg-[#0f88f2]" },
];

const section = "appearance";
const Appearance = () => {
  const appearanceSettings = useStore((s) => s.settings.appearance);

  const save = useSaveSettings(section);
  return (
    <SettingsLayout title={"المظهر"} subTitle={"تعديل الثيم والالوان"}>
      <div>
        <label className="mb-2 block font-medium">الثيم</label>
        <div className="flex w-full gap-2">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => save({ theme: theme.id })}
              className={`rounded-control bg-card flex h-30 w-full flex-col items-center justify-center gap-2 border-2 p-4 transition-colors ${appearanceSettings.theme === theme.id ? "border-action" : "border-line-strong"}`}
            >
              <div className={`h-[90%] w-[90%] ${theme.bg}`}></div>
              <h3 className="text-fg text-body-s">{theme.title}</h3>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>اللون الأساسي</label>
        <div className="flex gap-2">
          {colors.map((c) => {
            return (
              <button
                key={c.hex}
                onClick={() => save({ accentColor: c.hex })}
                className={`aspect-square w-7 rounded-full duration-75 hover:scale-110 ${c.bg} ${appearanceSettings.accentColor === c.hex ? "border-line border-3" : ""}`}
              ></button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>حجم الخط</label>
        <select
          className="h-10 rounded-lg bg-gray-200"
          value={appearanceSettings.fontSize}
          onChange={(e) => save({ fontSize: e.target.value })}
        >
          <option value="16">متوسط</option>
          <option value="20">كبير</option>
          <option value="12">صغير</option>
        </select>
      </div>
    </SettingsLayout>
  );
};

export default Appearance;
