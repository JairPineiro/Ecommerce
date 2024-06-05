import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOneItemService } from "@/Services/itemServices";

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
    <>
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
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Price: ${product.price}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
