import { useAuth } from "../../store/useAuth";
import { useStore } from "../../store/useStore";
import Input from "../../components/ui/Input";
import { resizeImage } from "../../utils/resizeImages";
import SettingsLayout from "../../components/layout/SettingsLayout";
import { useSaveSettings } from "../../hooks/useSaveSettings";
import { useState } from "react";
import Button from "../../components/ui/Button";
import { Loader2, Camera } from "lucide-react";
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
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6">
        <label className="group relative size-28 cursor-pointer">
          <img
            src={userImage}
            alt="your image"
            className="border-line aspect-square size-full rounded-full border-4 object-cover"
          />
          <span className="bg-action ring-card absolute -inset-e-1 -bottom-1 grid size-9 place-items-center rounded-full text-on-solid ring-4 transition-transform group-hover:scale-110">
            <Camera size={16} />
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <div className="flex w-full flex-col gap-4">
          <Input
            label="الاسم"
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
          />
          <Button
            className="w-full text-center"
            onClick={() => handleChangeName()}
            disabled={userName === draftName || loading}
          >
            {loading ? (
              <Loader2 size={18} className="mx-auto animate-spin" />
            ) : (
              "تغيير الاسم"
            )}
          </Button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Profile;
