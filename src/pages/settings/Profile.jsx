import BackStep from "../../components/ui/BackStep";
import SaveBtn from "../../components/ui/SaveBtn";
import { resizeImage } from "../../utils/resizeImages";
import { useSettingsForm } from "../../hooks/useSettingsForm";

const Profile = () => {
  const { draft, setField } = useSettingsForm("profile");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const MAX_SIZE = 5 * 1024 * 1024;

    if (!file.type.startsWith("image/")) {
      alert("الملف لازم يكون صورة");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("الصورة كبيرة قوي");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resizeImage(reader.result).then((small) => {
        setField("image", small);
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">الملف الشخصي</h2>
            <span>تعديل بياناتك الشخصية وصورتك</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-bold">صورتك الشخصية </span>
              <label className="flex w-20 cursor-pointer gap-2">
                <img
                  src={draft.image}
                  alt=""
                  className="aspect-square w-full rounded-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col">
                <label>الاسم</label>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="bg-gray-300"
                />
              </div>

              <div className="flex flex-col">
                <label>الحساب الالكتروني</label>
                <input
                  type="text"
                  value={draft.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="bg-gray-300"
                />
              </div>
            </div>

            <SaveBtn section={"profile"} changes={draft} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Profile;
