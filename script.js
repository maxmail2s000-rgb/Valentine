// Configura qui le tue immagini e testi
const ricordi = [
    { img: 'img1.jpg', text: 'Il nostro primo appuntamento...' },
    { img: 'img2.jpg', text: 'Quella volta al mare...' },
    { img: 'img3.jpg', text: 'Le nostre risate...' },
    // L'ultimo elemento deve essere l'invito
    { img: 'invito.jpg', text: 'Ti va una cena romantica stasera?', isInvite: true }
];

const heartBox = document.getElementById('heart-box');
const container = document.getElementById('photo-container');
let isPlaying = false;

heartBox.addEventListener('click', function() {
    if (isPlaying) return; // Evita doppi click
    isPlaying = true;
    
    // Ferma il battito del cuore e lo nasconde gradualmente
    heartBox.style.animation = 'none';
    heartBox.style.opacity = '0';
    
    mostrarRicordi(0);
});

function mostrarRicordi(index) {
    if (index >= ricordi.length) return;

    const data = ricordi[index];
    const card = document.createElement('div');
    card.className = 'memory-photo';
    
    // Struttura della card
    card.innerHTML = `
        <img src="${data.img}" alt="Ricordo">
        <p>${data.text}</p>
    `;
    
    container.appendChild(card);

    // Forza il reflow per attivare la transizione CSS
    setTimeout(() => {
        if (data.isInvite) {
            card.classList.add('final-invite');
        } else {
            card.classList.add('animate-out');
        }
    }, 100);

    // Se non è l'ultimo (l'invito), nascondilo dopo 4 secondi e passa al prossimo
    if (!data.isInvite) {
        setTimeout(() => {
            card.classList.remove('animate-out');
            card.classList.add('fade-away');
            
            // Passa alla prossima foto
            setTimeout(() => {
                card.remove(); // Pulisce il DOM
                mostrarRicordi(index + 1);
            }, 1000); // Tempo per la transizione di uscita
            
        }, 4000); // Tempo di permanenza della foto a schermo
    }
}