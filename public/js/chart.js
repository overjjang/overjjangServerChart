document.addEventListener('DOMContentLoaded', async function() {
    const ctx = document.getElementById('myChart').getContext('2d');

    try {
        const response = await fetch('/api/getChartData', {
            method: 'GET'
        });
        const chartData = await response.json();
        console.log('Fetched chart data:', chartData); // Log the fetched data

        if (!Array.isArray(chartData)) {
            throw new Error('Fetched data is not an array');
        }

        const labels = chartData.map(record => record.reduce((sum, entry) => sum + entry.time, 0));
        const data = chartData.map(record => record.reduce((sum, entry) => sum + entry.userCount, 0));
        console.log('Labels:', labels, 'Data:', data); // Log the labels and data

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'User Count',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                    tension: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }
});