import  { useEffect, useState } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      console.log(data); // Verifica qué datos recibes
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (

    <div >
      <h1 id="product-list-title">Lista de Productos</h1>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <img src={`http://localhost:5000/${product.image_url}`} alt={product.name} />
            <p>{product.description}</p>
            <p> S/ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;