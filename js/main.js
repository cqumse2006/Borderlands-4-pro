document.addEventListener('DOMContentLoaded', function() {
    // FAQ Dropdown Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Close all FAQ items except the first one
    faqItems.forEach((item, index) => {
        if (index !== 0) {
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-answer').style.padding = '0 2rem';
        } else {
            item.classList.add('active');
        }
    });
    
    // Toggle FAQ items on click
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const otherAnswer = faqItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0';
                otherAnswer.style.padding = '0 2rem';
            });
            
            // Open clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 2rem 1.5rem';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navCheckbox = document.getElementById('nav-toggle');
                if (navCheckbox && navCheckbox.checked) {
                    navCheckbox.checked = false;
                }
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // FAQ accordion functionality is now handled by the new implementation at the top of the file

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Initialize highlight on page load
    highlightNav();

    // Add animation to timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimeline() {
        const triggerBottom = window.innerHeight * 0.85;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Initialize timeline items with offset
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
    });
    
    window.addEventListener('scroll', checkTimeline);
    checkTimeline(); // Check on page load

    // Add animation to feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkFeatures() {
        const triggerBottom = window.innerHeight * 0.85;
        
        featureCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize feature cards with offset
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkFeatures);
    checkFeatures(); // Check on page load

    // Add year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});
