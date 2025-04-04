document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Validación del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Validar campos requeridos
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        if (!nombre || !email || !asunto || !mensaje) {
            formMessage.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Por favor, completa todos los campos.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            return;
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Por favor, ingresa un correo electrónico válido.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            return;
        }

        // Simular envío de formulario
        formMessage.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ¡Mensaje enviado exitosamente! Te responderé lo antes posible.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Limpiar el formulario
        form.reset();
    });
});