const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loader"></div>';
document.body.appendChild(loadingScreen);

document.addEventListener('DOMContentLoaded', function() {
  
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
               
                if (entry.target.classList.contains('stat-item')) {
                    const countElement = entry.target.querySelector('h3');
                    const targetValue = parseInt(countElement.getAttribute('data-value'));
                    animateCounter(countElement, targetValue);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

   
    function animateCounter(element, target) {
        let startTime = null;
        const duration = 2500; // 2.5 seconds
        
        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }
        
        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = easeOutExpo(progress);
            const current = Math.round(easedProgress * target);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

   
    const animatedElements = document.querySelectorAll('.product-item, .benefit-item, .commitment-item, .badge, .stat-item, .quality-statement');
    
    
    const qualityStatement = document.querySelector('.quality-statement');
    if (qualityStatement) {
        qualityStatement.classList.add('fade-scale-in');
    }
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });


    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.03)';
            item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });

    
    const commitmentSection = document.querySelector('.commitment');
    if (commitmentSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const speed = 0.5;
            
            commitmentSection.style.backgroundPositionY = `${scrollPosition * speed}px`;
        });
    }

    // Check browser language and redirect if needed
    function detectLanguage() {
        // Only detect language on first visit
        if (!localStorage.getItem('language')) {
            const userLang = navigator.language || navigator.userLanguage;
            if (userLang.startsWith('ar')) {
                // User's browser is set to Arabic
                if (document.documentElement.getAttribute('lang') !== 'ar') {
                    // Redirect to Arabic page if not already on it
                    window.location.href = 'index-arabic.html';
                    return;
                }
            } else {
                // User's browser is not set to Arabic
                if (document.documentElement.getAttribute('lang') === 'ar') {
                    // Redirect to English page if on Arabic page
                    window.location.href = 'index.html';
                    return;
                }
            }
        }
    }
    
    // Call the language detection function
    detectLanguage();

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        // Update icon
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Language toggle functionality
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle.querySelector('span');
    
    // Set the correct language in localStorage based on current page
    const isArabic = document.documentElement.getAttribute('lang') === 'ar';
    localStorage.setItem('language', isArabic ? 'ar' : 'en');
    
    langToggle.addEventListener('click', function() {
        if (document.documentElement.getAttribute('lang') === 'ar') {
            // Switch to English
            localStorage.setItem('language', 'en');
            window.location.href = 'index.html';
        } else {
            // Switch to Arabic
            localStorage.setItem('language', 'ar');
            window.location.href = 'index-arabic.html';
        }
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        const nav = document.querySelector('nav');
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
            const navUl = nav.querySelector('ul');
            navUl.classList.toggle('active');
        });
    }
});