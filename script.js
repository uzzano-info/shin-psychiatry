document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 한번만 나타나게 함
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 헤더 높이만큼 오프셋 계산
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Modal Logic for Treatments
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-container">
            <span class="modal-close"><i class="fas fa-times"></i></span>
            <div id="modalContent"></div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalContent = modalOverlay.querySelector('#modalContent');
    const modalClose = modalOverlay.querySelector('.modal-close');

    const openModal = (html) => {
        modalContent.innerHTML = html;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Scroll lock
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Handle ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Make trigger function global for simplicity or attach to window
    window.showTreatmentDetail = (id) => {
        const detailSource = document.getElementById(`detail-${id}`);
        if (detailSource) {
            openModal(detailSource.innerHTML);
        }
    };

    // 5. Mobile Menu Toggle (Basic implementation)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            // For a production site, we would create a proper mobile menu overlay
            // Here we just toggle visibility as a placeholder
            const isMenuOpen = nav.style.display === 'flex';

            if (isMenuOpen) {
                nav.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = '#fff';
                nav.style.padding = '1rem';
                nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';

                const links = nav.querySelectorAll('a');
                links.forEach(link => {
                    link.style.color = '#333';
                    link.style.display = 'block';
                    link.style.padding = '1rem 0';
                    link.style.borderBottom = '1px solid #eee';
                });

                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

    // Trigger initial scroll to add classes if page is loaded scrolled
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});

    // 6. FAB Logic
    const fabTop = document.getElementById('fab-top');
    if (fabTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fabTop.classList.add('visible');
            } else {
                fabTop.classList.remove('visible');
            }
        });
        fabTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
