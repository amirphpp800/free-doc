
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
            autocomplete="off"
            spellcheck="false"
        />
        <button type="button" class="search-clear" id="search-clear" style="display: none;">
            <span class="material-symbols-outlined">close</span>
        </button>
    `;
    
    const input = searchBox.querySelector('#search-input');
    const clearBtn = searchBox.querySelector('#search-clear');
    
    let debounceTimer;
    
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        clearBtn.style.display = value.length > 0 ? 'flex' : 'none';
        
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (onSearch) {
                onSearch(value);
            }
        }, 300);
    });
    
    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        input.focus();
        if (onSearch) {
            onSearch('');
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            input.value = '';
            clearBtn.style.display = 'none';
            if (onSearch) {
                onSearch('');
            }
        }
    });
    
    container.appendChild(searchBox);
    
    return container;
}
