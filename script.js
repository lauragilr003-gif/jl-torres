const powerBtn = document.getElementById('radio-power');
const control = document.getElementById('control-fisico');
const aguja = document.getElementById('aguja-roja');
const freqText = document.getElementById('valor-freq');

const estatica = document.getElementById('estatica-fondo');
const sonidoCambio = document.getElementById('sonido-cambio');
const audioFinal = document.getElementById('audio-final');

let encendido = false;
const frecuenciaMeta = 99.8;

// FUNCIÓN MAESTRA DE AUDIO
function activarAudio(audio, play = true) {
  if (!audio) return;
  if (play) {
    audio.play().catch(() => console.log("Esperando interacción..."));
  } else {
    audio.pause();
  }
}

// CLICK EN EL INTERRUPTOR
powerBtn.addEventListener('click', () => {
  encendido = !encendido;
  powerBtn.classList.toggle('on');
  document.querySelector('.estado-txt').innerText = encendido ? "ON" : "OFF";

  if (encendido) {
    activarAudio(estatica); // Arranca la estática inmediatamente
  } else {
    activarAudio(estatica, false);
    activarAudio(sonidoCambio, false);
    if(audioFinal) activarAudio(audioFinal, false);
  }
});

control.addEventListener('input', () => {
  if (!encendido) return;

  let val = control.value;
  let mhz = (88.0 + (val * 0.2)).toFixed(1);
  freqText.innerText = mhz;

  // Mover aguja
  let pos = 45.4 + (val * (78.4 - 45.4) / 100);
  aguja.style.left = pos + "%";

  // Sonido de cambio de dial
  if (sonidoCambio.paused) activarAudio(sonidoCambio);

  // Lógica de sintonía
  if (parseFloat(mhz) === frecuenciaMeta) {
    activarAudio(estatica, false);
    activarAudio(sonidoCambio, false);
    if (audioFinal) activarAudio(audioFinal);
  } else {
    if (audioFinal) { audioFinal.pause(); audioFinal.currentTime = 0; }
    if (estatica.paused) activarAudio(estatica);
  }
});

control.addEventListener('change', () => {
  if (sonidoCambio) { sonidoCambio.pause(); sonidoCambio.currentTime = 0; }
});