export function createArticles(articles, onArticleClick, currentPage = 1, articlesPerPage = 6, onPageChange = null) {
    const container = document.createElement('div');
    container.className = 'articles-container fade-in';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'مقالات';

    const list = document.createElement('div');
    list.className = 'articles-list';

    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    if (paginatedArticles.length === 0) {
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

    paginatedArticles.forEach((article, index) => {
        const card = document.createElement('div');
        card.className = 'article-card slide-in';
        card.style.animationDelay = `${index * 0.05}s`;

        const coverImageHTML = article.coverImage 
            ? `<div class="article-cover"><img src="${article.coverImage}" alt="${article.title}"></div>` 
            : '';

        card.innerHTML = `
            ${coverImageHTML}
            <div class="article-content-wrapper">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-actions">
                    <button class="read-more-btn">
                        ادامه مطلب
                        <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">arrow_back</span>
                    </button>
                </div>
            </div>
        `;

        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = `/article/?id=${article.id}`;
        });

        const readMoreBtn = card.querySelector('.read-more-btn');
        readMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `/article/?id=${article.id}`;
        });

        list.appendChild(card);
    });

    container.appendChild(title);
    container.appendChild(list);

    if (totalPages > 1) {
        const pagination = createPagination(currentPage, totalPages, onPageChange);
        container.appendChild(pagination);
    }

    return container;
}

function createPagination(currentPage, totalPages, onPageChange) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.innerHTML = `<span class="material-symbols-outlined">chevron_right</span>`;
    prevBtn.disabled = currentPage === 1;
    if (onPageChange && currentPage > 1) {
        prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
    }

    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'pagination-numbers';

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        const firstBtn = createPageButton(1, currentPage, onPageChange);
        pageNumbers.appendChild(firstBtn);
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.className = 'pagination-dots';
            dots.textContent = '...';
            pageNumbers.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i, currentPage, onPageChange);
        pageNumbers.appendChild(pageBtn);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.className = 'pagination-dots';
            dots.textContent = '...';
            pageNumbers.appendChild(dots);
        }
        const lastBtn = createPageButton(totalPages, currentPage, onPageChange);
        pageNumbers.appendChild(lastBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.innerHTML = `<span class="material-symbols-outlined">chevron_left</span>`;
    nextBtn.disabled = currentPage === totalPages;
    if (onPageChange && currentPage < totalPages) {
        nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
    }

    pagination.appendChild(prevBtn);
    pagination.appendChild(pageNumbers);
    pagination.appendChild(nextBtn);

    return pagination;
}

function createPageButton(pageNum, currentPage, onPageChange) {
    const btn = document.createElement('button');
    btn.className = `pagination-page ${pageNum === currentPage ? 'active' : ''}`;
    btn.textContent = pageNum;
    if (onPageChange && pageNum !== currentPage) {
        btn.addEventListener('click', () => onPageChange(pageNum));
    }
    return btn;
}
