const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const spinner = document.getElementById('spinner');

// Datos de ejemplo (reemplaza esto con tus propios datos)
const data = [
    { name: 'Delimosnter', image: 'src\assets\img\dalimos.webp' },
    { name: 'María García', image: 'https://via.placeholder.com/50' },
    { name: 'Carlos López', image: 'https://via.placeholder.com/50' },
    { name: 'Ana Martínez', image: 'https://via.placeholder.com/50' },
    // Añade más datos aquí...
];

openModalBtn.addEventListener('click', () => {
    searchModal.classList.remove('hidden');
    searchModal.classList.add('flex');
    setTimeout(() => searchInput.focus(), 100);
});

closeModalBtn.addEventListener('click', () => {
    searchModal.classList.add('hidden');
    searchModal.classList.remove('flex');
    searchInput.value = '';
    searchResults.innerHTML = '';
});

let debounceTimer;
searchInput.addEventListener('input', (e) => {
    spinner.classList.remove('hidden');
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredResults = data.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        displayResults(filteredResults);
        spinner.classList.add('hidden');
    }, 300);
});

function displayResults(results) {
    searchResults.innerHTML = '';
    if (results.length === 0) {
        searchResults.innerHTML = '<li class="p-3 text-gray-500">No se encontraron resultados</li>';
        return;
    }
    results.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-center p-3 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out animate-slide-down';
        li.style.animationDelay = `${index * 50}ms`;
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-full mr-4 border-2 border-gray-200">
            <span class="font-medium text-gray-800">${item.name}</span>
        `;
        li.addEventListener('click', () => {
            alert(`Has seleccionado a ${item.name}`);
        });
        searchResults.appendChild(li);
    });
}

// Cerrar modal al hacer clic fuera
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        closeModalBtn.click();
    }
});

// Evitar que el modal se cierre al hacer clic dentro
searchModal.querySelector('div').addEventListener('click', (e) => {
    e.stopPropagation();
});