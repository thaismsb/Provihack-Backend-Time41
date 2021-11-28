const { Pool } = require('pg');

const pool = new Pool({
    user: 'evimrlluwjsvjh',
    host: 'ec2-18-213-133-45.compute-1.amazonaws.com',
    database: 'd84lthiacls0be',
    password: '5249b361acca3db0202dc32cf0c5159c0aa7561d33f7a5aff272699f87773f0d',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}