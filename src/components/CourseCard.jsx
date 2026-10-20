import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CATEGORY_META, formatPrice } from "../utils/format";

// memo: ბარათი თავიდან არ დარენდერდება, თუ მისი Prop-ები არ შეცვლილა
function CourseCard({
  course,
  onAddToCart,
  onToggleFavorite,
  preview = false,
}) {
  const inCart = useSelector((s) =>
    s.cart.items.some((i) => i.id === course.id),
  );
  const isFavorite = useSelector((s) => s.favorites.ids.includes(course.id));
  const meta = CATEGORY_META[course.category] ?? { glyph: "•", hue: 200 };

  const cover = (
    <div className="card-cover" style={{ "--hue": meta.hue }}>
      <span className="card-glyph" aria-hidden="true">
        {meta.glyph}
      </span>
      <span className="badge">{course.category || "კატეგორია"}</span>
    </div>
  );

  return (
    <article className="card course-card">
      {preview ? (
        cover
      ) : (
        <Link to={`/courses/${course.id}`} aria-label={course.title}>
          {cover}
        </Link>
      )}
      <div className="card-body">
        <div className="card-meta">
          <span>{course.level || "დონე"}</span>
          <span className="rating">
            {course.rating
              ? `★ ${course.rating}`
              : course.isNew
                ? "ახალი"
                : "—"}
          </span>
        </div>
        <h3 className="card-title">
          {preview ? (
            course.title || "კურსის სახელწოდება"
          ) : (
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          )}
        </h3>
        <p className="muted small">
          {course.instructor || "ლექტორი"} · {course.duration || 0} საათი
        </p>
        <div className="card-footer">
          <strong className="price">
            {formatPrice(Number(course.price) || 0)}
          </strong>
          {!preview && (
            <div className="card-actions">
              <button
                className={`icon-btn ${isFavorite ? "is-active" : ""}`}
                onClick={() => onToggleFavorite(course)}
                aria-pressed={isFavorite}
                aria-label={
                  isFavorite ? "ფავორიტებიდან წაშლა" : "ფავორიტებში დამატება"
                }
              >
                {isFavorite ? "♥" : "♡"}
              </button>
              <button
                className="btn btn-sm"
                onClick={() => onAddToCart(course)}
                disabled={inCart}
              >
                {inCart ? "კალათაშია" : "კალათაში"}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(CourseCard);
