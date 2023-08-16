import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [getParams] = useSearchParams();

  const getParamsData = getParams.get("todos");

  return (
    <nav>
      <Link to={"/"} className={getParamsData === null ? "activeclass" : ""}>
        All
      </Link>
      <Link
        to={"/?todos=active"}
        className={getParamsData === "active" ? "activeclass" : ""}
      >
        Active
      </Link>
      <Link to={"/?todos=completed"} className={getParamsData === "completed" ? "activeclass" : ""}>Completed</Link>
    </nav>
  );
};

export default Navbar;
