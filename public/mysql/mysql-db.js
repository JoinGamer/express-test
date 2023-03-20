const mysql = require('mysql');
const mysql_db = require('./mysql_db_config')
const config = mysql_db.setSqlServiceConfig('user_info');
const pool = mysql.createPool({...config.db, connectionLimit: 100})
function query(sql, values, callback) {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sql, values, (err, results) => {
            //每次查询都会 回调
            callback(err, results);
            //只是释放链接，在缓冲池了，没有被销毁
            connection.release();
            if(err) throw error;
        });
    });
}
module.exports = { query }

