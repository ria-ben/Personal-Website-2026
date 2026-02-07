// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link (except Projects dropdown trigger)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (link.id === 'navProjectsTrigger' || link.id === 'navContactTrigger') return; // handle in dropdown logic
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Projects dropdown: trigger toggles on mobile; dropdown links scroll + switch tab
const navProjectsTrigger = document.getElementById('navProjectsTrigger');
const navProjectsDropdown = navProjectsTrigger ? navProjectsTrigger.closest('.nav-item--dropdown') : null;
if (navProjectsTrigger && navProjectsDropdown) {
    navProjectsTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            navProjectsDropdown.classList.toggle('nav-item--open');
        }
    });
}
const navContactTrigger = document.getElementById('navContactTrigger');
const navContactDropdown = navContactTrigger ? navContactTrigger.closest('.nav-item--dropdown') : null;
if (navContactTrigger && navContactDropdown) {
    navContactTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            navContactDropdown.classList.toggle('nav-item--open');
        }
    });
}
document.querySelectorAll('.nav-dropdown-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const tab = this.getAttribute('data-tab');
        if (tab) {
            e.preventDefault();
            const target = document.querySelector('#projects');
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            document.querySelectorAll('.projects-tab').forEach(t => t.classList.remove('projects-tab--active'));
            document.querySelectorAll('.projects-tab-panel').forEach(p => p.classList.remove('projects-tab-panel--active'));
            const tabBtn = document.querySelector('.projects-tab[data-tab="' + tab + '"]');
            const panel = document.getElementById('projects-' + tab);
            if (tabBtn) tabBtn.classList.add('projects-tab--active');
            if (panel) panel.classList.add('projects-tab-panel--active');
        }
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.querySelectorAll('.nav-item--dropdown').forEach(d => d.classList.remove('nav-item--open'));
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Contact Form – submit via Formspree (AJAX) and show success/error
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const btn = document.getElementById('contactSubmitBtn');
        const status = document.getElementById('contactFormStatus');
        const action = contactForm.getAttribute('action');
        if (!action || !action.includes('formspree')) {
            status.textContent = 'Form is not configured. Please set the Formspree form URL in the form action.';
            status.className = 'contact-form-status contact-form-status--error';
            return;
        }
        btn.disabled = true;
        status.textContent = 'Sending…';
        status.className = 'contact-form-status';
        try {
            const formData = new FormData(contactForm);
            const res = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' }
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                status.textContent = 'Thanks! Your message was sent.';
                status.className = 'contact-form-status contact-form-status--success';
                contactForm.reset();
            } else {
                status.textContent = data.error || 'Something went wrong. Please try again or email me directly.';
                status.className = 'contact-form-status contact-form-status--error';
            }
        } catch (err) {
            status.textContent = 'Something went wrong. Please try again or email me directly.';
            status.className = 'contact-form-status contact-form-status--error';
        }
        btn.disabled = false;
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section > .container > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Projects tabs: Software/Data and Product
(function () {
    const tabs = document.querySelectorAll('.projects-tab');
    const panels = document.querySelectorAll('.projects-tab-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = 'projects-' + tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('projects-tab--active'));
            panels.forEach(p => {
                p.classList.remove('projects-tab-panel--active');
                if (p.id === targetId) p.classList.add('projects-tab-panel--active');
            });
            tab.classList.add('projects-tab--active');
        });
    });
})();

// Photo cycle: auto-scroll + arrows + drag to scroll
(function () {
    const track = document.getElementById('photoCycleTrack');
    if (!track) return;

    let offset = 0;
    const autoSpeed = 1.4;
    let halfWidth = 0;
    let rafId = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;

    function getHalfWidth() {
        return track.scrollWidth / 2;
    }

    function setOffset(value, noWrap) {
        halfWidth = getHalfWidth();
        if (halfWidth <= 0) return;
        if (noWrap) {
            offset = value;
        } else {
            offset = value;
            while (offset >= halfWidth) offset -= halfWidth;
            while (offset < 0) offset += halfWidth;
        }
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    function tick() {
        if (!isDragging) {
            setOffset(offset + autoSpeed);
        }
        rafId = requestAnimationFrame(tick);
    }

    halfWidth = getHalfWidth();
    setOffset(0);
    rafId = requestAnimationFrame(tick);

    // Drag to scroll
    function onPointerDown(e) {
        isDragging = true;
        dragStartX = e.clientX != null ? e.clientX : e.touches[0].clientX;
        dragStartOffset = offset;
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const x = e.clientX != null ? e.clientX : e.touches[0].clientX;
        const delta = dragStartX - x;
        setOffset(dragStartOffset + delta, true);
    }

    function onPointerUp() {
        if (isDragging) {
            isDragging = false;
            setOffset(offset); // wrap back into range
        }
    }

    track.addEventListener('mousedown', onPointerDown);
    track.addEventListener('mousemove', onPointerMove);
    track.addEventListener('mouseup', onPointerUp);
    track.addEventListener('mouseleave', onPointerUp);
    track.addEventListener('touchstart', onPointerDown, { passive: true });
    track.addEventListener('touchmove', onPointerMove, { passive: true });
    track.addEventListener('touchend', onPointerUp);
})();


