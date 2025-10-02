document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces de anclaje (los que empiezan por #)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Previene el comportamiento de salto predeterminado del ancla
            e.preventDefault();

            // Obtiene el ID del destino (ej: "#inicio", "#proyectos")
            const targetId = this.getAttribute('href');

            // Encuentra el elemento de destino
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Realiza el scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // -70px para dejar espacio para la cabecera fija
                    behavior: 'smooth'
                });
            }
        });
    });
});
