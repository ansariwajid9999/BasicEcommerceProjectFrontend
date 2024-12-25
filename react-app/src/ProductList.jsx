import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3030";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImlhdCI6MTczNTAzOTQ2Nn0.f1D7f_mzb1q8HMndKITzFAjy27atEBgAYK42qZhxseb0pdP4BnTrb65BJ2oeGkr0Llwk1FByndyoQEh42WdBh5_CoKqOH1On9zafOD3lzT47-9ybva2h5O3pFRE7v44RyC84FpaONXQYNTniqe2XJwc_vsCGFjhCGBQDeSqyzTW9wtN5k8reAvxshHCOoDMmqPe5e5gK8ALqGuvb-bq_1gv-ADl4U-NnXCXCehi10z443gYLxDAOt182Vo7bq5TB9yo2nNeuKwMX8PAQU4p9wxJvBQATiPdnAFB8TqHAH0TniClZZs9glc_yDIMwwBExQW1NztLfSu0Nfu4k0tR1NQ";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const getProducts = async () => {
    // const res = await axios.get("https://basicecommerceproject.onrender.com/api/products");
    const res = await axios.get("/api/products");
    console.log(res.data);
    setProducts(res.data);
    setTotal(res.data.length);
  };
  const handleClick = async (id) => {
    // const res = await axios.delete(`https://basicecommerceproject.onrender.com/api/products/delete/${id}`);
    const res = await axios.delete(`/api/products/delete/${id}`);
    console.log(res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
  };
  const handleSort = async (e) => {
    const field = e.target.value.split(".");
    const res = await axios.get(
      `/api/products?sort=${field[0]}&order=${field[1]}`
    );
    console.log(res.data);
    setProducts(res.data);
  };
  const handlePage = async (page) => {
    const res = await axios.get("/api/products?page=" + page);
    console.log(res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <select onChange={handleSort}>
        <option value="price.desc">Price High to Low</option>
        <option value="price.asc">Price Low to High</option>
        <option value="rating.desc">Rating High to Low</option>
        <option value="rating.asc">Rating Low to High</option>
      </select>
      {Array(Math.ceil(total / 4))
        .fill(0)
        .map((e, i) => (
          <button key={i} onClick={() => handlePage(i + 1)}>
            {i + 1}
          </button>
        ))}
      {products.map((product, index) => (
        <Product {...product} key={index} handleClick={handleClick}></Product>
      ))}
    </>
  );
};

export default ProductList;
