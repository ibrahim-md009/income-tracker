import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { AuthLayout, AuthField, SubmitButton, ErrorBanner } from "./Shared";
import { logIn } from "../../services/authService";
import { getErrorMsg } from "../../utils/errors";
import { toast } from "sonner";

const panel = {
  title: "شهرك المالي، كما تركته.",
  points: [
    "رصيد الشهر في نظرة",
    "معاملاتك وتصنيفاتك كما هي",
    "إدخال سريع بنقرة",
  ],
};

const validate = (email, password) => {
  const errs = {};
  if (!email) errs.email = "اكتب الإيميل";
  if (password.length < 6) errs.password = "6 أحرف على الأقل";
  return errs;
};

const Login = ({ onForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(email, password);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setError("");
    setErrors({});
    setLoading(true);

    try {
      await logIn(email, password);
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (err) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="أهلاً بعودتك"
      subtitle="سجّل دخولك لتكمل متابعة شهرك المالي."
      panel={panel}
      footer={
        <>
          ليس لديك حساب؟{" "}
          <Link
            to={"/signup"}
            className="text-action font-semibold hover:underline"
          >
            أنشئ حسابًا
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
          label="البريد الإلكتروني"
          name="email"
          type="email"
          icon={Mail}
          value={email}
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          error={errors.email}
        />

        <AuthField
          label="كلمة المرور"
          name="password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password}
        />

        <div className="flex">
          <button
            type="button"
            onClick={onForgot}
            className="text-action text-body-s font-medium hover:underline"
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        <SubmitButton loading={loading}>تسجيل الدخول</SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
