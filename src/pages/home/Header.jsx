import { Calendar } from "lucide-react";
import { useStore } from "../../store/useStore";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
const days = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const date = new Date();
const month = months[date.getMonth()];
const day = days[date.getDay()];

const todayDate = `${day} ${date.getDate()} ${month} ${date.getFullYear()}`;

const Header = () => {
  const name = useStore((s) => s.settings.profile.name);
  const startFiscalMonth = useStore(
    (s) => s.settings.languageAndCurrency.startFiscalMonth,
  );

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p>بداية الشهر المالي يوم {startFiscalMonth}</p>
          <p className="flex items-center gap-0.5 text-[12px]">
            <Calendar className="w-4" />
            {todayDate}
          </p>
        </div>

        <Input type="search" placeholder="ابحث عن معاملة أو تصنيف" />
      </div>

      <div className="flex items-center justify-between px-8 pt-3">
        <Button
          className="flex items-center justify-center rounded-lg bg-amber-950 p-2 text-xs text-white duration-103 hover:scale-103"
          text={"إضافة عملية+"}
        />

        <div className="text-center">
          <h2 className="font-bold">{`مرحبا ${name}`}</h2>
          <p className="text-sm">إليك نظرة سريعة على وضعك المالي هذا الشهر </p>
        </div>
      </div>
    </header>
  );
};
export default Header;
