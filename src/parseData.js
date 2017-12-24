/**
 * Transforms data from api call into a usable format for line charts and legends
 * @param {Object} data - Raw data from api call
 * @returns {Object} - Transformed data for both legend and line chart
 */
function parseChartData(data) {
  return data.results.reduce(function(acc, location) {
    const set = location.opens.reduce(function(visitAcc, visitData) {
      visitAcc.push({
        y: visitData.value,
        date: visitData.date
      });
      return visitAcc;
    }, [])
    
    acc.push({
      set: set,
      label: location.name,
    });
    return acc;
  }, []);
}

export default parseChartData;

