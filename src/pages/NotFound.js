import NotFoundImg from "../assets/undraw_personal_training_0dqn.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img src={NotFoundImg} alt="404" className="img-fluid" />
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-2xl mt-5">🚧 還在建置中 🚧</h1>
            <Link to={"/"} className="btn btn-primary mt-5">
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
