const { Client } = require('pg');

 const DB_NAME = 'blog';

const client = new Client({
  host: 'localhost',
  user: 'student',
  password: 'student',
  port: '5432'
});

const createDB = async () => {
  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${DB_NAME}`);
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.end();
  }
};

createDB().then((result) => {
  console.log('DB has been created');
});

