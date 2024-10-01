
 // Asegúrate de crear un archivo de estilo si lo necesitas

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook 

          </a>
          
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter 

          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram 
            
          </a>
        </div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Mi Tienda Online. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;