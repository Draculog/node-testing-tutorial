// test/utils/dbUtils.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', '..', 'db', 'my-database.db');

function clearTasks() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    db.serialize(() => {
      db.run('DELETE FROM tasks', (err) => {
        if (err) {
          db.close(() => reject(err));
          return;
        }
        // reset AUTOINCREMENT counter (ignore error if sqlite_sequence not present)
        db.run("DELETE FROM sqlite_sequence WHERE name='tasks'", () => {
          db.close(() => resolve());
        });
      });
    });
  });
}

module.exports = { clearTasks, dbPath };
