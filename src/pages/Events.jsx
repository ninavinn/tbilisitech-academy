import { useCallback, useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import useLocalStorage from "../hooks/useLocalStorage";
import EventCard from "../components/EventCard";
import { CardSkeleton, EmptyState, ErrorState } from "../components/States";

const TYPES = ["ყველა", "მიტაპი", "ვორკშოფი", "ჰაკათონი"];

function Events() {
  const { events, loading, error, reload } = useData();
  const { showToast } = useToast();
  const [registered, setRegistered] = useLocalStorage("tta-registered", []);
  const [type, setType] = useState("ყველა");

  const visible = useMemo(
    () =>
      events
        .filter((e) => type === "ყველა" || e.type === type)
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
    [events, type],
  );

  const handleToggleRegister = useCallback(
    (event) => {
      const was = registered.includes(event.id);
      setRegistered(
        was
          ? registered.filter((x) => x !== event.id)
          : [...registered, event.id],
      );
      showToast(
        was ? "რეგისტრაცია გაუქმდა" : `თქვენ დარეგისტრირდით: ${event.title}`,
        was ? "info" : "success",
      );
    },
    [registered, setRegistered, showToast],
  );

  return (
    <>
      <div className="page-head">
        <h1>ივენთები</h1>
        <p className="muted">
          მიტაპები, ვორკშოფები და ჰაკათონები ტექ-კომუნიტისთვის.
        </p>
      </div>

      <div className="chips" role="group" aria-label="ივენთის ტიპი">
        {TYPES.map((t) => (
          <button
            key={t}
            className={`chip ${type === t ? "is-active" : ""}`}
            aria-pressed={type === t}
            onClick={() => setType(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <CardSkeleton count={3} />}
      {error && <ErrorState message={error} onRetry={reload} />}
      {!loading &&
        !error &&
        (visible.length === 0 ? (
          <EmptyState
            title="ივენთები ვერ მოიძებნა"
            text="ამ ტიპის ივენთი ჯერ არ დაგვიგეგმავს."
          />
        ) : (
          <div className="stack">
            {visible.map((e) => (
              <EventCard
                key={e.id}
                event={e}
                registered={registered.includes(e.id)}
                onToggleRegister={handleToggleRegister}
              />
            ))}
          </div>
        ))}
    </>
  );
}

export default Events;
