import React, { Component } from 'react';
import * as d3 from 'd3';
import './Legend.css';

const colors = d3.scaleOrdinal(d3.schemeCategory10);

/**
 * Expected props:
 * data - raw results from api call `results` field
 */
export default class Legend extends Component {
  render() {
    const items = this.props.data.map(function(group, i) {
      var borderStyle = `2px solid ${colors(i)}`;
      return (
        <li className="legend-item" key={i}>
          <span className="legend-line" style={{ borderBottom: borderStyle, backgroundColor: colors(i) }}></span>
          <p className="legend-location">{group.label}</p>
        </li>
      )
    })

    return (
      <ul className="legend">
        {items}
      </ul>
    )
  }
}