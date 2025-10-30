// Fundo animado de estrelas com brilho roxo ✨ - versão mais robusta
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) {
    console.warn('Canvas #bg-canvas não encontrado.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Contexto 2D não disponível.');
    return;
  }

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.max(1, window.devicePixelRatio || 1);
  let resizeScheduled = false;

  function applyCanvasSize() {
    // CSS size
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    // backing store size for sharpness in high-DPI
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    // map drawing operations back to CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const scaleX = newWidth / Math.max(1, width);
    const scaleY = newHeight / Math.max(1, height);

    // escala as posições das estrelas para evitar "saltos"
    for (const star of stars) {
      star.x *= scaleX;
      star.y *= scaleY;
    }

    width = newWidth;
    height = newHeight;
    dpr = Math.max(1, window.devicePixelRatio || 1);
    applyCanvasSize();
  }

  // debounce com requestAnimationFrame para evitar chamadas excessivas
  function scheduleResize() {
    if (!resizeScheduled) {
      resizeScheduled = true;
      requestAnimationFrame(() => {
        resizeScheduled = false;
        resizeCanvas();
      });
    }
  }
  window.addEventListener('resize', scheduleResize);

  // Inicializa dimensões e canvas
  applyCanvasSize();

  // Parâmetros das estrelas
  const STAR_COUNT = 250;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.8 + Math.random() * 1.5,
    alpha: 0.6 + Math.random() * 0.4, // base alpha
    speed: 0.002 + Math.random() * 0.02,
    twinkle: Math.random() * Math.PI * 2
  }));

  // Fundo em gradiente roxo
  function drawGradient() {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1a002e'); // roxo profundo no topo
    gradient.addColorStop(1, '#3a0069'); // roxo reluzente embaixo
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function drawStars() {
    // limpa e desenha fundo
    ctx.clearRect(0, 0, width, height);
    drawGradient();

    // desenha cada estrela; shadowBlur é caro, então mantemos valores razoáveis
    for (const star of stars) {
      star.twinkle += star.speed;
      const glow = 0.5 + Math.sin(star.twinkle) * 0.5; // [0,1]
      const alpha = Math.max(0, Math.min(1, star.alpha * (0.8 + glow * 0.4)));

      // cor com componente ligeiramente alterada pelo glow
      const r = Math.min(255, Math.round(200 + glow * 55));
      const g = Math.min(255, Math.round(180 + glow * 50));
      const b = 255;
      const color = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;

      ctx.beginPath();
      ctx.fillStyle = color;

      // usa sombra para brilho; salva/restaura para evitar efeitos persistentes
      ctx.save();
      ctx.shadowColor = color;
      // mantemos shadowBlur moderado para performance; escala com glow
      ctx.shadowBlur = 8 + glow * 12;
      ctx.arc(star.x, star.y, star.radius + glow * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(drawStars);
  }

  drawStars();
});
