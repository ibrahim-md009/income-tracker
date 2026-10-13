import BackStep from "../../components/ui/BackStep";
import SaveBtn from "../../components/ui/SaveBtn";

const LangCurrency = () => {
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
                  type="text"
                  className="rounded-lg border border-amber-800 bg-cyan-50 p-2"
                  placeholder="مثل:ج.م"
                />
              </div>

              <div className="flex w-full flex-col">
                <label htmlFor="">اللغة</label>
                <select
                  name=""
                  id=""
                  className="rounded-lg border border-amber-800 bg-cyan-50 p-2"
                >
                  <option value="Ar">العربية</option>
                  <option value="En">ُEnglish</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="">بداية الشهر المالي</label>
              <input
                type="number"
                max="31"
                placeholder="اكتب يوم بداية الشهر المالي مثل:1"
                className="rounded-lg border border-amber-800 bg-cyan-50 p-2"
              />
            </div>
            <SaveBtn field="" value={""} state={""} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default LangCurrency;
