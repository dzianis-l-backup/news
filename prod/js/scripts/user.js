var today = new Date(); //- today!
//algorithm
//-2) addTodayProperty() - date of 00:00 kind - for selection on date basics
//-1) createTodayArrayOnToday() - to collect users with the same today param
//0) copyUser() createUsersForGraphs() - to create new array with users with today and interval properties and build a plot;[[],[],[]]
//1) select time period (user) "defineDaytimePeriod()" "filterUserByDaytime()"
//2) deleteDuplicates "createFakes()" //not needed to be sorted and not needed to delete duplicates
//3) sort "createFakes()" - ? not needed ?
//4) create fakes "createFakes()" end is not needed we calculated interval
//5) retrieve data from the rest users "retrieveData()"

//note: sun !=0 sun = 7
function _2_digits(num){
    num= num + ".0"
    return    num.toString().substr(0,num.toString().indexOf('.')+3);
};
function digitsBeforeDot(num){
    num= num + ".0"
    return   num.toString().substr(0,num.toString().indexOf('.'));
};
function round(num){
    num = num + ".0"
    var numR = new Number(num.toString().substr(0,num.toString().indexOf('.')+2));
    var numZ = new Number(num.toString().substr(0,num.toString().indexOf('.')));
    var res;
    if(numR-numZ>=0.5){
        res = numZ + 1;
    }
    else res = numZ;
    return res;
};
function  addZero(number){
    if(number.toString().length==1)
        return '0'+number;
    else return number;
}

function getStart(){
    var date = new Date(this.start);
    return "" + addZero(date.getHours())+":"+addZero(date.getMinutes());
};
function getEnd(){
    var date = new Date(this.end);
    return "" + addZero(date.getHours())+":"+addZero(date.getMinutes());
};
function getX(){
    var date = new Date(this.start);return  date.getDay()==0 ? 7 : date.getDay();
};
function getY(){
    var stamp = this.interval;
    return stamp/(1000*60);
};
function getXMonth(){
    var date = new Date(this.start);return  date.getDate();
};
function getYAngle(){
    return this.maxAngle;
};
function getDate(){
    var date = new Date(this.start);
    return "" + addZero(date.getMonth()+1)+"/" + addZero(date.getDate()) +"/"+ (date.getFullYear());
};
function getDateText(i){
    switch(i){
        case 1:
            return "Mon";
        break;
        case 2:
            return "Tue";
            break;
        case 3:
            return "Wed";
            break;
        case 4:
            return "Thu";
            break;
        case 5:
            return "Fri";
            break;
        case 6:
            return "Sat";
            break;
        case 7:
            return "Sun";
            break;
        default:
            return undefined;
            break;
    }
};
function getMaxY(xy){
    if(xy==null||xy==undefined) return;
    var maxY = xy.reduce(function(max,item){
        if(max.y<item.y)
            max = item;
        return max;
    });
    return maxY;
};
function getMaxX(xy){
    if(xy==null) return;
    var maxX = xy.reduce(function(max,item){
        if(max.x<item.x)
            max = item;
        return max;
    });
    return maxX;
};
function getMaxYAngle(xy){
    if(xy==null||xy==undefined) return;
    var maxY = xy.reduce(function(max,item){
        if(max.y2<item.y2)
            max = item;
        return max;
    });
    return maxY;
};

function compareUser(a,b){
    if(a.getX() < b.getX())
        return -1;
    if(a.getX()> b.getX())
        return 1;
    if(a.getX() == b.getX())
        return 0;
}

function compareUserByToday(a,b){
    if(a.today < b.today)
        return -1;
    if(a.today > b.today)
        return 1;
    return 0;
}
function compareUserByStart(a,b){
    if(a.start < b.start)
        return -1;
    if(a.start > b.start)
        return 1;
    return 0;
}
//addition or changing properties_______________________________________________________________________________________
function addTodayProperty(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
        var date = new  Date(item.start);
        item.today = new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime();
    });
    return arr;
};

