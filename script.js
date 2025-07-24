document.addEventListener('DOMContentLoaded', () => {
    // Parallax Scroll for Hero
    const heroContent = document.getElementById('hero-content');
    if (window.innerWidth >= 768) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            if (heroContent) {
               heroContent.style.transform = `translateY(${scrollValue * 0.5}px)`;
               heroContent.style.opacity = 1 - Math.min(scrollValue / (window.innerHeight * 0.6), 1);
            }
        });
    }

    // Particle Generation
    const particleContainer = document.getElementById('particle-container');
    if (particleContainer) {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100 + 100}%`;
            particle.style.animationDuration = `${Math.random() * 30 + 20}s`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particleContainer.appendChild(particle);
        }
    }

    // On-Scroll Animation Logic
    const simpleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); simpleObserver.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-animate').forEach(el => simpleObserver.observe(el));

    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const members = entry.target.querySelectorAll('.scroll-animate-stagger');
                members.forEach((member, index) => { member.style.transitionDelay = `${index * 80}ms`; member.classList.add('is-visible'); });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    const memberGrid = document.getElementById('member-grid');
    if (memberGrid) staggerObserver.observe(memberGrid);

    // Modal Interactivity Logic
    const modal = document.getElementById('modal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        const modalBody = document.getElementById('modal-body');
        const closeModalBtn = document.getElementById('modal-close');
        
        const interactiveCards = document.querySelectorAll('.interactive-card-solo, .interactive-card-member');
        
        interactiveCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.dataset.name;
                const title = card.dataset.title;
                const bio = card.dataset.bio;
                const img = card.dataset.img;
                const linkedin = card.dataset.linkedin;

                let contentHTML = '';

                if (img) { // Member card
                    contentHTML = `
                        <img src="${img}" alt="${name}" class="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white/10 shadow-lg mb-4">
                        <h3 class="text-2xl font-bold text-white">${name}</h3>
                        <p class="text-red-400 text-sm mt-1">${title || ''}</p>
                        <p class="text-gray-300 my-4 text-left">${bio}</p>
                        <a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors">View LinkedIn Profile</a>
                    `;
                } else { // Visi, Misi, Advantage cards
                    contentHTML = `
                        <h3 class="text-3xl font-bold text-gradient-red mb-4">${name}</h3>
                        <p class="text-gray-300 text-lg text-left">${bio.replace(/\. /g, '.<br><br>').replace(/(\d\.)/g, '<br><strong class="text-red-400">$1</strong>')}</p>
                    `;
                }
                
                modalBody.innerHTML = contentHTML;
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modalContent.classList.remove('scale-95');
            });
        });
        function closeModal() {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modalContent.classList.add('scale-95');
        }
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) { closeModal(); } });
    }

    // Application Form Submission
    const form = document.getElementById('application-form');
    if (form) {
        const formContainer = document.getElementById('form-container');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const userName = document.getElementById('name').value.split(' ')[0]; 

            form.style.transition = 'opacity 0.5s ease-out';
            form.style.opacity = '0';

            setTimeout(() => {
                form.style.display = 'none';

                const thankYouHTML = `
                    <div class="thank-you-card glass-card p-8 md:p-12 rounded-2xl text-center">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        <h2 class="text-3xl font-bold text-white mt-4">Terima Kasih, ${userName}!</h2>
                        <p class="text-gray-300 mt-4 max-w-md mx-auto">
                            Aplikasi Anda telah kami terima. Karena SATRIA adalah forum yang terkurasi, tim kami akan meninjau setiap aplikasi dengan saksama. Kami akan menghubungi Anda melalui email dalam 7-14 hari kerja.
                        </p>
                        <div class="mt-8">
                            <p class="text-gray-400 mb-4">Sambil menunggu, ikuti kami di media sosial:</p>
                            <a href="#" class="text-red-400 hover:text-red-300 mx-2">Twitter/X</a>
                            <span class="text-gray-600">&bull;</span>
                            <a href="#" class="text-red-400 hover:text-red-300 mx-2">LinkedIn</a>
                        </div>
                    </div>
                `;
                formContainer.innerHTML = thankYouHTML;
            }, 500); 
        });
    }
});