import { ToggleLeft } from "lucide-react";
import BackStep from "../../components/ui/BackStep";
import Button from "../../components/ui/Button";

const passwordFields = [
  {
    id: 1,
    label: "كلمة المرور الحالية",
    type: "password",
    placeholder: "ادخل كلمة المرور الحالية",
  },
  {
    id: 2,
    label: "كلمة المرور الجديدة",
    type: "password",
    placeholder: "ادخل كلمة المرور الجديدة",
  },
  {
    id: 3,
    label: "تأكيد كلمة المرور",
    type: "password",
    placeholder: "أعد إدخال كلمة المرور الجديدة",
  },
];

const Security = () => {
  return (
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">الأمان</h2>
            <span>تغيير كلمة المرور وتفعيل الحماية</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-5">
              {passwordFields.map((pf) => {
                return (
                  <div key={pf.id} className="flex w-full flex-col">
                    <label>{pf.label}</label>
                    <input
                      type="password"
                      className="rounded-lg border border-amber-800 bg-cyan-50 p-2 text-[12px]"
                      placeholder={pf.placeholder}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 rounded-lg bg-cyan-50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">قفل التطبيق برمز PIN</h3>
                  <small>اطلب الرمز عند فتح التطبيق</small>
                </div>
                <ToggleLeft />
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">التحقق بخطوتين</h3>
                  <small>طبقة حماية اضافية</small>
                </div>
                <ToggleLeft />
              </div>
            </div>
            <Button text={"تحديث كلمة المرور"} className="max-w-50" />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Security;
