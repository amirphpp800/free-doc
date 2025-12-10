
export function createSearch(onSearch) {
    const container = document.createElement('div');
    container.className = 'search-container fade-in';
    
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    
    searchBox.innerHTML = `
        <span class="material-symbols-outlined search-icon">search</span>
        <input 
            type="text" 
            class="search-input" 
            placeholder="جستجو در مقالات..."
            id="search-input"
        />
    `;
    
    const input = searchBox.querySelector('#search-input');
    input.addEventListener('input', (e) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    });
    
    container.appendChild(searchBox);
    
    return container;
}
