const supertest = require('supertest');
const app = require('../app'); 

const request = supertest(app);

describe('Task API', () => {
  let taskId; 
  let authToken; 

  beforeAll(async () => {

    await request.post('/api/auth/signup').send({
      username: 'testuser12',
      email: 'testuser12@example.com',
      password: 'testpassword',
    });


    const loginResponse = await request.post('/api/auth/login').send({
      email: 'testuser12@example.com',
      password: 'testpassword',
    });

    
    authToken = loginResponse.body.token;
  });


  it('creates a new task', async () => {
    const response = await request
      .post('/api/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'New Task', description: 'Hello' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New Task');
    taskId = response.body.id;
  });


  it('updates an existing task', async () => {
    const response = await request
      .put(`/api/users/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Updated Task', description: 'Updated Hello' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });

 
  it('gets all tasks', async () => {
    const response = await request.get('/api/users').set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });


  it('gets a task by ID', async () => {
    const response = await request
      .get(`/api/users/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });


  it('deletes an existing task', async () => {
    const response = await request
      .delete(`/api/users/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
  });


  it('returns 404 for a deleted task by ID', async () => {
    const response = await request
      .get(`/api/users/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found');
  });


  it('returns 404 for deleting a non-existing task', async () => {
    const nonExistingTaskId = 'non-existing-id';
    const response = await request
      .delete(`/api/users/${nonExistingTaskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('ID not found');
  });

  
  it('verifies authentication token', async () => {
    const response = await request.get('/api/users').set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  
});
