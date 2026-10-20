import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useLocalStorage from "../hooks/useLocalStorage";

function Layout() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useLocalStorage(
    "tta-theme",
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        მთავარ შინაარსზე გადასვლა
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <main id="main" className="container main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
