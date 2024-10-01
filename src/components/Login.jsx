import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  axios.post('http://localhost:5000/login', { email, password })
    .then((response) => {
      const { name } = response.data; // Capturamos el nombre desde la respuesta
      localStorage.setItem('user', JSON.stringify({ name })); // Guardamos el nombre del usuario en localStorage
      navigate('/'); // Redirigimos a la página principal
      window.location.reload();
    })
    .catch((err) => {
      setError(err.response.data); // Mostramos el error si ocurre
    });
};

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;