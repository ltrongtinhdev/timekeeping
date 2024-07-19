const sql = require('mssql')


const config = {
    user: process.env.AZURE_USERNAME,
    password: process.env.AZURE_PASSWORD,
    database: process.env.AZURE_PASSWORD,
    server: process.env.AZURE_DB,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
};
const conn = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});

module.exports = {
    conn: conn,
    sql: sql
}