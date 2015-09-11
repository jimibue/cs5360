/**
 * Created by jcc on 9/9/15.
 */



//dimensions, data and margins SEE
//   http://bl.ocks.org/mbostock/3019563
// for description of margin convention

//This Example creates a simple bar graph.  The graph is dynamic and its size will remain
// even if the data changes
var Example1_1 = function() {
    var margin = {top: 10, right: 10, bottom: 10, left: 20};
    var w = 400 - margin.left - margin.right;
    var h = w - margin.top - margin.bottom;
    var padding = 3;
    var xData = [10.0, 8.0, 13.0, 9.0, 11.0, 14.0, 6.0, 4.0, 12.0, 7.0, 5.0, 9.2,20 ];
    var y = [9.14, 8.14, 8.74, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74];

//scales notice the use of the ordinal scale
// see http://alignedleft.com/tutorials/d3/scales
//for scaling explanation
    var yScale = d3.scale.linear()
        .domain([0, d3.max(xData)])
        .range([0, h]);
    var xScale = d3.scale.ordinal()
        .domain(d3.range(xData.length))
        .rangeRoundBands([0, w], 0.1);

// append the svg and take care of margins here so we don't need to worry about them later
    var svg = d3.select('body')
        .append('svg')
        .attr("width", w + margin.left + margin.right)
        .attr("height", w + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//append the rects
    svg.selectAll('rect')
        .data(xData)
        .enter()
        .append('rect')
        .attr({
            width: function () {
                return xScale.rangeBand();
            },
            height: function (d) {
                return yScale(d);
            },
            x: function (d, i) {
                return xScale(i);
            },
            y: function (d) {
                return h - yScale(d);
            },
            fill: "steelblue",
            stroke: "grey"
        });

//append the text
    svg.selectAll('text')
        .data(xData)
        .enter()
        .append('text')
        .text(function (d) {
            return d;
        })
        .attr({
            x: function (d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
            },
            y: function (d) {
                return h - yScale(d) + 15;
            },
            fill: "white",
            "text-anchor": "middle"
        });
};//END OF EXAMPLE 1

//This example follows Example1_2 but changes with updated data
// example partially from  http://dataviscourse.net/2015/lectures/lecture-advanced-d3/
var Example1_2 = function(){
    var margin = {top: 10, right: 10, bottom: 10, left: 20};
    var w = 400 - margin.left - margin.right;
    var h = w - margin.top - margin.bottom;
    var xData =  createNegArr(45);
    //xData = [9.14, 8.14, 8.74, 9.26, 8.10, 6.13, -3.10, 9.13, -7.26, 4.74];


    var svg = d3.select('body')
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", w + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var xScale = d3.scale.linear()
        .domain([-100, 100])
        .range([0, w]).nice();
    var yScale = d3.scale.ordinal()
        .domain(d3.range(xData.length))
        .rangeRoundBands([0, h], 0.1);
    var color = d3.scale.linear()
        .domain([d3.min(xData), 0, d3.max(xData)])
        .range(["red", "lightgrey", "steelblue"]);

    var xAxis = d3.svg.axis();
        xAxis.scale(xScale);
        xAxis.orient("bottom");

    svg.selectAll("rect")
        .data(xData)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return xScale(Math.min(0, d));
        })
        .attr("y", function (d,i){
            return yScale(i) ;
        })
        .attr("width", function (d, i) {
            // here we call the scale function.
            return Math.abs(xScale(d) - xScale(0));
        })
        .attr("height", function() {
            return yScale.rangeBand()
        })
        .style("fill", function (d) {
            // here we apply the color scale
            return color(d);
        });

    svg.append('g')
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h ) + ")")
        .call(xAxis);


};


//This Example creates a simple bar graph.  The graph is dynamic and its size will remain
// even if the data changes
var Example1_3 = function() {
    var margin = {top: 10, right: 10, bottom: 10, left: 20};
    var w = 600 - margin.left - margin.right;
    var h = w - margin.top - margin.bottom;
    var padding = 3;
    var xData = createArr();
    xData =  [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2];

//scales notice the use of the ordinal scale
// see http://alignedleft.com/tutorials/d3/scales
//for scaling explanation
    var yScale = d3.scale.linear()
        .domain([0, d3.max(xData)+5])
        .range([0, h]);
    var xScale = d3.scale.ordinal()
        .domain(d3.range(xData.length))
        .rangeRoundBands([0, w], 0.3);

// append the svg and take care of margins here so we don't need to worry about them later
    var svg = d3.select('body')
        .append('svg')
        .attr("width", w + margin.left + margin.right)
        .attr("height", w + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll('.g')
        .data(xData)
        .enter()
        .append('polygon')
        .attr({
            points: function(d,i){
                var dp =15;
                var str =" ";
                var p1 =(xScale(i)+xScale.rangeBand()) +','+(h - yScale(d));
                str +=" "+p1;

                var p2 =(xScale(i)+xScale.rangeBand()) +','+(h);
                str +=" "+p2;
                var p3 = (xScale(i)+xScale.rangeBand()+dp) +','+(h-dp);
                str +=" "+p3;
                var p4 = (xScale(i)+xScale.rangeBand()+dp) +','+(h - yScale(d)-dp);
                str +=" "+p4;
                console.log(str);
                return str;

            },
            fill: "darkblue",
            //stroke: "grey"



        });

    svg.selectAll('.g')
        .data(xData)
        .enter()
        .append('polygon')
        .attr({
            points: function(d,i){
                var dp =15;
                var str =" ";
                var p1 = xScale(i) +', '+(h - yScale(d));
                str += p1



                var p2 =(xScale(i)+xScale.rangeBand()) +','+(h - yScale(d));
                str +=" "+p2;
                var p3 = (xScale(i)+xScale.rangeBand()+dp) +','+(h - yScale(d)-dp);
                str +=" "+p3;
                var p4 = (xScale(i)+dp) +','+(h - yScale(d)-dp);
                str +=" "+p4;
                console.log(str);
                return str;

            },
            fill: "lightblue",
            //stroke: "grey"



        });


//
////append the rects
    svg.selectAll('rect')
        .data(xData)
        .enter()
        .append('rect')
        .attr({
            width: function () {
                return xScale.rangeBand();
            },
            height: function (d) {
                return yScale(d);
            },
            x: function (d, i) {
                return xScale(i);
            },
            y: function (d) {
                return h - yScale(d);
            },
            fill: "steelblue",
            //stroke: "grey"
        });

//append the text

};//END OF EXAMPLE 1

function createArr(len)
{
    arr = [];
    var length = len || Math.floor(Math.random()*10)+5;//random number 5-15
    for(var i=0; i<length; i++)
        arr.push(Math.floor(Math.random()*100)+5)//random number 5-105

    return arr;
}

function createNegArr(len)
{
    arr = [];
    var length = len || Math.floor(Math.random()*10)+5;//random number 5-15
    for(var i=0; i<length; i++){
        var num =(Math.floor(Math.random()*100)+5)
        if(num% 2 === 0){num *=-1}
        arr.push(num);
    }
    return arr;
}
