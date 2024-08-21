let score = 0;
let balloonSize = 100;

const balloon = document.getElementById('balloon');
const inflateBtn = document.getElementById('inflate-btn');
const popBtn = document.getElementById('pop-btn');
const scoreElement = document.getElementById('score');

inflateBtn.addEventListener('click', () => {
    balloonSize += 10;
    balloon.style.width = `${balloonSize}px`;
    balloon.style.height = `${balloonSize}px`;
    score++;
    scoreElement.textContent = `Puntuación: ${score}`;
});

popBtn.addEventListener('click', () => {
    balloonSize = 100;
    balloon.style.width = `${balloonSize}px`;
    balloon.style.height = `${balloonSize}px`;
    score = 0;
    scoreElement.textContent = `Puntuación: ${score}`;
});