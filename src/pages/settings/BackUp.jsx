import BackStep from "../../components/ui/BackStep";
import Button from "../../components/ui/Button";
import { deleteData, exportData, importData } from "../../utils/backup";

const BackUp = () => {
  const backupOptions = [
    {
      id: 2,
      title: "تصدير البيانات",
      subtitle: "ملف JSON",
      buttonText: "تصدير",
      btnVariant: "outlined",
      onclick: () => exportData(),
    },
    {
      id: 3,
      title: "استيراد نسخة",
      subtitle: "استعادة بيانات من ملف",
      buttonText: "استيراد",
      btnVariant: "outlined",
    },
  ];
  const handleBackUp = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      importData(JSON.parse(reader.result));
    };
    reader.readAsText(file);
  };

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
                    <Button
                      text={item.buttonText}
                      variant={item.btnVariant}
                      onClick={item?.onclick}
                    />
                  </div>
                  <hr className="text-accent" />
                </div>
              ))}
            </div>

            <div className="border-accent flex justify-between rounded-lg border p-2">
              <div className="text-accent flex flex-col items-center">
                <h3 className="text-xl font-semibold">منطقة الخطر</h3>
                <small>حذف كل البيانات</small>
              </div>
              <Button text={"حذف كل البيانات"} onClick={() => deleteData()} />
              <input type="file" onChange={(e) => handleBackUp(e)} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BackUp;
