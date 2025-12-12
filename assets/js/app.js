
import { createHeader, initTheme } from './components/header.js';
import { createSearch } from './components/search.js';
import { createArticles } from './components/articles.js';
import { createFooter } from './components/footer.js';
import { articles } from './data/sampleData.js';

initTheme();

class Encyclopedia {
    constructor() {
        this.app = document.getElementById('app');
        this.articles = articles;
        this.filteredArticles = articles;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.render();
        }, 500);
    }

    showLoading() {
        this.isLoading = true;
        this.app.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <div class="loading-text">در حال بارگذاری...</div>
            </div>
        `;
    }

    hideLoading() {
        this.isLoading = false;
    }

    handleSearch(query) {
        const searchQuery = query.trim().toLowerCase();
        
        if (searchQuery === '') {
            this.filteredArticles = this.articles;
            this.render();
            return;
        }

        this.showLoading();
        setTimeout(() => {
            this.filteredArticles = this.articles.filter(article => 
                article.title.toLowerCase().includes(searchQuery) ||
                article.excerpt.toLowerCase().includes(searchQuery) ||
                article.content.toLowerCase().includes(searchQuery) ||
                article.author.toLowerCase().includes(searchQuery) ||
                article.category.toLowerCase().includes(searchQuery) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
            this.hideLoading();
            this.render();
        }, 300);
    }

    handleArticleClick(article) {
        window.location.href = `article.html?id=${article.id}`;
    }

    render() {
        this.app.innerHTML = '';
        this.app.classList.add('page-transition');

        const header = createHeader();
        this.app.appendChild(header);

        const main = document.createElement('main');

        const search = createSearch(this.handleSearch.bind(this));
        main.appendChild(search);

        const articlesSection = createArticles(
            this.filteredArticles, 
            this.handleArticleClick.bind(this)
        );
        main.appendChild(articlesSection);

        this.app.appendChild(main);

        const footer = createFooter();
        this.app.appendChild(footer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Encyclopedia();
});
