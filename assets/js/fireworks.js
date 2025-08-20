/**
 * Fireworks Animation
 * Creates colorful firework explosions
 */

class FireworksAnimation {
    constructor(container) {
        this.container = container;
        this.fireworksCount = 15;
        this.colors = [
            '#FFC0CB', // pastel pink
            '#C8A2C8', // pastel lavender
            '#87CEEB', // pastel blue
            '#FFD1DC', // light pink
            '#FFFFC2', // light yellow
            '#ffffff'  // white
        ];
    }

    // Mulai animasi kembang api
    start() {
        this.container.classList.remove('d-none');
        this.createFireworks();
    }

    // Membuat kembang api
    createFireworks() {
        for (let i = 0; i < this.fireworksCount; i++) {
            setTimeout(() => {
                this.createSingleFirework();
            }, i * 300); // Buat kembang api dengan interval
        }
    }

    // Membuat satu kembang api
    createSingleFirework() {
        const x = Math.random() * 100; // posisi horizontal
        const y = Math.random() * 60 + 20; // posisi vertikal
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        // Buat pusat kembang api
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${x}%`;
        firework.style.top = `${y}%`;
        firework.style.backgroundColor = color;
        
        this.container.appendChild(firework);
        
        // Buat partikel kembang api
        this.createParticles(x, y, color);
        
        // Hapus kembang api setelah animasi selesai
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }

    // Membuat partikel kembang api
    createParticles(x, y, color) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            // Atur style partikel
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            // Atur animasi partikel
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 50 + 20;
            const translateX = Math.cos(angle) * speed;
            const translateY = Math.sin(angle) * speed;
            
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.animation = `particle 1s forwards`;
            particle.style.opacity = '1';
            
            // Set property animasi dengan JavaScript
            particle.animate([
                { transform: 'translate(-50%, -50%)' },
                { transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, 0.9, 0.57, 1)',
                fill: 'forwards'
            });
            
            this.container.appendChild(particle);
            
            // Hapus partikel setelah animasi selesai
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Berhenti dan sembunyikan animasi
    stop() {
        this.container.innerHTML = '';
        this.container.classList.add('d-none');
    }
}