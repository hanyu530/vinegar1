let stars = [];
let bubbles = []; // 氣泡陣列
let gradientColors;

function setup() { 
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  noStroke();

  // 產生星星
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      brightness: random(150, 255),
    });
  }

  // 設定背景漸層顏色（深咖啡色系）
  gradientColors = [
    color(60, 40, 20),    // 深咖啡
    color(90, 60, 30),    // 中咖啡
    color(140, 100, 60)   // 淺咖啡
  ];

  // 初始化氣泡
  for (let i = 0; i < 50; i++) {
    bubbles.push(createBubble());
  }
}

function draw() {
  drawGradientBackground(); // 繪製漸層背景

  // 繪製星星
  for (let star of stars) {
    // 計算滑鼠與星星的距離
    let distanceToMouse = dist(mouseX, mouseY, star.x, star.y);
    let mouseEffect = map(distanceToMouse, 0, width / 2, 100, 0); // 距離越近，影響越大
    star.brightness = map(sin(frameCount * 0.05 + star.x), -1, 1, 150, 255) + mouseEffect;
    star.brightness = constrain(star.brightness, 150, 255); // 限制亮度範圍
    fill(star.brightness);
    ellipse(star.x, star.y, star.size);
  }

  // 繪製氣泡
  for (let bubble of bubbles) {
    drawBubble(bubble);
    updateBubble(bubble);
  }
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(gradientColors[0], gradientColors[2], inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function createBubble() {
  return {
    x: random(width),
    y: random(height),
    size: random(10, 50),
    speed: random(1, 3),
    opacity: random(100, 200),
  };
}

function drawBubble(bubble) {
  fill(255, 255, 255, bubble.opacity); // 白色氣泡，帶透明度
  ellipse(bubble.x, bubble.y, bubble.size);
}

function updateBubble(bubble) {
  bubble.y -= bubble.speed; // 氣泡向上移動
  if (bubble.y < 0) {
    // 如果氣泡超出畫布，重置位置
    bubble.x = random(width);
    bubble.y = height + bubble.size;
    bubble.size = random(10, 50);
    bubble.speed = random(1, 3);
    bubble.opacity = random(100, 200);
  }
}

function mouseMoved() {
  // 滑鼠移動時新增氣泡
  bubbles.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 30),
    speed: random(1, 3),
    opacity: random(150, 255),
  });

  // 限制氣泡數量
  if (bubbles.length > 100) {
    bubbles.shift();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
}
