var express = require('express');
var cp = require('cookie-parser');

var app = express();
app.use(cp());

app.get('/', function(req, res){
	if(req.cookies.isVisit){
		console.log(req.cookies);
		res.send('Welcome back!');
	}else{
		res.cookie('isVisit', 1, {maxAge: 60*1000});
		res.send('Welcome!');
	}
});


app.listen(8008);
