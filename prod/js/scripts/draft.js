

//___________________________________________________________________
///Summary
///linechart
///Summary
/*
 var lineData = user.sort(compareUser);
 var vis = d3.select('#visualisation'),
 WIDTH = 1000,
 HEIGHT = 500,
 MARGINS = {
 top: 20,
 right: 20,
 bottom: 20,
 left: 50
 },


 xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
 return d.x;
 }),
 d3.max(lineData, function (d) {
 return d.x;
 })
 ]),

 yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
 return d.y;
 }),
 d3.max(lineData, function (d) {
 return d.y;
 })
 ]),

 xAxis = d3.svg.axis()
 .scale(xRange)
 .tickSize(1)
 .tickValues([-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6])
 .tickSubdivide(true),

 yAxis = d3.svg.axis()
 .scale(yRange)
 .tickSize(1)
 .orient("left")
 .tickSubdivide(true);


 vis.append("svg:g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
 .call(xAxis);

 vis.append("svg:g")
 .attr("class", "y axis")
 .attr("transform", "translate(" + (MARGINS.left) + ",0)")
 .call(yAxis);

 var lineFunc = d3.svg.line()
 .x(function (d) {
 return xRange(d.x);
 })
 .y(function (d) {
 return yRange(d.y);
 })
 .interpolate('basis');

 vis.append("svg:path")
 .attr("d", lineFunc(lineData))
 .attr("stroke", "blue")
 .attr("stroke-width", 2)
 .attr("fill", "none");

 */


///Summary
///Barchat
///Summary
//
/*
 var barData = user.sort(compareUser);
 var vis = d3.select('#visualisation'),
 WIDTH = 1000,
 HEIGHT = 500,
 MARGINS = {
 top: 20,
 right: 20,
 bottom: 40,
 left: 50
 },
 xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right],0.15)
 .domain([1,2,3,4,5,6,7].map(function(d){return d})),
 yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
 .domain([d3.min(barData, function(d) {
 return d.getY();
 }), d3.max(barData, function(d) {
 return d.getY();
 })]),
 xAxis = d3.svg.axis()
 .scale(xRange)
 .tickSize(1)
 .tickSubdivide(true),
 yAxis = d3.svg.axis()
 .scale(yRange)
 .tickSize(1)
 .orient('left')
 .tickSubdivide(true);

 vis.append('svg:g')
 .attr('class', 'x axis')
 .attr('transform', 'translate('+0+',' + (HEIGHT - MARGINS.bottom) + ')')
 .call(xAxis);

 vis.append('svg:g')
 .attr('class', 'y axis')
 .attr('transform', 'translate(' + (MARGINS.left+0) + ','+(-MARGINS.bottom)+')')
 .call(yAxis);


 vis.selectAll('rect')
 .data(barData)
 .enter()
 .append('rect')
 .attr('x', function (d) {
 return xRange(d.getX());
 }).
 attr('fill',function(d) {return d.color})
 .attr('y', function (d) {
 return yRange(d.getY());
 })
 .attr('width', xRange.rangeBand())
 .attr('height', function (d) {
 return ((HEIGHT) - yRange(d.getY()));
 }).attr('transform', 'translate('+ 0 + ',' + (-MARGINS.bottom) +')')
 .on('mouseover', function(d) {
 d3.select(this)
 .attr('opacity', 0.7)
 .attr('cursor','pointer');
 }).on('mouseout', function(d) {
 d3.select(this)
 .attr('opacity', 1);
 });;

 vis.append("text").text("Days")
 .attr('transform', 'translate('+ WIDTH/2+ ',' + (HEIGHT-5) +')')
 .attr("font-size","22px;");

 vis.append("text").text("Min")
 .attr('transform', 'translate('+ (0)+ ',' + (HEIGHT/2 - MARGINS.bottom) +')')
 .attr("font-size","22px;");
 */

///Summary
///linechart
///Summary
/*
 var lineData = [user[0],user[1]];
 var vis = d3.select('#visualisation'),
 WIDTH = 1000,
 HEIGHT = 500,
 MARGINS = {
 top: 20,
 right: 20,
 bottom: 20,
 left: 50
 },
 xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right])
 .domain([d3.min([0,1,2,3,4,5,6], function(d) {
 return d;
 }), d3.max([0,1,2,3,4,5,6], function(d) {
 return d;
 })]),
 yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
 .domain([d3.min(lineData, function(d) {
 return d.getY();
 }), d3.max(lineData, function(d) {
 return d.getY();
 })]),
 xAxis = d3.svg.axis()
 .scale(xRange)
 .tickSize(1)
 .tickSubdivide(true),
 yAxis = d3.svg.axis()
 .scale(yRange)
 .tickSize(1)
 .orient('left')
 .tickSubdivide(true);

 vis.append('svg:g')
 .attr('class', 'x axis')
 .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
 .call(xAxis);

 vis.append('svg:g')
 .attr('class', 'y axis')
 .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
 .call(yAxis);

 var lineFunc = d3.svg.line()
 .x(function(d) {
 return xRange(d.getX());
 })
 .y(function(d) {
 return yRange(d.getY());
 })
 .interpolate('linear');

 vis.append('svg:path')
 .attr('d', lineFunc(lineData))
 .attr('stroke', 'blue')
 .attr('stroke-width', 3)
 .attr('fill', 'none');


 * */


