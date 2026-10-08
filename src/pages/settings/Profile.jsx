import { useState } from "react";
import BackStep from "../../components/ui/BackStep";
import { useStore } from "../../store/useStore";
import SaveBtn from "../../components/ui/SaveBtn";
const Profile = () => {
  const { userName, userImage, setUserImage } = useStore();

  const [name, setName] = useState(userName);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUserImage(URL.createObjectURL(file));
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
                  src={userImage}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-300"
                />
              </div>

              <div className="flex flex-col">
                <label>الحساب الالكتروني</label>
                <input type="text" className="bg-gray-300" />
              </div>
            </div>

            <SaveBtn field="userName" value={name} state={userName} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Profile;
