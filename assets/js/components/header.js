
export function createHeader() {
    const header = document.createElement('div');
    header.className = 'header';
    
    const isArticlePage = window.location.pathname.includes('article.html');
    const logoPath = isArticlePage ? '../assets/images/logo.svg' : '../assets/images/logo.svg';
    const homePath = isArticlePage ? 'index.html' : '#';
    
    header.innerHTML = `
        <div class="header-content">
            <h1 class="header-title">
                <img src="${logoPath}" alt="لوگو" class="header-logo">
                دانشنامه آزاد - بهرام کاظمی
            </h1>
        </div>
    `;
    
    return header;
}
