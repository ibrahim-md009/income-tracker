import SettingsLayout from "../../components/layout/SettingsLayout";
import Input from "../../components/ui/Input";
import { useSaveSettings } from "../../hooks/useSaveSettings";
import { useStore } from "../../store/useStore";

const LangCurrency = () => {
  const languageAndCurrency = useStore((s) => s.settings.languageAndCurrency);

  const section = "languageAndCurrency";
  const save = useSaveSettings(section);
  return (
    <SettingsLayout title={"اللغة والعملة"} subTitle={"تعديل اللغة والعملة"}>
      <div className="flex gap-5">
        <div className="flex w-full flex-col">
          <label>العملة</label>
          <Input
            value={languageAndCurrency.currency}
            type="text"
            onChange={(e) => save({ currency: e.target.value })}
            placeholder="مثل:ج.م"
          />
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="">اللغة</label>
          <select
            value={languageAndCurrency.language}
            onChange={(e) => save({ language: e.target.value })}
            className="border-accent rounded-lg border bg-cyan-50 p-2 dark:bg-page"
          >
            <option value="ar">العربية</option>
            <option value="en">ُEnglish</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="">بداية الشهر المالي</label>
        <Input
          value={languageAndCurrency.startFiscalMonth}
          type="number"
          max="31"
          min={"1"}
          onChange={(e) => save({ startFiscalMonth: e.target.value })}
          placeholder="اكتب يوم بداية الشهر المالي مثل:1"
        />
      </div>
    </SettingsLayout>
  );
};

export default LangCurrency;
