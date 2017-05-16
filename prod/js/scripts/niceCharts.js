//adding properties to objects______________________________________________________________________________________________________________________

var _1 = addTodayProperty(user);
var _2 = changeOnGetX(_1);
var _3 = changeOnGetXMonth(_2);
var _4 = addGetStart(_3);
var _5 =  addGetEnd(_4);
var _6 =   addGetDate(_5);
var _7 = addGetY(_6);
user = addGetYAngle(_7);
var totalMins = 60;
var TEXTSPACING = {bottom:25,left:20,right:15};
var PADDING = {top:20,bottom:30,left:60,right:100};
var SIZE = {width:600,height:240};
var viewport = "" + 0 +" "+ 0+ " "+ (SIZE.width + PADDING.left+PADDING.right)+" "+(SIZE.height + PADDING.top)+"";
var maxAngle = 40;
var textFontSize=10;
var graphWeek = document.getElementById("graphWeek");
var graphMonth = document.getElementById("graphMonth");
var grapAngleDiff = document.getElementById("graphAngleDiff");
var grapAngleDiffMonth = document.getElementById("graphAngleDiffMonth");
var svgElements = [graphWeek,graphMonth,grapAngleDiff,grapAngleDiffMonth];

var weekCounter=0;
var monthCounter=0;


function elementRemoval(myNode){
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}


