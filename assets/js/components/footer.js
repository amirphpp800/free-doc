
export function createFooter() {
    const footer = document.createElement('div');
    footer.className = 'footer';
    
    footer.innerHTML = `
        <div class="footer-content">
            <p class="footer-text">
                <span class="material-symbols-outlined" style="vertical-align: middle; font-size: 18px;">menu_book</span>
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
                <h3>۱. جمع‌آوری اطلاعات</h3>
                <p>ما در دانشنامه آزاد متعهد به حفظ حریم خصوصی کاربران هستیم. این سایت به صورت ایستا طراحی شده و هیچ‌گونه اطلاعات شخصی از کاربران جمع‌آوری نمی‌کند.</p>
                
                <h3>۲. استفاده از کوکی‌ها</h3>
                <p>این وب‌سایت از کوکی‌های ضروری برای بهبود عملکرد و تجربه کاربری استفاده می‌کند. این کوکی‌ها شامل:</p>
                <ul>
                    <li>کوکی‌های جلسه برای حفظ وضعیت کاربر</li>
                    <li>کوکی‌های ترجیحات برای ذخیره تنظیمات شخصی</li>
                </ul>
                
                <h3>۳. امنیت اطلاعات</h3>
                <p>تمامی داده‌های سایت به صورت محلی در مرورگر شما ذخیره می‌شوند و هیچ اطلاعاتی به سرور ارسال نمی‌شود. این سایت از پروتکل HTTPS برای امنیت ارتباطات استفاده می‌کند.</p>
                
                <h3>۴. اشتراک‌گذاری اطلاعات با اشخاص ثالث</h3>
                <p>ما هیچ‌گونه اطلاعات شخصی را با اشخاص ثالث به اشتراک نمی‌گذاریم. این سایت بدون استفاده از ابزارهای تحلیلی یا تبلیغاتی شخص ثالث اجرا می‌شود.</p>
                
                <h3>۵. حقوق کاربران</h3>
                <p>کاربران این حق را دارند که:</p>
                <ul>
                    <li>هر زمان کوکی‌های مرورگر خود را پاک کنند</li>
                    <li>از استفاده سایت خودداری کنند</li>
                    <li>درباره نحوه استفاده از داده‌ها سوال کنند</li>
                </ul>
                
                <h3>۶. محتوای سایت</h3>
                <p>تمامی مقالات و محتوای این سایت توسط بهرام کاظمی تهیه و منتشر شده است. استفاده از محتوا با ذکر منبع آزاد است.</p>
                
                <h3>۷. تغییرات در سیاست حریم خصوصی</h3>
                <p>این سیاست حریم خصوصی ممکن است به‌روزرسانی شود. هرگونه تغییر عمده در این صفحه اعلام خواهد شد.</p>
                
                <h3>۸. تماس با ما</h3>
                <p>در صورت داشتن هرگونه سوال یا نگرانی درباره حریم خصوصی، می‌توانید از طریق راه‌های ارتباطی موجود در سایت با ما تماس بگیرید.</p>
                
                <div class="privacy-footer">
                    <p><strong>آخرین به‌روزرسانی:</strong> دی ۱۴۰۴</p>
                    <p><strong>دانشنامه آزاد - بهرام کاظمی</strong></p>
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
