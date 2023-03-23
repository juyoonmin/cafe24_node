const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended : true }))

router.get('/', (req, res, next) => {    
    //localhost:8002/
    var worktype = req.query.worktype;
    // var selectid = req.query.selectid;
    if(worktype == 'worklist'){    
        try{      
            const dbcon = require('../db/dbconnect');   
            req.body.mapper = 'reactSQL';
            req.body.crud = 'select'; 
            req.body.mapperid = 'workList';
           // res.send(req.body)
            router.use('/',dbcon);
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }       
    }
    else if(worktype == 'write'){
       // res.send('여기까지 문제없음')
        try{
        
            const dbcon = require('../db/dbconnect');
            
            req.body.mapper = 'reactSQL';
            req.body.crud = 'insert'; 
            req.body.mapperid = 'Insert';

            router.use('/',dbcon);
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }  
        
    }
    else if(worktype == 'update'){
        try{
            const dbcon = require('../db/dbconnect');
            
            req.body.mapper = 'reactSQL';
            req.body.crud = 'update'; 
            req.body.mapperid = 'Update';

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
            req.body.mapperid = 'Delete';

            router.use('/',dbcon);
            next('route');
        }
        catch(error){
            console.log("디비연결에 오류")
        }  

        
    }
})


module.exports = router;