document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button0').addEventListener('click', function() {
        console.log('서버 분석 1회 실행');
        alert('서버 분석 1회 실행');
        fetch('/api/updateServerState', {
            method: 'POST'
        }).catch(error => console.error('Error:', error));
    });
    document.getElementById('button1').addEventListener('click', function() {
        const repeatTime = document.getElementById("input0").value;
        if (!repeatTime) {
            alert('반복 시간을 입력하세요');
            return;
        }
        console.log('서버 분석 시작');
        alert('서버 분석 시작(스케쥴 실행)');
        fetch('/api/scheduleCronJob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ repeatTime: repeatTime })
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
    document.getElementById('button5').addEventListener('click', function() {
        const serverName = document.getElementById('input1').value;
        if (!serverName) {
            alert('서버 이름을 입력하세요');
            return;
        }
        console.log(serverName);
        alert('분석 서버 추가');
        fetch('/api/addServer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serverName: serverName })
        }).catch(error => console.error('Error:', error));
    });
});