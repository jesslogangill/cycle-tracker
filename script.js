const form = document.getElementById('trackerForm');
const weightChartCtx = document.getElementById('weightChart').getContext('2d');
let entries = JSON.parse(localStorage.getItem('entries')) || [];
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const entry = Object.fromEntries(formData.entries());
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
  form.reset();
  renderChart();
});
function renderChart() {
  const weights = entries.map(e => parseFloat(e.weight)).filter(Boolean);
  const cycleDays = entries.map(e => parseInt(e.cycleDay)).filter(Boolean);
  if (window.weightChartInstance) {
    window.weightChartInstance.destroy();
  }
  window.weightChartInstance = new Chart(weightChartCtx, {
    type: 'line',
    data: {
      labels: cycleDays,
      datasets: [{
        label: 'Weight (kg)',
        data: weights,
        fill: false,
        borderColor: 'blue',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Cycle Day' }
        },
        y: {
          title: { display: true, text: 'Weight (kg)' }
        }
      }
    }
  });
}
renderChart();