/*
 var margin = {top:20, right:20,left:50,bottom:20},width = 400 - margin.left - margin.right,height = 400 - margin.bottom - margin.top;
 var x = d3.time.scale().range([0,width]);
 var y = d3.scale.linear().range([height,0]);

 var xAxis = d3.svg.axis().scale(x).orient("bottom");
 var yAxis = d3.svg.axis().scale(y).orient("left");

 var line = d3.svg.line().x(function(d){return x(d.data)})
 .y(function(d){ return y(d.users)});

 var svg = d3.select("#lines").append("svg").attr("width",width + margin.left + margin.right)
 .attr("height",height + margin.top + margin.bottom).append("g")
 .attr("transform","translate(" + margin.left + ','+margin.top+")");

 x.domain(d3.extent(data, function(d){return d.getX;}));
 y.domain(d3.extent(data, function(d){return d.getY;}));

 svg.append("g").attr("class","x axis").call(xAxis);
 svg.append("g").attr("class","y axis").call(yAxis)
 .append("text").attr("y",6);
 svg.append("path").datum(data).attr("class","line").attr("d",line);
 */
/*var width = 350, height = 300,margin = {top:20,left:20,bottom:20,right:20};
 var svg = d3.select("#bars").selectAll('div').data([4,7,9,11]).enter().append('div').style("width",function(d){return d * 2}).text(function(d){return d})//append("svg").attr(width).attr(height);
 var svg = d3.select("#bars").append('svg').attr("width",width).attr('height',height);
 var svg1 = d3.select("#bars").append('svg').attr("width",width).attr('height',height);
 var data = [{score:222,color:"#E3BFD5",game:"Super"}, {score:124,color:"#E384BE",game:"Hero"}, {score:244,color:"#ED53B2",game:"Bat"}, {score:67,color:"#F01A9E",game:"Man"}];
 var data1 = [{score:252,color:"#E3BFD5",game:"Super"}, {score:224,color:"#E384BE",game:"Hero"}, {score:144,color:"#ED53B2",game:"Bat"}, {score:167,color:"#F01A9E",game:"Man"}];

 var reload = function(svg,data) {
 redraw(svg,data);
 }
 var redraw = function(svg,data){
 var bars = svg.selectAll("rect.line").data(data);
 bars.enter().append("line").classed("line",true);
 bars.on("mouseover",function(d){
 this.setAttribute("cursor","pointer");
 this.setAttribute("opacity",0.5);

 $(this).append("<div id='info' style='width:80px;height:80px;border-radius:10px;position:absolute;top:"+ 0+"px;left:"+ 0+"px'>"+"Score: "+ d.score+"</div>");

 }).on("mouseout",function(d){
 this.setAttribute("cursor","pointer");
 this.setAttribute("opacity",1);
 $("#info").remove();
 }).attr("x",function(d,i){return i*50;}).attr("width",function(d){return 50}).attr("y",function(d){return height  - margin.bottom - d.score}).attr("height",function(d){return d.score ;}).attr("fill",function(d){return d.color});
 bars.enter().append("text").attr("x",function(d,i){return i*50;}).attr("width",function(d){return 50}).attr("y",function(d){return height  - margin.bottom - d.score}).attr("height",function(d){return d.score ;}).attr("fill",function(d){return d.color}).text(function(d){return d.game});

 }
 reload(svg,data);
 reload(svg1,data1);*/

















