// Pick a set of great looking colours
const cycleColors = [
  '#e63946', // vivid red
  '#457b9d', // ocean blue
  '#2a9d8f', // teal
  '#f4a261', // orange
  '#8d99ae', // slate grey
  '#6a4c93', // purple
  '#ffb703', // golden yellow
  '#ef476f'  // pink-red
];

function renderChart() {
  // Group entries by cycleNumber
  const cycles = {};
  entries.forEach(e => {
    const cycleNum = e.cycleNumber || '1';
    if (!cycles[cycleNum]) cycles[cycleNum] = [];
    cycles[cycleNum].push(e);
  });

  // Build datasets for each cycle
  const datasets = Object.keys(cycles).map((cycleNum, index) => {
    const sorted = cycles[cycleNum].sort((a,b) => a.cycleDay - b.cycleDay);
    return {
      label: `Cycle ${cycleNum}`,
      data: sorted.map(e => ({ x: Number(e.cycleDay), y: Number(e.weight) })),
      fill: false,
      borderColor: cycleColors[index % cycleColors.length], // cycle through colours
      backgroundColor: cycleColors[index % cycleColors.length],
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6
    };
  });

  if (window.weightChartInstance) {
    window.weightChartInstance.destroy();
  }

  window.weightChartInstance = new Chart(weightChartCtx, {
    type: 'line',
    data: { datasets },
    options: {
      parsing: { xAxisKey: 'x', yAxisKey: 'y' },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Weight Across Cycles',
          font: { size: 20, weight: 'bold' }
        },
        legend: {
          labels: {
            usePointStyle: true,
            font: { size: 14 }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: { display: true, text: 'Cycle Day' },
          min: 1,
          max: 31
        },
        y: {
          title: { display: true, text: 'Weight (kg)' }
        }
      }
    }
  });
}
