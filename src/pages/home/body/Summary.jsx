import { CircleIcon } from "lucide-react";

const Summary = () => {
  return (
    <div className="flex w-[40%] flex-col gap-3 rounded-lg bg-cyan-100 p-3">
      <h3 className="font-bold">ملخص شهري</h3>

      <div className="flex gap-2">
        <small className="flex gap-1">
          <CircleIcon className="fill-amber-800" /> مصروفات
        </small>
        <small className="flex gap-1">
          <CircleIcon className="fill-amber-600" /> دخل
        </small>
      </div>

      <div className="flex h-full"></div>
    </div>
  );
};
export default Summary;
