import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../store/cartSlice";
import { EmptyState } from "../components/States";
import { formatPrice } from "../utils/format";

function Cart() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, i) => sum + i.price, 0);

  if (items.length === 0) {
    return (
      <EmptyState
        title="კალათა ცარიელია"
        text="დაამატეთ კურსი კატალოგიდან."
        action={
          <Link to="/courses" className="btn">
            კურსების ნახვა
          </Link>
        }
      />
    );
  }

  return (
    <>
      <div className="page-head">
        <h1>კალათა</h1>
      </div>
      <div className="cart">
        <ul className="cart-list">
          {items.map((i) => (
            <li key={i.id} className="card cart-item">
              <div>
                <Link to={`/courses/${i.id}`}>
                  <strong>{i.title}</strong>
                </Link>
                <p className="muted small">{i.category}</p>
              </div>
              <strong>{formatPrice(i.price)}</strong>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => dispatch(removeFromCart(i.id))}
              >
                წაშლა
              </button>
            </li>
          ))}
        </ul>
        <aside className="card cart-summary">
          <p className="muted">კურსები: {items.length}</p>
          <strong className="price big">{formatPrice(total)}</strong>
          <button
            className="btn btn-ghost btn-block"
            onClick={() => dispatch(clearCart())}
          >
            კალათის გასუფთავება
          </button>
        </aside>
      </div>
    </>
  );
}

export default Cart;
