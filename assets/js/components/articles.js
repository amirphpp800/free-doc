export function createArticles(articles, onArticleClick) {
    const container = document.createElement('div');
    container.className = 'articles-container fade-in';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'مقالات';

    const list = document.createElement('div');
    list.className = 'articles-list';

    if (articles.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 48px; color: #9ca3af; margin-bottom: 16px;">article</span>
            <p style="color: #6b7280; font-size: 16px;">هنوز مقاله‌ای منتشر نشده است</p>
        `;
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '48px 24px';
        list.appendChild(emptyMessage);
    }

    articles.forEach((article, index) => {
        const card = document.createElement('div');
        card.className = 'article-card slide-in';
        card.style.animationDelay = `${index * 0.05}s`;

        const tagsHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="article-header">
                <div>
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <span><span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">person</span> ${article.author}</span>
                        <span><span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">calendar_today</span> ${article.date}</span>
                        <span><span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">folder</span> ${article.category}</span>
                    </div>
                </div>
            </div>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-tags">${tagsHTML}</div>
            <div class="article-actions">
                <button class="read-more-btn">
                    ادامه مطلب
                    <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">arrow_back</span>
                </button>
            </div>
        `;

        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = `/article?id=${article.id}`;
        });

        const readMoreBtn = card.querySelector('.read-more-btn');
        readMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `/article?id=${article.id}`;
        });

        list.appendChild(card);
    });

    container.appendChild(title);
    container.appendChild(list);

    return container;
}