function changeOnGetX(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
        item.getX = getX;
    });
    return arr;
};
function changeOnGetXMonth(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
       item.getXMonth = getXMonth;
    });
    return arr;
};
function addGetStart(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
        item.getStart = getStart;
    });
    return arr;
};
function addGetEnd(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
        item.getEnd = getEnd;
    });
    return arr;
};
function addGetDate(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
        item.getDate = getDate;
    });
    return arr;
};
function addGetY(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
        item.getY = getY;
    });
    return arr;
};
function addGetYAngle(arr){
    if(arr==null||arr==undefined)
        return undefined;
    arr.forEach(function(item,i,self){
        item.getYAngle = getYAngle;
    });
    return arr;
};

//______________________________________________________________________________________________________________________



function createTodayArrayOnToday(arr){
    if(arr==null||arr==undefined)
        return undefined;
    if(arr.length==1){
        var user = arr[0];
        var a1 = [];
        var a = [];
        a1.push(user);
        a.push(a1);
        return a;
    }
    var sortedUsersByToday = arr.sort(compareUserByToday);
    var arrayUsersByToday = [];
    for(i = 0; i <  sortedUsersByToday.length;){//the last item is not included // i - for user array j - for array of arrays
        var a = [];
        a.push(sortedUsersByToday[i]);
        for(;sortedUsersByToday[i+1]!=undefined && sortedUsersByToday[i].today==sortedUsersByToday[i+1].today;) {
            a.push(sortedUsersByToday[i + 1]);
            ++i;
        }
        arrayUsersByToday.push(a);++i;
    }
    return arrayUsersByToday;
}

function copyUser(obj){
    var newUser = {};
    for(key in obj){
        newUser[key] = obj[key];
    }
    return newUser;
}

function createUsersForGraphs(arr){//[[],[],[]]
    if(arr==null||arr==undefined)
        return undefined;
    var users = [];
    arr.forEach(function(item,i,self){
        var interval = 0;
        for(j = 0; j< item.length ; ++j){
            interval += item[j].end-item[j].start;
        }//calculate interval for the same day (today property)
        var newUser = copyUser(item[0]);//user with today property already,
        newUser.interval = interval;
        users.push(newUser);
    });
    return users;
}

function defineDaytimePeriod(){
    var dayNow = today.getDay();
    if(dayNow==0)
        dayNow = 7;//sunday is represented as 7
    var _1Day = new Date(today-(dayNow+6-weekCounter*7)*24*60*60*1000);//
    _1Day = new Date(_1Day.getFullYear(),_1Day.getMonth(),_1Day.getDate());
    var _7Day =  new Date(today-(dayNow-weekCounter*7)*24*60*60*1000);//
    _7Day = new Date(_7Day.getFullYear(),_7Day.getMonth(),_7Day.getDate(),23,59,59,999);
    return {_1:_1Day.getTime(),_7:_7Day.getTime()};
};
function filterUserByDaytime(data,_1_7){
    var mas = data.filter(function(item,i,arr){
        return (item.start>_1_7._1 && item.start < _1_7._7);
    });
    return mas;
};

function defineDaytimePeriodMonth(){
    var dayNow = today.getDate()
    var _7Day = new Date(today-(dayNow)*24*60*60*1000);
    for(t=0;t<+Math.abs(monthCounter);++t){
        dayNow = _7Day.getDate();
        if(monthCounter<0){
            _7Day = new Date(_7Day.getTime()-(dayNow)*24*60*60*1000);
        }
        else{
            var firstDay = new Date(_7Day.getTime()+(1)*24*60*60*1000);//we are always on the last day of the month
            _7Day = new Date(firstDay.getFullYear(),(firstDay.getMonth()+1) ,0);
        }

    }

    _7Day = new Date(_7Day.getFullYear(),_7Day.getMonth(),_7Day.getDate(),23,59,59,999);
    var _1Day = new Date(_7Day.getTime()-(_7Day.getDate()-1)*24*60*60*1000);
    _1Day = new Date(_1Day.getFullYear(),_1Day.getMonth(),_1Day.getDate());
    return {_1:_1Day.getTime(),_7:_7Day.getTime()};
};


