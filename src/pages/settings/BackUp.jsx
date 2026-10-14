import BackStep from "../../components/ui/BackStep";
import Button from "../../components/ui/Button";

const BackUp = () => {
  const backupOptions = [
    {
      id: 1,
      title: "نسخة احتياطية",
      subtitle: "آخر نسخة: [التاريخ]",
      buttonText: "إنشاء نسخة الآن",
    },
    {
      id: 2,
      title: "تصدير البيانات",
      subtitle: "ملف CSV أو JSON",
      buttonText: "تصدير",
      btnVariant: "outlined",
    },
    {
      id: 3,
      title: "استيراد نسخة",
      subtitle: "استعادة بيانات من ملف",
      buttonText: "استيراد",
      btnVariant: "outlined",
    },
  ];

  return (
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">البيانات والنسخ الاحتياطي</h2>
            <span>تصدير بياناتك وإنشاء نسخة احتياطية</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-lg bg-cyan-50 p-5">
              {backupOptions.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-bold">{item.title}</h3>
                      <small>آخر نسخة {item.lastBackup}</small>
                    </div>
                    <Button text={item.buttonText} variant={item.btnVariant} />
                  </div>
                  <hr className="text-amber-800" />
                </div>
              ))}
            </div>
            <div className="flex justify-between rounded-lg border border-amber-800 p-2">
              <div className="flex flex-col items-center text-amber-800">
                <h3 className="text-xl font-semibold">منطقة الخطر</h3>
                <small>حذف كل البيانات</small>
              </div>
              <Button text={"حذف كل البيانات"} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BackUp;
