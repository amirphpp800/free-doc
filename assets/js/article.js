import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';
import { articles } from './data/sampleData.js';

class ArticlePage {
    constructor() {
        this.app = document.getElementById('app');
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
        this.app.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <div class="loading-text">در حال بارگذاری مقاله...</div>
            </div>
        `;
    }

    hideLoading() {
        // Loading is done
    }

    getArticleIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id'));
    }

    render() {
        const articleId = this.getArticleIdFromURL();
        const article = articles.find(a => a.id === articleId);

        if (!article) {
            this.app.innerHTML = '<div class="error">مقاله یافت نشد</div>';
            return;
        }

        this.app.innerHTML = '';
        this.app.classList.add('page-transition');

        const header = createHeader();
        this.app.appendChild(header);

        const main = document.createElement('main');
        main.className = 'article-page';

        main.innerHTML = `
            <div class="article-container">
                <a href="index.html" class="back-button">
                    <span class="material-symbols-outlined">arrow_forward</span>
                    بازگشت
                </a>

                <article class="article-content">
                    <header class="article-header-full">
                        <h1 class="article-title-full">${article.title}</h1>
                        <div class="article-meta-full">
                            <span class="meta-item">
                                <span class="material-symbols-outlined">person</span>
                                ${article.author}
                            </span>
                            <span class="meta-item">
                                <span class="material-symbols-outlined">calendar_today</span>
                                ${article.date}
                            </span>
                        </div>
                        <div class="article-tags-full">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </header>

                    <div class="article-body">
                        ${article.content}
                    </div>
                </article>
            </div>
        `;

        this.app.appendChild(main);

        const footer = createFooter();
        this.app.appendChild(footer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ArticlePage();
});