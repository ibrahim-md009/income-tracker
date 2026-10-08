import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BackStep = ({ route }) => {
  return (
    <Link to={route} className="rounded-lg border border-amber-800 p-2">
      <ArrowRight />
    </Link>
  );
};
export default BackStep;
