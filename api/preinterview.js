const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended : true }))

router.get('/', (req, res, next) => {    
    var type = req.query.type;
    // var selectid = req.query.selectid;    
    if(type == 'list'){    
        try{      
            const dbcon = require('../db/dbconnect');   
            req.body.mapper = 'reactSQL';
            req.body.crud = 'select'; 
            req.body.mapperid = 'faqList';
           // res.send(req.body)
            router.use('/',dbcon);
            //localhost:8002/preinterview
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }       
    }
    else if(type == 'write'){
       // res.send('여기까지 문제없음')
        try{
        
            const dbcon = require('../db/dbconnect');
            
            req.body.mapper = 'reactSQL';
            req.body.crud = 'insert'; 
            req.body.mapperid = 'faqInsert';

            router.use('/',dbcon);
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }  
        
    }
    else if(type == 'update'){
        try{
            const dbcon = require('../db/dbconnect');
            
            req.body.mapper = 'reactSQL';
            req.body.crud = 'update'; 
            req.body.mapperid = 'faqUpdate';

            router.use('/',dbcon);
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }  
       
    }
    else{
        try{
            const dbcon = require('../db/dbconnect');
            
            req.body.mapper = 'reactSQL';
            req.body.crud = 'delete'; 
            req.body.mapperid = 'faqDelete';

            router.use('/',dbcon);
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }  

        
    }
})


module.exports = router;