function deleteDuplicateSortFakeCopyUsers(arr){//one game a day
    if (arr==null || arr == undefined || arr.length==1)
        return arr;
    arr.sort(compareUser);
    for(i = 1 ; i < arr.length ; ++i)
        if(arr[i].getX()==arr[i-1].getX())
            arr[i-1]=null;
    var unique = arr.filter(function(item,i,self){
        return item!=null;
    });
    return unique;
};
function createFakes(arr){
    if (arr==null || arr == undefined)
        return;
    var days = [1,2,3,4,5,6,7];
    var users = arr;//deleteDuplicateSortFakeCopyUsers(arr);
    var withFakes = [];
    for(i=0,j=0; i < days.length;++i){
        if(j<users.length)
            if(days[i]==users[j].getX()){
                withFakes.push(users[j])
                j++;
                continue;
            }
        //else
        var fakeUser = {
            start:0,
            end:0,
            getStart: getStart,
            getEnd: getEnd,
            getX: getX,
            getY: getY
        };
        var dayNow = today.getDay();
        if(dayNow==0)
            dayNow = 7;//sunday is represented as 7
        var day = new Date(today-(dayNow+6-i)*24*60*60*1000);
        day = new Date(day.getFullYear(),day.getMonth(),day.getDate());
        fakeUser.start = fakeUser.end = day.getTime();
        fakeUser.interval = 0;//additional
        fakeUser.today = day.getTime();//additional
        withFakes.push(fakeUser);
    }
    return withFakes;
};
function createFakesMonth(arr){
    if (arr==null || arr == undefined)
        return;
    var _1_7 = defineDaytimePeriodMonth();
    var firstDay = new Date(_1_7._1);//the first day om the last month
    var daysQuantity = new Date(_1_7._7).getDate();
    var days = [];
    for(k=1;k<=daysQuantity;++k){
        days.push(k);
    }
    var users = arr;//deleteDuplicateSortFakeCopyUsers(arr);
    var withFakes = [];
    for(i=0,j=0; i < days.length;++i){
        if(j<users.length)
            if(days[i]==users[j].getXMonth()){
                withFakes.push(users[j])
                j++;
                continue;
            }
        //else
        var fakeUser = {
            start:0,
            end:0,
            getStart: getStart,
            getEnd: getEnd,
            getXMonth:getXMonth,
            getX: getX,
            getY: getY
        };

        fakeUser.start = fakeUser.end = firstDay.getTime()+i*24*60*60*1000;
        fakeUser.interval = 0;//additional
        fakeUser.today = fakeUser.start;//additional
        withFakes.push(fakeUser);
    }
    return withFakes;
};

function createFakesAngle(arr){
    if (arr==null || arr == undefined)
        return;
    var days = [1,2,3,4,5,6,7];
    var users = arr;//deleteDuplicateSortFakeCopyUsers(arr);
    var withFakes = [];
    for(i=0,j=0; i < days.length;++i){
        if(j<users.length)
            if(days[i]==users[j].getX()){
                withFakes.push(users[j])
                j++;
                continue;
            }
        //else
        var fakeUser = {
            start:0,
            end:0,
            minAngle:0,
            maxAngle:0,
            getStart: getStart,
            getEnd: getEnd,
            getX: getX,
            getY: getY,
            getYAngle: getYAngle
        };
        var dayNow = today.getDay();
        if(dayNow==0)
            dayNow = 7;//sunday is represented as 7
        var day = new Date(today-(dayNow+6-i)*24*60*60*1000);
        day = new Date(day.getFullYear(),day.getMonth(),day.getDate());
        fakeUser.start = fakeUser.end = day.getTime();
        fakeUser.interval = 0;//additional
        fakeUser.today = day.getTime();//additional
        withFakes.push(fakeUser);
    }
    return withFakes;
};
function createFakesAngleMonth(arr){
    if (arr==null || arr == undefined)
        return;
    var _1_7 = defineDaytimePeriodMonth();
    var firstDay = new Date(_1_7._1);//the first day om the last month
    var days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    var users = arr;//deleteDuplicateSortFakeCopyUsers(arr);
    var withFakes = [];
    for(i=0,j=0; i < days.length;++i){
        if(j<users.length)
            if(days[i]==users[j].getXMonth()){
                withFakes.push(users[j])
                j++;
                continue;
            }
        //else
        var fakeUser = {
            start:0,
            end:0,
            minAngle:0,
            maxAngle:0,
            getStart: getStart,
            getEnd: getEnd,
            getXMonth:getXMonth,
            getX: getX,
            getY: getY,
            getYAngle: getYAngle
        };
        fakeUser.start = fakeUser.end = firstDay.getTime()+i*24*60*60*1000;
        fakeUser.interval = 0;//additional
        fakeUser.today = fakeUser.start;//additional
        withFakes.push(fakeUser);
    }
    return withFakes;
};

