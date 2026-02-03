console.log("Il sito è partito!");

// --- CONFIGURAZIONE RICORDI ---
const ricordi = [
    { img: 'img1.jpg', text: 'Qui c\'è una rara foto di te che mangi' },
    { img: 'img2.jpg', text: 'Anche qui' },
    { img: 'img3.jpg', text: 'Pure qui' },
    { img: 'img4.jpg', text: 'E qui' },
    { img: 'img5.jpg', text: 'E ancora!' },
    { img: 'img6.jpg', text: 'Non è poi così rara allora la prima foto' },
    { img: 'img7.jpg', text: 'ancora ...' },
    { img: 'img8.jpg', text: '...' },
    { img: 'img9.jpg', text: '...' },
    { img: 'img10.jpg', text: '...' }, 
    { img: 'img11.jpg', text: '...' },
    { img: 'img12.jpg', text: '...' },
    { img: 'img13.jpg', text: '...' }, 
    { img: 'img14.jpg', text: '...' },
    { img: 'img15.jpg', text: '...' },
    { img: 'img16.jpg', text: 'Ci sarebbero ancora tantissime altre foto ma' },
    { img: 'img17.jpg', text: 'Non finiresti di vederle tutte in tempo per rispondermi a questa domanda' },       

];

// --- SELEZIONE ELEMENTI ---
const modelViewer = document.querySelector('#my-box');
const overlay = document.getElementById('overlay');
const activePhotoDiv = document.getElementById('active-photo');
const activeImg = document.getElementById('active-img');
const activeText = document.getElementById('active-text');
const instruction = document.querySelector('.instruction');

// Elementi finale
const finalQuestionDiv = document.getElementById('final-question');
const celebrationDiv = document.getElementById('celebration-screen');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

let currentIndex = 0;
let isBoxActivated = false;
let isQuestionMode = false;

// --- 1. CLICK SULLA SCATOLA ---
modelViewer.addEventListener('click', () => {
    console.log("Click sulla scatola rilevato");
    
    if (!isBoxActivated) {
        isBoxActivated = true;
        modelViewer.removeAttribute('auto-rotate');
        instruction.innerText = "❤️";
        
        // Animazione "Salto"
        modelViewer.style.transform = "scale(0.9)"; 
        setTimeout(() => {
            modelViewer.style.transform = "scale(1.5) translateY(-50px) rotate(5deg)";
            
            // Prova fuochi
            if (typeof confetti !== 'undefined') { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); }

            setTimeout(() => {
                modelViewer.style.transform = "scale(1) translateY(0)"; 
                console.log("Apro la prima foto...");
                mostraFoto(); 
            }, 300);
        }, 150);
    }
});

// --- 2. GESTIONE FOTO (AVANTI) ---
overlay.addEventListener('click', (e) => {
    // Se clicchi sui bottoni o sei nella domanda, non fare nulla qui
    if (e.target.tagName === 'BUTTON' || isQuestionMode) return;
    
    // Se l'overlay non è visibile, esci
    if (!overlay.classList.contains('visible')) return;

    overlay.classList.remove('visible');
    currentIndex++;
    
    setTimeout(() => { mostraFoto(); }, 500);
});

function mostraFoto() {
    // Se foto finite, vai alla domanda
    if (currentIndex >= ricordi.length) {
        console.log("Foto finite, mostro domanda");
        mostraDomandaFinale();
        return;
    }

    const data = ricordi[currentIndex];
    console.log("Carico foto:", data.img);
    
    activeImg.src = data.img;
    activeText.innerText = data.text;
    
    activePhotoDiv.classList.remove('hidden');
    finalQuestionDiv.classList.add('hidden');
    celebrationDiv.classList.add('hidden');

    overlay.classList.add('visible');
}

// --- 3. DOMANDA FINALE ---
function mostraDomandaFinale() {
    isQuestionMode = true;
    activePhotoDiv.classList.add('hidden');
    finalQuestionDiv.classList.remove('hidden'); 
    overlay.classList.add('visible');
}

// --- LOGICA PULSANTE "NO" CHE SCAPPA (Versione Blindata "Rimbalzo") ---
const spostaNo = (e) => {
    // 1. Evita comportamenti strani su mobile
    if(e && e.type === 'touchstart') {
        e.preventDefault();
    }

    // 2. TRUCCO: Spostiamo il bottone nel body
    if (btnNo.parentNode !== document.body) {
        document.body.appendChild(btnNo);
        btnNo.style.position = 'fixed';
        btnNo.style.zIndex = '9999';
        btnNo.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
    }

    // 3. CALCOLO SICURO
    const safeMargin = 40; 
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const btnWidth = btnNo.offsetWidth || 100; 
    const btnHeight = btnNo.offsetHeight || 50;

    const maxAllowedX = winWidth - btnWidth - safeMargin;
    const maxAllowedY = winHeight - btnHeight - safeMargin;

    const newX = Math.max(safeMargin, Math.random() * maxAllowedX);
    const newY = Math.max(safeMargin, Math.random() * maxAllowedY);
    
    // 4. Applica coordinate
    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;
};

// --- LE RIGHE CHE MANCAVANO! (COLLEGAMENTO EVENTI) ---
// Senza queste, il bottone NO non si muove mai
btnNo.addEventListener('mouseover', spostaNo);
btnNo.addEventListener('touchstart', spostaNo, { passive: false }); 
btnNo.addEventListener('click', spostaNo);

// --- TASTO SÌ ---
btnYes.addEventListener('click', () => {
    console.log("Ha detto SÌ!");
    finalQuestionDiv.classList.add('hidden');
    
    // IMPORTANTE: Nascondiamo il bottone NO ovunque sia finito
    btnNo.style.display = 'none';

    celebrationDiv.classList.remove('hidden'); // Mostra GIF
    instruction.innerText = "EVVIVAAAA! ❤️";
    
    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    }
});