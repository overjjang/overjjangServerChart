document.addEventListener('DOMContentLoaded', async function() {
    await fetch('/api/getWorkStatus', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cronStatus = data.cronTasks;
        const serverNames = data.serverNames;
        const latestRecord = data.latestRecord;
        console.log('cronStatus:', cronStatus);
        console.log('serverNames:', serverNames);
        console.log('latestRecord:', latestRecord);
        // Update the UI with the fetched data
        if(cronStatus.isOn){
            document.getElementById('cronStatus').textContent = `매${cronStatus.time} 분`;
        }
        else {
            document.getElementById('cronStatus').textContent = '중지';
            document.getElementById('cronStatus').classList.add('text-danger');
        }
        document.getElementById('serverNames').innerHTML = serverNames.map(serverName => `<li>${serverName}</li>`).join('');
        document.getElementById('latestRecord').innerHTML = latestRecord.map(record => `<li>기록시간: ${record.time} 유저수: ${record.userCount} ${record.isServerOn ? 'On' : 'Off'}</li>`).join('');
    })
    .catch(error => console.error('Error:', error));
});