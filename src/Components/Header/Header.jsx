import "./header.scss";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/Hook/useAuthContext";
import { useCart } from '../../Context/CartContext';

export const Header = () => {
  const { logout, isAuth, isAdmin } = useAuthContext();
  const { cart } = useCart();
  const linkIsActive = (isActive) =>
    isActive
      ? "header__item-link header__item-link--is-active"
      : "header__item-link";
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
            <li className="header__list-item">
          <button className="header__item-button" onClick={() => console.log('Abrir carrito')}>
            Carrito ({cart.length})
          </button>
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
    </nav>
  );
};
