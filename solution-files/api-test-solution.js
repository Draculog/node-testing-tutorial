const { expect } = require('chai');
const request = require('supertest');
const { startServer, stopServer, BASE_URL } = require('./utils/testServer');
const { clearTasks } = require('./utils/testDB');

describe('Tasks API', function () {
  this.timeout(30000);

  // Before any tests run the server starts and the database is cleared
  before(async () => {
    await startServer();
    await clearTasks();   
  });

  // After each test the database will be cleared
  afterEach(async () => {
    await clearTasks();    
  });
  
  // After all tests run the database will be cleared and the server will be stopped
  after(async () => {
    await clearTasks();  
    await stopServer();
  });


  // All TODOs Below

  // #1) Find the 1 small bug in this test.
  // This test is supposed to add a task to the database and verify that it was added.
  // 2 out of 3 tests should be passing after the bug is fixed
  it('should add a new task to the database and confirm it exists', async () => {

    // TODO: Find the bug in this test and fix it
    // Hint: Run 'npm test'

    // Step 1) Create the Task object we want to add to the database
    const task = { description: 'Learn testing', completion_date: '2025-12-31' };
    
    // Step 2) Add the task object to the database and store the response object and its database ID in variables
    const postResponse = await request(BASE_URL).post('/tasks').send(task);
    const id = postResponse.body.id;

    // Step 3) Call the route that gets the specific task from the database
    // and assert the Task object has the correct description and completion_date
    const getResponse = await request(BASE_URL).get(`/tasks/${id}`);
    expect(getResponse.body).to.include({ description: 'Learn testing', completion_date: '2025-12-31' }); // Solution here: completion_date is '2025-12-31' instead of '2025-12-30'

  });

  // #2) Complete this test by updating the description of an existing task in the database, 
  // updating it in the database, and verifying that the update in the database was successful.
  // 3 out of 3 tests should pass once this test is completed
  it('should edit an existing task and confirm the new description', async () => {

    // Step 1) The task object is being added to the database
    const task = { description: 'Learn testing', completion_date: '2025-12-31' };
    const postResponse = await request(BASE_URL).post('/tasks').send(task);
    const id = postResponse.body.id;

    // TODO 
    // Step 2) Edit the task's description and call the UPDATE route to update it in the database
    // Hint: It is similar to how a Task is added to the database
    // Pay attention to what kind of RESTful call you have to make
    // (look at server/routes/api.js to what route updates task objects)
    task.description = 'Updated testing';
    await request(BASE_URL).put(`/tasks/${id}`).send(task);

    // TODO 
    // Step 3) Get the Task object from the database and store it in a variable
    // Hint: Look at previous tests to see how to call the route that gets a specific task from the database
    const getResponse = await request(BASE_URL).get(`/tasks/${id}`);

    // Step 4) Assert the Task object called in Step 3 has the updated description
    // Hint: Remember what kind of assertion should be used for validating variables
    expect(getResponse.body.description).to.equal('Updated testing');
  });


  // #3) Write the entire test where you:
  // make a test, add it to the database, assert it has been added,
  // delete it from the database, then assert it has been deleted
  it('creates a task, verifies it exists, deletes it, and verifies it was deleted', async () => {

    // TODO 
    // Step 1) Create a task object with description and completion_date and add it to the database
    // Hint: Call the route to add a task to the database like in previous tests
    const task = { description: 'temp task', completion_date: '2025-12-31' };
    const postResponse = await request(BASE_URL).post('/tasks').send(task);
    const id = postResponse.body.id;

    // TODO
    // Step 2) Assert the task exists in the database
    // Hint: Look back at previous tests to see how to assert an object exists in the database
    const getResponse = await request(BASE_URL).get(`/tasks/${id}`);
    expect(getResponse.body).to.include(task);

    // TODO
    // Step 3) Delete the task you added to the database
    // Hint: Pay attention to what kind of RESTful call you have to make 
    // (look at server/routes/api.js to see which route deletes task objects)
    await request(BASE_URL).delete(`/tasks/${id}`);

    // TODO
    // Step 4) Assert that the task is deleted from the database
    // Hint: Do another GET request using the ID of the task you deleted,
    // keep the response in a variable, and assert its body to a value that indicates it does not exist
    const empty_response = await request(BASE_URL).get(`/tasks/${id}`);
    expect(empty_response.body).to.equal(null);
  });

});
