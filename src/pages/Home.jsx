import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import useCourseActions from "../hooks/useCourseActions";
import CourseCard from "../components/CourseCard";
import Countdown from "../components/Countdown";
import { CardSkeleton, ErrorState } from "../components/States";
import { formatDate } from "../utils/format";

function Home() {
  const { courses, events, loading, error, reload } = useData();
  const { handleAddToCart, handleToggleFavorite } = useCourseActions();

  const popular = useMemo(
    () => [...courses].sort((a, b) => b.students - a.students).slice(0, 3),
    [courses],
  );
  const nextEvent = useMemo(
    () =>
      [...events]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .find((e) => new Date(e.date) > new Date()),
    [events],
  );

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>
            ისწავლე IT თბილისში და შეხვდი იმ ადამიანებს, ვინც ტექნოლოგიებს ქმნის
          </h1>
          <p className="lead">
            პრაქტიკული კურსები და ტექ-ივენთები ერთ პლატფორმაზე.
          </p>
          <Link to="/courses" className="btn">
            კურსების ნახვა
          </Link>
        </div>

        {nextEvent && (
          <aside className="ticket" aria-label="უახლოესი ივენთი">
            <p className="small muted">უახლოესი ივენთი</p>
            <h2>{nextEvent.title}</h2>
            <p className="muted small">
              {formatDate(nextEvent.date)} · {nextEvent.location}
            </p>
            <Countdown target={nextEvent.date} />
            <Link to="/events" className="btn btn-block">
              რეგისტრაცია
            </Link>
          </aside>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>პოპულარული კურსები</h2>
          <Link to="/courses" className="text-link">
            ყველა კურსი
          </Link>
        </div>
        {loading && <CardSkeleton count={3} />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && (
          <div className="grid">
            {popular.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>მოახლოებული ივენთები</h2>
          <Link to="/events" className="text-link">
            ყველა ივენთი
          </Link>
        </div>
        <ul className="event-list">
          {events.slice(0, 3).map((e) => (
            <li key={e.id}>
              <Link to="/events">
                <strong>{e.title}</strong>
                <span className="muted small">
                  {formatDate(e.date)} · {e.type}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
