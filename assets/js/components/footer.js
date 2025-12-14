export function createFooter() {
    const footer = document.createElement('div');
    footer.className = 'footer';

    const logoPath = '/assets/images/logo.svg';

    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-main">
                <div class="footer-brand">
                    <div class="footer-logo-section">
                        <img src="${logoPath}" alt="لوگو" class="footer-logo">
                        <span class="footer-brand-name">دانشنامه آزاد</span>
                    </div>
                    <p class="footer-description">منبعی آزاد برای آگاهی‌رسانی درباره وضعیت اینترنت، حقوق دیجیتال و فناوری در ایران</p>
                </div>
                
                <div class="footer-sections">
                    <div class="footer-column">
                        <h4 class="footer-column-title">صفحات</h4>
                        <ul class="footer-list">
                            <li><a href="/home" class="footer-link">صفحه اصلی</a></li>
                            <li><a href="#" class="footer-link" id="privacy-link">حریم خصوصی</a></li>
                            <li><a href="/pages/iran-off.html" class="footer-link">ایران در خاموشی</a></li>
                            <li><a href="/pages/bpb-guide.html" class="footer-link">راهنمای BPB Panel</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-column-title">منابع و ابزارها</h4>
                        <ul class="footer-list">
                            <li><a href="/pages/internet-toolkit.html" class="footer-link">جعبه‌ابزار اینترنت</a></li>
                            <li><a href="/pages/internet-disruption-toolkit.html" class="footer-link">جعبه‌ابزار اختلال</a></li>
                            <li><a href="https://fa.wikipedia.org/" target="_blank" class="footer-link">ویکی‌پدیا فارسی</a></li>
                        </ul>
                    </div>

                <div class="footer-column footer-column-wide">
                    <h4 class="footer-column-title">ویکی</h4>
                    <ul class="footer-list footer-orgs-grid">
    <li><a href="https://cra.ir/" target="_blank" class="footer-link footer-link-small">سازمان تنظیم مقررات و ارتباطات رادیویی</a></li>
    <li><a href="https://senf.ir/" target="_blank" class="footer-link footer-link-small">سازمان نظام صنفی رایانه‌ای</a></li>
    <li><a href="https://sccr.ir/" target="_blank" class="footer-link footer-link-small">شورای عالی فضای مجازی</a></li>
    <li><a href="https://www.irib.ir/" target="_blank" class="footer-link footer-link-small">صدا و سیما</a></li>
    <li><a href="https://www.parliran.ir/" target="_blank" class="footer-link footer-link-small">مجلس شورای اسلامی</a></li>
    <li><a href="https://rc.majlis.ir/" target="_blank" class="footer-link footer-link-small">مرکز پژوهش‌های مجلس</a></li>
    <li><a href="https://www.farhang.gov.ir/" target="_blank" class="footer-link footer-link-small">وزارت ارشاد و فرهنگ اسلامی</a></li>
    <li><a href="https://www.mimt.gov.ir/" target="_blank" class="footer-link footer-link-small">وزارت صنعت، معدن و تجارت</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p class="footer-copyright">© ۱۴۰۴ بهرام کاظمی - تمامی حقوق محفوظ است</p>
            </div>
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

    const logoPath = '/assets/images/logo.svg';
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
                        <img src="${logoPath}" alt="لوگو" class="footer-logo" style="height: 20px; vertical-align: middle; margin-left: 6px;">
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
