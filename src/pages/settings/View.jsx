import BackStep from "../../components/ui/BackStep";
import SaveBtn from "../../components/ui/SaveBtn";

const themes = [
  {
    id: "light",
    title: "فاتح",
    subtitle: "الافتراضي",
  },
  {
    id: "dark",
    title: "داكن",
  },
  {
    id: "system",
    title: "تلقائي",
    subtitle: "حسب الجهاز",
  },
];
const colors = [
  { color: "bg-red-500" },
  { color: "bg-yellow-500" },
  { color: "bg-blue-500" },
  { color: "bg-orange-500" },
];
const View = () => {
  return (
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">المظهر</h2>
            <span>تعديل الألوان وحجم الخط</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-8">
            <div>
              <label className="mb-2 block font-medium">الثيم</label>
              <div className="flex w-full gap-2">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className="flex h-25 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-cyan-200 p-4 transition-colors hover:bg-cyan-300"
                  >
                    <h3 className="font-bold">{theme.title}</h3>
                    {theme.subtitle && <small>{theme.subtitle}</small>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>اللون الأساسي</label>
              <div className="flex gap-2">
                {colors.map((c) => {
                  return (
                    <button
                      className={`aspect-square w-7 rounded-full ${c.color} duration-75 hover:scale-110`}
                    ></button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>حجم الخط</label>
              <select className="h-10 rounded-lg bg-gray-200">
                <option value="">متوسط</option>
                <option value="">كبير</option>
                <option value="">صغير</option>
              </select>
            </div>
            <SaveBtn field="" value={""} fieldValue={""} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default View;
