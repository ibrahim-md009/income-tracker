import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Loader2, Check } from "lucide-react";
import Input from "../../components/ui/Input";

export const Brand = () => (
  <Link to="/" className="flex w-fit items-center gap-2.5">
    <span className="bg-action font-voice rounded-control grid h-9 w-9 place-items-center pb-0.5 text-2xl leading-none text-white">
      م
    </span>
    <span className="font-voice text-voice text-fg leading-none">
      مُتابعي<span className="text-saffron">.</span>
    </span>
  </Link>
);

export const AuthLayout = ({ title, subtitle, panel, footer, children }) => (
  <main className="bg-page text-fg-body grid min-h-screen font-sans lg:grid-cols-2">
    <div className="flex flex-col px-6 py-8 sm:px-12">
      <Brand />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
        <h1 className="font-voice text-fg text-[2.25rem] leading-snug">
          {title}
        </h1>
        <p className="text-fg-muted mt-2">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="text-fg-muted text-body-s mt-8 text-center">{footer}</p>
      </div>
    </div>

    <aside className="bg-inverse text-on-inverse relative hidden flex-col justify-between overflow-hidden p-14 lg:flex">
      <span className="bg-saffron/10 absolute -inset-e-24 -top-24 h-72 w-72 rounded-full" />
      <span className="bg-on-inverse/5 absolute -inset-s-20 -bottom-32 h-80 w-80 rounded-full" />

      <div className="relative">
        <h2 className="font-voice text-[2.5rem] leading-[1.4]">
          {panel.title}
        </h2>
        <ul className="mt-8 flex flex-col gap-4">
          {panel.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="bg-saffron text-inverse grid h-6 w-6 flex-none place-items-center rounded-full">
                <Check size={14} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-on-inverse/10 border-on-inverse/15 rounded-card relative border p-5">
        <span className="text-on-inverse/75 text-caption">
          المتبقي من دخل الشهر
        </span>
        <div className="mt-1 mb-4 flex items-baseline gap-2">
          <span
            dir="ltr"
            className="text-[2rem] leading-none font-semibold tabular-nums"
          >
            5,470
          </span>
          <span className="text-on-inverse/70 text-body-s">ج.م</span>
        </div>
        <div className="bg-on-inverse/15 relative h-3 rounded-full">
          <div className="bg-nila-300 h-full w-[62%] rounded-full" />
          <span className="bg-saffron absolute inset-s-[61%] -top-1 h-5 w-0.5" />
        </div>
      </div>
    </aside>
  </main>
);

export const AuthField = ({
  label,
  icon: Icon,
  value,
  type = "text",
  error,
  hint,
  className = "",
  ...props
}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const id = props.id ?? props.name;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-fg text-body-s mb-1.5 block font-medium"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="text-fg-muted pointer-events-none absolute inset-s-3.5 top-1/2 -translate-y-1/2"
          />
        )}

        <Input
          id={id}
          type={isPassword && show ? "text" : type}
          value={value}
          aria-invalid={!!error}
          className={`${
            Icon ? "ps-11" : "ps-3.5"
          } ${isPassword ? "pe-11" : "pe-3.5"} ${
            error
              ? "border-money-out focus:ring-money-out/20"
              : "border-line-strong focus:border-action focus:ring-action/20"
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            className="text-fg-muted hover:text-fg absolute inset-e-3 top-1/2 -translate-y-1/2 transition-colors"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error ? (
        <p role="alert" className="text-money-out text-caption mt-1.5">
          {error}
        </p>
      ) : hint ? (
        <p className="text-fg-muted text-caption mt-1.5">{hint}</p>
      ) : null}
    </div>
  );
};

export const ErrorBanner = ({ message }) =>
  message ? (
    <div
      role="alert"
      className="bg-money-out-soft text-money-out rounded-control text-body-s flex items-start gap-2 p-3"
    >
      <AlertCircle size={18} className="mt-0.5 flex-none" />
      <span>{message}</span>
    </div>
  ) : null;

export const SubmitButton = ({ loading = false, children }) => (
  <button
    type="submit"
    disabled={loading}
    className="bg-action hover:bg-action-hover rounded-control flex h-12 w-full items-center justify-center gap-2 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading && <Loader2 size={18} className="animate-spin" />}
    {children}
  </button>
);
