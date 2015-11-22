var express = require('express');
var router = express.Router();

var redis = require('../models/redis.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/throw', function(req, res, next) {

    var body = req.body;
    console.log(body);
    var owner = body.owner;
    var type = body.type;
    var content = body.content;
    
    if(!(owner && type && content)){
        return res.json({code: 0, msg: 'Information not complete!'});
    }
    if( type && ['male', 'female'].indexOf(type) === -1){
        return res.json({code: 0, msg:'Type is incorrect!'});
    }
    consoel.log('Now.....checking')
    redis.pick(body, function(result){
       res.json(result);
    });
});

router.get('/pick', function(req,res, next){
    var user = req.query.user;
    var type = req.query.type;
    console.log('user:'+user+'---type:'+type);
    if(!user){
        return res.json({code: 0, msg: 'Info incomplete!'});
    }
    if(!type || ['male', 'female'].indexOf(type) === -1){
        return res.json({code: 0, msg: 'Type incorrect!'});
    }
    
    redis.pick(req.query, function(result){
        console.log(result);
        res.json(result);
    });
});


module.exports = router;
