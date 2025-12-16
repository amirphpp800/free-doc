import { createHeader, initTheme } from './components/header.js';
import { createFooter } from './components/footer.js';
import { articles } from './data/sampleData.js';

initTheme();

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

    calculateReadTime(content) {
        const text = content.replace(/<[^>]*>/g, '');
        const wordCount = text.trim().split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 150);
        return readTime < 1 ? 1 : readTime;
    }

    setupReadingProgress() {
        const progressBar = document.querySelector('.reading-progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        });
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

        const readTime = this.calculateReadTime(article.content);

        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        this.app.appendChild(progressBar);

        const header = createHeader();
        this.app.appendChild(header);

        const main = document.createElement('main');
        main.className = 'article-page';

        const coverImage = article.coverImage || '/assets/images/covers/art1.png';
        
        main.innerHTML = `
            <div class="article-hero" style="background-image: url('${coverImage}');">
                <div class="article-hero-overlay"></div>
                <div class="article-hero-content">
                    <h1 class="article-hero-title">${article.title}</h1>
                    <div class="article-hero-meta">
                        <span class="meta-item">
                            <span class="material-symbols-outlined">person</span>
                            ${article.author}
                        </span>
                        <span class="meta-item">
                            <span class="material-symbols-outlined">calendar_today</span>
                            ${article.date}
                        </span>
                        <span class="meta-item">
                            <span class="material-symbols-outlined">schedule</span>
                            ${readTime} دقیقه مطالعه
                        </span>
                    </div>
                    <div class="article-hero-tags">
                        ${article.tags.map(tag => `<span class="hero-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="article-container">
                <article class="article-content">
                    <div class="article-body">
                        ${article.content}
                    </div>
                </article>
            </div>
        `;

        this.app.appendChild(main);

        const backButton = document.createElement('a');
        backButton.href = '/home';
        backButton.className = 'back-button';
        backButton.innerHTML = `
            <span class="material-symbols-outlined">arrow_forward</span>
            بازگشت
        `;
        this.app.appendChild(backButton);

        const footer = createFooter();
        this.app.appendChild(footer);

        this.setupReadingProgress();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ArticlePage();
});