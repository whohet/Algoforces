import Spinner from "../../assets/spinner.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={Spinner} className="loader-image" alt="loading" />
    </div>
  );
};

export default Loader;
