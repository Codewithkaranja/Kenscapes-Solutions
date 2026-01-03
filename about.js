// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Testimonials Slider
    const sliderTrack = document.querySelector('.testimonials-slider .slider-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonials-slider .prev-btn');
    const nextBtn = document.querySelector('.testimonials-slider .next-btn');
    const dots = document.querySelectorAll('.testimonials-slider .dot');
    let currentSlide = 0;
    
    function updateSlider() {
        if (sliderTrack) {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            updateSlider();
        });
    }
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateSlider();
        });
    });
    
    // Auto-advance slider
    let slideInterval;
    const sliderContainer = document.querySelector('.testimonials-slider .slider-container');
    
    if (sliderContainer) {
        slideInterval = setInterval(() => {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            updateSlider();
        }, 5000);
        
        // Pause auto-advance on hover
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
                updateSlider();
            }, 5000);
        });
    }
    
    // Animate milestones on scroll
    const milestones = document.querySelectorAll('.milestone');
    const milestoneObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial state and observe
    milestones.forEach((milestone, index) => {
        milestone.style.opacity = '0';
        milestone.style.transform = 'translateX(-20px)';
        milestone.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        milestoneObserver.observe(milestone);
    });
    
    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial state and observe
    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        valueObserver.observe(card);
    });
    
    // Animate team members on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial state and observe
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        teamObserver.observe(member);
    });
    
    // Animate approach steps on scroll
    const approachSteps = document.querySelectorAll('.approach-step');
    const approachObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial state and observe
    approachSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        approachObserver.observe(step);
    });
    
    // Mission & Vision cards hover effect
    const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
    missionVisionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('mission-card')) {
                this.style.boxShadow = '0 20px 40px rgba(30, 111, 61, 0.15)';
            } else {
                this.style.boxShadow = '0 20px 40px rgba(107, 79, 45, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Team member expertise toggle
    const expertiseHeaders = document.querySelectorAll('.member-expertise h4');
    expertiseHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const tags = this.nextElementSibling;
            if (tags.style.maxHeight && tags.style.maxHeight !== '0px') {
                tags.style.maxHeight = '0';
                tags.style.opacity = '0';
            } else {
                tags.style.maxHeight = tags.scrollHeight + 'px';
                tags.style.opacity = '1';
            }
        });
        
        // Initialize with collapsed state on mobile
        if (window.innerWidth < 768) {
            const tags = header.nextElementSibling;
            tags.style.maxHeight = '0';
            tags.style.opacity = '0';
            tags.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            tags.style.overflow = 'hidden';
        }
    });
    
    // Team member contact form simulation
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.includes('mailto:')) {
                e.preventDefault();
                const email = this.href.replace('mailto:', '');
                const modal = document.createElement('div');
                modal.className = 'contact-modal';
                modal.innerHTML = `
                    <div class="contact-modal-content">
                        <h3>Contact ${this.closest('.member-info').querySelector('.member-name').textContent}</h3>
                        <p>Email: <strong>${email}</strong></p>
                        <p>You can also contact us through our main contact channels:</p>
                        <div class="contact-options">
                            <a href="tel:+254712345678" class="btn btn-outline">
                                <i class="fas fa-phone-alt"></i> Call Office
                            </a>
                            <a href="contact.html" class="btn btn-primary">
                                <i class="fas fa-envelope"></i> Contact Form
                            </a>
                        </div>
                        <button class="btn btn-light close-modal">Close</button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden';
                
                // Add modal styles
                const style = document.createElement('style');
                style.textContent = `
                    .contact-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 2000;
                    }
                    
                    .contact-modal-content {
                        background-color: white;
                        padding: 2rem;
                        border-radius: 12px;
                        max-width: 500px;
                        width: 90%;
                        text-align: center;
                    }
                    
                    .contact-modal-content h3 {
                        margin-bottom: 1rem;
                        color: var(--charcoal);
                    }
                    
                    .contact-modal-content p {
                        margin-bottom: 1.5rem;
                        color: var(--medium-gray);
                    }
                    
                    .contact-options {
                        display: flex;
                        gap: 1rem;
                        justify-content: center;
                        margin-bottom: 1.5rem;
                        flex-wrap: wrap;
                    }
                `;
                document.head.appendChild(style);
                
                // Close modal
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                    document.body.style.overflow = '';
                });
                
                // Close on background click
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                        document.head.removeChild(style);
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    });
    
    // Print about page
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-outline print-about';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Page';
    printBtn.style.position = 'fixed';
    printBtn.style.bottom = '100px';
    printBtn.style.right = '2rem';
    printBtn.style.zIndex = '999';
    
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', function() {
        const printContent = document.querySelector('main').innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>About Kenscapes Solutions</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
                    h1, h2, h3, h4 { font-family: 'Jost', sans-serif; font-weight: 500; }
                    .section { margin-bottom: 40px; }
                    .team-member { break-inside: avoid; margin-bottom: 20px; }
                    @media print {
                        .no-print { display: none; }
                        .page-break { page-break-before: always; }
                    }
                    @page { margin: 1cm; }
                </style>
            </head>
            <body>
                <h1>Kenscapes Solutions</h1>
                <p>Professional Landscaping Company in Kenya</p>
                <div class="content">
                    ${printContent}
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 1000);
                    }
                <\/script>
            </body>
            </html>
        `;
        
        window.print();
        
        // Restore original content
        document.body.innerHTML = originalContent;
        location.reload();
    });
    
    // Share about page
    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn btn-primary share-about';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    shareBtn.style.position = 'fixed';
    shareBtn.style.bottom = '160px';
    shareBtn.style.right = '2rem';
    shareBtn.style.zIndex = '999';
    
    document.body.appendChild(shareBtn);
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'About Kenscapes Solutions',
                text: 'Learn about our landscaping company in Kenya',
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Page link copied to clipboard!');
            });
        }
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.milestone');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const number = entry.querySelector('.milestone-number');
                const content = entry.querySelector('.milestone-content');
                
                setTimeout(() => {
                    number.style.transform = 'scale(1)';
                    number.style.opacity = '1';
                }, index * 200);
                
                setTimeout(() => {
                    content.style.transform = 'translateX(0)';
                    content.style.opacity = '1';
                }, index * 200 + 300);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Set initial state for timeline items
    timelineItems.forEach(item => {
        const number = item.querySelector('.milestone-number');
        const content = item.querySelector('.milestone-content');
        
        number.style.transform = 'scale(0)';
        number.style.opacity = '0';
        number.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        
        content.style.transform = 'translateX(-20px)';
        content.style.opacity = '0';
        content.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        
        timelineObserver.observe(item);
    });
    
    // Company stats animation
    const stats = [
        { element: document.querySelector('.overlay-text h3'), target: 50, suffix: '+', duration: 2000 },
        { element: document.querySelector('.overlay-text p'), text: 'Across Nairobi & surrounding areas' }
    ];
    
    function animateStat(element, target, suffix = '', duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }
    
    // Animate stats when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    if (stat.target) {
                        animateStat(stat.element, stat.target, stat.suffix, stat.duration);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const storyImage = document.querySelector('.image-container');
    if (storyImage) {
        statsObserver.observe(storyImage);
    }
});