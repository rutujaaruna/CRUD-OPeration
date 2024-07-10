const conn = require('./config');

const createTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user_Details (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      img VARCHAR(255),
      summary TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  conn.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created:', results);
  });
}

module.exports = createTable;
