import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState(''); // Cambiado de username a name
  const [email, setEmail] = useState(''); // Agregado campo email
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', { name, email, password }) // Cambiado a name y email
      .then((response) => {
        setSuccess(response.data);
        setName(''); // Limpiar el campo name
        setEmail(''); // Limpiar el campo email
        setPassword(''); // Limpiar el campo password
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
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
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;