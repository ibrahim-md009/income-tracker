import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Tag,
  Zap,
  CalendarDays,
  ChartColumn,
  Download,
  Check,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

/* ============ إعدادات سهلة التعديل ============ */
const ROUTES = { login: "/login", signup: "/signup", app: "/" };

const links = [
  { href: "#features", label: "المميزات" },
  { href: "#how", label: "كيف يعمل" },
  { href: "#privacy", label: "الخصوصية" },
  { href: "#faq", label: "الأسئلة" },
];

/* ============ أزرار الروابط ============ */
const btn = {
  base: "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors",
  primary: "bg-action text-white hover:bg-action-hover",
  secondary: "border border-line-strong bg-card text-fg hover:bg-page",
  ghost: "text-action hover:bg-action-soft",
};

const LinkButton = ({
  to,
  variant = "primary",
  size = "md",
  className = "",
  children,
}) => (
  <Link
    to={to}
    className={`${btn.base} ${btn[variant]} ${size === "lg" ? "h-12 px-6" : "h-11 px-5"} ${className}`}
  >
    {children}
  </Link>
);

const Brand = () => (
  <Link to="/" className="flex items-center gap-2.5">
    <span className="bg-action font-voice rounded-control grid h-9 w-9 place-items-center pb-0.5 text-[1.5rem] leading-none text-white">
      م
    </span>
    <span className="font-voice text-voice text-fg leading-none">
      مُتابعي<span className="text-saffron">.</span>
    </span>
  </Link>
);

const Eyebrow = ({ children }) => (
  <span className="bg-action-soft text-action text-caption inline-block rounded-full px-3 py-1 font-medium">
    {children}
  </span>
);

const Section = ({ id, className = "", children }) => (
  <section
    id={id}
    className={`mx-auto max-w-6xl scroll-mt-20 px-5 py-20 ${className}`}
  >
    {children}
  </section>
);

/* ============ الشريط العلوي ============ */
const Navbar = ({ isAuthed }) => (
  <header className="bg-page/85 border-line sticky top-0 z-30 border-b backdrop-blur">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
      <Brand />
      <nav className="text-body-s text-fg-body hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hover:text-action transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {isAuthed ? (
          <LinkButton to={ROUTES.app}>الذهاب إلى التطبيق</LinkButton>
        ) : (
          <>
            <LinkButton
              to={ROUTES.login}
              variant="ghost"
              className="hidden sm:inline-flex"
            >
              تسجيل الدخول
            </LinkButton>
            <LinkButton to={ROUTES.signup}>إنشاء حساب</LinkButton>
          </>
        )}
      </div>
    </div>
  </header>
);

/* ============ البطل (Hero) + معاينة التطبيق ============ */
const demo = {
  out: [
    {
      name: "سوبرماركت",
      cat: "طعام",
      amount: "−620",
      dot: "bg-cat-clay",
      tint: "bg-cat-clay/14",
    },
    {
      name: "فاتورة الكهرباء",
      cat: "فواتير",
      amount: "−420",
      dot: "bg-cat-sky",
      tint: "bg-cat-sky/14",
    },
    {
      name: "مترو وأوبر",
      cat: "مواصلات",
      amount: "−85",
      dot: "bg-cat-olive",
      tint: "bg-cat-olive/14",
    },
  ],
  in: [
    {
      name: "راتب أكتوبر",
      cat: "راتب",
      amount: "+11,000",
      dot: "bg-cat-teal",
      tint: "bg-cat-teal/14",
    },
    {
      name: "مشروع تصميم",
      cat: "عمل حر",
      amount: "+3,500",
      dot: "bg-cat-amethyst",
      tint: "bg-cat-amethyst/14",
    },
  ],
};

