import { getAllItemsService } from "@/Services/itemServices";
import { useState, useEffect } from "react";
import { SearchBar } from "@/Components/SearchBar";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const [itemList, setItemList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await getAllItemsService();
        if (response.status === 200) {
          setItemList(response.data);
          setFilteredItems(response.data);
        }
      } catch (error) {
        console.log("Ocurrio error en Home", error);
      }
    };
    fetchItemData();
  }, []);

  const handleSearch = (query) => {
    const filtered = itemList.filter(
      (product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleReset = () => {
    setFilteredItems(itemList);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {filteredItems &&
          filteredItems.map((product) => (
            <div className="card" style={{ width: "18rem" }} key={product.id}>
              <img
                className="card-img-top"
                style={{ maxHeight: "300px" }}
                src={product.image}
                alt={product.product_name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.category}</p>
                {/* Aquí no se implementa el boton, pero basta con sustituir <a> </a> por <NavLink> </NavLink>  react-router-dom y la ruta del enlace indicar el componente que mostrará la información de un solo producto, seguido del id del producto */}
                <NavLink
                  href="#"
                  className="btn btn-primary"
                  to={`/product/${product.id}`}
                >
                  {" "}
                  Comprar{" "}
                </NavLink>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
