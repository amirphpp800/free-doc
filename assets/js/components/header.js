
export function createHeader() {
    const header = document.createElement('div');
    header.className = 'header';
    
    const logoPath = '/assets/images/logo.svg';
    const homePath = '/';
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isChecked = savedTheme === 'dark' ? 'checked' : '';
    
    header.innerHTML = `
        <div class="header-content">
            <h1 class="header-title">
                <img src="${logoPath}" alt="لوگو" class="header-logo">
                دانشنامه آزاد - بهرام کاظمی
            </h1>
            <div class="checkbox-wrapper-54">
                <label class="switch">
                    <input type="checkbox" id="theme-toggle" ${isChecked}>
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                }
            });
        }
    }, 0);
    
    return header;
}

export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}
