import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DataContext = createContext(null);

async function getJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`ჩატვირთვა ვერ მოხერხდა (${res.status})`);
  return res.json();
}

export function DataProvider({ children }) {
  const [baseCourses, setBaseCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [userCourses, setUserCourses] = useLocalStorage("tta-user-courses", []);

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.BASE_URL;
    setLoading(true);
    setError(null);

    Promise.all([
      getJson(`${base}data/courses.json`, controller.signal),
      getJson(`${base}data/events.json`, controller.signal),
    ])
      .then(([c, e]) => {
        setBaseCourses(c);
        setEvents(e);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  const addCourse = useCallback(
    (data) => {
      const course = {
        ...data,
        id: `u-${Date.now()}`,
        rating: null,
        students: 0,
        lessons: ["პროგრამა მალე დაემატება"],
        isNew: true,
      };
      setUserCourses((prev) => [course, ...prev]);
      return course;
    },
    [setUserCourses],
  );

  const courses = useMemo(
    () => [...userCourses, ...baseCourses],
    [userCourses, baseCourses],
  );

  const value = useMemo(
    () => ({ courses, events, loading, error, reload, addCourse }),
    [courses, events, loading, error, reload, addCourse],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
