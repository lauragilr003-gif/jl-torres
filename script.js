// Configuramos volúmenes iniciales (0.0 a 1.0)
audioEstatica.volume = 0.15; // Muy suave de fondo
audioCambio.volume = 0.9;   // Fuerte para que se note el movimiento
audioFinal.volume = 1.0;    // El volumen máximo para tu historia

perilla.addEventListener('input', () => {
    if (!encendido) return;
    
    let val = perilla.value;
    let mhz = (88.0 + (val * 0.2)).toFixed(1);
    mhzDisp.innerText = mhz;
    
    // Movimiento de la aguja
    aguja.style.left = (45.4 + (val * 0.33)) + "%";

    // EFECTO DE CAMBIO DE EMISORA
    // Cada vez que mueves el dial, reiniciamos el sonido de sintonía
    // Esto hace que si mueves rápido, se sienta que pasas por muchas emisoras
    audioCambio.currentTime = 0; 
    audioCambio.play();

    // Lógica de sintonía final
    if (parseFloat(mhz) === 99.8) {
        audioEstatica.pause();
        audioCambio.pause();
        audioFinal.play();
    } else {
        // Si no estamos en la frecuencia, vuelve la estática suave
        if (!audioFinal.paused) { 
            audioFinal.pause(); 
            audioFinal.currentTime = 0; 
        }
        if (audioEstatica.paused) audioEstatica.play();
    }
});
