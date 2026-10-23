import BackStep from "../ui/BackStep";
import SaveBtn from "../ui/SaveBtn";

const SettingsLayout = ({ title, subTitle, children, section, draft }) => {
  return (
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{title}</h2>
            <span>{subTitle}</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4">
            {children}
            <SaveBtn section={section} draft={draft} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default SettingsLayout;
