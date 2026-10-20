import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useData } from "../context/DataContext";
import useCourseActions from "../hooks/useCourseActions";
import CourseCard from "../components/CourseCard";
import { CardSkeleton, EmptyState } from "../components/States";

function Favorites() {
  const ids = useSelector((s) => s.favorites.ids);
  const { courses, loading } = useData();
  const { handleAddToCart, handleToggleFavorite } = useCourseActions();
  const favorites = courses.filter((c) => ids.includes(c.id));

  if (loading) return <CardSkeleton count={3} />;

  return (
    <>
      <div className="page-head">
        <h1>ფავორიტები</h1>
      </div>
      {favorites.length === 0 ? (
        <EmptyState
          title="ფავორიტები ცარიელია"
          text="დააჭირეთ ♡ ღილაკს კურსზე, რომ აქ შეინახოთ."
          action={
            <Link to="/courses" className="btn">
              კურსების ნახვა
            </Link>
          }
        />
      ) : (
        <div className="grid">
          {favorites.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Favorites;
