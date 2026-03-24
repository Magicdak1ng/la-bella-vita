/* ==========================================
   LA BELLA VITA - JAVASCRIPT
   Animations et interactions du site
   ========================================== */

// ==========================================
// VARIABLES GLOBALES
// ==========================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const revealElements = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');

// ==========================================
// NAVIGATION - EFFET SCROLL
// ==========================================

/**
 * Ajoute une classe "scrolled" à la navbar lors du défilement
 * pour modifier son apparence
 */
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Écoute l'événement de scroll
window.addEventListener('scroll', handleNavbarScroll);

// ==========================================
// MENU HAMBURGER - VERSION MOBILE
// ==========================================

/**
 * Toggle du menu mobile
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Empêcher le scroll du body quand le menu est ouvert
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Ouvrir/fermer le menu au clic sur le hamburger
hamburger.addEventListener('click', toggleMobileMenu);

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Fermer le menu au clic en dehors
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        toggleMobileMenu();
    }
});

// ==========================================
// NAVIGATION ACTIVE - HIGHLIGHT SECTION
// ==========================================

/**
 * Met en surbrillance le lien de navigation correspondant
 * à la section visible à l'écran
 */
function highlightActiveSection() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Si la section est visible dans le viewport
        if (window.scrollY >= (sectionTop - navbar.offsetHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    // Mettre à jour les liens actifs
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Écoute l'événement de scroll pour mettre à jour la navigation
window.addEventListener('scroll', highlightActiveSection);

// ==========================================
// SMOOTH SCROLL
// ==========================================

/**
 * Scroll fluide vers les sections au clic sur les liens
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Vérifier si c'est un lien d'ancre
        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// ANIMATIONS AU SCROLL - REVEAL EFFECTS
// ==========================================

/**
 * Observer pour détecter quand les éléments entrent dans le viewport
 * et déclencher les animations
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Optionnel : ne plus observer après l'animation (meilleure performance)
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe "reveal"
revealElements.forEach(element => {
    observer.observe(element);
});

// ==========================================
// SCROLL INDICATOR - HERO SECTION
// ==========================================

/**
 * Animation du scroll indicator dans la section hero
 */
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about') || document.querySelector('section:nth-of-type(2)');

        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - navbar.offsetHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ==========================================
// PARALLAX EFFECT - HERO & RÉSERVATION
// ==========================================

/**
 * Effet parallax sur les sections avec background-attachment: fixed
 */
function handleParallax() {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero');
    const reservationSection = document.querySelector('.reservation');

    // Effet parallax pour le hero
    if (heroSection) {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    }

    // Faire disparaître le scroll indicator
    if (scrollIndicator) {
        scrollIndicator.style.opacity = 1 - (scrolled / 300);
    }
}

// Appliquer l'effet parallax uniquement sur desktop
if (window.innerWidth > 768) {
    window.addEventListener('scroll', handleParallax);
}

// ==========================================
// FORMULAIRE DE CONTACT
// ==========================================

/**
 * Gestion de la soumission du formulaire de contact
 */
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupérer les valeurs du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validation basique
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simuler l'envoi du formulaire
        // Dans un vrai projet, vous feriez ici un appel AJAX vers votre serveur
        console.log('Données du formulaire:', formData);

        // Afficher un message de succès
        showNotification('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.', 'success');

        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// ==========================================
// SYSTÈME DE NOTIFICATIONS
// ==========================================

/**
 * Affiche une notification toast
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'Lato, sans-serif',
        fontSize: '1rem',
        fontWeight: '500',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });

    // Ajouter au DOM
    document.body.appendChild(notification);

    // Retirer après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Ajouter les keyframes pour l'animation des notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// BOUTON RÉSERVATION
// ==========================================

/**
 * Gestion du clic sur les boutons de réservation
 */
const reservationButtons = document.querySelectorAll('.btn-primary, .btn-reservation-nav');

reservationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');

        if (href === '#reservation') {
            e.preventDefault();
            const reservationSection = document.getElementById('reservation');

            if (reservationSection) {
                const offsetTop = reservationSection.offsetTop - navbar.offsetHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Animation d'attention sur les méthodes de réservation
                setTimeout(() => {
                    const methods = document.querySelectorAll('.method');
                    methods.forEach((method, index) => {
                        setTimeout(() => {
                            method.style.animation = 'pulse 0.5s ease';
                            setTimeout(() => {
                                method.style.animation = '';
                            }, 500);
                        }, index * 100);
                    });
                }, 500);
            }
        }
    });
});

