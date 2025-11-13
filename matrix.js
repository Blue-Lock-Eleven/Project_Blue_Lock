const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+[]{}|;:",./<>?';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim() || '#00D4FF';
const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim() || '#00FFFF';
const darkColor = getComputedStyle(document.documentElement).getPropertyValue('--darker-blue').trim() || '#000A14';

function draw() {
    ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = primaryColor;
    ctx.font = `${fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    for (let x = 0; x < newColumns; x++) {
        drops[x] = 1;
    }
});
