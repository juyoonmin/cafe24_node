// const express = require('express');
// const dbrouter = express.Router();
// const mysql = require('mysql');


// dbrouter.get('/', (() => {
//   const connection = mysql.createConnection({
//     host: "",
//     port: "",
//     user: "",
//     password: "",
//     database: "",
//   });

//   // 데이터베이스 연결
//   connection.connect();
//   var noticeQuery = "SELECT * FROM jym_preinterview";
//   // create 쿼리문 사용
//   connection.query(noticeQuery, (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//   });

//   connection.query('describe books', (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//   });

//   // 연결 종료
//   connection.end();

// }))


// module.exports = dbrouter;