// ==========================================
// ANIMATION DES PRIX AU SURVOL
// ==========================================

/**
 * Ajoute un effet au survol des items du menu
 */
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const price = this.querySelector('.price');
        if (price) {
            price.style.transform = 'scale(1.1)';
            price.style.transition = 'transform 0.3s ease';
        }
    });

    item.addEventListener('mouseleave', function() {
        const price = this.querySelector('.price');
        if (price) {
            price.style.transform = 'scale(1)';
        }
    });
});

// ==========================================
// COMPTEUR D'ANIMATION POUR LES FEATURES
// ==========================================

/**
 * Animation des icônes features au scroll
 */
const features = document.querySelectorAll('.feature');

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }, index * 150);

            featureObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

features.forEach(feature => {
    feature.style.opacity = '0';
    featureObserver.observe(feature);
});

// ==========================================
// LAZY LOADING DES IMAGES
// ==========================================

/**
 * Lazy loading pour les images (optimisation des performances)
 */
const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            // Une fois l'image chargée, la faire apparaître en fondu
            img.onload = () => {
                img.style.opacity = '1';
            };

            // Si l'image est déjà en cache, l'afficher immédiatement
            if (img.complete) {
                img.style.opacity = '1';
            }

            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

images.forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// GESTION DU RESIZE
// ==========================================

/**
 * Réinitialiser certains comportements lors du redimensionnement
 */
let resizeTimer;
window.addEventListener('resize', () => {
    // Débounce pour optimiser les performances
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Fermer le menu mobile si on passe en desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }

        // Réactiver/désactiver le parallax selon la taille d'écran
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', handleParallax);
        } else {
            window.removeEventListener('scroll', handleParallax);
            // Réinitialiser les transformations
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = '';
                heroContent.style.opacity = '';
            }
        }
    }, 250);
});

// ==========================================
// EASTER EGG - DOUBLE CLIC SUR LE LOGO
// ==========================================

/**
 * Petit easter egg pour les curieux :)
 */
const logo = document.querySelector('.logo');
let clickCount = 0;
let clickTimer;

if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500);

        if (clickCount === 3) {
            showNotification('🍕 Benvenuti! Vous avez trouvé notre easter egg! 🇮🇹', 'success');

            // Petit effet confetti (optionnel)
            createConfetti();

            clickCount = 0;
        }
    });
}

/**
 * Crée un effet confetti simple
 */
function createConfetti() {
    const colors = ['#8B1538', '#D4AF37', '#F5F1E8'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.borderRadius = '50%';

            document.body.appendChild(confetti);

            const fallDuration = 2000 + Math.random() * 1000;
            const fallDistance = window.innerHeight + 20;
            const sway = (Math.random() - 0.5) * 100;

            confetti.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${fallDistance}px) translateX(${sway}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                confetti.remove();
            };
        }, i * 30);
    }
}

// ==========================================
// INITIALISATION AU CHARGEMENT
// ==========================================

/**
 * Actions à effectuer une fois le DOM complètement chargé
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍝 La Bella Vita - Site chargé avec succès!');

    // Petite animation de bienvenue
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Ajouter le style d'opacité initial
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ==========================================
// PERFORMANCE MONITORING (pour développement)
// ==========================================

/**
 * Affiche les performances de chargement dans la console
 */
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.domLoading;

    console.log('%c Performance du site:', 'color: #D4AF37; font-weight: bold; font-size: 14px;');
    console.log(`⏱️ Temps de chargement total: ${pageLoadTime}ms`);
    console.log(`🔌 Temps de connexion: ${connectTime}ms`);
    console.log(`🎨 Temps de rendu: ${renderTime}ms`);
});

/* ==========================================
   MODALE PLAT - SYSTÈME INTERACTIF
   ========================================== */

const dishModal = document.getElementById('dishModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');
const modalFullDesc = document.getElementById('modalFullDesc');
const modalIngredients = document.getElementById('modalIngredients');
const modalAllergens = document.getElementById('modalAllergens');
const modalBadge = document.getElementById('modalBadge');
const modalClose = document.querySelector('.modal-close');
const clickableMenuItems = document.querySelectorAll('.menu-item.clickable');

/**
 * Ouvre la modale avec les informations du plat
 */
