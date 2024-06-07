import { useCart } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - Cantidad: {item.quantity} - Precio: ${item.price * item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            <input
              type="number"
              value={item.quantity}
              onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <p>Total: ${getTotalPrice()}</p>
    </div>
  );
};

export default Cart;
