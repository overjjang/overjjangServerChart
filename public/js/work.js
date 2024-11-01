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
        fetch('/api/scheduleCronJob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serverName: 'serverIP' }) // Ensure serverIP is defined or replace with actual value
        }).catch(error => console.error('Error:', error));
    });

    document.getElementById('button2').addEventListener('click', function() {
        alert('레코드 생성');
        fetch('/api/createRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serverName: 'serverIP' }) // Ensure serverIP is defined or replace with actual value
        }).catch(error => console.error('Error:', error));
    });
    document.getElementById('button4').addEventListener('click', function() {
        alert('서버 분석 중지');
        fetch('/api/stopScheduledCronJob', {
            method: 'POST'
        }).catch(error => console.error('Error:', error));
    });
    document.getElementById('button3').addEventListener('click', function() {
        alert('서버 상태 저장');
        fetch('/api/saveRecord', {
            method: 'POST'
        }).catch(error => console.error('Error:', error));
    });
});