function openDishModal(dishData) {
    // Remplir les données
    modalTitle.textContent = dishData.dish;
    modalPrice.textContent = dishData.price;
    modalImage.src = dishData.image;
    modalImage.alt = dishData.dish;
    modalFullDesc.textContent = dishData.fullDesc;
    modalIngredients.textContent = dishData.ingredients;
    modalAllergens.textContent = dishData.allergens;

    // Afficher ou cacher le badge
    if (dishData.badge) {
        modalBadge.textContent = dishData.badge;
        modalBadge.style.display = 'block';
    } else {
        modalBadge.style.display = 'none';
    }

    // Ouvrir la modale
    dishModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animation d'entrée
    setTimeout(() => {
        dishModal.querySelector('.modal-content').style.animation = 'slideUp 0.4s ease';
    }, 10);
}

/**
 * Ferme la modale
 */
function closeDishModal() {
    dishModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Ajouter les écouteurs d'événements sur les plats cliquables
clickableMenuItems.forEach(item => {
    item.addEventListener('click', function() {
        const dishData = {
            dish: this.getAttribute('data-dish'),
            price: this.getAttribute('data-price'),
            image: this.getAttribute('data-image'),
            fullDesc: this.getAttribute('data-full-desc'),
            ingredients: this.getAttribute('data-ingredients'),
            allergens: this.getAttribute('data-allergens'),
            badge: this.getAttribute('data-badge')
        };

        openDishModal(dishData);
    });
});

// Fermer la modale
if (modalClose) {
    modalClose.addEventListener('click', closeDishModal);
}

// Fermer en cliquant sur le fond
if (dishModal) {
    dishModal.addEventListener('click', function(e) {
        if (e.target === dishModal) {
            closeDishModal();
        }
    });
}

// Fermer avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (dishModal.classList.contains('active')) {
            closeDishModal();
        }
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        }
    }
});

// Bouton Commander dans la modale
const btnOrder = document.querySelector('.btn-order');
if (btnOrder) {
    btnOrder.addEventListener('click', function() {
        const dishName = modalTitle.textContent;
        showNotification(`🍽️ ${dishName} ajouté à votre commande ! Notre serveur viendra prendre note.`, 'success');
        closeDishModal();
    });
}

/* ==========================================
   LIGHTBOX GALERIE PHOTO
   ========================================== */

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentImageIndex = 0;
let imagesData = [];

/**
 * Initialiser les données de la galerie
 */
function initGallery() {
    imagesData = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay p');
        return {
            src: img.src,
            alt: img.alt,
            caption: caption ? caption.textContent : ''
        };
    });
}

/**
 * Ouvre la lightbox
 */
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Ferme la lightbox
 */
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Met à jour l'image dans la lightbox
 */
function updateLightboxImage() {
    const imageData = imagesData[currentImageIndex];
    lightboxImage.src = imageData.src;
    lightboxImage.alt = imageData.alt;
    lightboxCaption.textContent = imageData.caption;

    // Animation de fade
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.style.transition = 'opacity 0.3s ease';
        lightboxImage.style.opacity = '1';
    }, 50);
}

/**
 * Image précédente
 */
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;
    updateLightboxImage();
}

/**
 * Image suivante
 */
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesData.length;
    updateLightboxImage();
}

// Initialiser la galerie
initGallery();

// Ajouter les écouteurs sur les images de la galerie
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Boutons de la lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', previousImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
}

// Fermer en cliquant sur le fond
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Navigation au clavier dans la lightbox
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

/* ==========================================
   ANIMATIONS AVANCÉES POUR LES PLATS
   ========================================== */

/**
 * Ajoute un effet de particules au survol des plats featured
 */
const featuredItems = document.querySelectorAll('.menu-item.featured');

featuredItems.forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        // Créer des mini particules dorées
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkle(e.currentTarget);
            }, i * 50);
        }
    });
});

/**
 * Crée une particule scintillante
 */
