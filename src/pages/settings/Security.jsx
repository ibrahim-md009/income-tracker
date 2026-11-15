import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { changePassword } from "../../services/securityService";
import { getErrorMsg } from "../../utils/errors";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const validate = (current, newPw, confirm) => {
  const errs = {};
  if (!current) errs.currentPassword = "اكتب كلمة المرور الحالية";
  if (newPw.length < 6) errs.newPassword = "6 أحرف على الأقل";
  if (confirm !== newPw) errs.confirmPassword = "مش زي كلمة المرور الجديدة";
  return errs;
};

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const passwordFields = [
    {
      name: "currentPassword",
      label: "كلمة المرور الحالية",
      type: "password",
      placeholder: "ادخل كلمة المرور الحالية",
      value: currentPassword,
      onChange: (e) => setCurrentPassword(e.target.value),
    },
    {
      name: "newPassword",
      label: "كلمة المرور الجديدة",
      type: "password",
      placeholder: "ادخل كلمة المرور الجديدة",
      value: newPassword,
      onChange: (e) => setNewPassword(e.target.value),
    },
    {
      name: "confirmPassword",
      label: "تأكيد كلمة المرور",
      type: "password",
      placeholder: "أعد إدخال كلمة المرور الجديدة",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const errs = validate(currentPassword, newPassword, confirmPassword);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success("تم تغيير كلمة المرور");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full p-3 lg:mr-[15%] lg:min-h-screen lg:w-[85%]">
      <div className="flex flex-col gap-10 lg:h-screen">
        <div className="header flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">الأمان</h2>
            <span>تغيير كلمة المرور وتفعيل الحماية</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4">
            <form
              onSubmit={handleChangePassword}
              className="flex flex-col gap-5"
              noValidate
            >
              {passwordFields.map((pf) => (
                <div key={pf.name} className="flex flex-col gap-1">
                  <Input
                    value={pf.value}
                    onChange={pf.onChange}
                    label={pf.label}
                    type={pf.type}
                    placeholder={pf.placeholder}
                  />
                  {errors[pf.name] && (
                    <p role="alert" className="text-money-out text-caption">
                      {errors[pf.name]}
                    </p>
                  )}
                </div>
              ))}
              <Button type="submit" disabled={loading} className="max-w-50">
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "تحديث كلمة المرور"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Security;
