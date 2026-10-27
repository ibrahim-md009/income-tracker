import { useRef } from "react";
import BackStep from "../../components/ui/BackStep";
import Button from "../../components/ui/Button";
import { useStore } from "../../store/useStore";
import { deleteData, exportData, importData } from "../../utils/backup";

const BackUp = () => {
  const lastBackup = useStore((s) => s.lastBackup);

  const inputRef = useRef(null);

  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importData(JSON.parse(reader.result));
      } catch {
        window.alert("الملف غير صالح");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
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
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-bold">تصدير البيانات</h3>
                    <small>
                      {lastBackup
                        ? `آخر نسخة: ${new Date(lastBackup).toISOString().slice(0, 10)}`
                        : null}
                    </small>
                  </div>
                  <Button
                    text="تصدير"
                    variant="outlined"
                    onClick={() => exportData()}
                  />
                </div>
                <hr className="text-accent" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="font-bold">استيراد نسخة</h3>
                    <small></small>
                  </div>
                  <Button
                    text="استيراد"
                    variant="outlined"
                    onClick={() => inputRef.current.click()}
                  />
                </div>
                <hr className="text-accent" />
              </div>
            </div>

            <div className="border-accent flex justify-between rounded-lg border p-2">
              <div className="text-accent flex flex-col items-center">
                <h3 className="text-xl font-semibold">منطقة الخطر</h3>
                <small>حذف كل البيانات</small>
              </div>
              <Button text={"حذف كل البيانات"} onClick={() => deleteData()} />
            </div>
          </div>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        onChange={(e) => handleImportBackup(e)}
        hidden
      />
    </main>
  );
};

export default BackUp;
