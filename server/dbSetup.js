const sqlite3 = require('sqlite3').verbose();

function initializeDatabase(dbPath) {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
    } else {
      console.log("Connected to SQLite Database.");
    }
  });

  db.serialize(() => {
    // 1) Ensure table exists
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        completion_date TEXT NOT NULL
      )
    `);

    // 2) Clear table, then insert rows in the callback so we don't close early
    db.run(`DELETE FROM tasks`, function (err) {
      if (err) {
        console.error("Error clearing table:", err.message);
        return db.close();
      }

      const rows = [
        ["Task 1", "2025-11-01"],
        ["Task 2", "2026-01-15"],
        ["Task 3", "2030-06-30"],
      ];

      const stmt = db.prepare(
        `INSERT INTO tasks (description, completion_date) VALUES (?, ?)`
      );

      for (const [description, completion_date] of rows) {
        stmt.run(description, completion_date);
      }

      stmt.finalize((e) => {
        if (e) {
          console.error("Error inserting tasks:", e.message);
        } else {
          console.log("Inserted 3 tasks.");
        }

        db.close((closeErr) => {
          if (closeErr) console.error("Error closing the database:", closeErr.message);
          else console.log("Database closed successfully.");
        });
      });
    });
  });
}

module.exports = initializeDatabase;
