import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });
  const total = useMemo(() => getTotalPrice(), [cart, getTotalPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pago simulado. Gracias por tu compra.");
    navigate("/");
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container my-4">
        <div className="alert alert-info">
          Tu carrito está vacío. Agrega productos antes de pagar.
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <h3>Resumen de compra</h3>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div>
                    <div className="fw-semibold">{item.product_name}</div>
                    <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                      Cantidad: {item.quantity}
                    </div>
                  </div>
                </div>
                <span className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        <div className="col-12 col-lg-6">
          <h3>Datos de pago</h3>
          <form className="card card-body" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="fullName">Nombre completo</label>
              <input
                id="fullName"
                name="fullName"
                className="form-control"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="cardNumber">Número de tarjeta</label>
              <input
                id="cardNumber"
                name="cardNumber"
                className="form-control"
                value={form.cardNumber}
                onChange={handleChange}
                required
                inputMode="numeric"
                maxLength={19}
                placeholder="1111 2222 3333 4444"
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label" htmlFor="expiry">Expiración (MM/AA)</label>
                <input
                  id="expiry"
                  name="expiry"
                  className="form-control"
                  value={form.expiry}
                  onChange={handleChange}
                  required
                  placeholder="08/27"
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label" htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  name="cvv"
                  className="form-control"
                  value={form.cvv}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="123"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="address">Dirección de envío</label>
              <textarea
                id="address"
                name="address"
                className="form-control"
                value={form.address}
                onChange={handleChange}
                rows={2}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Pagar ${total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
