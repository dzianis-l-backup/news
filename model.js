
var sha1 = require('./sha-1.js');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'tut.by',
    multipleStatements: true//    debug    : true
},'pool');

var settings = {
    expiryDateInterval:30*60*1000//ms  - 30 minutes
}

/*------------------------- Class definition area -------------------------*/

function Users(id, login, isBanned){
    this.id = id;
    this.login = login;
    this.isBanned = isBanned;
};

function Admin(id, login, isBanned){
    var user = Users.apply(this);
    return user;
}

function Reviewer(id, login, isBanned){
    var user = Users.apply(this);
    return user;
}

Admin.__proto__ = Users;

Admin.prototype.__proto__ = Users.prototype;


Reviewer.__proto__ = Users;

Reviewer.prototype.__proto__ = Users.prototype;

Users.getUser = function getUser(login,password,callback,error){

        console.log(`model: Users.getUser`)

        var dbReq = "SELECT  *\
            FROM  `user`\
            WHERE  `login` =  '"+login+"'";

       connection.query(dbReq,function(err,rows){

            if(err){
                return error(`model: Users.getUser: Error: query error: ${err}`);
            }

            if(rows.length==0) {
                return error("model: Users.getUser: No user with login - " + login);
            }

            if(rows.length>1){
                return error("model: Users.getUser: Server side error: duplicate entries- " + login);
            }


           var dbPasHash = rows[0].hashPassword;
           var salt = rows[0].salt;

           var isBanned = rows[0].isBanned;

           login = rows[0].login;
           var id = rows[0].id;

           var computedHash = sha1.hash(password+salt);
           if(computedHash!=dbPasHash)
               return error(`model: User.getUser: Error: password is incorrect`);
           if(isBanned==1)
               return error(`model: User.getUser: Error: the user is banned`);
           else{
               var user;
               var token;
               var dbReq = "SELECT  *\
                FROM  `administrator`\
                WHERE  `user` =  '"+id+"'; " +
                   "SELECT  *\
                FROM  `reviewer`\
                WHERE  `user` =  '"+id+"'; " ;

               connection.query(dbReq,function(err,rows){

                   var flag;
                   if(err){
                       return error(`model: User.getUserError: query error: ${err}`);
                   }

                   if(rows[0][0]!=undefined) {
                       flag = "isAdmin";
                       user = new Admin(id,login,isBanned);
                       token = Sessions.start(user);
                       return callback(token,flag);
                   }

                   if(rows[1][0]!=undefined) {
                       flag = "isReviewer";
                       user = new Reviewer(id,login,isBanned);
                       token = Sessions.start(user);
                       return callback(token,flag);
                   }
                   user = new Users(id,login,isBanned);
                   token = Sessions.start(user);
                   callback(token);
           })
           }
       });
        

};

Users.add = function(login,password,salt,callback,error){

    console.log(`model: Users.add`)

        var dbReq = "SELECT  *\
            FROM  `user`\
            WHERE  `login` =  '"+login+"'";

        connection.query(dbReq,function(err,rows){

            if(err){
                return error("Error: query error");
            }

            if(rows.length!=0) {
                return error("Error: such a user already exists - "+login);
            }

            else{



                /*dbReq = "INSERT INTO `User` (`id`,`login`, `passwordHash`, `salt`, `name`, `surname`, `address`) VALUES ( null ,'"+login+"','"+sha1.hash(password+salt)+"','"+salt+"','"+name+"','"+surname+"','"+address+"')";

                connection.query(dbReq, function (err, rows) {
                    if (err)
                        throw("Error: query error");

                    var dbReq = "SELECT  *\
                        FROM  `User`\
                        WHERE  `login` =  '"+login+"'";

                    connection.query(dbReq, function (err, rows) {
                        if (err)
                            throw("Error: no user with login - "+login);

                        var id = rows[0].id;
                        var login = rows[0].login;
                        var name = rows[0].name;
                        var surname = rows[0].surname;
                        var address = rows[0].address;

                        var user = new Users(id,login,name,surname,address);
                        var token = Sessions.start(user);
                        callback(token);
                    });
                });*/
                var dbReq = "INSERT INTO `user` (`id`,`login`, `hashPassword`,`salt`, `isBanned`)" +
                    " VALUES ( null ,'"+login+"','"+sha1.hash(password+salt)+"','"+salt+"',"+0+") ; " +
                    "SELECT  *\
                        FROM  `user`\
                        WHERE  `login` =  '"+login+"'";
                connection.query(dbReq, function (err, rows) {
                    if (err)
                        return error("Error: no user with login - "+login);

                    var id = rows[1][0].id;
                    login = rows[1][0].login;
                    var isBanned = rows[1][0].isBanned;

                    var user = new Users(id,login,isBanned);
                    var token = Sessions.start(user);
                    callback(token);
                });


            }
        });
};

