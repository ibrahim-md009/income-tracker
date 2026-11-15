import { Link } from "react-router-dom";

const EmptyState = ({
  icon: Icon,
  title,
  text,
  actionLabel,
  to,
  onAction,
  children,
}) => {
  const btn =
    "bg-action hover:bg-action-hover rounded-control inline-flex h-11 items-center justify-center px-6 font-semibold text-on-solid transition-colors";

  return (
    <div className="bg-card border-line rounded-card flex flex-col items-center border border-dashed px-6 py-14 text-center">
      <span className="bg-action-soft text-action rounded-card grid h-16 w-16 place-items-center">
        <Icon size={28} />
      </span>

      {children && <div className="mt-5">{children}</div>}

      <h3 className="font-voice text-voice text-fg mt-5">{title}</h3>
      <p className="text-fg-muted text-body-s mt-2 max-w-sm">{text}</p>

      {actionLabel &&
        (to ? (
          <Link to={to} className={`${btn} mt-6`}>
            {actionLabel}
          </Link>
        ) : (
          <button type="button" onClick={onAction} className={`${btn} mt-6`}>
            {actionLabel}
          </button>
        ))}
    </div>
  );
};

export default EmptyState;