//canvas chart
var charWeek = function(){
    var graph;
    var xPadding = 50;
    var yPadding = 50;
    var tPadding = 20;

    var data = createFakes( user, today );

    function getMaxY() {
        var max = 0;

        for(var i = 0; i < data.length; i ++) {
            if(data[i].getY() > max) {
                max = data[i].getY();
            }
        }
        return max;
    }

    function getXPixel(val) {
        return ((graph.width() - xPadding) / data.length) * val + (xPadding * 1.5);
    }

    function getYPixel(val) {
        return (graph.height()- yPadding) - (graph.height()-2*yPadding)/getMaxY()*val ;
    }
    var gr = document.getElementById("graph");
    var grParent = gr.parentElement;
    grParent.removeChild(gr);
    var svg = document.createElement("svg");
    svg.width = 400;
    svg.height = 300;
    svg.setAttribute("id","graph");
    grParent.appendChild(svg);
    graph = $('#graph');
    var c = graph[0].getContext('2d');

    c.lineWidth = 2;
    c.strokeStyle = '#333';
    c.font = 'italic 8pt sans-serif';
    c.textAlign = "center";
    c.beginPath();
    c.moveTo(xPadding, yPadding);
    c.lineTo(xPadding, graph.height() - yPadding );
    c.lineTo(graph.width(), graph.height() - yPadding);
    c.stroke();
    for(var i = 0; i < data.length; i ++) {
        c.fillText(defineDay(i), getXPixel(i), graph.height() - yPadding + 20);
    }
    c.textAlign = "right"
    c.textBaseline = "middle";
    a = getMaxY();
    for(var i = 0,j; i < getMaxY(); i += a/10 ) {
        c.fillText(i.toString().substr(0,i.toString().indexOf('\.')+3), xPadding - 10, getYPixel(i));
    }
    c.strokeStyle = '#f00';
    c.beginPath();
    c.moveTo(getXPixel(0), getYPixel(data[0].getY()));
    for(var i = 1; i < data.length; i ++) {
        c.lineTo(getXPixel(i), getYPixel(data[i].getY()));
    }
    c.stroke();
    c.fillStyle = '#333';
    for(var i = 0; i < data.length; i ++) {
        c.beginPath();
        c.arc(getXPixel(i), getYPixel(data[i].getY()), 4, 0, Math.PI * 2, true);
        c.fillText(data[i].getY().toString().substr(0,data[i].getY().toString().indexOf('\.')+3),getXPixel(i)+10, getYPixel(data[i].getY())-10);
        c.fill();
    }
};


















var a = function(){

    var now = new Date();
    now = new Date(now.getFullYear(),now.getMonth(),now.getDate());
    var mas = [];
    for(i = 0 ; i < 31; ++i )
        mas.push(new Date(now.getTime()-i*24*60*60*1000));
    return mas;
}

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
    for(i = 0; i <  sortedUsersByToday.length-1;){//the last item is not included // i - for user array j - for array of arrays
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


///bar
var barData = _x_y;
var vis = d3.select('#graphDatetime'),
    WIDTH = SIZE.width,
    HEIGHT = SIZE.height,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
    },
    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right],0.15)
        .domain([1,2,3,4,5,6,7].map(function(d){return d})),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom])
        .domain([d3.min(barData, function(d) {
            return d.y;
        }), d3.max(barData, function(d) {
            return d.y;
        })]),
    xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSize(1)
        .tickSubdivide(true),
    yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(1)
        .orient('left')
        .tickSubdivide(true);

vis.append('svg:g')
    .attr('transform', 'translate('+0+',' + (HEIGHT - MARGINS.bottom - 21) + ')')
    .call(xAxis);

vis.append('svg:g')
    .attr('transform', 'translate(' + (MARGINS.left+0) + ','+(-MARGINS.bottom)+')')
    .call(yAxis);


vis.selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
    .attr('x', function (d) {
        return xRange(d.x);
    }).
    attr('fill',function(d) {return "red"})
    .attr('y', function (d) {
        return yRange(d.y);
    })
    .attr('width', xRange.rangeBand())
    .attr('height', function (d) {
        return HEIGHT - yRange(d.y);
    }).attr('transform', 'translate('+ 0 + ',' + (-MARGINS.bottom) +')')
    .on('mouseover', function(d) {
        d3.select(this)
            .attr('opacity', 0.7)
            .attr('cursor','pointer');
    }).on('mouseout', function(d) {
    d3.select(this)
        .attr('opacity', 1);
});
vis.append("text").text("Days")
    .attr('transform', 'translate('+ WIDTH/2+ ',' + (HEIGHT-5) +')')
    .attr("font-size","22px;");
vis.append("text").text("Min")
    .attr('transform', 'translate('+ (0)+ ',' + (HEIGHT/2 - MARGINS.bottom) +')')
    .attr("font-size","22px;");


SELECT MAX(id) FROM  `_patient`
"INSERT INTO `_patient`(`id`, `is_active`, `clinic_id`, `mode`, `last_connection`) VALUES ('"+newId+"','Y','"+clinic_id+"','Home','1970-04-07 00:00:00')";
"SELECT MAX(user_name) FROM  `patient_credentials`";
"INSERT INTO  `patient_credentials` ( `patient_id`, `user_name`,`password`) VALUES (  '"+sessionStorage.getItem("id")+"', '"+sessionStorage.getItem("user_name")+"',  '"+sessionStorage.getItem('password')+"')";
