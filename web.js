const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8002;

const preinterview = require('./api/preinterview');
const work = require('./api/work')
const contact = require('./api/contact')



app.use(express.static( path.join(__dirname, 'public')))
//리액트 요청주소
// 1. axios.post('/notice/') -> 404에러난다. 주소
// 2. 리액트 get -> 노드에서 get | 리액트 post -> 노드 post -> 404에러의 원인
app.use('/preinterview', preinterview);
app.use('/work', work);
//localhost:8002/work
app.use('/contact', contact)

app.get('/',function(req, res){
    res.sendFile( path.join(__dirname, 'public/index.html'))
})
//라우터없다면


app.listen(PORT, () => {
   console.log( `${PORT} 노드서버구동정상` )
})