import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="state">
      <h3>404 · გვერდი ვერ მოიძებნა</h3>
      <p className="muted">ეს მისამართი არ არსებობს.</p>
      <Link to="/" className="btn">
        მთავარი გვერდი
      </Link>
    </div>
  );
}

export default NotFound;
