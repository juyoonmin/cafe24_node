const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbconfig = require('./dbconfig');


const pool = mysql.createPool(dbconfig) // DB 연결

router.use(bodyParser.json());

router.get('/', (req, res) => {

  const modalQuery = `select name from jym_form_table ORDER BY no DESC LIMIT 1`;

  pool.getConnection((err, connection) => {
    if (err) throw console.log(" 이 에러가 보인다면 dB정보 틀린거임  : " + err);

    connection.query(modalQuery, (error, result) => {
      if (error) throw "여기 에러는 sql문 오류" + error + result;
      res.send(result);
    })
    connection.release();

  })
})

router.post('/', (req, res, next) => {

  let reqbody = req.body //미들웨어 실행되어야 가능, 리액트 json 받아옴

  if (!reqbody || !reqbody.body) {
    return
  } else {
    let param = JSON.parse(reqbody.body);

    let language = param.language;
    let company = param.company;
    let email = param.email;
    let email_address = param.email_address;
    let contents = param.contents;

    const formQuery = `insert into jym_form_table (jym_form_id, language, company, email, email_address, contents)
    values (null, '${language}', '${company}', '${email}', '${email_address}','${contents}')`;

    // res.send(formQuery);

    pool.getConnection((err, connection) => {
      if (err) throw console.log(" 이 에러가 보인다면 dB정보 틀린거임  : " + err);

      connection.query(formQuery, (error, result) => {
        if (error) throw "여기 에러는 sql문 오류" + error + result;
        res.send('성공');
      })
      connection.release();

    })

  }

})


module.exports = router;