function buildGraphs(){
    svgElements.forEach(function(item,i,self){
        elementRemoval(item);
    });
    chartWeek();
    chartMonth();
    chartAngleDiff();
    chartAngleDiffMonth();
    chartDatetime();
}
function stepHeight_MaxY_Step(max,step,_x_yCoords){
    var array = _x_yCoords.map(function(item,i,self){
        return {y:(SIZE.height -(round(item.y/yAxisMax)*(SIZE.height))+PADDING.top)};
    });
}
function graphBuilding(id,_x_y,maxEmptyParam,yParam,xAxisSubscription,quantity){//yParam = 0 = min ; yParam = 1 = deg; xAxisSubscription=0=week 7 days xAxisSubscription=1=month 28- 31 day
    //#68C6EA

    //svg elements________________________________________________________________________________
    var graph = document.getElementById(id);
    graph.setAttribute("viewBox",viewport);
    graph.setAttribute("preserveAspectRatio","xMidYMid meet");
    var gX = document.createElementNS("http://www.w3.org/2000/svg","g");
    var gY = document.createElementNS("http://www.w3.org/2000/svg","g");
    var gC = document.createElementNS("http://www.w3.org/2000/svg","g");
    var lineX = document.createElementNS("http://www.w3.org/2000/svg","line");
    var lineY = document.createElementNS("http://www.w3.org/2000/svg","line");
    var container;
    /////////////////////////////////////////////////////////////////
    if(yParam==0) {
        container = document.createElementNS("http://www.w3.org/2000/svg","polyline");
    }
    if(yParam==1) {
        container = document.createElementNS("http://www.w3.org/2000/svg","g");
    }
    ///////////////////////////////////////////////////////////////////
    //_____________________________________________________________________________________________
    //user's data__________________________________________________________________________________
    if(!_x_y) return;
    var maxX = getMaxX(_x_y);
    var maxY;
    ////////////////////////////////////////////////////
    if(yParam==0) {
        maxY=getMaxY(_x_y);
    }
    if(yParam==1) {
        maxY=getMaxYAngle(_x_y);
    }
    ////////////////////////////////////////////////////
    var stepW = new Number(digitsBeforeDot(( SIZE.width-PADDING.left) / maxX.x));//!!should be 7
    var yAxisMax;
    ////////////////////////////////////////////////////
    if(yParam==0) {
        if (maxY.y == 0)
            yAxisMax = maxEmptyParam;
        else
            yAxisMax = new Number(digitsBeforeDot(maxY.y)) + 1.0
    }
    if(yParam==1) {
        if (maxY.y2 == 0)
            yAxisMax = maxEmptyParam;
        else
            yAxisMax = new Number(digitsBeforeDot(maxY.y2)) + 1.0
    }
    //max detected
    //var array = stepHeight_MaxY_Step(yAxisMax,step);//coordinates
    ////////////////////////////////////////////////////
    var stepH = SIZE.height/yAxisMax // 16.6666666 -> 16 +1
    var circles;
    ////////////////////////////////////////////////////
    if(yParam==0)//min
        circles = _x_y.map(function(item,i,self){
            return {x:((item.x-1)*stepW+PADDING.left),y:(SIZE.height -(item.y*(SIZE.height/yAxisMax))+PADDING.top)};
        });
    if(yParam==1)//deg
        circles = _x_y.map(function(item,i,self){

            return {x:((item.x-1)*stepW+PADDING.left),y1:(SIZE.height -(item.y1*(SIZE.height/yAxisMax))+PADDING.top),y2:(SIZE.height -(item.y2*(SIZE.height/yAxisMax))+PADDING.top)};
        });
    if(yParam!=0 && yParam!=1)
        return;
    ////////////////////////////////////////////////////
    //lineX attributes
    (function(){
            lineX.setAttribute("x1",PADDING.left);
            lineX.setAttribute("x2",SIZE.width);
            lineX.setAttribute("y1",PADDING.top+SIZE.height);
            lineX.setAttribute("y2",PADDING.top+SIZE.height);
            lineX.setAttribute("id","x");
            //lineX.setAttribute("class","axis");
            lineX.setAttribute("stroke","rgb(204, 204, 204)");//;#68C6EA
        })();
    //lineY attributes
    (function(){
            lineY.setAttribute("x1", SIZE.width);
            lineY.setAttribute("x2", SIZE.width);
            lineY.setAttribute("y1",PADDING.top+SIZE.height);
            lineY.setAttribute("y2",PADDING.top);
            lineY.setAttribute("id","y");
            //lineY.setAttribute("class","axis");
            lineY.setAttribute("stroke","rgb(204, 204, 204)");
        })();
    //Appending



    for(i = PADDING.left,j=0; j < _x_y.length;i+=stepW,++j){
        var text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x",i);
        text.setAttribute("font-family","Arial, serif");
        text.setAttribute("y",PADDING.top+SIZE.height+TEXTSPACING.bottom);
        ////////////////////////////////////////////////////
        var date = document.createElementNS("http://www.w3.org/2000/svg","text");
        date.setAttribute("x",PADDING.left);
        date.setAttribute("font-family","Arial, serif");
        date.setAttribute("y",PADDING.top+SIZE.height+TEXTSPACING.bottom+20);
        if(xAxisSubscription==0){
            text.innerHTML = getDateText(_x_y[j].x);
            var info  = new Date(defineDaytimePeriod()._1).toString().toString().split(" ");
            date.innerHTML =" "+info[1]+" "+info[2]+" "+info[3];
        }
        if(xAxisSubscription==1){
            if((j+1)%5==0||j==0)
                text.innerHTML = (_x_y[j].x);
            else text.innerHTML = "";

            var info = new Date(defineDaytimePeriodMonth()._1).toString().split(" ");
            date.innerHTML = " "+info[1]+" "+info[3];
        }
        gX.appendChild(date);



        //little lines
        var lineLittleX = document.createElementNS("http://www.w3.org/2000/svg","line");
        lineLittleX.setAttribute("x1",i);
        lineLittleX.setAttribute("x2",i);
        lineLittleX.setAttribute("y1",PADDING.top+SIZE.height);
        lineLittleX.setAttribute("y2",PADDING.top+SIZE.height+10);
        lineLittleX.setAttribute("stroke","rgb(204, 204, 204)");
        lineLittleX.setAttribute("stroke-width","2px");
        gY.appendChild(lineLittleX);

        ////////////////////////////////////////////////////
        gX.appendChild(text);
        if(yParam==1){
            var line = document.createElementNS("http://www.w3.org/2000/svg","line");
            line.setAttribute("x1",i);
            line.setAttribute("y1",PADDING.top+SIZE.height - _x_y[j].y2*stepH);
            line.setAttribute("x2",i);

            line.setAttribute("y2",PADDING.top+SIZE.height - _x_y[j].y1*stepH);
            line.setAttribute("stroke-width","15");
            line.setAttribute("stroke","#68C6EA");
            line.setAttribute("fill","#68C6EA");
            container.appendChild(line);
        }
        ////////////////////////////////////////////////////

        }
    for(i = PADDING.top+SIZE.height,j=0; j < quantity+1;i-=stepH,j=j+1){
        var yCoordj = PADDING.top+SIZE.height-round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax;
        var text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x",SIZE.width+TEXTSPACING.right);
        text.setAttribute("font-family","Arial, serif");
        text.setAttribute("fill","rgb(100, 100, 100)");
        text.setAttribute("y",PADDING.top+SIZE.height-round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax+textFontSize/2);
        text.innerHTML = digitsBeforeDot(round((j)*yAxisMax/quantity));
        gY.appendChild(text);
        //horizontal line addition
        var line = document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",PADDING.left);
        line.setAttribute("x2",SIZE.width);
        line.setAttribute("y1",PADDING.top+SIZE.height-round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax);
        line.setAttribute("y2",PADDING.top+SIZE.height-round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax);
        line.setAttribute("stroke","#eaedf2");
        line.setAttribute("stroke-width","2px");
        gY.appendChild(line);
        //little lines
        var lineLittleY = document.createElementNS("http://www.w3.org/2000/svg","line");
        lineLittleY.setAttribute("x1",SIZE.width);
        lineLittleY.setAttribute("x2",SIZE.width+TEXTSPACING.right/2);
        lineLittleY.setAttribute("y1",PADDING.top+SIZE.height-round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax);
        lineLittleY.setAttribute("y2",PADDING.top+SIZE.height-round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax);
        lineLittleY.setAttribute("stroke","rgb(204, 204, 204)");
        lineLittleY.setAttribute("stroke-width","2px");
        gY.appendChild(lineLittleY);
        //rectangles of different colors
        if(j!=0 && j%2==0) {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", PADDING.left);
            rect.setAttribute("y",PADDING.top+SIZE.height-round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax);
            rect.setAttribute("width", SIZE.width-PADDING.left);
            rect.setAttribute("height",round((j)*yAxisMax/quantity)*SIZE.height/yAxisMax-round((j-1)*yAxisMax/quantity)*SIZE.height/yAxisMax );
            rect.setAttribute("fill", "rgb(234, 237, 241)");
            rect.setAttribute("stroke","none");
            gY.appendChild(rect);
        }
        }
    //background rectangles
    if(yParam==0) {
        for(i = PADDING.left,j=0; j < _x_y.length;i+=stepW,++j) {

            /*var rectBack = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectBack.setAttribute("x", i);
            rectBack.setAttribute("y", PADDING.top);
            rectBack.setAttribute("width", stepW);
            rectBack.setAttribute("height", SIZE.height);
            rectBack.setAttribute("stroke", "none");
            rectBack.setAttribute("stroke-width", "0px");
            rectBack.setAttribute("fill", "transparent");
            rectBack.setAttribute("z-index", "10");
            rectBack.onmouseover = function (e) {
                e.target.setAttribute("fill", "#68edf2");
            };
            rectBack.onmouseout = function (e) {
                e.target.setAttribute("fill", "transparent");
            };
            gY.appendChild(rectBack);*/

            //path to be selected
            if(j<_x_y.length-1) {
                var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                var d = "M " + i + " " + (PADDING.top + SIZE.height) + " " + "L " + (i + stepW) + " " + (PADDING.top + SIZE.height) + " " + "L " + (i + stepW) + " " + (circles[j+1].y) + " " + "L " + (i) + " " + (circles[j].y) + " Z";

                path.setAttribute("d", d);
                path.setAttribute("z-index", "20");
                path.setAttribute("fill", "transparent");
                path.onmouseover = function (e) {
                    e.target.setAttribute("fill", "#68edf2");
                };
                path.onmouseout = function (e) {
                    e.target.setAttribute("fill", "transparent");
                };
                gY.appendChild(path);
            }
        }
    }


    //time text
    var text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x",0);
    text.setAttribute("font-family","Arial, serif");
    text.setAttribute("y",PADDING.top+SIZE.height+19);
    text.innerHTML = "";
    gY.appendChild(text);
    if(yParam==0){
        for(i = 0; i < circles.length;i++){
            var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
            circle.setAttribute("cx",circles[i].x);
            circle.setAttribute("cy",circles[i].y);
            circle.setAttribute("r",3);
            circle.setAttribute("yValue",_2_digits(_x_y[i].y));
            circle.setAttribute("xValue",_x_y[i].x);
            circle.setAttribute("fill","#68C6EA");
            circle.setAttribute("stroke","#68C6EA");
            circle.setAttribute("stroke-width","3");
            circle.setAttribute("cursor","pointer");
            circle.onmouseover = function(e){
                var text = document.createElementNS("http://www.w3.org/2000/svg","text");
                text.setAttribute('x', new Number(e.target.attributes.cx.nodeValue)+15);
                text.setAttribute( 'y', new Number(e.target.attributes.cy.nodeValue)+25);
                text.setAttribute( 'id', e.target.attributes.xValue.nodeValue);
                text.innerHTML = e.target.attributes.yValue.nodeValue;
                text.setAttribute( 'fill', "#68C6EA");
                text.setAttribute( 'font-family', "Arial, serif");
                text.setAttribute( 'font-weight', "bold");
                graph.appendChild(text);
                var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
                rect.setAttribute('x', new Number(e.target.attributes.cx.nodeValue)+10);
                rect.setAttribute( 'y', new Number(e.target.attributes.cy.nodeValue)+10);
                rect.setAttribute('width', 50);
                rect.setAttribute( 'height',20);
                rect.setAttribute( 'stroke',"transparent");
                rect.setAttribute( 'fill',"none");
                rect.setAttribute( 'id', e.target.attributes.xValue.nodeValue+"r");
                graph.appendChild(rect);

            };
            gC.appendChild(circle);
            circle.onmouseout = function(e){
                var rect = document.getElementById(e.target.attributes.xValue.nodeValue+"r");
                rect.parentElement.removeChild(rect);
                var text = document.getElementById(e.target.attributes.xValue.nodeValue);
                text.parentElement.removeChild(text);
            };
        }
    }//min
    if(yParam==1){
        for(i = 0; i < circles.length;i++){
            var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
            circle.setAttribute("cx",circles[i].x);
            circle.setAttribute("cy",circles[i].y2);
            circle.setAttribute("r",7);
            circle.setAttribute("yValue",_2_digits(_x_y[i].y2));
            circle.setAttribute("xValue",_x_y[i].x);
            circle.setAttribute("fill","#fff");
            circle.setAttribute("stroke","#68edf2");
            circle.setAttribute("cursor","pointer");
            gC.appendChild(circle);
            //second circ

            var circle2 = document.createElementNS("http://www.w3.org/2000/svg","circle");
            circle2.setAttribute("cx",circles[i].x);
            circle2.setAttribute("cy",circles[i].y1);
            circle2.setAttribute("r",7);
            circle2.setAttribute("yValue",_2_digits(_x_y[i].y1));
            circle2.setAttribute("xValue",_x_y[i].x);
            circle2.setAttribute("fill","#fff");
            circle2.setAttribute("stroke","#68edf2");
            circle2.setAttribute("cursor","pointer");
            gC.appendChild(circle2);

            circle.onmouseover = circle2.onmouseover = function(e){
                var text = document.createElementNS("http://www.w3.org/2000/svg","text");
                text.setAttribute('x', new Number(e.target.attributes.cx.nodeValue)+15);
                text.setAttribute( 'y', new Number(e.target.attributes.cy.nodeValue)+25);
                text.setAttribute( 'id', e.target.attributes.xValue.nodeValue+'A');
                text.innerHTML = e.target.attributes.yValue.nodeValue;
                text.setAttribute( 'fill', "#68edf2");
                text.setAttribute( 'font-family', "Arial, serif");
                text.setAttribute( 'font-weight', "bold");
                graph.appendChild(text);
                var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
                rect.setAttribute('x', new Number(e.target.attributes.cx.nodeValue)+10);
                rect.setAttribute( 'y', new Number(e.target.attributes.cy.nodeValue)+10);
                rect.setAttribute('width', 50);
                rect.setAttribute( 'height',20);
                rect.setAttribute( 'stroke',"transparent");
                rect.setAttribute( 'fill',"none");
                rect.setAttribute( 'id', e.target.attributes.xValue.nodeValue+"rA");
                graph.appendChild(rect);

            };

            circle.onmouseout = circle2.onmouseout = function(e){
                var rect = document.getElementById(e.target.attributes.xValue.nodeValue+"rA");
                rect.parentElement.removeChild(rect);
                var text = document.getElementById(e.target.attributes.xValue.nodeValue+"A");
                text.parentElement.removeChild(text);
            };
        }

    }//deg
    if(yParam!=1 && yParam!=0){
        return;
    }

    (function(){
            gX.appendChild(lineX);
            graph.appendChild(gX);
            gY.appendChild(lineY);
            graph.appendChild(gY);
            graph.appendChild(container);
            graph.appendChild(gC);
        })();
    if(yParam==0) {

        container.setAttribute("stroke", "#68C6EA");
        container.setAttribute("stroke-width", "2");
        container.setAttribute("fill", "none");
        var pathString =  _x_y.reduce(function (res, item, i, self) {
            res += ((item.x - 1) * stepW + PADDING.left) + "," + (SIZE.height - (item.y * (SIZE.height / yAxisMax)) + PADDING.top) + " ";
            return res;
        }, "");

        container.setAttribute("points",pathString);
        container.pathLength;
        var totalLength = 0 ;
        for(var i = 0 ; i < container.points.numberOfItems;i++) {
            var pos = container.points.getItem(i);

            if (i > 0) {
                totalLength += Math.sqrt(Math.pow((pos.x - (prevPos==undefined?pos.x :prevPos.x)), 2) + Math.pow((pos.y -(prevPos==undefined?pos.y :prevPos.y)), 2));
            }
            prevPos = pos;
        }
        totalLength += Math.sqrt(   Math.pow(   stepW, 2  )   +   Math.pow(   ((SIZE.height+PADDING.top) - prevPos.y), 2   )   );

        var cssAnimation = document.createElement('style');
        cssAnimation.type = 'text/css';
        var rules = document.createTextNode("#"+container.parentNode.id + " polyline{"+
        "stroke-dasharray: "+ (totalLength)+";"+
        "stroke-dashoffset: "+ 0+";"+
        "animation: dash 5s linear;} "+
            '@-webkit-keyframes dash {'+
            'from { stroke-dashoffset:'+(totalLength)+'; }'+
            'to { stroke-dashoffset: '+0+';}'+
            '}');
        cssAnimation.appendChild(rules);
        container.appendChild(cssAnimation);
    }

    /*(function(){
        <polyline
        fill="none"
        stroke="#0074d9"
        stroke-width="3"
        points="
        0,120
        20,60
        40,80
        60,20"/
                  })();
       */
}

