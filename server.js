import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasksRoute.js';

const app = express();
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
