import React, { Component } from 'react';
import LineChart from './LineChart.js';
import Legend from './Legend.js';
import Table from './Table.js';
import data from './data.js';
import './App.css';

import parseChartData from './parseData.js';

class App extends Component {
  render() {
    const parsedData = parseChartData(data);

    return (
      <div className="App">
        <section className="chart-container">
          <LineChart data={parsedData} width={0.72} height={1} chartId="lineChart" />
          <Legend data={parsedData} />
        </section>
        <section className="table-container">
          <Table data={data.results} />
        </section>
      </div>
    );
  }
}

export default App;
