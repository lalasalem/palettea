const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Palettea - Digital Art App</title>
        <style>
            body { margin: 0; background-color: #121212; color: white; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
            canvas { background: #ffffff; cursor: crosshair; box-shadow: 0 0 50px rgba(0,0,0,0.8); border-radius: 8px; }
            .toolbar { position: absolute; top: 20px; background: rgba(30, 30, 30, 0.9); padding: 15px; border-radius: 50px; display: flex; gap: 20px; backdrop-filter: blur(10px); border: 1px solid #333; }
            .dot { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: 0.2s; }
            .dot:hover { transform: scale(1.2); border-color: white; }
        </style>
    </head>
    <body>
        <div class="toolbar">
            <div class="dot" style="background: #FF4B2B;" onclick="setColor('#FF4B2B')"></div>
            <div class="dot" style="background: #FFD200;" onclick="setColor('#FFD200')"></div>
            <div class="dot" style="background: #00FF00;" onclick="setColor('#00FF00')"></div>
            <div class="dot" style="background: #00B4DB;" onclick="setColor('#00B4DB')"></div>
            <button style="background:none; border:1px solid #555; color:white; border-radius:20px; padding:5px 15px; cursor:pointer;" onclick="clearCanvas()">Clear</button>
        </div>
        <canvas id="artBoard"></canvas>
        <script>
            const canvas = document.getElementById('artBoard');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth * 0.9;
            canvas.height = window.innerHeight * 0.8;
            let drawing = false;
            let color = '#FF4B2B';
            function setColor(c) { color = c; }
            function clearCanvas() { ctx.clearRect(0,0,canvas.width, canvas.height); }
            canvas.addEventListener('mousedown', () => drawing = true);
            canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
            canvas.addEventListener('mousemove', (e) => {
                if(!drawing) return;
                ctx.lineWidth = 10;
                ctx.lineCap = 'round';
                ctx.strokeStyle = color;
                ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            });
        </script>
    </body>
    </html>
  `);
});

server.listen(port, () => { console.log('Palettea Running!'); });
