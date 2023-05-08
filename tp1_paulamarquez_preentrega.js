let circles = [];
let squares = [];
let tileSize;
let circleSize;
let numCircles = 5;
let x, y, size, circleColors, colorChange;

function setup() {
  createCanvas(600, 600);
  colorMode(RGB);
  noStroke();

  // Inicializar las variables
  x = width / 2;
  y = height / 2;
  size = 50;
  colorChange = false;

  colorStartSquare = color(255, 0, 0);
  colorEndSquare = color(0, 0, 255);
  colorStartCircle = color(0, 255, 0);
  colorEndCircle = color(255, 255, 0);
  tileSize = width / 29;
  circleSize = tileSize * 0.8;
  setCircleColors();

  // Generar círculos y cuadrados con colores aleatorios
  for (let i = 0; i < 28; i++) {
    for (let j = 0; j < 28; j++) {
      let x = j * tileSize + tileSize / 2;
      let y = i * tileSize + tileSize / 2;
      let squareColor = color(random(100), random(100), random(255));
      squares.push({ x, y, color: squareColor });
      let circleColor = random(circleColors);
      circles.push({
        x: x + tileSize / 2,
        y: y + tileSize / 2,
        color: circleColor,
        num: numCircles,
      });
    }
  }
}

function draw() {
  // Dibujar los cuadrados
  for (let i = 0; i < squares.length; i++) {
    let { x, y, color } = squares[i];
    let distFromCenter = dist(x, y, width / 2, height / 2);
    let percentFromCenter = distFromCenter / (width / 2);
    let c = lerpColor(colorStartSquare, colorEndSquare, percentFromCenter);
    fill(c);
    rect(x, y, tileSize, tileSize);
  }

  // Dibujar los círculos y el gradiente radial de colores
  for (let i = 0; i < circles.length; i++) {
    let { x, y, color, num } = circles[i];
    if (num > 0) {
      let distFromCenter = dist(x, y, width / 2, height / 2);
      let percentFromCenter = distFromCenter / (width / 2);
      let t = map(percentFromCenter, 0, 1, 0, 1);
      let c = lerpColor(colorStartCircle, colorEndCircle, t);
      fill(c);
      noStroke(); // quitar el borde
      ellipse(x, y, circleSize, circleSize);
    }
  }
}

function keyPressed() {
  // Cambiar el gradiente de colores si el usuario presiona la tecla espacio
  if (keyCode === 32) {
    colorChange = true;
  } else {
    colorChange = false;
  }

  if (colorChange) {
    // Cambiar los colores de los cuadrados y circulos
    colorStartSquare = color(random(255), random(255), random(255));
    colorEndSquare = color(random(255), random(255), random(255));

    colorStartCircle = color(random(255), random(255), random(255));
    colorEndCircle = color(random(255), random(255), random(255));
  }

  if (keyCode === ENTER) {
    saveCanvas("mi_version", "jpg");
  }
}

function setCircleColors() {
  // Definir los colores para el array circleColors
  let color1 = color(255, 255, 0); // amarillo
  let color2 = color(238, 130, 238); // violeta
  let color3 = color(75, 0, 130); // indigo
  let color4 = color(255, 165, 0); // naranja
  let color5 = color(255, 0, 0); // rojo
  let color6 = color(0, 128, 0); // verde
  circleColors = [color1, color2, color3, color4, color5, color6];
  for (let i = 0; i < circles.length; i++) {
    circles[i].color = random(circleColors);
  }
}
