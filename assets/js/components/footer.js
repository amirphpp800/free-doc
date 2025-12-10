export function createFooter() {
    const footer = document.createElement('div');
    footer.className = 'footer';

    const isArticlePage = window.location.pathname.includes('article.html');
    const logoPath = isArticlePage ? '../assets/images/logo.svg' : '../assets/images/logo.svg';

    footer.innerHTML = `
        <div class="footer-content">
            <p class="footer-text">
                <img src="${logoPath}" alt="لوگو" class="footer-logo" style="height: 24px; vertical-align: middle; margin-left: 8px;">
                دانشنامه آزاد - بهرام کاظمی
            </p>
            <div class="footer-links">
                <a href="#" class="footer-link" id="privacy-link">حریم خصوصی</a>
            </div>
            <p class="footer-copyright">© ۱۴۰۴ بهرام کاظمی - تمامی حقوق محفوظ است</p>
        </div>
    `;

    setTimeout(() => {
        const privacyLink = document.getElementById('privacy-link');
        if (privacyLink) {
            privacyLink.addEventListener('click', (e) => {
                e.preventDefault();
                showPrivacyModal();
            });
        }
    }, 0);

    return footer;
}

function showPrivacyModal() {
    const modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.innerHTML = `
        <div class="privacy-modal-overlay"></div>
        <div class="privacy-modal-content">
            <div class="privacy-modal-header">
                <h2>سیاست حریم خصوصی</h2>
                <button class="privacy-modal-close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="privacy-modal-body">
                <h3>۱. درباره این سایت</h3>
                <p>دانشنامه آزاد یک وب‌سایت ساده برای به اشتراک‌گذاری مقالات و اطلاعات است که به صورت کاملاً محلی در مرورگر شما اجرا می‌شود.</p>

                <h3>۲. عدم جمع‌آوری اطلاعات</h3>
                <p>این سایت هیچ‌گونه اطلاعات شخصی، آمار بازدید یا داده‌های کاربری را جمع‌آوری نمی‌کند. از هیچ ابزار تحلیلی یا ردیابی مانند Google Analytics استفاده نمی‌شود.</p>

                <h3>۳. ذخیره‌سازی محلی</h3>
                <p>تنظیمات شما مانند حالت تاریک/روشن فقط در مرورگر خودتان ذخیره می‌شود و به هیچ سروری ارسال نمی‌گردد.</p>

                <h3>۴. محتوای سایت</h3>
                <p>مقالات این سایت از منابع مختلف گردآوری شده و با ذکر منبع منتشر می‌شوند. استفاده از محتوا با ذکر منبع آزاد است.</p>

                <div class="privacy-footer">
                    <p>
                        <img src="${logoPath}" alt="لوگو" style="height: 20px; vertical-align: middle; margin-left: 6px;">
                        دانشنامه آزاد - بهرام کاظمی
                    </p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    const overlay = modal.querySelector('.privacy-modal-overlay');
    const closeBtn = modal.querySelector('.privacy-modal-close');

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
}