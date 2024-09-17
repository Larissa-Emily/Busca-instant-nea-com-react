import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SearchResults from "./SearchResults";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef) inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearchTerm(value);

    if (!value) {
      setData([]);
      return;
    }

    const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result)) {
          // Filtrando os resultados no front-end
          const filteredResults = result.filter(item =>
            item.nome.toLowerCase().includes(value.toLowerCase())
          );
          setData(filteredResults);
        } else {
          console.error("Formato de resposta inesperado", result);
        }
      })
      .catch((error) => console.error("Erro ao buscar os dados:", error));
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="search">Name search</label>
        <input
          name="search"
          id="search"
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>

      <SearchResults data={data} searchTerm={searchTerm} />
    </div>
  );
}

export default App;
