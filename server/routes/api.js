//api.js
const express = require('express');
const path = require('path');
const initializeDatabase = require('../dbSetup');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const PORT = 3000;  
const dbPath = path.join(__dirname, '../../db/my-database.db');
const db = new sqlite3.Database(dbPath);

initializeDatabase(dbPath);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client'))); 


// CREATE
/**
 * Adds a new task to the database.
 * 
 * Expects a request body with:
 * - description: String
 * - completion_date: String (YYYY-MM-DD)
 * 
 * Returns the created task with its assigned ID.
 */
app.post('/tasks', (req, res) => {
    console.log(`Req Body: ${JSON.stringify(req.body)}`);
    const { description, completion_date } = req.body;

    if (!description || !completion_date) {
        return res.status(400).send('Description and completion date are required.');
    }

    db.run('INSERT INTO tasks (description, completion_date) VALUES (?, ?)', [description, completion_date], function(err) {
        if (err) {
            return res.status(500).send('Error inserting task');
        }
        res.status(201).send({ id: this.lastID, description, completion_date });
    });
});


// READ
/**
 * Retrieves all tasks from the database.
 * 
 * Returns an array of task objects.
 */
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error retrieving tasks');
        }
        res.send(rows);
    });
});


// READ
/**
 * Retrieves a single task from the database by its ID.
 * 
 * Expects:
 * - a task ID as a URL parameter.
 * 
 * Returns the corresponding task object or null if not found.
 */
app.get('/tasks/:id', (req, res) => {
    db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).send('Error retrieving tasks');
        }
        res.json(row ?? null);
    });
});


// UPDATE
/**
 * Updates an existing task in the database by its ID.
 * 
 * Expects:
 * - ID as a URL parameter
 * - description and completion_date in the request body
 * 
 * Returns the updated task object.
 */
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { description, completion_date } = req.body;

    if (!description || !completion_date) {
        return res.status(400).send('Description and completion date are required.');
    }

    
    db.run('UPDATE tasks SET description = ?, completion_date = ? WHERE id = ?', [description, completion_date, id], function(err) {
        if (err) {
            return res.status(500).send('Error updating task');
        }
        res.send({ id, description, completion_date });
    });
});


// DELETE
/**
 * Deletes a task from the database by its ID.
 * 
 * Expects:
 * - a task ID as a URL parameter.
 * 
 * Returns a confirmation message after deletion.
 */
app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params; 

    db.run('DELETE FROM tasks WHERE id = ?', id, function(err){
        if(err){
            return res.status(500).send('Error deleteing task');
        }

        res.send({message: `Tasks with id ${id} deleted`});
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});