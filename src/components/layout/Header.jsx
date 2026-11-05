import NotificationBell from "./NotificationBell";

const Header = ({ title, subTitle, children }) => {
  return (
    <div className="header flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-fg text-h1">{title}</h2>
        <p className="text-fg-muted text-body-s">{subTitle}</p>
      </div>
      <div className="flex gap-3">
        {children}
        <NotificationBell />
      </div>
    </div>
  );
};
export default Header;
