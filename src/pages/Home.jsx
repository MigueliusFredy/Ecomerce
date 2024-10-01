// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  // Usamos useEffect para hacer la solicitud a la API cuando el componente se monta
  useEffect(() => {
    // Hacer la solicitud GET a la API de productos
    axios.get('http://localhost:5000/products')
      .then((response) => {
        const data = response.data;
        // Filtramos para mostrar solo algunos mangas
        const selectedMangas = data.filter((product) => product.name.includes('Tomo')).slice(0, 3); // Selecciona los primeros 3 mangas
        setProducts(selectedMangas);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);
  return (
<div className="home-container">
      <header className="hero-section">
        <h1>Bienvenido a nuestra tienda de mangas</h1>
        <p>
          ¡Nos complace anunciar la inauguración de nuestra tienda en línea dedicada a todos los fanáticos del manga!
          Aquí encontrarás los títulos más populares y nuevos lanzamientos.
        </p>
        <p>
          ¡Explora nuestros productos y disfruta de grandes ofertas!
        </p>
      </header>

      <section className="featured-products">
        <h2>Productos destacados</h2>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={`http://localhost:5000/${product.image_url}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Precio: S/ {product.price}</p>
                <p>{product.description}</p>
                <button>Ver producto</button>
              </div>
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </section>
    </div>
  );
};
  
  
  export default Home;