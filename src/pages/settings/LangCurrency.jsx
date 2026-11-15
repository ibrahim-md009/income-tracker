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
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="flex w-full min-w-0 flex-col gap-1">
          <label className="text-fg text-body-s">العملة</label>
          <Input
            value={languageAndCurrency.currency}
            type="text"
            onChange={(e) => save({ currency: e.target.value })}
            placeholder="مثل: ج.م أو $ أو SAR"
          />
        </div>

        <div className="flex w-full min-w-0 flex-col gap-1">
          <label className="text-fg text-body-s">اللغة</label>
          <select
            value={languageAndCurrency.language}
            onChange={(e) => save({ language: e.target.value })}
            className="border-line-strong bg-card text-fg rounded-control w-full min-w-0 border p-2"
          >
            <option value="ar">العربية</option>
            <option value="en">ُEnglish</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-fg text-body-s">بداية الشهر المالي</label>
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
