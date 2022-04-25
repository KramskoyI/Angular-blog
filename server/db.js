const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: process.env.DB_USER_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});

const createDB = async () => {
  try {
    await client.connect();
    await client.query(`CREATE DATABASE blog`);
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

