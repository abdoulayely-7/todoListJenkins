import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from '../routes/tasksRoute.js';

const app = express();
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

describe('Tasks API', () => {
  it('should create a task', async () => {
    const res = await request(app).post('/tasks').send({ name: 'Test task' });
    if (res.status !== 201) {
      throw new Error(`Expected status 201, got ${res.status}`);
    }
    if (res.body.name !== 'Test task') {
      throw new Error(`Expected name 'Test task', got ${res.body.name}`);
    }
  });

  it('should get all tasks', async () => {
    const res = await request(app).get('/tasks');
    if (res.status !== 200) {
      throw new Error(`Expected status 200, got ${res.status}`);
    }
    if (!Array.isArray(res.body)) {
      throw new Error('Expected an array');
    }
  });

  it('should update a task', async () => {
    // First create a task
    const createRes = await request(app).post('/tasks').send({ name: 'Task to update' });
    const taskId = createRes.body.id;

    const res = await request(app).put(`/tasks/${taskId}`).send({ name: 'Updated task' });
    if (res.status !== 200) {
      throw new Error(`Expected status 200, got ${res.status}`);
    }
    if (res.body.name !== 'Updated task') {
      throw new Error(`Expected name 'Updated task', got ${res.body.name}`);
    }
  });

  it('should delete a task', async () => {
    // First create a task
    const createRes = await request(app).post('/tasks').send({ name: 'Task to delete' });
    const taskId = createRes.body.id;

    const res = await request(app).delete(`/tasks/${taskId}`);
    if (res.status !== 204) {
      throw new Error(`Expected status 204, got ${res.status}`);
    }

    // Verify it's deleted
    const getRes = await request(app).get('/tasks');
    const taskExists = getRes.body.some(task => task.id === taskId);
    if (taskExists) {
      throw new Error('Task was not deleted');
    }
  });
});
