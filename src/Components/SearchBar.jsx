import { useState } from "react";

export const SearchBar = ({ searchTerm, onSearch, onReset }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleResetClick = () => {
    setInputValue("");
    onReset();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Buscar productos..."
      />
      <button onClick={handleSearchClick}>Buscar</button>
      <button onClick={handleResetClick}>Mostrar todos </button>
    </div>
  );
};
