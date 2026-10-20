import { useCallback } from "react";
import { useDispatch, useStore } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoritesSlice";
import { useToast } from "../context/ToastContext";

// სტაბილური (useCallback) ფუნქციები, რომლებიც Prop-ებად გადაეცემა CourseCard-ს
export default function useCourseActions() {
  const dispatch = useDispatch();
  const store = useStore();
  const { showToast } = useToast();

  const handleAddToCart = useCallback(
    (course) => {
      dispatch(
        addToCart({
          id: course.id,
          title: course.title,
          price: course.price,
          category: course.category,
        }),
      );
      showToast(`„${course.title}“ დაემატა კალათაში`);
    },
    [dispatch, showToast],
  );

  const handleToggleFavorite = useCallback(
    (course) => {
      const wasFavorite = store.getState().favorites.ids.includes(course.id);
      dispatch(toggleFavorite(course.id));
      showToast(
        wasFavorite ? "წაიშალა ფავორიტებიდან" : "დაემატა ფავორიტებში",
        "info",
      );
    },
    [dispatch, store, showToast],
  );

  return { handleAddToCart, handleToggleFavorite };
}
