document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('input1').value = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().split('T')[0];
    function getServerList(){
        fetch(`/api/getServers?date=${document.getElementById('input1').value}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for(const server of data){
                const option = document.createElement('option');
                option.value = server;
                option.textContent = server;
                document.getElementById('selset').appendChild(option);
            }
        })
        .catch(error => console.error('Error:', error));
        }
        getServerList();
    const ctx = document.getElementById('myChart').getContext('2d');
        document.getElementById('button2').addEventListener('click',  async function () {
            document.getElementById('selset').innerHTML = '';
            getServerList();
        });
    document.getElementById('button1').addEventListener('click', async function() {
        try {
            let myChart = Chart.getChart(ctx);
            if (myChart) {
                myChart.destroy();
            }
            const response = await fetch(`/api/getChartData?date=${document.getElementById('input1').value}&serverName=${document.getElementById("selset").value}`, {
                method: 'GET'
            });
            const chartData = await response.json();
            console.log('Fetched chart data:', chartData); // Log the fetched data

            if (!Array.isArray(chartData)) {
                throw new Error('Fetched data is not an array');
            }

            const timeLabels = chartData.map(record => record.reduce((sum, entry) => sum + entry.time, 0));
            const userData = chartData.map(record => record.reduce((sum, entry) => sum + entry.userCount, 0));
            const isServerOnData = chartData.map(record => record.reduce((sum, entry) => sum + entry.isServerOn, 0));
            // console.log('Labels:', timeLabels, 'Data:', userData); // Log the labels and data

            const backgroundColors = isServerOnData.map(isServerOn => isServerOn ? 'rgba(75, 192, 192, 0.2)' : 'rgba(122,122,122,0.2)');
            const borderColors = isServerOnData.map(isServerOn => isServerOn ? 'rgba(75, 192, 192, 1)' : 'rgb(90,90,90)');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timeLabels,
                    datasets: [{
                        label: 'User Count',
                        data: userData,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                        fill: isServerOnData,
                        cubicInterpolationMode: 'monotone',
                        tension: 1,
                        segment:{
                            borderColor: function(context) {
                                const index = context.p0DataIndex;
                                return isServerOnData[index] ? 'rgba(75, 192, 192, 1)' : 'rgb(90,90,90)';
                            }
                        }
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
});