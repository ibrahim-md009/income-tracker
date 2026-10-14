import SettingsLayout from "../../components/layout/SettingsLayout";
import Input from "../../components/ui/Input";
import { useSettingsForm } from "../../hooks/useSettingsForm";

const LangCurrency = () => {
  const { draft, setField } = useSettingsForm("languageAndCurrency");

  return (
    <SettingsLayout
      title={"اللغة والعملة"}
      subTitle={"تعديل اللغة والعملة"}
      section={"languageAndCurrency"}
      draft={draft}
    >
      <div className="flex gap-5">
        <div className="flex w-full flex-col">
          <label>العملة</label>
          <Input
            value={draft.currency}
            type="text"
            onChange={(e) => setField("currency", e.target.value)}
            placeholder="مثل:ج.م"
          />
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="">اللغة</label>
          <select
            value={draft.language}
            onChange={(e) => setField("language", e.target.value)}

            className="border-accent rounded-lg border bg-cyan-50 p-2"
          >
            <option value="ar">العربية</option>
            <option value="en">ُEnglish</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="">بداية الشهر المالي</label>
        <Input
          value={draft.startFiscalMonth}
          type="number"
          max="31"
          min={"1"}
          onChange={(e) => {
            setField("startFiscalMonth", e.target.value);
          }}
          placeholder="اكتب يوم بداية الشهر المالي مثل:1"
        />
      </div>
    </SettingsLayout>
  );
};
export default LangCurrency;
