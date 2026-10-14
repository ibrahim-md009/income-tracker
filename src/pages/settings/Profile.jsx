import Input from "../../components/ui/Input";
import { resizeImage } from "../../utils/resizeImages";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import SettingsLayout from "../../components/layout/SettingsLayout";

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
    <SettingsLayout
      title="الملف الشخصي"
      subTitle="تعديل بياناتك الشخصية وصورتك"
      section="profile"
      draft={draft}
    >
      <div className="flex flex-col gap-2">
        <span className="font-bold">صورتك الشخصية </span>
        <label className="flex w-20 cursor-pointer gap-2">
          <img
            src={draft.image}
            alt="your image"
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
        <Input
          label="الاسم"
          type="text"
          value={draft.name}
          onChange={(e) => setField("name", e.target.value)}
        />

        <Input
          label="الحساب الالكتروني"
          type="text"
          value={draft.email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </div>
    </SettingsLayout>
  );
};

export default Profile;