var chartWeek = function(){
    graphBuilding("graphWeek",createArraySingleUserOneGameWeek(userForGraph),6,0,0,6);// 0 min 0 week
};
var chartMonth = function(){
    graphBuilding("graphMonth",createArraySingleUserOneGameMonth(userForGraph),6,0,1,6)// 0 min 1 month
};
var chartAngleDiff = function(){
    graphBuilding("graphAngleDiff",createArraySingleUserOneGameAngle(userForGraph),6,1,0,6)// 1 deg 0 week
    /*var graph = document.getElementById("graphAngleDiff");
    graph.setAttribute("viewBox",viewport);
    graph.setAttribute("preserveAspectRatio","xMidYMid meet");
    var gX = document.createElementNS("http://www.w3.org/2000/svg","g");
    var gY = document.createElementNS("http://www.w3.org/2000/svg","g");
    var gC = document.createElementNS("http://www.w3.org/2000/svg","g");
    var lineX = document.createElementNS("http://www.w3.org/2000/svg","line");
    var lineY = document.createElementNS("http://www.w3.org/2000/svg","line");
    var gPoly = document.createElementNS("http://www.w3.org/2000/svg","g");
    //user's data
    var _x_y = createArraySingleUserOneGameAngle(userForGraph);
    if(!_x_y) return;
    var maxX = getMaxX(_x_y);
    var maxY = getMaxYAngle(_x_y);
    if(maxY.y2==0)
        maxY.y2=6;
    var dataQuan = _x_y.length;
    var stepW = SIZE.width / dataQuan;
    var stepH = SIZE.height/maxY.y2;//5 10 15 20 //SIZE.height / dataQuan;
    var circles = _x_y.map(function(item,i,self){

        return {x:((item.x-1)/maxX.x*SIZE.width+PADDING.left),y1:(SIZE.height -(item.y1*(SIZE.height/maxAngle))+PADDING.top),y2:(SIZE.height -(item.y2*(SIZE.height/maxAngle))+PADDING.top)};
    });
    //lineX attributes
    (function(){
        lineX.setAttribute("x1",PADDING.left);
        lineX.setAttribute("x2",SIZE.width);
        lineX.setAttribute("y1",PADDING.top+SIZE.height);
        lineX.setAttribute("y2",PADDING.top+SIZE.height);
        lineX.setAttribute("id","x");
        //lineX.setAttribute("class","axis");
        lineX.setAttribute("stroke","transparent");
    })();
    //lineY attributes
    (function(){
        lineY.setAttribute("x1",PADDING.left);
        lineY.setAttribute("x2",PADDING.left);
        lineY.setAttribute("y1",PADDING.top+SIZE.height);
        lineY.setAttribute("y2",PADDING.top);
        lineY.setAttribute("id","y");
        //lineY.setAttribute("class","axis");
        lineY.setAttribute("stroke","transparent");
    })();
    //Appending



    for(i = PADDING.left,j=0; j < _x_y.length;i+=stepW,++j){
        var text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x",i);
        text.setAttribute("font-family","Arial, serif");
        text.setAttribute("y",PADDING.top+SIZE.height+TEXTSPACING.bottom);
        text.innerHTML = getDateText(_x_y[j].x);
        gX.appendChild(text);
        ///vertical lines



        var line = document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",i);
        line.setAttribute("x2",i);
        line.setAttribute("y1",PADDING.top+SIZE.height - _x_y[j].y1*stepH);

        line.setAttribute("y2",PADDING.top+SIZE.height - _x_y[j].y2*stepH);
        line.setAttribute("stroke-width","6");
        line.setAttribute("stroke","#2073d1");
        gPoly.appendChild(line);

    }
    for(i = PADDING.top+SIZE.height,j=0; j < 21;i-=stepH,j=j+3){
        var text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("x",0);
        text.setAttribute("font-family","Arial, serif");
        text.setAttribute("fill"," #2073d1");

        text.setAttribute("y",PADDING.top+SIZE.height-(j)*stepH);

        text.innerHTML = digitsBeforeDot(j);
        gY.appendChild(text);
        //horizontal line addition
        var line = document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",PADDING.left);
        line.setAttribute("x2",SIZE.width);
        line.setAttribute("y1",PADDING.top+SIZE.height-(j)*stepH);
        line.setAttribute("y2",PADDING.top+SIZE.height-(j)*stepH);
        line.setAttribute("stroke","#eaedf2");
        line.setAttribute("stroke-width","2px");
        gY.appendChild(line);



    }
    //time text
    var text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x",0);
    text.setAttribute("font-family","Arial, serif");
    text.setAttribute("y",PADDING.top+SIZE.height+19);

    text.innerHTML = "";
    gY.appendChild(text);
    for(i = 0; i < circles.length;i++){
        var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        circle.setAttribute("cx",circles[i].x);
        circle.setAttribute("cy",circles[i].y2);
        circle.setAttribute("r",7);
        circle.setAttribute("yValue",_2_digits(_x_y[i].y2));
        circle.setAttribute("xValue",_x_y[i].x);
        circle.setAttribute("fill","#eaedf2");
        circle.setAttribute("stroke","#fff");
        circle.setAttribute("stroke-width","3");
        circle.setAttribute("cursor","pointer");
        gC.appendChild(circle);
        //second circ

        var circle2 = document.createElementNS("http://www.w3.org/2000/svg","circle");
        circle2.setAttribute("cx",circles[i].x);
        circle2.setAttribute("cy",circles[i].y1);
        circle2.setAttribute("r",7);
        circle2.setAttribute("yValue",_2_digits(_x_y[i].y1));
        circle2.setAttribute("xValue",_x_y[i].x);
        circle2.setAttribute("fill","#eaedf2");
        circle2.setAttribute("stroke","#fff");
        circle2.setAttribute("stroke-width","3");
        circle2.setAttribute("cursor","pointer");
        gC.appendChild(circle2);

        circle.onmouseover = circle2.onmouseover = function(e){
            var text = document.createElementNS("http://www.w3.org/2000/svg","text");
            text.setAttribute('x', new Number(e.target.attributes.cx.nodeValue)+15);
            text.setAttribute( 'y', new Number(e.target.attributes.cy.nodeValue)+25);
            text.setAttribute( 'id', e.target.attributes.xValue.nodeValue+'A');
            text.innerHTML = e.target.attributes.yValue.nodeValue;
            text.setAttribute( 'fill', "#2073d1");
            text.setAttribute( 'font-family', "Arial, serif");
            text.setAttribute( 'font-weight', "bold");
            graph.appendChild(text);
            var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
            rect.setAttribute('x', new Number(e.target.attributes.cx.nodeValue)+10);
            rect.setAttribute( 'y', new Number(e.target.attributes.cy.nodeValue)+10);
            rect.setAttribute('width', 50);
            rect.setAttribute( 'height',20);
            rect.setAttribute( 'stroke',"#2073d1");
            rect.setAttribute( 'fill',"none");
            rect.setAttribute( 'id', e.target.attributes.xValue.nodeValue+"rA");
            graph.appendChild(rect);

        };

        circle.onmouseout = circle2.onmouseout = function(e){
            var rect = document.getElementById(e.target.attributes.xValue.nodeValue+"rA");
            rect.parentElement.removeChild(rect);
            var text = document.getElementById(e.target.attributes.xValue.nodeValue+"A");
            text.parentElement.removeChild(text);
        };
    }
    (function(){
        gX.appendChild(lineX);
        graph.appendChild(gX);
        gY.appendChild(lineY);
        graph.appendChild(gY);
        graph.appendChild(gPoly);
        graph.appendChild(gC);
    })();




    (function(){

     <polyline
     fill="none"
     stroke="#0074d9"
     stroke-width="3"
     points="
     0,120
     20,60
     40,80
     60,20"/>
     })();
     */
};
var chartAngleDiffMonth = function(){
    graphBuilding("graphAngleDiffMonth",createArraySingleUserOneGameAngleMonth(userForGraph),6,1,1,6)// 1 deg 1 month
};
var chartDatetime = function(){
    //var _x_y = createArraySingleUserOneGameWeek(userForGraph);
    //if(!_x_y) return;
};
//onclicks

    var graphWeekDiv = document.getElementById("graphWeekDiv");
    var graphMonthDiv = document.getElementById("graphMonthDiv");
    //var graphDatetimeDiv = document.getElementById("graphDatetimeDiv");
    var week = document.getElementById("week");
    var month = document.getElementById("month");
    //var datetime = document.getElementById("datetime");
    var clickable = [graphWeekDiv,graphMonthDiv];//,graphDatetimeDiv];
    var dashboardMenuItems = [week,month];//,datetime];
    clickable.forEach(function(item,i,self){
        item.style.display = "none";
    });

   function weekEvent(){
        clickable.forEach(function(item,i,self){
            item.style.display = "none";
        });

        //show week
        if(graphWeekDiv.style.display=="none") {
            graphWeekDiv.style.display = "block";
        }
       dashboardMenuItems.forEach(function(item,i,self){
           $(item).removeClass("selectedDashboard");
       });
       $("#week").addClass("selectedDashboard");

    }
   function monthEvent(){
        clickable.forEach(function(item,i,self){
            item.style.display = "none";
        });

        if(graphMonthDiv.style.display=="none") {
            graphMonthDiv.style.display = "block";
        }
        dashboardMenuItems.forEach(function(item,i,self){
            $(item).removeClass("selectedDashboard");
        });
        $("#month").addClass("selectedDashboard");
    };
    /*function datetimeEvent(){
        clickable.forEach(function(item,i,self){
            item.style.display = "none";
        });

        if(graphDatetimeDiv.style.display=="none") {
            graphDatetimeDiv.style.display = "block";
        }
        dashboardMenuItems.forEach(function(item,i,self){
           $(item).removeClass("selectedDashboard");
        });
        datetime.className =  datetime.className + " selectedDashboard";
    };*/

//chart building
buildGraphs();
