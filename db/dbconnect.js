const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // node 16버전에서는 express로 편입 호출필요없음
const router = express.Router();
const dbconfig = require('./dbconfig'); //db정보 외부로 빼주기 깃허브에 올리지않도록 처리하기

var mybatisMapper = require('mybatis-mapper'); // sql저장해둔  xml 접근 모듈

mybatisMapper.createMapper(['/home/hosting_users/greensn7451/apps/greensn7451_goaxhfl0109/mapper/reactSQL.xml']) // 다양한 플랫폼에서 쓸 수 있는 xml파일
var format = { language : 'sql', indent : '  '} // 노드가 쓸때 xml에 담아둔 정보가 sql언어이며, 띄어쓰기하기

// /home/hosting_users/greensn7451/apps/greensn7451_goaxhfl0109/mapper/reactSQL.xml

router.use(bodyParser.json());


const conn = mysql.createPool(dbconfig)

router.get('/', (req, res) => {
  var params = req.body;
  console.log('req.body.body 즉 요청데이터타입 : ', typeof params);
  console.log('req.body.body 요청데이터  : ', params);



   var noticeQuery = mybatisMapper.getStatement( 
                    params.mapper, //이전 라우터에서 추가한 정보
                    params.mapperid, //이전 라우터에서 추가한 정보
                    params, // 리액트가 던져준거 
                    format  // sql언어이고 들어쓰기 하기
    ); // xml에서 가져와서 쿼리문 생성

  // var listQuery = ` select *
  //                     from
  //                     jym_preinterview
  //                     order by
  //                     id desc                       
  //                       `
  // var worklistQuery = ` select *
  //                       from
  //                       jym_work
  //                       order by
  //                       id desc                       
  //                         `


  // console.log(listQuery)


  conn.getConnection((err, connection) => {
    if (err) throw console.log(" 이 에러가 보인다면 dB정보 틀린거임  : " + err);
    // params.mapperid === 'faqList' ? (

    connection.query(noticeQuery, (error, result) => {

      if (error) throw "여기 에러는 sql문 오류" + error + result; // result를 받지 못하는 상황

      if (params.crud === 'select') {
        res.send(result);
        //axios의 then의 매개인자로~전달               
        console.log('타입 : ', typeof result, ' 전송데이터 : ', result)

      } else {
        console.log("crud : select외 실행", params.crud)
        res.send("success");
      }

    })
    // ) : (
    // connection.query(worklistQuery, (error, result) => {

    //   if (error) throw "여기 에러는 sql문 오류" + error + result; // result를 받지 못하는 상황

    //   if (params.crud === 'select') {
    //     res.send(result);
    //     //axios의 then의 매개인자로~전달               
    //     console.log('타입 : ', typeof result, ' 전송데이터 : ', result)

    //   } else {
    //     console.log("crud : select외 실행", params.crud)
    //     res.send("success");
    //   }

    // })
    // )
    connection.release(); // 위의 연결 끝내기 그래야 다음 서버 접속자 대기에서 사용으로

  })

})


module.exports = router;