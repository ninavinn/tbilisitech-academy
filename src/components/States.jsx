export function CardSkeleton({ count = 6 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="იტვირთება">
      {Array.from({ length: count }, (_, i) => (
        <div className="card skeleton-card" key={i}>
          <div className="skeleton sk-cover" />
          <div className="card-body">
            <div className="skeleton sk-line" style={{ width: "40%" }} />
            <div className="skeleton sk-line" style={{ width: "85%" }} />
            <div className="skeleton sk-line" style={{ width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state" role="alert">
      <h3>მონაცემები ვერ ჩაიტვირთა</h3>
      <p className="muted">
        {message}. შეამოწმეთ ინტერნეტკავშირი და სცადეთ თავიდან.
      </p>
      <button className="btn" onClick={onRetry}>
        თავიდან ცდა
      </button>
    </div>
  );
}

export function EmptyState({ title, text, action }) {
  return (
    <div className="state">
      <h3>{title}</h3>
      <p className="muted">{text}</p>
      {action}
    </div>
  );
}
