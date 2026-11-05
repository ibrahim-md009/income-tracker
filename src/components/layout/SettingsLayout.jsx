import SaveBtn from "../ui/SaveBtn";

const SettingsLayout = ({ title, subTitle, children, section, draft }) => {
  return (
    <div className="flex h-screen flex-1 flex-col gap-10">
      <div className="header flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-h2 text-fg">{title}</h2>
          <span>{subTitle}</span>
        </div>
      </div>

      <div className="bg-card border-line rounded-card flex w-full flex-col gap-4 border p-3">
        {children}
        {draft && <SaveBtn section={section} draft={draft} />}
      </div>
    </div>
  );
};
export default SettingsLayout;
