const bola = document.getElementById("bola");
let initialPositionY = 0;
let initialPositionX = 0;
let direcaoY = 1;
let direcaoX = 1;
let cicles = 0;
let animando = false;
let estado = "vertical";
let velocidade = 2;

const limitScreenY = window.innerHeight / 2 - bola.offsetHeight;
const limitScreenX = window.innerWidth / 2 - bola.offsetWidth;

function resetValues() {
  initialPositionY = 0;
  initialPositionX = 0;
  direcaoY = 1;
  direcaoX = 1;
  cicles = 0;
  estado = "vertical";
  bola.style.left = "50%";
  bola.style.top = "50%";
  bola.style.transform = "translate(-50%, -50%)";
}

function cruzAnimation() {
  if (!animando) return;
  if (estado === "vertical") {
    initialPositionY += direcaoY * velocidade;

    if (initialPositionY > limitScreenY || initialPositionY < -limitScreenY) {
      direcaoY *= -1;
      cicles++;
    }

    if (cicles >= 4) {
      estado = "centralizando";
    }
  }

  if (estado === "horizontal") {
    initialPositionX += direcaoX * velocidade;

    if (initialPositionX > limitScreenX || initialPositionX < -limitScreenX) {
      direcaoX *= -1;
      cicles++;
    }

    if (cicles >= 4) {
      estado = "centralizando";
    }
  }

  if (estado === "centralizando") {
    if (initialPositionX !== 0) {
      initialPositionX -= Math.sign(initialPositionX) * 1;
      if (Math.abs(initialPositionX) <= 2) {
        initialPositionX = 0;
        estado = "vertical";
      }
    }

    if (initialPositionY !== 0) {
      initialPositionY -= Math.sign(initialPositionY) * 1;
      if (Math.abs(initialPositionY) <= 2) {
        initialPositionY = 0;
        estado = "horizontal";
      }
    }
    if (initialPositionX === 0 && initialPositionY === 0) {
      cicles = 0;
      direcaoY = 1;
      direcaoX = 1;
    }
  }

  bola.style.transform = `translate(${initialPositionX}px,${initialPositionY}px)`;
  requestAnimationFrame(cruzAnimation);
}

const cruz = () => {
  animando = !animando;
  resetValues();
  if (animando) {
    cruzAnimation();
  }
};

function ballBounce() {
  if (!animando) return;
  initialPositionY += direcaoY * velocidade;

  if (cicles >= 2) {
    initialPositionX += direcaoX * velocidade;
  }

  if (initialPositionY > limitScreenY || initialPositionY < -limitScreenY) {
    direcaoY *= -1;
    velocidade+=0.05;
    cicles++;
  }

  if (initialPositionX > limitScreenX || initialPositionX < -limitScreenX) {
    direcaoX *= -1;
    velocidade+=0.05;
  }

  bola.style.transform = `translate(${initialPositionX}px,${initialPositionY}px)`;
  requestAnimationFrame(ballBounce);
}
const infinite = () => {
  animando = !animando;
  resetValues();
  if (animando) {
    ballBounce();
  }
};

function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

function move(e) {
  var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
  var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;

  const offset = 30;

  bola.style.left = x + offset + "px";
  bola.style.top = y + offset + "px";
}

const livre = () => {
  animando = !animando;
  resetValues();

  if (animando) {
    document.addEventListener("mousemove", move);
  } else {
    document.removeEventListener("mousemove", move);
  }
};

function spinBall(){
  if (!animando) return;
  let velocidade = 0.01;
  velocidade = Math.min(velocidade + 0.01,0.1)
  cicles += velocidade
  const raio = Math.min(limitScreenX,limitScreenY)

  initialPositionX = Math.cos(cicles) * raio
  initialPositionY = Math.sin(cicles) * raio
  bola.style.transform = `translate(${initialPositionX}px,${initialPositionY}px)`;
  requestAnimationFrame(spinBall);
}

const spin = () => {
  animando = !animando;
  resetValues();

  if (animando) {
    spinBall();
  }
};
