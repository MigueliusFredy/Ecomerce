import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

// Configura tu conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia esto si tienes una contraseña en tu base de datos
  database: 'ecomerce' // Asegúrate de usar el nombre correcto de tu base de datos
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database.');
});
app.use(express.static('public'));
// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de productos');
});

// Ruta para obtener productos
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products'; // Consulta a la tabla 'products'
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(results); // Devolvemos los productos en formato JSON
  });
});
app.post('/register', (req, res) => {
  const { name, email, password } = req.body; // Añadir el campo 'name' y 'email'
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash de la contraseña

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al registrar el usuario');
    }
    res.status(201).send('Usuario registrado con éxito');
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body; // Cambiamos 'username' por 'email'

  const query = 'SELECT * FROM users WHERE email = ?'; // Usamos 'email' para buscar el usuario
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error en la base de datos');
    }

    if (results.length === 0) {
      return res.status(404).send('El usuario no existe'); // Mensaje específico si el usuario no existe
    }

    const user = results[0];
    if (bcrypt.compareSync(password, user.password)) {
      // Enviar el nombre del usuario en la respuesta
      res.json({ 
        name: user.name,  // Enviamos el nombre del usuario
        message: 'Inicio de sesión exitoso'
      });
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  });
});
// Iniciar el servidor en el puerto 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

