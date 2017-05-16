/*
 A session object is created when signing in or up is done successfully.
 If there is a token in post request there is search in array of sessions
 with the aim to find the session associated with the token
 */
const nodemailer = require('nodemailer'),
    smtpTransport = require("nodemailer-smtp-transport"),//2 modules to send emails to reset password
    express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator'),
    fs = require('fs'),
    dataModel = require('./model.js');

const Users = dataModel.Users;
const Admin = dataModel.Admin;
const Reviewer = dataModel.Reviewer;
const Sessions = dataModel.Sessions;
const News = dataModel.News;
const Comments = dataModel.Comments;

///middlewares and settings
app.use(bodyParser.json());//separate method call
app.use(expressValidator());// this line must be immediately after any of the bodyParser middlewares!

///middlewares
app.use(express.static('prod'));
app.use(express.static('angularjs'));
app.use(express.static('bootstrap'))

var server = app.listen(3000,function(){

    console.log("Listening to port %s",server.address().port);

});



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});

//      var router = express.Router();

/*
var signin = router.route('/signin');

signin.post(function(req,res,next){

    Users.getUser(req.body.login, req.body.password, function (token,flag) {
        res.send({
                token: token,
                message: "ok",
                flag:(flag==undefined) ?"":flag
            });
    }, next);

});

var signup = router.route('/signup');

signup.post(function(req,res,next){

    Users.add(req.body.login, req.body.password, req.body.salt, function (token) {
            res.send({
                token: token,
                message: "ok"
            });
    },next);

});

var news = router.route('/news');

news.post(function(req,res,next){

    News.getNews(function(newsArray){
        res.send(newsArray);
    },next);

});


app.use('/api', router);
*/

app.post(`/api/signin`,function(req,res,next){
    console.log(`/api/signin`)
    Users.getUser(req.body.login, req.body.password, function (token,flag) {
        return res.send({
            token: token,
            message: "ok",
            flag:(flag==undefined) ?"":flag
        });
    }, next);
})

app.post(`/api/signup`,(req,res,next) =>{
    console.log(`/api/signup`)
    Users.add(req.body.login, req.body.password, req.body.salt, function (token) {
        return res.send({
            token: token,
            message: "ok"
        });
    },next);

})

app.post(`/api/news`,(req,res,next) =>{
    News.getNews(function(newsArray){
        return res.send(newsArray);
    },next);
})




app.use(function(req, res, next) {//check for token in body
    if(req.body.token==undefined)
        return next(`${req.originalUrl}: Error: you are not authorized, sign in or sign up please`);
    return next();
});

app.use(function(req, res, next) {//check for token in body
    for(i=0;i < Object.keys(Sessions.sessions).length;++i){
        if(Sessions.sessions[req.body.token]!=undefined){
            if( Sessions.sessions[req.body.token].expiryDate > new Date().getTime() ){
                res.header("Content-Type", "text/html");

                return next();
            }
            else{
                return next("Error: session has expired")
            }
        }
    }
    return next("Error: invalid token")
});



app.post('/comments',function(req,res,next){
    var news = req.body.news;
    Comments.getAll( function(commentsArray){
        res.send(commentsArray);
    },next,news);

});

app.post('/block',function(req,res,next){
    var id = req.body.id;
    var token = req.body.token;
    var block = req.body.block;
    var user = Sessions.sessions[token].user;
    if(user instanceof Admin)
        Admin.block(id,block,function(){
            res.send({message:"block - "+block});
        },next);
    else{
        next("Error: you are not priviliged to ban")
    }

});

app.post('/delete',function(req,res,next){
    var id = req.body.id;
    var token = req.body.token;
    var user = Sessions.sessions[token].user;
    if(user instanceof Admin)
        Admin.delete(id,function(){
            res.send({message:"deleted - "+id});
        },next);
    else{
        next("Error: you are not priviliged to delete users")
    }

});

app.post('/postComment',function(req,res,next){
    var news = req.body.news;
    var message = req.body.message;
    var token = req.body.token;
    var user = Sessions.sessions[token].user;
    Comments.postComment(user.id,news,message,function(result){
        res.send({message:result});
    },next);

});

app.post('/addNews',function(req,res,next){
    var link = req.body.link;
    var title = req.body.title;
    var description = req.body.description;

    News.addNews(link,title,description,function(result){
        res.send({message:result});
    },next);

});

app.post('/deleteComments',function(req,res,next){
    var id = req.body.id;
    var token = req.body.token;
    var user = Sessions.sessions[token].user;
    if(user instanceof Reviewer)
        Reviewer.delete(id,function(mes){
            res.send({message:mes});
        },next);
    else{
        next("Error: you are not priviliged to delete comments")
    }
});










//post queries to html files
app.post('/:anything',function(req,res,next){
    var file = path.join(__dirname, 'public') +"/html/" + req.params.anything;
    fs.stat(file, function(err, stat) {
        if(err) return next("Error: "+err.code);
            res.sendFile(file);
    });
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.send({message:err});
});


///
///function declarations\expressions
///

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]); // padding
};

function addZero(str){
    var str = str.toString();
    if(str.length==1)
        return '0'+str;
    else return str;
}

