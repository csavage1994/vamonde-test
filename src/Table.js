import React, { Component } from 'react';
import './Table.css';

/**
 * Expected props:
 * data {Object} - Raw response from api call `results` field
 */
export default class Table extends Component {
  render() {
    var oneDay = 24*60*60*1000; // number of millis per day

    const rows = this.props.data.map(function(group, i) {
      const timeDiff = Math.floor((Date.now() - (new Date(group.created_at).getTime())) / oneDay)
      return (
        <tr className="data" key={i}>
          <td>{group.name}</td>
          <td>{group.num_summary_views}</td>
          <td>{group.num_opens}</td>
          <td>{timeDiff}</td>
        </tr>
      )
    })

    return (
      <div style={{overflowX: "auto"}}>
        <table className="data-table">
          <thead>
            <tr>
              <th>ADVENTURE NAME</th>
              <th>SUMMARY VIEWS</th>
              <th>ADVENTURE OPENS</th>
              <th>ADVENTURE AGE / DAYS</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}