import { useState } from "react";
import { createItemService } from "@/Services/itemServices";
import { useAuthContext } from "@/Hook/useAuthContext";

export const CreateProduct = () => {
  const { userPayload, isAuth } = useAuthContext();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuth || !userPayload) {
      setError("You must be logged in to create a product.");
      return;
    }

    const productData = { product_name: productName, description, price, category, image };

    try {
      await createItemService(productData, localStorage.getItem("token"));
      alert("Product created successfully!");
      setProductName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setError(null);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div>
      <h1>Create New Product</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

