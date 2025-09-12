document.addEventListener('DOMContentLoaded', () => {
    const soundboard = document.querySelector('.soundboard');
    let currentAudio = null;
    let currentButton = null;

    soundboard.addEventListener('click', (event) => {
        const button = event.target.closest('.sound-button');
        if (!button) {
            return;
        }

        const audioPath = button.getAttribute('data-sound');
        if (!audioPath) {
            return;
        }

        // Se o botão clicado for o mesmo que já está tocando, o áudio para.
        if (button === currentButton && currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Volta para o início
            currentAudio = null;
            currentButton = null;
        } else {
            // Se um áudio diferente for clicado, pausa o anterior.
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            
            // Toca o novo áudio
            currentAudio = new Audio(audioPath);
            currentAudio.play().catch(error => console.error("Erro ao tocar o áudio:", error));
            currentButton = button;
        }
    });

});