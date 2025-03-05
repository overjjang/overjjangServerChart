document.addEventListener("DOMContentLoaded",async ()=>{
    await fetch("http://localhost:3001/api/getHostStatus")
    .then(response => response.json())
        .then(data => {
            console.log(data);
            const ssh = document.getElementById('ssh');
            ssh.innerHTML += data.hosts[0].up ? 'online 🟩' : 'offline 🟥';
            const web = document.getElementById('web');
            web.innerHTML += data.hosts[1].up ? 'online 🟩' : 'offline 🟥';
            const API = document.getElementById('api');
            API.innerHTML += data.hosts[2].up ? 'online 🟩' : 'offline 🟥';

            const main = document.getElementById('main');
            main.innerHTML += data.hosts[3].up ? 'online 🟩' : 'offline 🟥';
            const sub = document.getElementById('sub');
            sub.innerHTML += data.hosts[4].up ? 'online 🟩' : 'offline 🟥';
        })
})