import { Check } from "lucide-react";
import SettingsLayout from "../../components/layout/SettingsLayout";
import { useStore } from "../../store/useStore";
import { useSaveSettings } from "../../hooks/useSaveSettings";
import { accents, resolveAccentId } from "../../utils/theme";

const themes = [
  { id: "light", title: "فاتح", bg: "bg-[#f5f1e8]" },
  { id: "dark", title: "داكن", bg: "bg-[#101322]" },
  {
    id: "system",
    title: "تلقائي حسب جهازك",
    bg: "bg-[linear-gradient(to_right,#101322_50%,#f5f1e8_50%)]",
  },
];

const section = "appearance";
const Appearance = () => {
  const appearanceSettings = useStore((s) => s.settings.appearance);

  const save = useSaveSettings(section);
  return (
    <SettingsLayout title={"المظهر"} subTitle={"تعديل الثيم والالوان"}>
      <div>
        <span className="text-fg text-body-s mb-2 block font-medium">
          الثيم
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {themes.map((theme) => {
            const active = appearanceSettings.theme === theme.id;
            return (
              <button
                type="button"
                key={theme.id}
                onClick={() => save({ theme: theme.id })}
                className={`rounded-card bg-card flex flex-col gap-3 border-2 p-3 transition-colors ${
                  active
                    ? "border-action"
                    : "border-line hover:border-line-strong"
                }`}
              >
                <div
                  className={`border-line rounded-control h-20 w-full border ${theme.bg}`}
                />
                <div className="flex items-center justify-between">
                  <span className="text-fg text-body-s font-medium">
                    {theme.title}
                  </span>
                  {active && (
                    <span className="bg-action text-on-solid grid size-5 place-items-center rounded-full">
                      <Check size={12} />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="text-fg text-body-s mb-2 block font-medium">
          اللون الأساسي
        </span>
        <div className="flex flex-wrap gap-3">
          {accents.map((c) => {
            const active =
              resolveAccentId(appearanceSettings.accentColor) === c.id;
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => save({ accentColor: c.hex })}
                aria-label={c.label}
                title={c.label}
                style={{ backgroundColor: c.hex }}
                className={`size-8 rounded-full transition-transform hover:scale-110 ${
                  active
                    ? "ring-action ring-offset-card ring-2 ring-offset-2"
                    : ""
                }`}
              />
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="font-size"
          className="text-fg text-body-s mb-2 block font-medium"
        >
          حجم الخط
        </label>
        <select
          id="font-size"
          className="border-line-strong bg-card text-fg rounded-control focus:border-action focus:ring-action/20 h-11 w-full max-w-xs border px-3.5 transition outline-none focus:ring-4"
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
