
export function createSearch(onSearch, articles = []) {
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
    
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.id = 'search-suggestions';
    
    const input = searchBox.querySelector('#search-input');
    const clearBtn = searchBox.querySelector('#search-clear');
    
    let debounceTimer;
    let selectedIndex = -1;
    
    function showSuggestions(query) {
        if (!query || query.length < 2 || articles.length === 0) {
            suggestionsContainer.classList.remove('active');
            suggestionsContainer.innerHTML = '';
            return;
        }
        
        const filtered = articles.filter(article => 
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 5);
        
        if (filtered.length === 0) {
            suggestionsContainer.classList.remove('active');
            suggestionsContainer.innerHTML = '';
            return;
        }
        
        suggestionsContainer.innerHTML = filtered.map((article, index) => `
            <div class="suggestion-item" data-id="${article.id}" data-index="${index}">
                <div class="suggestion-content">
                    <span class="material-symbols-outlined suggestion-icon">article</span>
                    <div class="suggestion-text">
                        <span class="suggestion-title">${highlightMatch(article.title, query)}</span>
                        <span class="suggestion-excerpt">${article.excerpt.substring(0, 60)}...</span>
                    </div>
                </div>
                <span class="material-symbols-outlined suggestion-arrow">arrow_back</span>
            </div>
        `).join('');
        
        suggestionsContainer.classList.add('active');
        selectedIndex = -1;
        
        suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const articleId = item.dataset.id;
                window.location.href = `/article/?id=${articleId}`;
            });
            
            item.addEventListener('mouseenter', () => {
                suggestionsContainer.querySelectorAll('.suggestion-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                selectedIndex = parseInt(item.dataset.index);
            });
        });
    }
    
    function sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function highlightMatch(text, query) {
        const sanitizedText = sanitizeHTML(text);
        const sanitizedQuery = sanitizeHTML(query);
        const regex = new RegExp(`(${escapeRegex(sanitizedQuery)})`, 'gi');
        return sanitizedText.replace(regex, '<mark>$1</mark>');
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function navigateSuggestions(direction) {
        const items = suggestionsContainer.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;
        
        items.forEach(i => i.classList.remove('selected'));
        
        if (direction === 'down') {
            selectedIndex = (selectedIndex + 1) % items.length;
        } else {
            selectedIndex = selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
        }
        
        items[selectedIndex].classList.add('selected');
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
    
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        clearBtn.style.display = value.length > 0 ? 'flex' : 'none';
        
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (onSearch) {
                onSearch(value);
            }
            showSuggestions(value);
        }, 300);
    });
    
    input.addEventListener('focus', () => {
        searchBox.classList.add('focused');
        if (input.value.length >= 2) {
            showSuggestions(input.value);
        }
    });
    
    input.addEventListener('blur', () => {
        searchBox.classList.remove('focused');
        setTimeout(() => {
            suggestionsContainer.classList.remove('active');
        }, 200);
    });
    
    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        suggestionsContainer.classList.remove('active');
        input.focus();
        if (onSearch) {
            onSearch('');
        }
    });
    
    input.addEventListener('keydown', (e) => {
        const items = suggestionsContainer.querySelectorAll('.suggestion-item');
        
        if (e.key === 'Escape') {
            input.value = '';
            clearBtn.style.display = 'none';
            suggestionsContainer.classList.remove('active');
            if (onSearch) {
                onSearch('');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateSuggestions('down');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateSuggestions('up');
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && items[selectedIndex]) {
                const articleId = items[selectedIndex].dataset.id;
                window.location.href = `/article/?id=${articleId}`;
            }
        }
    });
    
    container.appendChild(searchBox);
    container.appendChild(suggestionsContainer);
    
    return container;
}
