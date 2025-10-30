// Fundo animado de estrelas ✨
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  radius: Math.random() * 1.5,
  alpha: Math.random(),
  speed: 0.01 + Math.random() * 0.02
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
    star.alpha += star.speed;
    if (star.alpha >= 1 || star.alpha <= 0) star.speed *= -1;
  }
  requestAnimationFrame(drawStars);
}
drawStars();
