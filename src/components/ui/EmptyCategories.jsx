import { Tags } from "lucide-react";
import EmptyState from "./EmptyState";

const dots = [
  "bg-cat-clay",
  "bg-cat-ochre",
  "bg-cat-teal",
  "bg-cat-lilac",
  "bg-cat-rose",
];

const EmptyCategories = ({ to, onAction }) => (
  <EmptyState
    icon={Tags}
    title="مفيش تصنيفات"
    text="التصنيفات بتساعدك تعرف فلوسك رايحة فين. أضف تصنيف واختار له لون."
    actionLabel="إضافة تصنيف"
    to={to}
    onAction={onAction}
  >
    <div className="flex gap-1.5">
      {dots.map((c) => (
        <span key={c} className={`${c} h-2.5 w-2.5 rounded-full`} />
      ))}
    </div>
  </EmptyState>
);

export default EmptyCategories;
