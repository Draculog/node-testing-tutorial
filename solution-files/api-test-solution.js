const { expect } = require('chai');
const { startServer, stopServer } = require('./utils/testServer');
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
    const postUrl = `http://127.0.0.1:3000/tasks`;
    const postResponse = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const postData = await postResponse.json();
    const id = postData.id;


    // Step 3) Call the route that gets the specific task from the database
    // and assert the Task object has the correct description and completion_date
    const getUrl = `http://127.0.0.1:3000/tasks/${id}`;
    const getResponse = await fetch(getUrl)
    const getData = await getResponse.json();

    expect(getData).to.include({ description: 'Learn testing', completion_date: '2025-12-31' });
  });





  // #2) Complete this test by updating the description of an existing task in the database, 
  // updating it in the database, and verifying that the update in the database was successful.
  // 3 out of 3 tests should pass once this test is completed
  it('should edit an existing task and confirm the new description', async () => {

    // Step 1) The task object is being added to the database
    const task = { description: 'Learn testing', completion_date: '2025-12-31' };

    const postUrl = `http://127.0.0.1:3000/tasks`;
    const postResponse = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const postData = await postResponse.json();
    const id = postData.id;


    // TODO 
    // Step 2) Edit the task's description and call the UPDATE route to update it in the database
    // Hint: It is similar to how a Task is added to the database
    // but pay attention to what kind of RESTful call you have to make
    // (also look at server/routes/api.js to see which route updates task objects)
    task.description = "Updated testing";

    const putUrl = `http://127.0.0.1:3000/tasks/${id}`;
    await fetch(putUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
  

    // TODO 
    // Step 3) Get the Task object from the database and store it in a variable called getResponse
    // Hint: Look at previous tests to see how to call the route that gets a specific task from the database
    const getUrl = `http://127.0.0.1:3000/tasks/${id}`;
    const getResponse = await fetch(getUrl);
    const getData = await getResponse.json();


    // Step 4) Assert the Task object called in Step 3 has the updated description
    expect(getData.description).to.equal('Updated testing');
  });





  // #3) Write the entire test where you:
  // make a test, add it to the database, assert it has been added,
  // delete it from the database, then assert it has been deleted
  it('creates a task, verifies it exists, deletes it, and verifies it was deleted', async () => {

    // TODO 
    // Step 1) Create a task object with description and completion_date and add it to the database
    // Hint: Call the route to add a task to the database like in previous tests
    const task = { description: "temp task", completion_date: "2025-12-31" };

    const postUrl = `http://127.0.0.1:3000/tasks`;
    const postResponse = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const postData = await postResponse.json();
    const id = postData.id;


    // TODO
    // Step 2) Assert the task exists in the database
    // Hint: Look back at previous tests to see how to assert an object exists in the database
    const getUrl = `http://127.0.0.1:3000/tasks/${id}`;
    const getResponse = await fetch(getUrl)
    const getData = await getResponse.json();
    expect(getData).to.include(task);


    // TODO
    // Step 3) Delete the task you added to the database
    // Hint: Pay attention to what kind of RESTful call you have to make 
    // (look at server/routes/api.js to see which route deletes task objects)
    const deleteUrl = `http://127.0.0.1:3000/tasks/${id}`;
    await fetch(deleteUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });


    // TODO
    // Step 4) Assert that the task is deleted from the database
    // Hint: Do another GET request using the ID of the task you deleted,
    // keep the response in a variable, and assert its body to a value that indicates it does not exist
    const emptyUrl = `http://127.0.0.1:3000/tasks/${id}`;
    const emptyResponse = await fetch(emptyUrl)
    const emptyData = await emptyResponse.json();
    expect(emptyData).to.equal(null);
  });

});
