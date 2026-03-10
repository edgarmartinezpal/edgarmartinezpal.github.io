/* ==============================================
   PORTAFOLIO - Edgar Martínez Palacios
   JavaScript dinámico: cursor, partículas,
   efecto typewriter, edad calculada,
   animaciones scroll, barras de habilidades,
   terminal animada, formulario, año footer
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────
    // 1. CALCULAR EDAD Y MESES ESTUDIANDO
    // ─────────────────────────────────────────
    const birthDate = new Date('2006-08-08');
    const studyStart = new Date('2024-09-01');
    const now = new Date();

    // Edad exacta
    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) age--;

    // Meses transcurridos desde inicio DAM
    const monthsStudying = (now.getFullYear() - studyStart.getFullYear()) * 12
        + (now.getMonth() - studyStart.getMonth());

    // Mostrar con animación contador
    animateCounter('age-display', 0, age, 1200);
    animateCounter('months-display', 0, Math.max(0, monthsStudying), 1400);

    // Año del footer
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = now.getFullYear();

    // ─────────────────────────────────────────
    // 2. FUNCIÓN ANIMACIÓN CONTADOR
    // ─────────────────────────────────────────
    function animateCounter(id, start, end, duration) {
        const el = document.getElementById(id);
        if (!el) return;
        const startTime = performance.now();
        function step(timestamp) {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * (end - start) + start);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // ─────────────────────────────────────────
    // 3. EFECTO TYPEWRITER
    // ─────────────────────────────────────────
    const roles = [
        'Estudiante de DAM',
        'Full Stack Developer',
        'MERN Stack Dev',
        'Apasionado por el código',
    ];
    const typedEl = document.getElementById('typed-role');
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        if (typedEl) typedEl.textContent = currentRole.slice(0, charIndex);

        let delay = isDeleting ? 50 : 90;
        if (!isDeleting && charIndex === currentRole.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }
        setTimeout(typeWriter, delay);
    }
    typeWriter();

    // ─────────────────────────────────────────
    // 4. TERMINAL ANIMADA (SOBRE MÍ)
    // ─────────────────────────────────────────
    const terminalJson = document.getElementById('terminal-json');
    if (terminalJson) {
        const info = {
            nombre: 'Edgar Martínez Palacios',
            edad: `${age} años`,
            estudios: 'DAM — Florida Campus Alzira',
            stack: ['MongoDB', 'Express', 'React', 'Node.js'],
            disponible: true,
        };
        const jsonString = JSON.stringify(info, null, 2);
        let i = 0;
        function typeJson() {
            if (i < jsonString.length) {
                terminalJson.textContent += jsonString[i];
                i++;
                setTimeout(typeJson, 18);
            }
        }
        // Empieza cuando sea visible
        const terminalObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeJson, 600);
                terminalObs.disconnect();
            }
        }, { threshold: 0.3 });
        const tw = document.querySelector('.terminal-window');
        if (tw) terminalObs.observe(tw);
    }

    // ─────────────────────────────────────────
    // 5. PARTÍCULAS CANVAS (HERO)
    // ─────────────────────────────────────────
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let mouse = { x: null, y: null };

    if (canvas && ctx) {
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const PARTICLE_COUNT = Math.min(70, Math.floor(window.innerWidth / 20));

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.8 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? '56,189,248' : '129,140,248';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width ||
                    this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
                // Repulsión del cursor
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        this.x += dx / dist * 1.5;
                        this.y += dy / dist * 1.5;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(56,189,248,${0.08 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        canvas.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
    }

    // ─────────────────────────────────────────
    // 6. CURSOR PERSONALIZADO
    // ─────────────────────────────────────────
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        document.addEventListener('mousemove', e => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
        });
    }

    // ─────────────────────────────────────────
    // 7. SCROLL PROGRESS BAR
    // ─────────────────────────────────────────
    const scrollBar = document.getElementById('scroll-progress');
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollBar) scrollBar.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // ─────────────────────────────────────────
    // 8. HEADER SCROLL + NAV ACTIVO
    // ─────────────────────────────────────────
    const header = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }

        // Actualizar nav activo
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    }, { passive: true });

    // ─────────────────────────────────────────
    // 9. SMOOTH SCROLL + CERRAR MENÚ MÓVIL
    // ─────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Cerrar menú móvil si está abierto
                const nav = document.getElementById('main-nav');
                const toggle = document.getElementById('menu-toggle');
                if (nav) nav.classList.remove('open');
                if (toggle) toggle.classList.remove('open');
            }
        });
    });

    // ─────────────────────────────────────────
    // 10. MENÚ HAMBURGUESA
    // ─────────────────────────────────────────
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });
    }

    // ─────────────────────────────────────────
    // 11. ANIMACIONES ON SCROLL (Intersection Observer)
    // ─────────────────────────────────────────
    const animateEls = document.querySelectorAll('[data-animate]');
    const ioAnim = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${i * 0.07}s`;
                entry.target.classList.add('visible');
                ioAnim.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    animateEls.forEach(el => ioAnim.observe(el));

    // ─────────────────────────────────────────
    // 12. BARRAS DE HABILIDADES
    // ─────────────────────────────────────────
    const skillBars = document.querySelectorAll('.skill-fill');
    const ioSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.dataset.width;
                // Pequeño delay para mejor efecto visual
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 200);
                ioSkills.unobserve(fill);
            }
        });
    }, { threshold: 0.2 });
    skillBars.forEach(bar => ioSkills.observe(bar));

    // ─────────────────────────────────────────
    // 13. FORMULARIO DE CONTACTO
    // ─────────────────────────────────────────
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const btnText = btn.querySelector('.btn-text');
            const btnLoading = btn.querySelector('.btn-loading');
            const btnSuccess = btn.querySelector('.btn-success');

            // Mostrar estado de carga
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            btn.disabled = true;

            // Simulación de envío (2s)
            setTimeout(() => {
                btnLoading.classList.add('hidden');
                btnSuccess.classList.remove('hidden');
                form.reset();
                setTimeout(() => {
                    btnSuccess.classList.add('hidden');
                    btnText.classList.remove('hidden');
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // ─────────────────────────────────────────
    // 14. SKILL CARDS — TOOLTIP NIVEL
    // ─────────────────────────────────────────
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const level = card.dataset.level;
            const fill = card.querySelector('.skill-fill');
            if (fill && !fill.style.width) {
                fill.style.width = level + '%';
            }
        });
    });

}); // End DOMContentLoaded
