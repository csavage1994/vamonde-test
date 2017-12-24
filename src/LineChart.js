import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';

/**
* Expected props:
* width | height - decimal representation of the percentage width
* data - as described below to render the chart
* Expects data in the following form:

    const data = [
      {
        set: [
          {
            y: Integer,
            date: 'YYYY-MM-DD'
          }
        ],
        label: String
      },
      ...
    ]
*/

class LineChart extends Component {
  drawChart() {
    const parent = this.svg.parentNode;
    const margin = {top: 50, right: 5, bottom: 50, left: 25}
    const width = (parent.clientWidth - margin.left - margin.right) * this.props.width; // Allows for percentage based sizing
    const height = (parent.clientHeight - margin.top - margin.bottom) * this.props.height;
    const parseTime = d3.timeParse('%Y-%m-%d');
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const domain = [];
    const range = [];
    let axisLength;

    // Used to set the bounds of our axis
    this.props.data.forEach((group) => {
      group.set.forEach((data) => {
        domain.push(data.date);
        range.push(data.y);
      })
    })
  
    // set up function for given domain
    const xScale = d3.scaleTime()
        .range([0, width]); // output
    
    // set up function for given range
    const yScale = d3.scaleLinear()
        .range([height, 0]); // output 

    xScale.domain(d3.extent(domain, (d) => { return parseTime(d); }));
    yScale.domain(d3.extent(range, (d) => { return d; })); 
    
    const line = d3.line()
        .x((d, i) => xScale(parseTime(d.date))) // set the x values for the line generator
        .y((d) => yScale(d.y)) // set the y values for the line generator 
    
    // append svg to containing div
    const svg = d3.select(this.svg).append('svg')
        .classed('line-chart', true)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    
    // add axis and format ticks
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).ticks(5)) // Create an axis component with d3.axisBottom
        .selectAll('text')
        .attr('fill', 'white')

    svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale).ticks(5)) // Create an axis component with d3.axisLeft
        .selectAll('text')
        .attr('fill', 'white')
        .selectAll('line')

    // Set up axis styling
    axisLength = d3.select('g.x.axis').node().getBBox().width - 35

    d3.selectAll('g.x.axis > path').attr('stroke', '#868686')
    d3.selectAll('g.y.axis > path').attr('stroke', 'none')
    d3.selectAll('g.x.axis > g > line').attr('stroke', 'none')
    d3.selectAll('g.y.axis > g > line')
      .attr('x2', axisLength)
      .attr('stroke', 'rgba(169, 169, 169, 0.22)')
    d3.selectAll('text').attr('font-size', '12px').attr('font-weight', '100')
    
    // Loop through each data set and append a new line to the chart
    this.props.data.forEach(function(location, i) {
      const set = location.set;
      
      svg.append('path')
          .datum(set)
          .attr('fill', 'none')
          .attr('stroke', (d) => colors(i))
          .attr('stroke-width', '2px')
          .attr('d', line);
    })

  }

  componentDidMount() {
    this.drawChart();
    // Re-draws chart on window resize for responsiveness
    window.addEventListener('resize', () => {
      d3.select('.line-chart').remove();
      this.drawChart(); 
    })
  }

  render() {
    return (
        <div ref={(svg) => { this.svg = svg; }}></div>
    );
  }
};

export default LineChart;