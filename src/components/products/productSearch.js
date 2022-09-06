import { useEffect, useState } from "react";
import { Product } from "./Product";

export const ProductSearch = () => {
  const [searchInput, updateSearchInput] = useState("");
  const [products, updateProducts] = useState([]);
  const [filteredProducts, setFiltered] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/products?_sort=name&_expand=productTypes`)
      .then((response) => response.json())
      .then((productsArray) => {
        updateProducts(productsArray);
        setFiltered(productsArray);
      });
    console.log("Initial state of products", products);
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) => {
      return p.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFiltered(filtered);
  }, [searchInput]);

  return (
    <>
      <input
        required
        autoFocus
        type="text"
        className="form-control"
        placeholder="Search for Cadny :0)"
        value={searchInput}
        onChange={(event) => {
          updateSearchInput(event.target.value);
        }}
      ></input>
      {
        searchInput ?
        <Product filteredProducts={filteredProducts} />
        : ""
      }

    </>
  );
};
