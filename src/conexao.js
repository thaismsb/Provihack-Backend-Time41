const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'locais_acessiveis',
    password: 'Know-how',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}