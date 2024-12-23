import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    // const res = await axios.get("https://basicecommerceproject.onrender.com/api/products");
    const res = await axios.get("http://localhost:3030/api/products");
    console.log(res.data);
    setProducts(res.data);
  };
  const handleClick = async (id) => {
    // const res = await axios.delete(`https://basicecommerceproject.onrender.com/api/products/delete/${id}`);
    const res = await axios.delete(`http://localhost:3030/api/products/delete/${id}`);
    console.log(res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.map((product, index) => (
        <Product {...product} key={index} handleClick={handleClick}></Product>
      ))}
    </>
  );
};

export default ProductList;
