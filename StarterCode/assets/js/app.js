// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height",svgHeight)
    .attr("width",svgWidth);

var chartGroup = svg.append("g")
    .attr("transform",`translate(${chartMargin.left},${chartMargin.top})`);

d3.csv("./assets/data/data.csv").then(function(demographics) {
    console.log(demographics);

    demographics.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
    });

    var xScale = d3.scaleLinear()
        .domain(d3.extent(demographics, d => d.age))
        .range([0, chartWidth]);
    
    var yScale = d3.scaleLinear()
        .domain([6, d3.max(demographics, d => d.smokes)])
        .range([chartHeight,0]);
    
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
        .attr("transform",`translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.selectAll("circle")
        .data(demographics)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx",d => xScale(d.age))
        .attr("cy",d => yScale(d.smokes))
        .attr("r","11")
        .attr("stroke-width","1")
        .attr("opacity", .75);

    chartGroup.append("g").selectAll("text")
        .data(demographics)
        .enter()
        .append("text")
        .classed(".stateText", true)
        .text(d => d.abbr)
        .attr("x",d => xScale(d.age))
        .attr("y",d => yScale(d.smokes))
       
    chartGroup.append("text")
        .text("Median Age")
        .attr("transform",`translate(${chartWidth/2}, ${chartWidth + chartMargin.top + 13})`)
        .attr("text-anchor","middle")
        .attr("fill","black");

        chartGroup.append("text")
            .text("smokers (%)") 
            .attr("x",0 - (chartHeight/2))
            .attr("y", 0 - ((chartMargin.left/2)+2))
            .attr("text-anchor","middle")
            .attr("fill", "black")
            .attr("transform","rotate(-90)");
                   
}).catch(function(error) {
    console.log(error);
});