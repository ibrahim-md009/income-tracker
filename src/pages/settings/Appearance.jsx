import BackStep from "../../components/ui/BackStep";
import SaveBtn from "../../components/ui/SaveBtn";
import { useSettingsForm } from "../../hooks/useSettingsForm";

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
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">المظهر</h2>
            <span>تعديل الألوان وحجم الخط</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-8">
            <div>
              <label className="mb-2 block font-medium">الثيم</label>
              <div className="flex w-full gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setField("theme", theme.id)}
                    className={`flex h-25 w-full flex-col items-center justify-center gap-2 rounded-lg bg-cyan-200 ${draft.theme === theme.id ? "border border-amber-800" : ""} p-4 transition-colors hover:bg-cyan-300`}
                  >
                    <h3 className="font-bold">{theme.title}</h3>
                    {theme.subtitle && <small>{theme.subtitle}</small>}
                  </button>
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

            <SaveBtn section={"appearance"} changes={draft} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Appearance;
