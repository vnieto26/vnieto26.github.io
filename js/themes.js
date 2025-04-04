// Función para cambiar el tema
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    // Cambiar el tema
    body.classList.toggle('dark-mode');
    
    // Cambiar el ícono del botón
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    // Guardar preferencia en localStorage
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Event listener para el botón de cambio de tema
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Aplicar el tema guardado al cargar la página
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            toggleTheme();
        }
    }
});