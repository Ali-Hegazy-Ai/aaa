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
});