function retrieveData(data){
    var _x_y = data.map(function(item,i,self){
        return {x:item.getX(),y:item.getY()};
    });
    return _x_y;
};
function retrieveDataMonth(data){
    var _x_y = data.map(function(item,i,self){
        return {x:item.getXMonth(),y:item.getY()};
    });
    return _x_y;
};
function retrieveDataAngle(data){
    var _x_y = data.map(function(item,i,self){
        return {x:item.getX(),y1:item.minAngle,y2:item.maxAngle};
    });
    return _x_y;
};
function retrieveDataAngleMonth(data){
    var _x_y = data.map(function(item,i,self){
        return {x:item.getXMonth(),y1:item.minAngle,y2:item.maxAngle};
    });
    return _x_y;
};
function createArraySingleUserOneGameWeek(data){//copy of users will be created
    if (data==null || data == undefined)
        return;
    var _1_7 = defineDaytimePeriod();
    var fDaytime = filterUserByDaytime(createdUsersForGraphs(data),_1_7);
    var fFakes = createFakes(fDaytime);
    var _x_y = retrieveData(fFakes);
    _x_y = checkY(_x_y);
    return _x_y;
};

function createArraySingleUserOneGameMonth(data){//copy of users will be created
    if (data==null || data == undefined)
        return;
    var _1_7 = defineDaytimePeriodMonth();
    var fDaytime = filterUserByDaytime(createdUsersForGraphs(data),_1_7);
    var fFakes = createFakesMonth(fDaytime);
    var _x_y = retrieveDataMonth(fFakes);
    _x_y = checkY(_x_y);
    return _x_y;
};

function createArraySingleUserOneGameAngle(data){//copy of users will be created
    if (data==null || data == undefined)
        return;
    var _1_7 = defineDaytimePeriod();
    var fDaytime = filterUserByDaytime(createdUsersForGraphs(data),_1_7);
    var fFakes = createFakesAngle(fDaytime);
    var _x_y = retrieveDataAngle(fFakes);
    _x_y = checkYAngle(_x_y);
    return _x_y;
};
function createArraySingleUserOneGameAngleMonth(data){//copy of users will be created
    if (data==null || data == undefined)
        return;
    var _1_7 = defineDaytimePeriodMonth();
    var fDaytime = filterUserByDaytime(createdUsersForGraphs(data),_1_7);
    var fFakes = createFakesAngleMonth(fDaytime);
    var _x_y = retrieveDataAngleMonth(fFakes);
    _x_y = checkYAngle(_x_y);
    return _x_y;
};
function createdUsersForGraphs(data){//returns arr of arrs [[] [] []]
    if (data==null || data == undefined)
        return;
    var usersWithToday = addTodayProperty(data);
    var arrOfArr = createTodayArrayOnToday(usersWithToday);
    return createUsersForGraphs(arrOfArr);
}
function checkY(_x_y){
    return _x_y.map(function(item,i,self){
        if(item.y<0)
            item.y=0;
        //if(item.y>60)
            //item.y=60;
        return item;
    });
};
function checkYAngle(_x_y){
    return _x_y.map(function(item,i,self){
        if(item.y1<0)
            item.y=0;
        if(item.y2<0)
            item.y=0;
        if(item.y1>item.y2)
            item.y1=item.y2=0;
        //if(item.y2>40)
        //    item.y2=40;
        return item;
    });
};

