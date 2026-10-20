import { memo } from "react";
import { formatDate, formatDay } from "../utils/format";

function EventCard({ event, registered, onToggleRegister }) {
  const left = event.seats - event.taken - (registered ? 1 : 0);
  const percent = Math.min(
    100,
    Math.round(((event.taken + (registered ? 1 : 0)) / event.seats) * 100),
  );

  return (
    <article className="card event-card">
      <div className="event-date">
        <strong>{formatDay(event.date)}</strong>
        <span className="small">{event.type}</span>
      </div>
      <div className="event-info">
        <h3 className="card-title">{event.title}</h3>
        <p className="muted small">
          {formatDate(event.date)} · {event.location}
        </p>
        <p>{event.description}</p>
        <div className="seats" aria-label={`დარჩენილია ${left} ადგილი`}>
          <div className="seats-bar">
            <span style={{ width: `${percent}%` }} />
          </div>
          <span className="small muted">დარჩენილია {left} ადგილი</span>
        </div>
      </div>
      <button
        className={`btn ${registered ? "btn-ghost" : ""}`}
        onClick={() => onToggleRegister(event)}
        disabled={left <= 0 && !registered}
      >
        {registered ? "რეგისტრაციის გაუქმება" : "რეგისტრაცია"}
      </button>
    </article>
  );
}

export default memo(EventCard);
