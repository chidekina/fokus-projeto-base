const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const startOrPauseCountdownBtn = document.querySelector('#start-pause span');
const startOrPauseBtnImage = document.querySelector('.app__card-primary-butto-icon');
const timeOnScreen = document.querySelector('#timer');

const musicInput = document.querySelector('#alternate-song');
const music = new Audio('/sons/luna-rise-part-one.mp3');
music.loop = true;

const audioStart = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioFinished = new Audio('/sons/beep.mp3');

let timeInSec = 1500;
let intervalId = null;

musicInput.addEventListener('change', () => {
    if(music.paused) {
        music.play();
    } else music.pause();
})

focoBtn.addEventListener('click', () => {
    timeInSec = 1500;
    changeContext('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    timeInSec = 300;
    changeContext('descanso-curto');
    curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
    timeInSec = 900;
   changeContext('descanso-longo');
   longoBtn.classList.add('active');
});

function changeContext(context) {
    showTime();
    buttons.forEach(function(context) {
        context.classList.remove('active');
    });

    html.setAttribute('data-contexto', context);
    banner.setAttribute('src',`/imagens/${context}.png`);
    switch (context) {
        case 'foco':
            title.innerHTML = `  Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
};

const countDown = () => {
    if (timeInSec <= 0) {
        audioFinished.play();
        reset();
        alert('Tempo finalizado!');
        return;
    }
    timeInSec -= 1;
    showTime();
};

startPauseBtn.addEventListener('click', startOrPause);

function startOrPause() {
    if(intervalId){
        audioPause.play();
        reset();
        return;
    };

    audioStart.play();
    intervalId = setInterval(countDown, 1000)
    startOrPauseCountdownBtn.textContent = 'Pausar';
    startOrPauseBtnImage.setAttribute('src', '/imagens/pause.png');
};

function reset() {
    clearInterval(intervalId);
    startOrPauseCountdownBtn.textContent = 'Começar';
    startOrPauseBtnImage.setAttribute('src', '/imagens/play_arrow.png')
    intervalId = null;
};

function showTime() {
    const time = new Date(timeInSec * 1000);
    const FormatedTime = time.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    timeOnScreen.innerHTML = `${FormatedTime}`;
};

showTime();