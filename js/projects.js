// Datos de proyectos
const projectsData = [
    {
        id: 1,
        title: "Sistema de Gestión Escolar",
        description: "Plataforma web completa para gestión de estudiantes, calificaciones y comunicación entre padres y profesores.",
        image: "https://via.placeholder.com/400x250/2563eb/ffffff?text=Sistema+Escolar",
        technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
        features: [
            "Gestión de estudiantes y profesores",
            "Sistema de calificaciones",
            "Comunicación padres-profesores",
            "Reportes académicos"
        ],
        demoUrl: "#",
        codeUrl: "https://github.com/vnieto26",
        status: "Completado"
    },
    {
        id: 2,
        title: "E-commerce Responsive",
        description: "Tienda online moderna con carrito de compras, sistema de pagos y panel administrativo.",
        image: "https://via.placeholder.com/400x250/059669/ffffff?text=E-commerce",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        features: [
            "Catálogo de productos",
            "Carrito de compras",
            "Procesamiento de pagos",
            "Panel de administración"
        ],
        demoUrl: "#",
        codeUrl: "https://github.com/vnieto26",
        status: "En desarrollo"
    },
    {
        id: 3,
        title: "Dashboard Analytics",
        description: "Panel de control con visualizaciones de datos en tiempo real y reportes interactivos.",
        image: "https://via.placeholder.com/400x250/dc2626/ffffff?text=Dashboard",
        technologies: ["Vue.js", "Chart.js", "Laravel", "MySQL"],
        features: [
            "Gráficos interactivos",
            "Reportes en tiempo real",
            "Filtros avanzados",
            "Exportación de datos"
        ],
        demoUrl: "#",
        codeUrl: "https://github.com/vnieto26",
        status: "Completado"
    }
];

// Función para crear tarjeta de proyecto
function createProjectCard(project) {
    const statusColor = project.status === 'Completado' ? 'success' : 'warning';
    
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm project-card" data-project-id="${project.id}">
                <div class="position-relative">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}" loading="lazy">
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-${statusColor}">${project.status}</span>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-primary">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <div class="mb-3">
                        ${project.technologies.map(tech => 
                            `<span class="badge bg-secondary me-1 mb-1">${tech}</span>`
                        ).join('')}
                    </div>
                    <ul class="list-unstyled small text-muted">
                        ${project.features.slice(0, 3).map(feature => 
                            `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary btn-sm" onclick="openProjectModal(${project.id})">
                            Ver Detalles
                        </button>
                        <div>
                            <a href="${project.demoUrl}" class="btn btn-outline-primary btn-sm me-1" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Demo
                            </a>
                            <a href="${project.codeUrl}" class="btn btn-outline-secondary btn-sm" target="_blank">
                                <i class="fab fa-github"></i> Código
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para abrir modal de proyecto
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modalHtml = `
        <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectModalLabel">${project.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${project.image}" class="img-fluid rounded mb-3" alt="${project.title}">
                        <p class="lead">${project.description}</p>
                        
                        <h6 class="text-primary">Tecnologías utilizadas:</h6>
                        <div class="mb-3">
                            ${project.technologies.map(tech => 
                                `<span class="badge bg-primary me-1 mb-1">${tech}</span>`
                            ).join('')}
                        </div>
                        
                        <h6 class="text-primary">Características principales:</h6>
                        <ul class="list-unstyled">
                            ${project.features.map(feature => 
                                `<li class="mb-2"><i class="fas fa-check text-success me-2"></i>${feature}</li>`
                            ).join('')}
                        </ul>
                        
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Estado:</strong> ${project.status}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="${project.demoUrl}" class="btn btn-primary" target="_blank">
                            <i class="fas fa-external-link-alt me-2"></i>Ver Demo
                        </a>
                        <a href="${project.codeUrl}" class="btn btn-outline-primary" target="_blank">
                            <i class="fab fa-github me-2"></i>Ver Código
                        </a>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remover modal existente si existe
    const existingModal = document.getElementById('projectModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// Función para filtrar proyectos
function filterProjects(technology = 'all') {
    const filteredProjects = technology === 'all' 
        ? projectsData 
        : projectsData.filter(project => 
            project.technologies.some(tech => 
                tech.toLowerCase().includes(technology.toLowerCase())
            )
        );

    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = filteredProjects.map(createProjectCard).join('');
    }
}

// Inicializar proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = projectsData.map(createProjectCard).join('');
    }

    // Agregar filtros si existen
    const filterButtons = document.querySelectorAll('.project-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const technology = button.dataset.filter;
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar proyectos
            filterProjects(technology);
        });
    });
});