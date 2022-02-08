const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'student',
  password: 'student',
  port: '5432'
});

const createDB = async () => {
  try {
    await client.connect();
    await client.query('CREATE DATABASE blog');
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

