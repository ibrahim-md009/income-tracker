import { useSettingsForm } from "../../hooks/useSettingsForm";
import Button from "../../components/ui/Button";
import SettingsLayout from "../../components/layout/SettingsLayout";

const themes = [
  {
    id: "light",
    title: "فاتح",
    subtitle: "الافتراضي",
  },
  {
    id: "dark",
    title: "داكن",
  },
  {
    id: "system",
    title: "تلقائي",
    subtitle: "حسب الجهاز",
  },
];

const colors = [
  { hex: "#92400e", bg: "bg-[#92400e]" },
  { hex: "#32a852", bg: "bg-[#32a852]" },
  { hex: "#44f20f", bg: "bg-[#44f20f]" },
  { hex: "#0f88f2", bg: "bg-[#0f88f2]" },
];

const Appearance = () => {
  const { draft, setField } = useSettingsForm("appearance");
  return (
    <SettingsLayout
      title={"المظهر"}
      subTitle={"تعديل الثيم والالوان"}
      section={"appearance"}
      draft={draft}
    >
      <div>
        <label className="mb-2 block font-medium">الثيم</label>
        <div className="flex w-full gap-2">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => setField("theme", theme.id)}
              className={`flex h-25 w-full flex-col items-center justify-center gap-2 rounded-lg bg-cyan-200 ${draft.theme === theme.id ? "border-accent border" : ""} p-4 transition-colors hover:bg-cyan-300`}
            >
              <h3 className="text-accent font-bold">{theme.title}</h3>
              {theme.subtitle && (
                <small className="text-accent">{theme.subtitle}</small>
              )}
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
                onClick={() => setField("accentColor", c.hex)}
                className={`aspect-square w-7 rounded-full ${c.bg} ${draft.accentColor === c.hex ? "scale-110 border-2 border-cyan-50 " : ""} duration-75 hover:scale-110`}
              ></button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>حجم الخط</label>
        <select
          className="h-10 rounded-lg bg-gray-200"
          value={draft.fontSize}
          onChange={(e) => setField("fontSize", e.target.value)}
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
