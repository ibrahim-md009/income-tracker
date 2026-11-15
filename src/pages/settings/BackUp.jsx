import { useRef } from "react";
import { Download, Upload } from "lucide-react";
import { useStore } from "../../store/useStore";
import { exportData, importData } from "../../utils/backup";

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

  const btn =
    "border-line-strong text-fg-body hover:bg-page rounded-control h-10 flex-none border px-5 font-semibold transition-colors";

  const lastBackupText = lastBackup
    ? `آخر نسخة: ${new Date(lastBackup).toISOString().slice(0, 10)}`
    : "احفظ نسخة من كل معاملاتك وتصنيفاتك.";

  return (
    <main className="mr-[20%] min-h-screen w-[80%] p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-h1 text-fg">البيانات والنسخ الاحتياطي</h2>
          <span className="text-fg-muted text-body-s">
            تصدير بياناتك وإنشاء نسخة احتياطية
          </span>
        </div>

        <div className="bg-card border-line rounded-card flex flex-col border">
          {/* تصدير */}
          <div className="border-line flex items-center justify-between gap-4 border-b p-5">
            <div className="flex items-center gap-4">
              <span className="bg-action-soft text-action rounded-control grid size-11 flex-none place-items-center">
                <Download size={20} />
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-fg text-h3">تصدير البيانات</h3>
                <small className="text-fg-muted text-body-s">
                  {lastBackupText}
                </small>
              </div>
            </div>
            <button type="button" onClick={() => exportData()} className={btn}>
              تصدير
            </button>
          </div>

          {/* استيراد */}
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <span className="bg-action-soft text-action rounded-control grid size-11 flex-none place-items-center">
                <Upload size={20} />
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-fg text-h3">استيراد نسخة</h3>
                <small className="text-fg-muted text-body-s">
                  استرجع بياناتك من ملف نسخة احتياطية (JSON).
                </small>
              </div>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={btn}
            >
              استيراد
            </button>
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
