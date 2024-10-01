import { Link, useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

const Header = () => {
  const [user, setUser] = useState(null); // Guardar los detalles del usuario
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controlar la apertura del dropdown
  const navigate = useNavigate();

  // Verificar si hay un usuario en localStorage cuando el componente se monta
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser)); // Guardar el usuario en el estado
      } else {
        setUser(null); // Si no hay usuario, lo dejamos en null
      }
    };

    // Ejecutar cuando se monta el componente
    handleStorageChange();

    // Añadir un evento que escuche cambios en localStorage
    window.addEventListener('storage', handleStorageChange);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'flex-end', listStyleType: 'none' }}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/cart">Carrito</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li style={{ position: 'relative' }}>
            <button
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={toggleDropdown}
            >
              {user ? user.name : 'Usuario'}
              <span style={{ marginLeft: '5px', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                ▼
              </span>
            </button>
            {dropdownOpen && (
              <ul
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  listStyleType: 'none',
                  padding: 0,
                  backgroundColor: 'white',
                  boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                {user ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      style={{ padding: '10px', backgroundColor: 'white', color: 'black', cursor: 'pointer', width: '100%' }}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login" style={{ padding: '10px', display: 'block', color:'black' }}>Iniciar sesión</Link>
                    </li>
                    <li>
                      <Link to="/register" style={{ padding: '10px', display: 'block', color:'black' }}>Registrarse</Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;