const AppPreview = () => {
  const [kind, setKind] = useState("out");
  const [picked, setPicked] = useState(0);
  const rows = demo[kind];

  const switchKind = (k) => {
    setKind(k);
    setPicked(0);
  };

  return (
    <div className="relative">
      <div className="bg-card border-line rounded-sheet shadow-2 border p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-fg text-body-s font-semibold">أكتوبر 2026</span>
          <span className="bg-saffron h-1.5 w-1.5 rounded-full" />
        </div>

        {/* كارت الرصيد */}
        <div className="bg-inverse text-on-inverse rounded-card p-5">
          <span className="text-on-inverse/75 text-caption">
            المتبقي من دخل الشهر
          </span>
          <div className="mt-1 mb-4 flex items-baseline gap-2">
            <span
              dir="ltr"
              className="text-[2.5rem] leading-none font-semibold tabular-nums"
            >
              5,470
            </span>
            <span className="text-on-inverse/70 text-body-s">ج.م</span>
          </div>
          <div className="bg-on-inverse/15 relative h-3 rounded-full">
            <div className="bg-nila-300 h-full w-[62%] rounded-full" />
            <span className="bg-saffron absolute inset-s-61 -top-1 h-5 w-0.5" />
          </div>
          <p className="text-on-inverse/70 text-caption mt-2.5">
            صرفت <span dir="ltr">9,030</span> من <span dir="ltr">14,500</span>
          </p>
        </div>

        {/* بلاطتا الدخل والمصروف */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="border-line rounded-card border p-3.5">
            <span className="text-fg-muted text-caption">الدخل</span>
            <div
              dir="ltr"
              className="text-money-in text-start text-[1.25rem] font-bold tabular-nums"
            >
              14,500
            </div>
          </div>
          <div className="border-line rounded-card border p-3.5">
            <span className="text-fg-muted text-caption">المصروفات</span>
            <div
              dir="ltr"
              className="text-money-out text-start text-[1.25rem] font-bold tabular-nums"
            >
              9,030
            </div>
          </div>
        </div>

        {/* تبديل نوع المعاملات (منطق خفيف للعرض فقط) */}
        <div className="bg-page rounded-control mt-4 flex p-1">
          {[
            ["out", "مصروف"],
            ["in", "دخل"],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => switchKind(k)}
              className={`text-body-s flex-1 rounded-lg py-1.5 transition-colors ${
                kind === k
                  ? "bg-card text-fg shadow-1 font-semibold"
                  : "text-fg-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="mt-2 flex flex-col">
          {rows.map((r, i) => (
            <li key={r.name}>
              <button
                type="button"
                onClick={() => setPicked(i)}
                className={`rounded-control flex w-full items-center gap-3 px-3 py-2.5 text-start transition-colors ${
                  picked === i ? "bg-action-soft" : "hover:bg-page"
                }`}
              >
                <span
                  className={`rounded-control grid h-9 w-9 place-items-center ${r.tint}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${r.dot}`} />
                </span>
                <span className="flex-1">
                  <span className="text-fg text-body-s block font-medium">
                    {r.name}
                  </span>
                  <span className="text-fg-muted text-caption">{r.cat}</span>
                </span>
                <span
                  dir="ltr"
                  className={`text-body-s font-semibold tabular-nums ${
                    kind === "out" ? "text-money-out" : "text-money-in"
                  }`}
                >
                  {r.amount}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Toast عائم للزينة */}
      <div className="bg-inverse text-on-inverse rounded-control text-body-s shadow-2 absolute inset-s-8 -bottom-5 hidden items-center gap-2 px-4 py-3 sm:flex">
        <Check size={16} className="text-saffron" />
        تمت إضافة <span dir="ltr">620</span> ج.م — طعام
      </div>
    </div>
  );
};

const Hero = ({ isAuthed }) => (
  <section className="mx-auto grid max-w-6xl items-center gap-16 px-5 pt-14 pb-24 lg:grid-cols-2 lg:pt-24">
    <div>
      <Eyebrow>دفتر حساباتك الحديث</Eyebrow>
      <h1 className="font-voice text-fg mt-5 text-[2.5rem] leading-[1.35] lg:text-[3.5rem]">
        اعرف كم تبقّى لك،
        <br />
        وأين ذهب الباقي.
      </h1>
      <p className="text-fg-muted mt-5 max-w-lg text-[1.125rem] leading-8">
        مُتابعي دفتر هادئ لدخلك ومصروفاتك. سجّل معاملاتك في ثوانٍ، وشاهد شهرك
        المالي كله في نظرة واحدة.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {isAuthed ? (
          <LinkButton to={ROUTES.app} size="lg">
            الذهاب إلى التطبيق <ArrowLeft size={18} />
          </LinkButton>
        ) : (
          <>
            <LinkButton to={ROUTES.signup} size="lg">
              أنشئ حسابك <ArrowLeft size={18} />
            </LinkButton>
            <LinkButton to={ROUTES.login} variant="secondary" size="lg">
              لدي حساب
            </LinkButton>
          </>
        )}
      </div>

      <ul className="text-fg-muted text-body-s mt-7 flex flex-wrap gap-x-6 gap-y-2">
        {["بدون ربط بنكي", "تصدير بياناتك في أي وقت", "مصمم للعربية"].map(
          (t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check size={16} className="text-money-in" /> {t}
            </li>
          ),
        )}
      </ul>
    </div>

    <AppPreview />
  </section>
);

/* ============ المميزات ============ */
const features = [
  {
    icon: Wallet,
    title: "رصيد الشهر في نظرة",
    desc: "مؤشر واحد يوضح كم صرفت وكم تبقّى من دخل شهرك المالي.",
    tint: "bg-cat-sky/14 text-cat-sky",
  },
  {
    icon: Tag,
    title: "تصنيفات بألوانك",
    desc: "أنشئ تصنيفاتك واختر لكل منها لونًا وأيقونة، وشاهد أين يذهب مالك.",
    tint: "bg-cat-clay/14 text-cat-clay",
  },
  {
    icon: Zap,
    title: "إدخال سريع",
    desc: "نموذج يبدأ بالمبلغ وينتهي بنقرة، فلا يستغرق التسجيل أكثر من ثوانٍ.",
    tint: "bg-cat-ochre/14 text-cat-ochre",
  },
  {
    icon: CalendarDays,
    title: "شهر مالي يناسبك",
    desc: "ابدأ شهرك يوم وصول الراتب، لا أول الشهر الميلادي.",
    tint: "bg-cat-teal/14 text-cat-teal",
  },
  {
    icon: ChartColumn,
    title: "تقارير واضحة",
    desc: "قارن شهورك وراقب اتجاه دخلك ومصروفاتك بمخططات بسيطة.",
    tint: "bg-cat-amethyst/14 text-cat-amethyst",
  },
  {
    icon: Download,
    title: "نسخة احتياطية بيدك",
    desc: "صدّر بياناتك واستوردها وقتما تشاء.",
    tint: "bg-cat-rose/14 text-cat-rose",
  },
];

const Features = () => (
  <Section id="features">
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>المميزات</Eyebrow>
      <h2 className="font-voice text-fg mt-4 text-[2rem] leading-snug">
        كل ما تحتاجه، بلا ازدحام
      </h2>
      <p className="text-fg-muted mt-3">
        أدوات قليلة تؤدي المطلوب بوضوح، وتترك الأرقام هي البطل.
      </p>
    </div>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f) => (
        <article
          key={f.title}
          className="bg-card border-line rounded-card hover:border-line-strong hover:shadow-1 border p-6 transition-all"
        >
          <span
            className={`rounded-control grid h-11 w-11 place-items-center ${f.tint}`}
          >
            <f.icon size={22} strokeWidth={1.75} />
          </span>
          <h3 className="text-fg text-h3 mt-4">{f.title}</h3>
          <p className="text-fg-muted text-body-s mt-1.5 leading-7">{f.desc}</p>
        </article>
      ))}
    </div>
  </Section>
);

/* ============ كيف يعمل (خلفية داكنة) ============ */
const steps = [
  {
    title: "أنشئ حسابك",
    desc: "بريدك وكلمة مرور، وفي أقل من دقيقة تكون داخل التطبيق.",
  },
  {
    title: "اضبط شهرك",
    desc: "اختر عملتك واليوم الذي يبدأ فيه شهرك المالي، وأضف تصنيفاتك.",
  },
  {
    title: "سجّل أول معاملة",
    desc: "اضغط «معاملة جديدة»، اكتب المبلغ واختر التصنيف، وشاهد رصيدك يتحدث.",
  },
];

const HowItWorks = () => {
  const [step, setStep] = useState(0);
  return (
    <section id="how" className="bg-inverse text-on-inverse scroll-mt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-voice text-[2rem] leading-snug">
            ثلاث خطوات وتبدأ
          </h2>
          <p className="text-on-inverse/70 mt-3">
            اضغط على أي خطوة لتعرف ما الذي ينتظرك.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setStep(i)}
                className={`rounded-card flex items-center gap-4 border p-4 text-start transition-colors ${
                  step === i
                    ? "border-saffron bg-on-inverse/10"
                    : "border-on-inverse/15 hover:bg-on-inverse/5"
                }`}
              >
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-full font-semibold ${
                    step === i ? "bg-saffron text-inverse" : "bg-on-inverse/15"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="font-semibold">{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-on-inverse/5 border-on-inverse/15 rounded-sheet min-h-56 border p-8">
          <span
            dir="ltr"
            className="text-saffron text-[4rem] leading-none font-semibold"
          >
            0{step + 1}
          </span>
          <h3 className="mt-4 text-[1.5rem] font-semibold">
            {steps[step].title}
          </h3>
          <p className="text-on-inverse/75 mt-2 leading-8">
            {steps[step].desc}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============ الخصوصية ============ */
const privacy = [
  {
    title: "مساحة خاصة بك",
    desc: "لكل حساب بياناته الخاصة، ولا تُعرض على غير صاحبها.",
  },
  {
    title: "بدون ربط بنكي",
    desc: "أنت من يسجّل المعاملات، فلا نطلب أرقام حسابات أو بطاقات.",
  },
  {
    title: "نسخة احتياطية بيدك",
    desc: "صدّر بياناتك بصيغة JSON واستوردها وقتما تشاء.",
  },
];

const Privacy = () => (
  <Section id="privacy">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <Eyebrow>الخصوصية</Eyebrow>
        <h2 className="font-voice text-fg mt-4 text-[2rem] leading-snug">
          مالك شأنك، وبياناتك كذلك
        </h2>
        <p className="text-fg-muted mt-3 max-w-md leading-8">
          مُتابعي مبني على فكرة بسيطة: تسجّل أنت، وتبقى السيطرة لك.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {privacy.map((p) => (
          <li
            key={p.title}
            className="bg-card border-line rounded-card flex gap-4 border p-5"
          >
            <span className="bg-money-in-soft text-money-in rounded-control grid h-10 w-10 flex-none place-items-center">
              <Check size={20} />
            </span>
            <div>
              <h3 className="text-fg text-h3">{p.title}</h3>
              <p className="text-fg-muted text-body-s mt-1 leading-7">
                {p.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

/* ============ الأسئلة الشائعة ============ */
const faqs = [
  {
    q: "هل أحتاج إلى ربط حسابي البنكي؟",
    a: "لا. تُسجّل معاملاتك بنفسك، ولا يطلب مُتابعي أي بيانات بنكية.",
  },
  {
    q: "ما هو الشهر المالي؟",
    a: "هو الشهر الذي تحدد أنت يوم بدايته، مثل يوم وصول الراتب. تُحسب كل أرقام الصفحة الرئيسية على أساسه.",
  },
  {
    q: "هل يمكنني تصدير بياناتي؟",
    a: "نعم، من الإعدادات ← النسخ الاحتياطي يمكنك تصدير ملف JSON واستيراده لاحقًا.",
  },
  {
    q: "هل أستطيع تعديل التصنيفات؟",
    a: "بالطبع. أضف تصنيفاتك الخاصة، وغيّر ألوانها وأسماءها في أي وقت.",
  },
];

const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" className="max-w-3xl">
      <div className="text-center">
        <Eyebrow>الأسئلة</Eyebrow>
        <h2 className="font-voice text-fg mt-4 text-[2rem] leading-snug">
          أسئلة شائعة
        </h2>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="bg-card border-line rounded-card border">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-start"
              >
                <span className="text-fg font-semibold">{f.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-fg-muted flex-none transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <p className="text-fg-muted text-body-s overflow-hidden px-5 leading-7">
                  <span className="block pb-5">{f.a}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

/* ============ دعوة أخيرة + تذييل ============ */
const FinalCta = ({ isAuthed }) => (
  <section className="mx-auto max-w-6xl px-5 pb-20">
    <div className="bg-card border-line rounded-sheet border px-6 py-14 text-center">
      <h2 className="font-voice text-fg text-[2.25rem] leading-snug">
        ابدأ دفترك اليوم<span className="text-saffron">.</span>
      </h2>
      <p className="text-fg-muted mx-auto mt-3 max-w-md">
        دقيقة واحدة تكفي لتبدأ، وشهرك المالي أوضح من أي وقت مضى.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {isAuthed ? (
          <LinkButton to={ROUTES.app} size="lg">
            الذهاب إلى التطبيق
          </LinkButton>
        ) : (
          <>
            <LinkButton to={ROUTES.signup} size="lg">
              أنشئ حسابك
            </LinkButton>
            <LinkButton to={ROUTES.login} variant="secondary" size="lg">
              تسجيل الدخول
            </LinkButton>
          </>
        )}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-line border-t">
    <div className="text-fg-muted text-body-s mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
      <Brand />
      <nav className="flex gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hover:text-action transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <span>© {new Date().getFullYear()} مُتابعي</span>
    </div>
  </footer>
);

/* ============ الصفحة ============ */
const Landing = ({ isAuthed = false }) => (
  <div className="bg-page text-fg-body min-h-screen font-sans">
    <Navbar isAuthed={isAuthed} />
    <Hero isAuthed={isAuthed} />
    <Features />
    <HowItWorks />
    <Privacy />
    <Faq />
    <FinalCta isAuthed={isAuthed} />
    <Footer />
  </div>
);

export default Landing;
