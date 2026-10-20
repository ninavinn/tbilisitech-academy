import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const cartCount = useSelector((s) => s.cart.items.length);
  const favCount = useSelector((s) => s.favorites.ids.length);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={close}>
          <span className="logo-mark">T</span>
          TbilisiTech <span className="logo-light">Academy</span>
        </Link>

        <button
          className="icon-btn menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="მენიუ"
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          <NavLink to="/" end onClick={close}>
            მთავარი
          </NavLink>
          <NavLink to="/courses" onClick={close}>
            კურსები
          </NavLink>
          <NavLink to="/events" onClick={close}>
            ივენთები
          </NavLink>
          <NavLink to="/about" onClick={close}>
            ჩვენ შესახებ
          </NavLink>
          <Link to="/add-course" className="btn btn-sm" onClick={close}>
            კურსის დამატება
          </Link>
        </nav>

        <div className="nav-tools">
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label="თემის გადართვა"
            title="Dark / Light"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <Link
            to="/favorites"
            className="icon-btn"
            aria-label={`ფავორიტები: ${favCount}`}
          >
            ♥{favCount > 0 && <span className="count">{favCount}</span>}
          </Link>
          <Link
            to="/cart"
            className="icon-btn"
            aria-label={`კალათა: ${cartCount}`}
          >
            🛒{cartCount > 0 && <span className="count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
