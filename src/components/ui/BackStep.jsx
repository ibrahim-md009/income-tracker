import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BackStep = ({ route }) => {
  return (
    <Link to={route} className="border-accent rounded-lg border p-2">
      <ArrowRight />
    </Link>
  );
};
export default BackStep;
