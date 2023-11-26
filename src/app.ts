import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import db from './config/mongo';
import { initializeDatabase } from './data/databaseInitializer'; 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

db()
  .then(() => {
    console.log('Conexion ready');
    /* return initializeDatabase(); // Inicializar la base de datos */
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });
