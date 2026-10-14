import BackStep from "../../components/ui/BackStep";
import SaveBtn from "../../components/ui/SaveBtn";
import { useSettingsForm } from "../../hooks/useSettingsForm";

const LangCurrency = () => {
  const { draft, setField } = useSettingsForm("languageAndCurrency");

  return (
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">اللغة والعملة</h2>
            <span>تعديل اللغة والعملة</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4">
            <div className="flex gap-5">
              <div className="flex w-full flex-col">
                <label>العملة</label>
                <input
                  value={draft.currency}
                  type="text"
                  onChange={(e) => setField("currency", e.target.value)}
                  className="border-accent rounded-lg border bg-cyan-50 p-2"
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
              <input
                value={draft.startFiscalMonth}
                type="number"
                max="31"
                onChange={(e) => {
                  setField("startFiscalMonth", e.target.value);
                }}
                placeholder="اكتب يوم بداية الشهر المالي مثل:1"
                className="border-accent rounded-lg border bg-cyan-50 p-2"
              />
            </div>
            <SaveBtn section={"languageAndCurrency"} changes={draft} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default LangCurrency;
