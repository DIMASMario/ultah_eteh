/**
 * Confetti Animation
 * Generates falling confetti particles
 */

class ConfettiAnimation {
    constructor(container) {
        this.container = container;
        this.colors = [
            '#FFC0CB', // pastel pink
            '#C8A2C8', // pastel lavender
            '#87CEEB', // pastel blue
            '#FFD1DC', // light pink
            '#ffffff'  // white
        ];
        this.confettiCount = 100;
        this.confettis = [];
    }

    // Mulai animasi konfeti
    start() {
        this.createConfetti();
        this.animate();
    }

    // Membuat elemen konfeti
    createConfetti() {
        for (let i = 0; i < this.confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Acak properti konfeti
            const size = Math.random() * 10 + 5;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const shape = Math.random() > 0.5 ? '50%' : '0%';
            const left = Math.random() * 100; // posisi horizontal
            const duration = Math.random() * 3 + 3; // durasi jatuh
            const delay = Math.random() * 5; // delay animasi
            
            // Set style untuk konfeti
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = shape;
            confetti.style.left = `${left}%`;
            confetti.style.top = '-20px';
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            // Tambahkan ke container
            this.container.appendChild(confetti);
            this.confettis.push(confetti);
        }
    }

    // Animasi konfeti
    animate() {
        // Hapus konfeti yang sudah jatuh setelah animasi selesai
        this.confettis.forEach(confetti => {
            const duration = parseFloat(confetti.style.animationDuration);
            const delay = parseFloat(confetti.style.animationDelay);
            
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        });
    }

    // Tambahkan konfeti baru
    addMoreConfetti(count = 20) {
        this.confettiCount = count;
        this.confettis = [];
        this.createConfetti();
        this.animate();
    }
}

// Tambahkan konfeti ke halaman
function startConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiAnimation = new ConfettiAnimation(container);
    confettiAnimation.start();
    
    // Tambahkan konfeti baru setiap 5 detik
    setInterval(() => {
        confettiAnimation.addMoreConfetti();
    }, 5000);
}