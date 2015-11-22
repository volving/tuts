var redis = require('node-redis');
var uuid = require('node-uuid');

var type = {male: 0, female: 1}


var client = redis.createClient(6379, '127.0.0.1');


function throwBottle(bottle, cb) {
    var client = redis.createClient();
    var bottleId = uuid.v4();
    bottle.time = bottle.time||Date.now();
    
    client.select(type[bottle.type], function(){
        client.hmset(bottleId, bottle, function(err, result){
            if(err){
                return cb({code: 0, msg: 'Wait for a while to continue...'});
            }
            client.expire(bottleId, 86400, function(){
                client.quit();
            });
            cb({code: 1, msg:'Success!'});
        });
    });
}

function pickBottle(info, cb) {
    var client = redis. createClient();
    
    client.select(type[info.type], function(){
       client.randomkey(function(err, bId){
           if(err){
               return cb({code: 0, msg: err});
           }
           if(!bId){
               return cb({code: 1, msg: 'You got a STARFISH'});
           }
           
           client.hgetall(bId, function(err, b){
               if(err){
                   return cb({code: 0, msg: 'Bottle`s already broken!'});
               }
               
               client.del(bottleId, function(){
                   client.quit();
               });
               cb({code: 1, msg: b});
           });
       });
    });
}


module.exports.throw = function(bottle, cb){
    throwBottle(bottle, function(result){
        cb(result);
    });
}

module.exports.pick = function(info, cb){
    if(Math.random()<=0.2){
        return callBack({code: 1, msg:"You got a STARFISH!"});
    }
    pickBottle(info, function(result){
        cb(result);
    });
}