//angular part__________________________________________________________________________________________________________
var app = angular.module("userApp",[]);
var userId = sessionStorage.getItem("patient_id");
var user = [];
/*var user = [
    {

        start:1459307600000,
        end:1459308970000,
        game:"Strongman",
        score:300,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {

        start:1459307600000,
        end:1459308970000,
        game:"Strongman",
        score:300,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {

        start:1459307600000,
        end:1459308970000,
        game:"Strongman",
        score:300,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },

    {


        start:1458507600000,
        end:1458507870000,

        game:"Strongman",
        score:301,
        minAngle:1,
        maxAngle:1,
        color:"#F01A9E"
    },
    {

        start:1458680400000,
        end:1458680500000,

        game:"Strongman",
        score:303,
        minAngle:2,
        maxAngle:1,
        color:"#F01A9E"
    },
    {


        start:1458766800000,
        end:1458766900000,

        game:"Strongman",
        score:304,
        minAngle:3,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458853200000,
        end:1458853300000,

        game:"Strongman",
        score:305,
        minAngle:4,
        maxAngle:5,
        color:"#F01A9E"
    },

    {


        start: 1458939600000,
        end: 1458939700000,

        game: "Strongman",
        score: 307,

        minAngle: 4,
        maxAngle: 5,
        color: "#F01A9E"
    },
    {


        start: 1457470800000,
        end: 1457470900000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start: 1457557200000,
        end:1457557300000,

        game:"Strongman",
        score:307,
        minAngle:2,
        maxAngle:5,
        color:"#F01A9E"
    },
    {

        start:1457989200000,
        end:1457989900000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458075600000,
        end:1458079700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458163000000,
        end:1458162000000,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458248400000,
        end:1458248500000,
        getStart: getStart,
        getEnd: getEnd,
        getX:getX,
        getY:getY,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458334800000,
        end:1458334900000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458939600000,
        end:1458939700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458507600000,
        end:1458507700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458594000000,
        end:1458595000000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458680400000,
        end:1458680500000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458939600000,
        end:1458939700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458939600000,
        end:1458939700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458939600000,
        end:1458939700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458939600000,
        end:1458939700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458939600000,
        end:1458939700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1458939600000,
        end:1458939700000,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {
        start:1460310149000,
        end:1460321999000,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    //////////////////////////////////////////////////////////new user's data added
    {


        start:1460996139720,
        end:1460996239720,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1460909739720,
        end:1460910739720,

        game:"Strongman",
        score:307,
        minAngle:11,
        maxAngle:24,
        color:"#F01A9E"
    },
    {


        start:1460823339720,
        end:1460823439720,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:23,
        color:"#F01A9E"
    },
    {


        start:1460736939720,
        end:1460737039720,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:25,
        color:"#F01A9E"
    },
    {


        start:1460650539720,
        end:1460650639720,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1460564139720,
        end:1460564239720,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },
    {


        start:1460477739720,
        end:1460477839720,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1460391339720,
        end:1460392339720,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1460304939720,
        end:1460305939720,

        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    }
    ,{


        start:1460218539720,
        end:1460218639720,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    } ,{


        start:1460132139720,
        end:1460132239720,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1460045739720,
        end:1460045749720,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459959339720,
        end:1459959439720,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459872939720,
        end:1459873039720,

        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459786539720,
        end:1459786639720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459700139720,
        end:1459700339720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459613739720,
        end:1459614739720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459527339720,
        end:1459527539720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459440939720,
        end:1459441039720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459354539720,
        end:1459355539720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459268139720,
        end:1459269139720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459181739720,
        end:1459182739720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459181739720,
        end:1459181839720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459181739720,
        end:1459182739720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459095339720,
        end:1459096339720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1459008939720,
        end:1459009039720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1458922539720,
        end:1458923539720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1458836139720,
        end:1458837139720,
        game:"Balloon",
        score:307,
        minAngle:11,
        maxAngle:25,
        color:"#F01A9E"
    },{


        start:1458749739720,
        end:1458749939720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:35,
        color:"#F01A9E"
    },{


        start:1458663339720,
        end:1458664339720,
        game:"Strongman",
        score:307,
        minAngle:3,
        maxAngle:5,
        color:"#F01A9E"
    }
    ,{


        start:1458576939720,
        end:1458577039720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:45,
        color:"#F01A9E"
    },{


        start:1458490539720,
        end:1458491539720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    }
    ,{


        start:1458404139720,
        end:1458405139720,
        game:"Balloon",
        score:307,
        minAngle:1,
        maxAngle:5,
        color:"#F01A9E"
    },{


        start:1458317739720,
        end:1458317839720,
        game:"Strongman",
        score:307,
        minAngle:2,
        maxAngle:5,
        color:"#F01A9E"
    }
    ,{


        start:1458231339720,
        end:1458232339720,
        game:"Strongman",
        score:307,
        minAngle:1,
        maxAngle:6,
        color:"#F01A9E"
    }
    /*
    1458144939720,
    1458058539720,
    1457972139720,
    1457885739720,
    1457799339720,
    1457712939720,
    1457626539720,
    1457540139720,
    1457453739720,
    1457367339720,
    1457280939720,
    1457194539720,
    1457108139720,
    1457021739720,
    1456935339720,
    1456848939720,
    1456762539720



];*/
var games = [

];
var userForGraph = [{
    start:0,
    end:0,
    getStart: getStart,
    getEnd: getEnd,
    getXMonth:getXMonth,
    getX: getX,
    getY: getY
}];
app.controller("userController",["$scope",function($scope){

    //adding properties
    $scope.user=[];
    $scope.userId = "USER ID: " + (sessionStorage.getItem("patient_id")==undefined ? "":sessionStorage.getItem("patient_id"));
    $scope.currentPage = 0;
    $scope.numPerPage = 7;
    $scope.totalPages = ($scope.user.length-$scope.user.length % $scope.numPerPage)/  $scope.numPerPage+1;
    $scope.userSelected = [].sort(compareUserByStart);
    $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage ) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;
        $scope.userSelected = $scope.user.slice(begin, end);
    });
    $scope.$watch(function(){return $scope.user}, function(newV,oldV) {//changes only when data are loaded and only then
        if(newV==undefined)
            return;
        $scope.totalPages = ($scope.user.length-$scope.user.length % $scope.numPerPage)/  $scope.numPerPage+1;
        $scope.userSelected =  newV.slice(0,$scope.numPerPage);
    });
    $scope.next = function(){
        $scope.currentPage = (++$scope.currentPage) % $scope.totalPages
    };
    $scope.prev = function(){
        $scope.currentPage = ($scope.currentPage+$scope.totalPages -1) %$scope.totalPages
    };
    $scope.$watch(function(){return $scope.gameSelected}, function(newV,oldV) {
        if(newV==null || newV == undefined)
            return;
        userForGraph = $scope.user.filter(function(item,i,self){
            if(newV.toLowerCase()==item.game.toLowerCase())
                return item;
        });
        weekCounter=0;
        monthCounter=0;
        buildGraphs();
        week.click();
    });


    //games querry
    getGamesForPatient($scope);
    //details
    $scope.sortDateAsce= function(){
        var data = $scope.userSelected;
        if(data == null)
            return;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.start - data[j].start;
                if(res>0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.userSelected = data;
    };
    $scope.sortDateDesc= function(){

        var data = $scope.userSelected;
        if(data == null)
            return;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = (user.start - data[j].start);
                if(res<0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.userSelected = data;
    };

    $scope.sortGameAsce= function(){
        var data = $scope.userSelected;
        if(data == null)
            return;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.game.toLowerCase().localeCompare(data[j].game.toLowerCase());
                if(res>0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.userSelected = data;
    };
    $scope.sortGameDesc= function(){

        var data = $scope.userSelected;
        if(data == null)
            return;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.game.toLowerCase().localeCompare(data[j].game.toLowerCase());
                if(res<0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.userSelected = data;
    };
}]);
//______________________________________________________________________________________________________________________
function getPatientStat(scope){
    var userId = sessionStorage.getItem("patient_id");
    if (userId == undefined) {
        error();
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200)
                success(this);
            else error(this.responseText)
        }
    }
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        error(this.responseText);
    }
        var dbReq = "SELECT * FROM  `patient_statistics` WHERE  `patient_id` =  '"+userId+"'";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
    function success(obj){
        var data = JSON.parse(obj.responseText);
        if(data == undefined)
            alert("no data");
        else {
            scope.user = data.map(function(item){
                var u = {};
                var dayArray = item.day.split("-");
                var day = dayArray[2].split("T")[0];
                dayArray[2] = day;
                var startArray = item.start_time.split(":");
                var endArray = item.end_time.split(":");
                var start = new Date(dayArray[0],dayArray[1]-1,dayArray[2],startArray[0],startArray[1],startArray[2]);
                var end = new Date(dayArray[0],dayArray[1]-1,dayArray[2],endArray[0],endArray[1],endArray[2]);
                u.start=start.getTime();
                u.end=end.getTime();
                u.game=item.game_name;
                u.score=item.score;
                u.minAngle=item.minangle;
                u.maxAngle=item.maxangle;
                u.getStart= getStart;
                u.getEnd= getEnd;
                u.getXMonth=getXMonth;
                u.getX= getX;
                u.getY= getY;
                u.getDate= getDate;
                return u;
            });
            scope.$digest();
            /*userForGraph = data.map(function(item){
                var u = {};
                var dayArray = item.day.split("-");
                var day = dayArray[2].split("T")[0];
                dayArray[2] = day;
                var startArray = item.start_time.split(":");
                var endArray = item.end_time.split(":");
                var start = new Date(dayArray[0],dayArray[1]-1,dayArray[2],startArray[0],startArray[1],startArray[2]);
                var end = new Date(dayArray[0],dayArray[1]-1,dayArray[2],endArray[0],endArray[1],endArray[2]);
                u.start=start.getTime();
                u.end=end.getTime();
                u.game=item.game_name;
                u.score=item.score;
                u.minAngle=item.minangle;
                u.maxAngle=item.maxangle;
                u.getStart= getStart;
                u.getEnd= getEnd;
                u.getXMonth=getXMonth;
                u.getX= getX;
                u.getY= getY;
                return u;
            });*/
            buildGraphs();
            alert(data + "ok");
        }
    }
    function error() {
        alert("bad request: data limit");
    }
}
function getGamesForPatient(scope){
    var userId = sessionStorage.getItem("patient_id");

    if (userId == undefined) {
        error();
        return;
    }
    var clinic = sessionStorage.getItem("clinic_id");
    if(clinic==undefined)
        return;
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200)
                success(this);
            else error(this.responseText)
        }
    }
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        error(this.responseText);
    }
    var dbReq = "SELECT distinct game_name FROM  `patient_statistics` WHERE  `patient_id` =  '"+userId+"' ";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
    function success(obj){
        var gamesArray = JSON.parse(obj.responseText);//array of games
        if(gamesArray == undefined)
            alert("no games");
        else {
            alert(gamesArray + "ok");
            scope.games = gamesArray.map(function(item){
                return item.game_name;
            });
            scope.$digest();
            getPatientStat(scope);
        }
    }
    function error() {
        alert("bad request: no patient_id in session storage");
    }
}

presc.onclick = function(){
    redirect("./prescription_list.html");
}
back.innerHTML = (sessionStorage.getItem("clinic_id")==undefined?"":sessionStorage.getItem("clinic_id"));
back.onclick = function(){
    redirect("grid.html");
}


$(".bigArrowLeftWeek").click(function(){
    --weekCounter;
    buildGraphs();
});
$(".bigArrowRightWeek").click(function(){
    ++weekCounter;
    buildGraphs();
});
$(".bigArrowLeftMonth").click(function(){
    --monthCounter;
    buildGraphs();
});
$(".bigArrowRightMonth").click(function(){
    ++monthCounter;
    buildGraphs();
});