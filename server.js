import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import groupRoutes from './routes/group.routes.js';
import discussionRoutes from './routes/discussion.routes.js';
import albumRoutes from './routes/album.routes.js';
import pollRoutes from './routes/poll.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import carpoolRoutes from './routes/carpool.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de sécurité et de format
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/carpools', carpoolRoutes);

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/facebook-api';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connecté à MongoDB avec succès'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

// Route de test basique
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de Facebook' });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});