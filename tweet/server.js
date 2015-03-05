var path = require('path');
var express = require('express');
var app = express();
var Twitter = require('twit');
var dbCon = require('mongojs').connect('mongodb://bk:bk123@ds061558.mongolab.com:61558/clienttable');
var db = dbCon.collection('tweet');

app.use(express.static(path.join(__dirname, 'publictweet'))); 

var client = new Twitter({
  consumer_key: '9wKcujVrvjQVAnvbojfGNLoGY',
  consumer_secret: 'VgjFAhh5f0EtzMHcOCRTwuPFtIV6jB9VXiCSawdviGCFo5ATmG',
  access_token: '2997059396-8xr9NHG3rAJaZnUOxt1LSWdXqbP8Yhim2h5xXbd',
  access_token_secret: 'kSDhkzwi3W6ltgsHHHCbpLZgCJnOr8k8mcrLp8BlPAuml'
  /*,request_options: {
    proxy: 'http://myproxyserver.com:1234'
  }*/
});

app.get("/tweets",function(req,res){
client.get('favorites/list', function(error, tweets, response){
  if(error)   console.log(error);
  len = tweets.length;
  console.log("Tweets received "+len);
  db.drop(function(err,doc){
			console.log('Delete');
	});
  for(i=0;i<len;i++){
	  db.insert({name : tweets[i].user.name,screenname :tweets[i].user.screen_name ,text : tweets[i].text,count : tweets[i].retweet_count});
	}
	db.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
    console.log('sadasdas');
   
});
	
});
app.listen(3000);