Admin.delete = function(id,callback){//,password,

        /*var dbReq = "SELECT  *\
            FROM  `User`\
            WHERE  `login` =  '"+login+"'";

        connection.query(dbReq,function(err,rows){

            if(err){
                throw("Error: query error");
            }

            if(rows.length==0) {
                throw("No user with login - " + login);
            }

            if(rows.length>1){
                throw("Server side error: duplicate entries - " + login);
            }

            var dbPasHash = rows[0].passwordHash;
            var salt = rows[0].salt;
            var password = rows[0].password;
            var name = rows[0].name;
            var surname = rows[0].surname;
            var address = rows[0].address;
            var login = rows[0].login;
            var id = rows[0].id;

            var computedHash = sha1.hash(password+salt);
            if(computedHash!=dbPasHash)
                throw("Error: password is incorrect");
            else{
                var tokens = Object.keys(Sessions.sessions);
                for(i=0;i<tokens.length;++i){
                    if(Sessions.sessions[tokens[i]].user.id==id)
                        delete Sessions.sessions[tokens[i]];
                }

                var dbReq = "DELETE FROM `User` WHERE id = '"+id+"'";
                connection.query(dbReq,function(err,rows){
                    if(err) throw("Error: the user has not been deleted");
                    else{
                           callback();
                        }
                    });
            }
        });*/
    var dbReq = "DELETE FROM `user` WHERE id = '"+id+"'";
    connection.query(dbReq,function(err,rows){
        if(err) return error("Error: the user has not been deleted");
        else{
            var tokens = Object.keys(Sessions.sessions);
            for(i=0;i<tokens.length;++i){
                if(Sessions.sessions[tokens[i]].user.id==id)
                    delete Sessions.sessions[tokens[i]];
            }
            callback();
        }
    });

};

Admin.block = function(id,block,callback,error){
    var dbReq = "UPDATE `user` SET `isBanned`= " +block+
        " WHERE id = "+id;
    connection.query(dbReq,function(err,rows){
        if(err) return error("Error: the user has not been blocked "+block);
        callback()
    });
}

Reviewer.delete = function(id,callback,error){
    var dbReq = "DELETE FROM `Comment` WHERE id = "+id;
    connection.query(dbReq,function(err,rows){
        if(err) return error("Error: query error");
        return callback("comment deleted");
    });
}



function Sessions(user){
    this.user = user;
    this.expiryDate = settings.expiryDateInterval + new Date().getTime();//in ms
    this.token = sha1.hash(this.expiryDate);//sha1 based on expiry date
    Sessions.sessions[this.token]=this;
}

Sessions.sessions = {};

Sessions.start = function(user,device){
    var session = new Sessions(user);
    return session.token;
};

Sessions.prototype.get = function(){
    return this.token;
};

Sessions.stop = function(token){
    delete Sessions.sessions[token];
    return;
};

Sessions.prototype.stop = function(){
    delete Sessions.sessions[this.token];
    return;
};

function News(id, link, title, description){
    this.id = id;
    this.link = link;
    this.title = title;
    this.description = description;
}

News.getNews = function(callback,error){
    console.log(`News.getNews`)
    var dbReq = "Select * from News";
    connection.query(dbReq,function(err,rows){
        if(err) return error("Error: query error");
        var newsArray = [];
        for(i=0;i<rows.length;++i){
            newsArray.push({
                id:rows[i].id,
                link:rows[i].link,
                title:rows[i].title,
                description:rows[i].description,
            });
        }

        return callback(newsArray);
    });
}


News.addNews = function(link,title,description,callback,error){
    console.log('News.addNews')
    var dbReq = "INSERT INTO `news`(`id`, `link`, `title`, `description`) VALUES (null,'"+link+"','"+title+"','"+description+"')";
    connection.query(dbReq,function(err,rows){
        if(err) return error(`Error: query error: ${err}`);
        return callback("news added");
    });
}

function Comments(id , user , message){
    this.id = id;
    this.user = user;
    this.message = message;
}

Comments.getAll = function(callback,error,news){
    var dbReq = "Select * from Comment where news = " +news;
    connection.query(dbReq,function(err,rows){
        if(err) return error("Error: query error");
        var commentsArray = [];
        for(i=0;i<rows.length;++i){
            commentsArray.push({
                id:rows[i].id,
                user:rows[i].user,
                message:rows[i].message
            });
        }

        return callback(commentsArray);
    });
}

Comments.postComment = function(user,news,message,callback,error){
    var dbReq = "INSERT INTO `Comment`(`id`, `user`, `news`, `message`) VALUES (null,"+user+","+news+",'"+message+"')";
    connection.query(dbReq,function(err,rows){
        if(err) return error("Error: query error");
        return callback("posted");
    });
}

module.exports = {
    Users:Users,
    Admin:Admin,
    Reviewer:Reviewer,
    Sessions:Sessions,
    News:News,
    Comments:Comments
}

