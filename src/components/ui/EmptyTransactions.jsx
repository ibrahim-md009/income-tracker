import { ReceiptText } from "lucide-react";
import EmptyState from "./EmptyState";

const EmptyTransactions = ({ to, onAction }) => (
  <EmptyState
    icon={ReceiptText}
    title="لسه مفيش معاملات"
    text="سجّل أول معاملة ليك (دخل أو مصروف) وهتبدأ تشوف رصيد شهرك."
    actionLabel="إضافة معاملة"
    to={to}
    onAction={onAction}
  />
);

export default EmptyTransactions;
