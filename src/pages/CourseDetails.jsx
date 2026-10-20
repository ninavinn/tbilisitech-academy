import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useData } from "../context/DataContext";
import useCourseActions from "../hooks/useCourseActions";
import CourseCard from "../components/CourseCard";
import { CardSkeleton, EmptyState, ErrorState } from "../components/States";
import { CATEGORY_META, formatPrice } from "../utils/format";

function CourseDetails() {
  const { id } = useParams(); // დინამიური ID მისამართიდან: /courses/:id
  const { courses, loading, error, reload } = useData();
  const { handleAddToCart, handleToggleFavorite } = useCourseActions();

  const course = useMemo(() => courses.find((c) => c.id === id), [courses, id]);
  const related = useMemo(
    () =>
      courses
        .filter(
          (c) => course && c.category === course.category && c.id !== course.id,
        )
        .slice(0, 3),
    [courses, course],
  );
  const inCart = useSelector((s) => s.cart.items.some((i) => i.id === id));
  const isFavorite = useSelector((s) => s.favorites.ids.includes(id));

  if (loading) return <CardSkeleton count={1} />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!course) {
    return (
      <EmptyState
        title="კურსი ვერ მოიძებნა"
        text="შესაძლოა, მისამართი არასწორია."
        action={
          <Link className="btn" to="/courses">
            ყველა კურსი
          </Link>
        }
      />
    );
  }

  const meta = CATEGORY_META[course.category];

  return (
    <>
      <nav className="breadcrumbs small" aria-label="breadcrumb">
        <Link to="/courses">კურსები</Link> / <span>{course.title}</span>
      </nav>

      <div className="details">
        <div>
          <div
            className="details-cover card-cover"
            style={{ "--hue": meta?.hue ?? 200 }}
          >
            <span className="card-glyph" aria-hidden="true">
              {meta?.glyph}
            </span>
            <span className="badge">{course.category}</span>
          </div>
          <h1>{course.title}</h1>
          <p className="lead">{course.description}</p>

          <h2>კურსის პროგრამა</h2>
          <ol className="lessons">
            {course.lessons.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ol>
        </div>

        <aside className="card details-side">
          <strong className="price big">{formatPrice(course.price)}</strong>
          <dl className="facts">
            <div>
              <dt>ლექტორი</dt>
              <dd>{course.instructor}</dd>
            </div>
            <div>
              <dt>დონე</dt>
              <dd>{course.level}</dd>
            </div>
            <div>
              <dt>ხანგრძლივობა</dt>
              <dd>{course.duration} საათი</dd>
            </div>
            <div>
              <dt>რეიტინგი</dt>
              <dd>{course.rating ? `★ ${course.rating}` : "ახალი"}</dd>
            </div>
            <div>
              <dt>სტუდენტები</dt>
              <dd>{course.students}</dd>
            </div>
          </dl>
          <button
            className="btn btn-block"
            disabled={inCart}
            onClick={() => handleAddToCart(course)}
          >
            {inCart ? "უკვე კალათაშია" : "კალათაში დამატება"}
          </button>
          <button
            className="btn btn-ghost btn-block"
            onClick={() => handleToggleFavorite(course)}
          >
            {isFavorite ? "♥ ფავორიტებშია" : "♡ ფავორიტებში დამატება"}
          </button>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>მსგავსი კურსები</h2>
          </div>
          <div className="grid">
            {related.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default CourseDetails;
