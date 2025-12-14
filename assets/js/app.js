
import { createHeader, initTheme } from './components/header.js';
import { createSearch } from './components/search.js';
import { createArticles } from './components/articles.js';
import { createFooter } from './components/footer.js';
import { loadArticles, articles as fallbackArticles } from './data/sampleData.js';

initTheme();

class Encyclopedia {
    constructor() {
        this.app = document.getElementById('app');
        this.articles = [];
        this.filteredArticles = [];
        this.isLoading = false;
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.init();
    }

    async init() {
        this.showLoading();
        try {
            this.articles = await loadArticles();
            if (this.articles.length === 0) {
                this.articles = fallbackArticles;
            }
        } catch (error) {
            console.error('Error loading articles:', error);
            this.articles = fallbackArticles;
        }
        this.filteredArticles = this.articles;
        this.hideLoading();
        this.render();
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
        this.currentPage = 1;
        
        if (searchQuery === '') {
            this.filteredArticles = this.articles;
            this.updateArticles();
            return;
        }

        this.filteredArticles = this.articles.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.content.toLowerCase().includes(searchQuery) ||
            article.author.toLowerCase().includes(searchQuery) ||
            article.category.toLowerCase().includes(searchQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );
        this.updateArticles();
    }

    handlePageChange(page) {
        this.currentPage = page;
        this.updateArticles();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateArticles() {
        const existingArticles = this.app.querySelector('.articles-container');
        if (existingArticles) {
            const newArticlesSection = createArticles(
                this.filteredArticles, 
                this.handleArticleClick.bind(this),
                this.currentPage,
                this.articlesPerPage,
                this.handlePageChange.bind(this)
            );
            existingArticles.replaceWith(newArticlesSection);
        }
    }

    handleArticleClick(article) {
        window.location.href = `/article/?id=${article.id}`;
    }

    render() {
        this.app.innerHTML = '';
        this.app.classList.add('page-transition');

        const header = createHeader();
        this.app.appendChild(header);

        const main = document.createElement('main');

        const search = createSearch(this.handleSearch.bind(this), this.articles);
        main.appendChild(search);

        const articlesSection = createArticles(
            this.filteredArticles, 
            this.handleArticleClick.bind(this),
            this.currentPage,
            this.articlesPerPage,
            this.handlePageChange.bind(this)
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
