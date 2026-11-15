import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, KeyRound } from "lucide-react";
import { AuthLayout, AuthField, SubmitButton, ErrorBanner } from "./Shared";
import { registerUser } from "../../services/authService";
import { getErrorMsg } from "../../utils/errors";
import { useAuth } from "../../store/useAuth";
import { toast } from "sonner";

const panel = {
  title: "ابدأ دفترك بهدوء.",
  points: [
    "إعداد في أقل من دقيقة",
    "تصنيفات وألوان على ذوقك",
    "تصدير بياناتك في أي وقت",
  ],
};

const strengthOf = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 6) s++;
  if (/\d/.test(pw) && /\D/.test(pw)) s++;
  if (pw.length >= 12 || /[^\p{L}\d]/u.test(pw)) s++;
  return Math.max(s, 1);
};

const levels = [
  null,
  { label: "ضعيفة", bar: "bg-money-out", text: "text-money-out" },
  { label: "متوسطة", bar: "bg-warning", text: "text-warning" },
  { label: "قوية", bar: "bg-money-in", text: "text-money-in" },
];

const StrengthMeter = ({ score }) => (
  <div className="mt-2.5 flex items-center gap-3">
    <div className="flex flex-1 gap-1.5">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            score >= n ? levels[score].bar : "bg-line"
          }`}
        />
      ))}
    </div>
    <span
      className={`text-caption w-14 text-end font-medium ${score ? levels[score].text : ""}`}
    >
      {score ? levels[score].label : ""}
    </span>
  </div>
);

const validate = (name, email, password, confirmPw) => {
  const errs = {};
  if (!name) errs.name = "اكتب اسمك ";
  if (!email) errs.email = "اكتب الإيميل";
  if (password.length < 6) errs.password = "6 أحرف على الأقل";
  if (confirmPw !== password) errs.confirmPw = "مش زي الباسوورد";
  return errs;
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setUser = useAuth((a) => a.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(name, email, password, confirmPw);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setError("");
    setErrors({});
    setLoading(true);

    try {
      const user = await registerUser(name, email, password);
      setUser(user);
      toast.success("تم إنشاء الحساب");
    } catch (err) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="أنشئ حسابك"
      subtitle="دقيقة واحدة وتبدأ تسجيل معاملاتك."
      panel={panel}
      footer={
        <>
          لديك حساب بالفعل؟{" "}
          <Link
            to={"/login"}
            className="text-action font-semibold hover:underline"
          >
            سجّل دخولك
          </Link>
        </>
      }
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-5"
        noValidate
      >
        <ErrorBanner message={error} />

        <AuthField
          label="الاسم"
          name="name"
          icon={User}
          placeholder="اسمك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          error={errors.name}
        />

        <AuthField
          label="البريد الإلكتروني"
          name="email"
          type="email"
          icon={Mail}
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          error={errors.email}
        />

        <div>
          <AuthField
            label="كلمة المرور"
            name="password"
            type="password"
            icon={Lock}
            placeholder="6 أحرف على الأقل"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            error={errors.password}
          />
          <StrengthMeter score={strengthOf(password)} />
        </div>

        <AuthField
          label="تأكيد كلمة المرور"
          name="confirm"
          type="password"
          icon={KeyRound}
          placeholder="أعد كتابتها"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          error={errors.confirmPw}
        />

        <SubmitButton loading={loading}>إنشاء الحساب</SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Signup;
