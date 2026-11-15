const SettingsLayout = ({ title, subTitle, children }) => {
  return (
    <main className="w-full min-w-0 lg:mr-[20%] lg:min-h-screen lg:w-[80%] lg:p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-h1 text-fg">{title}</h2>
          <span className="text-fg-muted text-body-s">{subTitle}</span>
        </div>

        <div className="bg-card border-line rounded-card flex w-full flex-col gap-6 border p-4 lg:p-6">
          {children}
        </div>
      </div>
    </main>
  );
};
export default SettingsLayout;
