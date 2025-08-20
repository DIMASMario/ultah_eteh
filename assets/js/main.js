document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const heroSection = document.getElementById('hero');
    const mainSection = document.getElementById('main');
    const quotesSection = document.getElementById('quotes');
    const surpriseSection = document.getElementById('surprise');
    const closingSection = document.getElementById('closing');
    
    const openButton = document.getElementById('openButton');
    const surpriseButton = document.getElementById('surpriseButton');
    const fireworksContainer = document.getElementById('fireworks-container');
    const birthdaySong = document.getElementById('birthdaySong');
    
    // Start confetti animation on page load
    startConfetti();
    
    // Initiate fireworks animation object
    const fireworks = new FireworksAnimation(fireworksContainer);
    
    // Function to show a section with animation
    function showSection(section) {
        section.classList.remove('d-none');
        section.classList.add('page-transition');
        setTimeout(() => {
            section.classList.add('visible');
        }, 100);
    }
    
    // Function to scroll to a section
    function scrollToSection(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Open button click event
    openButton.addEventListener('click', function() {
        showSection(mainSection);
        scrollToSection(mainSection);
        
        // Show quotes section after all text lines appear
        // Rumus: 2000ms (delay awal) + (jumlah baris * 2500ms) + 2000ms (buffer tambahan)
        const totalLines = document.querySelectorAll('.line-text').length;
        const textCompletionTime = 2000 + (totalLines * 2500) + 2000;
        
        // Show quotes section after all text lines appear
        setTimeout(() => {
            showSection(quotesSection);
            scrollToSection(quotesSection);
            
            // Show surprise section after 5 more seconds
            setTimeout(() => {
                showSection(surpriseSection);
                scrollToSection(surpriseSection);
            }, 5000);
        }, textCompletionTime);
    });
    
    // Surprise button click event
    surpriseButton.addEventListener('click', function() {
        // Tambahkan efek shake pada tombol
        surpriseButton.classList.add('shake');
        setTimeout(() => {
            surpriseButton.classList.remove('shake');
        }, 500);
        
        // Putar lagu ulang tahun
        birthdaySong.play();
        
        // Mulai animasi kembang api
        fireworks.start();
        
        // Tampilkan bagian penutup setelah 3 detik
        setTimeout(() => {
            showSection(closingSection);
            scrollToSection(closingSection);
        }, 3000);
        
        // Hentikan animasi kembang api setelah 6 detik
        setTimeout(() => {
            fireworks.stop();
        }, 6000);
    });
    
    // Carousel autoplay timing
    const carousel = document.getElementById('quotesCarousel');
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 3000
    });
    
    // Inisialisasi animasi teks baris per baris
    function initLineByLineText() {
        const lines = document.querySelectorAll('.line-text');
        if (lines.length === 0) return;

        // Observer untuk mendeteksi kapan section terlihat
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Tampilkan tiap baris secara bertahap
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, 2000 + (index * 2500)); // Tampilkan setiap 2.5 detik
                });
                
                observer.disconnect();
            }
        });
        
        observer.observe(mainSection);
    }

    // Panggil fungsi inisialisasi
    initLineByLineText();

    // Add button glow effect
    openButton.classList.add('btn-glow');
    surpriseButton.classList.add('btn-glow');
});