const ctx = document.getElementById('symptomHeatmap').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'],
    datasets: [{
      label: 'Cramps',
      data: [8, 1, 0, 3],
      backgroundColor: 'rgba(255,99,132,0.8)'
    }, {
      label: 'Bloating',
      data: [2, 5, 7, 6],
      backgroundColor: 'rgba(255,206,86,0.8)'
    }, {
      label: 'Mood Swings',
      data: [3, 2, 4, 9],
      backgroundColor: 'rgba(75,192,192,0.8)'
    }]
  },
  options: {
    indexAxis: 'y',
    plugins: {
      title: {
        display: true,
        text: 'Frequency of Symptoms by Cycle Phase'
      }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  }
});
