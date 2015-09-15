
// These keep JSHint quiet if you're using it (highly recommended!)
var margin = {top: 25, right: 10, bottom: 10, left: 20};
var h = 390 - margin.top - margin.bottom;
var w = 400 - margin.right - margin.left;

//part1
 document.getElementById("staircase").onclick= function staircase() {
    var num = 30;
    var nodes = document.getElementById("bar-chart1").children;
    console.log(nodes);
    [].forEach.call(nodes,function(node){

         node.setAttribute("height",num);
         node.setAttribute("y",350-num);
        num+=30;
    });
    //var array = Array.prototype.slice.call(nodes);
    //array.forEach(function(i){
    //    console.log(typeof i)
    //    });
};

//part 2
document.getElementById("dataset").onchange = function(event){
    var data = d3.csv("data/"+event.srcElement.value +".csv",update);
};

function update(error, data) {
    if (error !== null) {
        alert("Couldn't load the dataset!");
    } else {
        // D3 loads all CSV data as strings;
        // while Javascript is pretty smart
        // about interpreting strings as
        // numbers when you do things like
        // multiplication, it will still
        // treat them as strings where it makes
        // sense (e.g. adding strings will
        // concatenate them, not add the values
        // together, or comparing strings
        // will do string comparison, not
        // numeric comparison).

        // We need to explicitly convert values
        // to numbers so that comparisons work
        // when we call d3.max()
        data.forEach(function (d) {
            d.a = parseInt(d.a);
            d.b = parseFloat(d.b);
        });
    }



    //set width and height append a g element to hold the main
    //content of the viz, apply margins


    // Set up the scales
    var aScale = d3.scale.linear()
        .domain([0, d3.max(data, function (d) {
            return d.a;
        })])
        .range([0, h]);
    var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([0,w],.05);
    console.log(data.length);

    var bScale = d3.scale.linear()
        .domain([0, d3.max(data, function (d) {
            return d.b;
        })])
        .range([0, h]);
    var iScale = d3.scale.linear()
        .domain([0, data.length])
        .range([0, h]);

    // ****** TODO: PART III (you will also edit in PART V) ******

    // TODO: Select and update the 'a' bar chart bars
    var svg = d3.select('#bar-chart1')
        .attr({
            width: w + margin.right + margin.left,
            height: h + margin.top + margin.bottom
        })
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var selection = d3.selectAll("#bar-chart1 rect")
        .data(data);

    //probably don't need since we are not adding extra elements
    //selection.enter().append("rect");

    selection
        .transition()
        .duration(1000)
        .style("fill", "green")
        .attr({
        x: function(d,i){return Math.floor((xScale(i)))},
        y: function(d){return Math.floor(h-aScale(d.a))},
        width: function(){return Math.floor(xScale.rangeBand())},
        height: function(d){return Math.floor(aScale(d.a))}
    });

    // TODO: Select and update the 'b' bar chart bars

    var selection1 = d3.selectAll("#bar-chart2 rect")
        .data(data);

    //probably don't need since we are not adding extra elements
    selection1.enter().append("rect");
    selection1.exit().remove();
    selection1
        .transition()
        .duration(1000)
        .style("fill", "green")
        .attr({
            x: function(d,i){return Math.floor((xScale(i)))},
            y: function(d){return Math.floor(h-aScale(d.b))},
            width: function(){return Math.floor(xScale.rangeBand())},
            height: function(d){return Math.floor(aScale(d.b))}
        });

    // TODO: Select and update the 'a' line chart path using this line generator
    createSvg('#line-chart1');

    var aLineGenerator = d3.svg.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return aScale(d.a);
        });
    d3.select('#line-chart1 path')
        .transition()
        .duration(3000)
        .attr("d",aLineGenerator(data));


    // TODO: Select and update the 'b' line chart path (create your own generator)
    createSvg('#line-chart2');
    var bLineGenerator = d3.svg.line()
        .x(function(d,i){
            return iScale(i);
        })
        .y(function(d){
            return bScale(d.b)
        });
    d3.select("#line-chart2 path")
        .transition()
        .duration(3000)
        .attr("d",bLineGenerator(data));
    // TODO: Select and update the 'a' area chart path using this line generator
    createSvg('#area-chart1');
    var aAreaGenerator = d3.svg.area()
        .x(function (d, i) {
            return iScale(i);
        })
        .y0(h)
        .y1(function (d) {
            return aScale(d.a);
        });

    d3.select("#area-chart1 path")
        .transition()
        .duration(3000)
        .attr("d",aAreaGenerator(data));

    // TODO: Select and update the 'b' area chart path (create your own generator)


    // TODO: Select and update the scatterplot points

    // ****** TODO: PART IV ******
}

function changeData() {
    // Load the file indicated by the select menu
    var dataFile = document.getElementById('dataset').value;
    d3.csv('data/' + dataFile + '.csv', update);
}

function randomSubset() {
    // Load the file indicated by the select menu,
    // and then slice out a random chunk before
    // passing the data to update()
    var dataFile = document.getElementById('dataset').value;
    d3.csv('data/' + dataFile + '.csv', function (error, data) {
        var subset = [];
        data.forEach(function (d) {
            if (Math.random() > 0.5) {
                subset.push(d);
            }
        });

        update(error, subset);
    });

}
function createSvg(id)
{
    d3.select('id')
        .attr({
            width: w + margin.right + margin.left,
            height: h + margin.top + margin.bottom
        })
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
}
