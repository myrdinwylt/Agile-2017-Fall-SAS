var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , redis = require("redis")
  , client = redis.createClient()

  var server=require('http').Server(app);
  var i=0

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

server.listen(80); 

app.post('poll',function(req,res){
    var y=0;
    var n=0;
    var D = new Date();
    var v=process.env.PORT || 3000
    if(v.indexOf("put")>-1  ){
    client.set(D, process.env.PORT || 3000);
    i+=1
    if(v.indexOf("yes")>-1  ){
        y++;
    }
    else if(v.indexOf("no")>-1  ){
        n++;
    }

   // console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
}
else if(v.indexOf("get")>-1){
res.send(y,n)
}
})