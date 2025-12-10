import "./header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/Hook/useAuthContext";
import { useCart } from '../../Context/CartContext';
import { useState } from "react";

export const Header = () => {
  const { logout, isAuth, isAdmin } = useAuthContext();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const linkIsActive = (isActive) =>
    isActive
      ? "header__item-link header__item-link--is-active"
      : "header__item-link";

  const goToCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    navigate("/checkout");
  };
  return (
    <nav className="header">
      <NavLink className="header__logo" to="/">LOGO</NavLink>
      <ul className="header__nav-list">
        <li className="header__list-item">
          <NavLink className={({ isActive }) => linkIsActive(isActive)}to="/">Home</NavLink>
        </li>
        <li className="header__list-item">
          <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/dashboard">Dashboard</NavLink>
        </li>
        {isAdmin && (
          <li className="header__list-item">
            <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/create-product">Create Product</NavLink>
          </li>
        )}

        <li className="header__list-item">
          <button className="header__item-button" onClick={toggleCart}>
            Carrito ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </li>

        {isAuth ? (
          <>
            <li className="header__list-item">
              <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/secret">
                Secret
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink className="header__item-link" onClick={logout}>Logout</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="header__list-item">
              <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/login">Login</NavLink>
            </li>
            <li className="header__list-item">
              <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>

      {isCartOpen && (
        <div className="cart-window">
          <div className="cart-header">
            <h2>Tu Carrito</h2>
            <button className="cart-window-close" onClick={toggleCart}>
              X
            </button>
          </div>
          <div className="cart-items">
            {cart.length === 0 && <span>Tu carrito está vacío.</span>}
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="img-fluid rounded-start"
                  />
                </div>
                <span>{item.product_name}</span>
                <span>{item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <button
              className="btn btn-primary"
              onClick={goToCheckout}
              disabled={cart.length === 0}
            >
              Ir a pago
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