function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '5px';
    sparkle.style.height = '5px';
    sparkle.style.background = '#D4AF37';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1';

    const rect = element.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;

    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';

    element.style.position = 'relative';
    element.appendChild(sparkle);

    sparkle.animate([
        { opacity: 0, transform: 'translate(0, 0) scale(0)' },
        { opacity: 1, transform: 'translate(0, -20px) scale(1)' },
        { opacity: 0, transform: 'translate(0, -40px) scale(0)' }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => {
        sparkle.remove();
    };
}

/* ==========================================
   COMPTEUR DE VUES POUR LA GALERIE
   ========================================== */

/**
 * Animation de compteur pour les statistiques
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

/* ==========================================
   EFFET DE TYPING POUR LE HERO
   ========================================== */

/**
 * Effet de texte qui s'écrit progressivement
 */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/* ==========================================
   PRELOADER STYLÉ (OPTIONNEL)
   ========================================== */

/**
 * Crée un preloader élégant au chargement
 */
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-utensils" style="font-size: 4rem; color: #D4AF37; animation: spin 2s linear infinite;"></i>
            <p style="color: #8B1538; font-family: 'Playfair Display', serif; font-size: 2rem; margin-top: 1rem;">La Bella Vita</p>
            <p style="color: #666; margin-top: 0.5rem;">Chargement en cours...</p>
        </div>
    `;

    Object.assign(preloader.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #F5F1E8 0%, #FFFFFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '100000',
        transition: 'opacity 0.5s ease'
    });

    document.body.insertBefore(preloader, document.body.firstChild);

    // Retirer le preloader une fois chargé
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Ajouter le style pour l'animation spin
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);

// Activer le preloader
createPreloader();

/* ==========================================
   SMOOTH REVEAL POUR LES TÉMOIGNAGES
   ========================================== */

/**
 * Animation spéciale pour les cartes de témoignages
 */
const testimonialCards = document.querySelectorAll('.testimonial-card');

const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
            testimonialObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

testimonialCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    testimonialObserver.observe(card);
});

/* ==========================================
   EFFET PARALLAXE SUR LA GALERIE
   ========================================== */

/**
 * Ajoute un effet de profondeur à la galerie au scroll
 */
function galleryParallax() {
    const gallerySection = document.querySelector('.gallery');
    if (!gallerySection) return;

    const scrolled = window.scrollY;
    const galleryTop = gallerySection.offsetTop;
    const galleryHeight = gallerySection.offsetHeight;

    if (scrolled > galleryTop - window.innerHeight && scrolled < galleryTop + galleryHeight) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            const speed = (index % 2 === 0) ? 0.5 : -0.5;
            const yPos = (scrolled - galleryTop) * speed;
            item.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Appliquer le parallax uniquement sur desktop
if (window.innerWidth > 768) {
    window.addEventListener('scroll', galleryParallax);
}

/* ==========================================
   SYSTÈME DE FAVORIS (SIMULATION)
   ========================================== */

/**
 * Permet aux utilisateurs de "liker" des plats
 */
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(dishName) {
    const index = favorites.indexOf(dishName);

    if (index > -1) {
        favorites.splice(index, 1);
        showNotification(`💔 ${dishName} retiré de vos favoris`, 'info');
    } else {
        favorites.push(dishName);
        showNotification(`💖 ${dishName} ajouté à vos favoris !`, 'success');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/* ==========================================
   ANIMATION DE CHIFFRES POUR LES STATS
   ========================================== */

/**
 * Anime les chiffres de statistiques
 */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

/* ==========================================
   GESTION DES INTERACTIONS TACTILES
   ========================================== */

/**
 * Améliore l'expérience sur mobile avec des touches tactiles
 */
if ('ontouchstart' in window) {
    // Ajouter des retours haptiques sur les interactions importantes
    clickableMenuItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        item.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

/* ==========================================
   MESSAGE DE BIENVENUE PERSONNALISÉ
   ========================================== */

/**
 * Affiche un message de bienvenue selon l'heure
 */
function showWelcomeMessage() {
    const hour = new Date().getHours();
    let message = '';

    if (hour >= 5 && hour < 12) {
        message = '☀️ Buongiorno! Bienvenue chez La Bella Vita';
    } else if (hour >= 12 && hour < 18) {
        message = '🍝 Buon pomeriggio! Prêt pour un délicieux repas?';
    } else {
        message = '🌙 Buonasera! Passez une excellente soirée chez nous';
    }

    setTimeout(() => {
        showNotification(message, 'info');
    }, 2000);
}

// Afficher le message de bienvenue une seule fois
if (!sessionStorage.getItem('welcomeShown')) {
    showWelcomeMessage();
    sessionStorage.setItem('welcomeShown', 'true');
}

/* ==========================================
   FIN DU SCRIPT
   ========================================== */
