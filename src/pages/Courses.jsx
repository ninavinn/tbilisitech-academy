import { useCallback, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useData } from "../context/DataContext";
import useCourseActions from "../hooks/useCourseActions";
import CourseCard from "../components/CourseCard";
import { CardSkeleton, EmptyState, ErrorState } from "../components/States";
import { CATEGORIES, LEVELS } from "../utils/format";

const ALL = "ყველა";

function Courses() {
  const { courses, loading, error, reload } = useData();
  const { handleAddToCart, handleToggleFavorite } = useCourseActions();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const [sort, setSort] = useState("popular");
  const debouncedQuery = useDebounce(query, 300);

  // ფილტრაცია გადათვლება მხოლოდ მაშინ, როცა ქვემოთ მითითებული დამოკიდებულებები იცვლება
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    const list = courses.filter((c) => {
      const matchesText =
        !q ||
        [c.title, c.instructor, c.category].some((v) =>
          v.toLowerCase().includes(q),
        );
      const matchesCategory = category === ALL || c.category === category;
      const matchesLevel = level === ALL || c.level === level;
      return matchesText && matchesCategory && matchesLevel;
    });

    const sorters = {
      popular: (a, b) => b.students - a.students,
      rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
    };
    return list.sort(sorters[sort]);
  }, [courses, debouncedQuery, category, level, sort]);

  const resetFilters = useCallback(() => {
    setQuery("");
    setCategory(ALL);
    setLevel(ALL);
    setSort("popular");
  }, []);

  return (
    <>
      <div className="page-head">
        <h1>კურსები</h1>
        <p className="muted">აირჩიეთ მიმართულება, დონე და დაიწყეთ სწავლა.</p>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="ძიება სახელით, ლექტორით ან მიმართულებით"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="ძიება"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          aria-label="დონე"
        >
          <option>{ALL}</option>
          {LEVELS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="დახარისხება"
        >
          <option value="popular">ყველაზე პოპულარული</option>
          <option value="rating">უმაღლესი რეიტინგი</option>
          <option value="priceAsc">ფასი: ზრდადი</option>
          <option value="priceDesc">ფასი: კლებადი</option>
        </select>
      </div>

      <div className="chips" role="group" aria-label="კატეგორიები">
        {[ALL, ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            className={`chip ${category === cat ? "is-active" : ""}`}
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <CardSkeleton />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && (
        <>
          <p className="muted small" aria-live="polite">
            ნაპოვნია {filtered.length} კურსი
          </p>
          {filtered.length === 0 ? (
            <EmptyState
              title="კურსი ვერ მოიძებნა"
              text="სცადეთ სხვა საძიებო სიტყვა ან მოხსენით ფილტრები."
              action={
                <button className="btn" onClick={resetFilters}>
                  ფილტრების გასუფთავება
                </button>
              }
            />
          ) : (
            <div className="grid">
              {filtered.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Courses;
