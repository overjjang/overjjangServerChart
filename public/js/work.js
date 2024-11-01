document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button0').addEventListener('click', function() {
        console.log('서버 분석 1회 실행');
        alert('서버 분석 1회 실행');
        fetch('/api/updateServerState', {
            method: 'POST'
        }).catch(error => console.error('Error:', error));
    });
    document.getElementById('button1').addEventListener('click', function() {
        console.log('서버 분석 시작');
        alert('서버 분석 시작');
        fetch('/api/updateServerState', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serverName: 'serverIP' }) // Ensure serverIP is defined or replace with actual value
        }).catch(error => console.error('Error:', error));

        fetch('/api/scheduleCronJob', {
            method: 'POST'
        }).catch(error => console.error('Error:', error));
    });

    document.getElementById('button2').addEventListener('click', function() {
        alert('신규 데이터베이스 생성');
        fetch('/api/createServerState', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serverName: 'serverIP' }) // Ensure serverIP is defined or replace with actual value
        }).catch(error => console.error('Error:', error));
    });
});