import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOneItemService } from "@/Services/itemServices";
import { useCart } from "../Context/CartContext";

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getOneItemService(id);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log("Error fetching product data", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <div className="card mb-3" style={{ maxWidth: 700 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.image}
              alt={product.product_name}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.product_name}</h5>
              <p className="card-text">Descripción: {product.description}</p>
              <p className="card-text">Categoría: {product.category}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Price: ${product.price}
                </small>
              </p>
              <div className="d-flex align-items-center gap-2 mt-2">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value))) }
                  style={{ width: "80px" }}
                />
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(product, quantity)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
