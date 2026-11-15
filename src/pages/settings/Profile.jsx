import { useAuth } from "../../store/useAuth";
import { useStore } from "../../store/useStore";
import Input from "../../components/ui/Input";
import { resizeImage } from "../../utils/resizeImages";
import SettingsLayout from "../../components/layout/SettingsLayout";
import { useSaveSettings } from "../../hooks/useSaveSettings";
import { useState } from "react";
import Button from "../../components/ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const section = "profile";
const Profile = () => {
  const userName = useAuth((a) => a.user?.displayName);
  const changeName = useAuth((a) => a.changeName);
  const userImage = useStore((s) => s.settings.profile.image);

  const [draftName, setDraftName] = useState(userName);
  const [loading, setLoading] = useState(false);

  const save = useSaveSettings(section);
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
        save({ image: small });
      });
    };

    reader.readAsDataURL(file);
  };

  const handleChangeName = async () => {
    setLoading(true);
    try {
      await changeName(draftName);
      toast.success(`تم تغيير اسمك بنجاح إلى ${draftName}`);
    } catch (error) {
      console.log(error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsLayout
      title="الملف الشخصي"
      subTitle="تعديل بياناتك الشخصية وصورتك"
      section="profile"
    >
      <div className="flex flex-col gap-2">
        <label className="flex w-25 cursor-pointer gap-2">
          <img
            src={userImage}
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

      <div className="flex flex-col flex-wrap gap-5">
        <Input
          label="الاسم"
          type="text"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
        />
        <Button
          className="text-center"
          onClick={() => handleChangeName()}
          disabled={userName === draftName || loading}
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            "تغيير الاسم"
          )}
        </Button>
      </div>
    </SettingsLayout>
  );
};

export default Profile;
