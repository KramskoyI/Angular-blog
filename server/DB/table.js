const { Client } = require('pg');
const { HOST, USER, PASSWORD, PORT, NAME } = require('./consts');

const client = new Client({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: NAME,
    port: PORT
});


const tableUsers = `
    CREATE TABLE  "users" (
        "id" SERIAL,
        "name" VARCHAR(120) NOT NULL,
        "email" VARCHAR(120) NOT NULL,
        "password" VARCHAR(120) NOT NULL,
        PRIMARY KEY ("id")
    );
`

const tablePosts = `
    CREATE TABLE  "posts" (
        "id" SERIAL,
        "title" VARCHAR(120) NOT NULL,
        "description" VARCHAR(120) NOT NULL,
        "password" VARCHAR(120) NOT NULL,
        PRIMARY KEY ("id")
    );
`

// const tableTags = `
//     CREATE TABLE  "tags" (
//         "id" INTEGER NOT NULL,
//         "tad" INTEGER VARCHAR(120) NOT NULL,
//         PRIMARY KEY ("id")
//     );
// `

const createDB = async (query) => {
    try {
        await client.connect();
        await client.query(query);
    } catch (error) {
        console.log(error);
        return false
    } finally {
        await client.end();
    }
}

createDB(tableUsers).then((result) => {
    console.log('Table Users');
})

createDB(tablePosts).then((result) => {
    console.log('Table Posts');
})

