document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Función para mostrar mensaje
    function showMessage(type, message) {
        formMessage.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar campos
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.nombre.trim()) errors.push('El nombre es requerido');
        if (!formData.email.trim()) errors.push('El email es requerido');
        else if (!isValidEmail(formData.email)) errors.push('El formato del email no es válido');
        if (!formData.asunto.trim()) errors.push('El asunto es requerido');
        if (!formData.mensaje.trim()) errors.push('El mensaje es requerido');
        if (formData.mensaje.length < 10) errors.push('El mensaje debe tener al menos 10 caracteres');
        
        return errors;
    }

    // Función para enviar email usando EmailJS o servicio similar
    async function sendEmail(formData) {
        // Aquí puedes integrar con EmailJS, Formspree, o tu propio backend
        // Por ahora simularemos el envío
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 2000);
        });
    }

    // Validación del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value
        };

        // Validar formulario
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showMessage('danger', errors.join('<br>'));
            return;
        }

        // Mostrar estado de carga
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
        submitBtn.disabled = true;

        try {
            // Enviar email
            const result = await sendEmail(formData);
            
            if (result.success) {
                showMessage('success', '¡Mensaje enviado exitosamente! Te responderé lo antes posible.');
                form.reset();
                
                // Opcional: Enviar a Google Analytics o similar
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form'
                    });
                }
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('danger', 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente por email.');
        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            const field = input.name;
            
            // Remover clases de validación previas
            input.classList.remove('is-valid', 'is-invalid');
            
            if (value) {
                if (field === 'email' && !isValidEmail(value)) {
                    input.classList.add('is-invalid');
                } else if (field === 'mensaje' && value.length < 10) {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.add('is-valid');
                }
            }
        });
    });
});