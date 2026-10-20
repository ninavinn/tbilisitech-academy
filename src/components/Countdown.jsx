import { useEffect, useState } from "react";

function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);
  const parts = [
    ["დღე", Math.floor(diff / 86400000)],
    ["საათი", Math.floor(diff / 3600000) % 24],
    ["წუთი", Math.floor(diff / 60000) % 60],
    ["წამი", Math.floor(diff / 1000) % 60],
  ];

  return (
    <div className="countdown" role="timer">
      {parts.map(([label, value]) => (
        <div key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span className="small muted">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Countdown;
