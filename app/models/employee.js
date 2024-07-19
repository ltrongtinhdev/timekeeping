const  {conn, sql} = require('../../databaseConfig');
const { v4: uuidv4 } = require('uuid');

const Login = async (user) => {
    try {
        const pool = await conn;
        const result = await pool.request()
        .input('USERNAME', sql.NVarChar, user.USERNAME)
        .query('Select * From NHANVIEN Where USERNAME = @USERNAME');
        return result.recordset[0];
    } catch (error) {
        console.log(error);
    }
}

const getList = async () => {
    try {
        const pool = await conn;
        const sqlQuery = "Select * From NHANVIEN";
        const result = await pool.request().query(sqlQuery);
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

const getById = async (id) => {
    try {
        const pool = await conn;
        const sqlQuery = `Select ID, NAME, TOLV, THIETBI From NHANVIEN Where ID = ${id}`;
        const result = await pool.request().query(sqlQuery);
        return result.recordset[0];
    } catch (error) {
        console.log(error);
    }
}

const addNew = async (employee) => {
    try {
        const pool = await conn;
        return await pool.request()
        .input('ID', sql.NVarChar, uuidv4())
        .input('USERNAME', sql.NVarChar, employee.USERNAME)
        .input('FULLNAME', sql.NVarChar, employee.FULLNAME)
        .input('TOLV', sql.NVarChar, employee.TOLV)
        .input('PASS', sql.NVarChar, employee.PASS)
        .input('THIETBI', sql.NVarChar, employee.THIETBI)
        .query('INSERT INTO NHANVIEN (ID, USERNAME, FULLNAME, TOLV, PASS, THIETBI) VALUES(@ID, @USERNAME, @FULLNAME, @TOLV, @PASS, @THIETBI)')
    } catch (error) {
        console.log(error);
    }
}

const Update = async (employee) => {
    try {
        const pool = await conn;
        const sqlQuery = `UPDATE NHANVIEN SET NAME = N'${employee.NAME}', TOLV = N'${employee.TOLV}', PASS = '${employee.PASS}' Where ID = ${employee.ID}`;
        return await pool.request().query(sqlQuery)
    } catch (error) {
        console.log(error);
    }
}

const Delete = async (id) => {
    try {
        const pool = await conn;
        const sqlQuery = `Delete From NHANVIEN Where ID=${id}`;
        return await pool.request().query(sqlQuery);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    Login,
    getList,
    getById,
    addNew,
    Update,
    Delete
}