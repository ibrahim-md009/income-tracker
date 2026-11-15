import { Link } from "react-router-dom";

const EmptyCompact = ({ icon: Icon, title, text, actionLabel, to }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center">
    <span className="bg-action-soft text-action rounded-card grid h-12 w-12 place-items-center">
      <Icon size={22} />
    </span>
    <h4 className="text-fg text-h3">{title}</h4>
    {text && <p className="text-fg-muted text-body-s max-w-xs">{text}</p>}
    {actionLabel && to && (
      <Link
        to={to}
        className="bg-action hover:bg-action-hover rounded-control text-body-s inline-flex h-9 items-center px-4 font-semibold text-on-solid transition-colors"
      >
        {actionLabel}
      </Link>
    )}
  </div>
);

export default EmptyCompact;
