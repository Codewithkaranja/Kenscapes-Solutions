// Portfolio Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const totalProjects = document.getElementById('total-projects');
    const residentialCount = document.getElementById('residential-count');
    const commercialCount = document.getElementById('commercial-count');
    
    // Calculate initial counts
    function updateProjectCounts() {
        const total = portfolioItems.length;
        const residential = document.querySelectorAll('.portfolio-item[data-category*="residential"]').length;
        const commercial = document.querySelectorAll('.portfolio-item[data-category*="commercial"]').length;
        
        totalProjects.textContent = total;
        residentialCount.textContent = residential;
        commercialCount.textContent = commercial;
    }
    
    // Initialize counts
    updateProjectCounts();
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items with animation
            portfolioItems.forEach(item => {
                item.classList.add('fade-out');
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                    
                    setTimeout(() => {
                        item.classList.remove('fade-out');
                    }, 50);
                }, 300);
            });
            
            // Update URL hash
            window.history.pushState(null, null, filterValue === 'all' ? '#portfolio' : `#${filterValue}`);
        });
    });
    
    // Check URL hash on page load
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'portfolio') {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
    
    // Load More Projects
    const loadMoreBtn = document.getElementById('loadMore');
    const initialDisplayCount = 200;
    let currentDisplayCount = initialDisplayCount;
    
    // Hide extra projects initially
    portfolioItems.forEach((item, index) => {
        if (index >= initialDisplayCount) {
            item.classList.add('hidden');
        }
    });
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show next batch of projects
            const hiddenItems = document.querySelectorAll('.portfolio-item.hidden');
            const itemsToShow = Math.min(4, hiddenItems.length);
            
            for (let i = 0; i < itemsToShow; i++) {
                setTimeout(() => {
                    hiddenItems[i].classList.remove('hidden');
                    hiddenItems[i].style.opacity = '0';
                    hiddenItems[i].style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        hiddenItems[i].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        hiddenItems[i].style.opacity = '1';
                        hiddenItems[i].style.transform = 'translateY(0)';
                    }, 50);
                }, i * 100);
            }
            
            // Update current count
            currentDisplayCount += itemsToShow;
            
            // Hide button if all items are shown
            setTimeout(() => {
                const remainingHidden = document.querySelectorAll('.portfolio-item.hidden').length;
                if (remainingHidden === 0) {
                    loadMoreBtn.style.display = 'none';
                }
            }, itemsToShow * 150);
        });
    }
    
    // Project Modal
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    
    // Project data
    const projects = {
        1: {
            title: "Karen Residence Garden Makeover",
            location: "Karen, Nairobi",
            description: "Complete garden redesign transforming a bare backyard into a lush, functional outdoor living space. The project focused on creating distinct zones for entertainment, relaxation, and play while incorporating native plants for sustainability.",
            services: ["Landscape Design", "Garden Installation", "Lawn Installation", "Stone Pathways", "Irrigation System", "Lighting"],
            size: "800 m²",
            duration: "4 weeks",
            completed: "March 2025",
            budget: "KES 850,000",
            challenges: "Poor soil quality and drainage issues",
            solutions: "Soil amendment, French drain installation, and raised garden beds",
            images: [
                {src: "images/portfolio/project1-1.jpg", caption: "Main garden area with native plants"},
                {src: "images/portfolio/project1-2.jpg", caption: "Stone pathway through the garden"},
                {src: "images/portfolio/project1-3.jpg", caption: "Entertainment area with seating"},
                {src: "images/portfolio/project1-4.jpg", caption: "Before and after comparison"}
            ],
            testimonial: "Kenscapes transformed our backyard into the oasis we always wanted. Professional, efficient, and the results are stunning!"
        },
        2: {
            title: "Westlands Office Complex Lawn",
            location: "Westlands, Nairobi",
            description: "Premium lawn installation for a commercial office complex, featuring an automated irrigation system and sustainable maintenance plan. The project required careful planning to ensure minimal disruption to daily business operations.",
            services: ["Lawn Installation", "Irrigation System", "Soil Preparation", "Regular Maintenance"],
            size: "1,200 m²",
            duration: "2 weeks",
            completed: "January 2025",
            budget: "KES 650,000",
            challenges: "Heavy foot traffic and shading from buildings",
            solutions: "Durable turf variety and strategic planting of shade-tolerant grass",
            images: [
                {src: "images/portfolio/project2-1.jpg", caption: "Main lawn area"},
                {src: "images/portfolio/project2-2.jpg", caption: "Irrigation system installation"},
                {src: "images/portfolio/project2-3.jpg", caption: "Evening view with lighting"}
            ],
            testimonial: "Our office complex now has a beautiful green space that employees and visitors love. Professional work from start to finish."
        },
        3: {
            title: "Runda Residence Outdoor Patio",
            location: "Runda, Nairobi",
            description: "Natural stone patio with integrated fire pit, seating walls, and decorative pathways creating an elegant outdoor living space perfect for entertainment and family gatherings.",
            services: ["Hardscaping", "Patio Construction", "Stone Work", "Fire Pit Installation", "Pathways"],
            size: "150 m²",
            duration: "3 weeks",
            completed: "November 2024",
            budget: "KES 1,200,000",
            challenges: "Sloped terrain requiring retaining structures",
            solutions: "Tiered design with integrated retaining walls and proper drainage",
            images: [
                {src: "images/portfolio/project3-1.jpg", caption: "Stone patio with fire pit"},
                {src: "images/portfolio/project3-2.jpg", caption: "Seating walls and pathways"},
                {src: "images/portfolio/project3-3.jpg", caption: "Evening ambiance with fire feature"}
            ],
            testimonial: "The patio has become our favorite spot for family gatherings. The craftsmanship is exceptional."
        },
        4: {
            title: "Lavington Garden Makeover",
            location: "Lavington, Nairobi",
            description: "Complete garden transformation from a bare, unused yard to a lush, multi-functional outdoor space with flowers, shrubs, trees, and a water feature.",
            services: ["Complete Garden Design", "Plant Installation", "Water Feature", "Lighting", "Irrigation"],
            size: "600 m²",
            duration: "5 weeks",
            completed: "August 2024",
            budget: "KES 950,000",
            challenges: "Existing poor soil and drainage issues",
            solutions: "Complete soil replacement, French drain installation, and raised beds",
            images: [
                {src: "images/portfolio/project4-1.jpg", caption: "Before: Bare yard"},
                {src: "images/portfolio/project4-2.jpg", caption: "After: Lush garden"},
                {src: "images/portfolio/project4-3.jpg", caption: "Water feature detail"},
                {src: "images/portfolio/project4-4.jpg", caption: "Colorful flower beds"}
            ],
            testimonial: "The transformation is unbelievable! We went from avoiding our backyard to spending every evening there."
        },
        5: {
            title: "Boutique Hotel Garden Design",
            location: "Karen, Nairobi",
            description: "Year-round color garden design for a boutique hotel, featuring seasonal flowers, strategic seating areas, decorative pathways, and ambient lighting to enhance guest experience.",
            services: ["Commercial Landscaping", "Seasonal Planting", "Pathway Design", "Lighting", "Maintenance Plan"],
            size: "2,000 m²",
            duration: "6 weeks",
            completed: "June 2024",
            budget: "KES 2,500,000",
            challenges: "Creating visual interest year-round with minimal maintenance",
            solutions: "Strategic plant selection for staggered blooming and low-maintenance varieties",
            images: [
                {src: "images/portfolio/project5-1.jpg", caption: "Hotel entrance garden"},
                {src: "images/portfolio/project5-2.jpg", caption: "Seating area with flowering plants"},
                {src: "images/portfolio/project5-3.jpg", caption: "Pathway through the garden"}
            ],
            testimonial: "Our gardens are now a major attraction for guests. The design is beautiful and practical."
        },
        6: {
            title: "Kileleshwa Lawn Makeover",
            location: "Kileleshwa, Nairobi",
            description: "Complete lawn renovation including soil preparation, new premium turf installation, and automated irrigation system for a residential property.",
            services: ["Lawn Renovation", "Soil Preparation", "Turf Installation", "Irrigation System", "Maintenance"],
            size: "400 m²",
            duration: "2 weeks",
            completed: "April 2024",
            budget: "KES 450,000",
            challenges: "Existing patchy lawn with weed infestation",
            solutions: "Complete removal of old turf, soil treatment, and new premium turf installation",
            images: [
                {src: "images/portfolio/project6-1.jpg", caption: "Before: Patchy lawn"},
                {src: "images/portfolio/project6-2.jpg", caption: "After: Lush green lawn"},
                {src: "images/portfolio/project6-3.jpg", caption: "Irrigation system"}
            ],
            testimonial: "Our lawn went from an embarrassment to the envy of the neighborhood. Professional and efficient service."
        },
        7: {
            title: "Muthaiga Residence Courtyard",
            location: "Muthaiga, Nairobi",
            description: "Intimate courtyard design with container plants, decorative paving, and comfortable seating area creating a private oasis in an urban setting.",
            services: ["Courtyard Design", "Container Planting", "Paving", "Lighting", "Seating"],
            size: "80 m²",
            duration: "3 weeks",
            completed: "February 2024",
            budget: "KES 750,000",
            challenges: "Limited space and shading from surrounding buildings",
            solutions: "Vertical planting, light-colored paving to reflect light, and strategic plant selection",
            images: [
                {src: "images/portfolio/project7-1.jpg", caption: "Courtyard overview"},
                {src: "images/portfolio/project7-2.jpg", caption: "Container plant details"},
                {src: "images/portfolio/project7-3.jpg", caption: "Seating area with lighting"}
            ],
            testimonial: "Our small courtyard is now our favorite retreat. The design maximizes every inch of space beautifully."
        },
        8: {
            title: "International School Grounds",
            location: "Kiambu",
            description: "Complete grounds landscaping for an international school including playing fields, educational gardens, and outdoor learning areas designed for both function and beauty.",
            services: ["School Landscaping", "Playing Fields", "Educational Gardens", "Outdoor Learning Areas", "Irrigation"],
            size: "5,000 m²",
            duration: "8 weeks",
            completed: "December 2023",
            budget: "KES 3,800,000",
            challenges: "Creating durable spaces for active children while maintaining aesthetic appeal",
            solutions: "Durable turf varieties, strategic planting of hardy plants, and functional design",
            images: [
                {src: "images/portfolio/project8-1.jpg", caption: "Playing fields"},
                {src: "images/portfolio/project8-2.jpg", caption: "Educational garden"},
                {src: "images/portfolio/project8-3.jpg", caption: "Outdoor learning area"}
            ],
            testimonial: "The transformation of our school grounds has been incredible. Students love the new outdoor spaces."
        }
    };
    
    // Open project modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                // Build modal content
                let imagesHTML = '';
                project.images.forEach((img, index) => {
                    imagesHTML += `
                        <div class="modal-image" data-index="${index}">
                            <img src="${img.src}" alt="${img.caption}">
                            <div class="image-overlay">View</div>
                        </div>
                    `;
                });
                
                let servicesHTML = '';
                project.services.forEach(service => {
                    servicesHTML += `<li><i class="fas fa-check"></i> ${service}</li>`;
                });
                
                const modalHTML = `
                    <div class="modal-project">
                        <h2 class="modal-project-title">${project.title}</h2>
                        <p class="modal-project-location">
                            <i class="fas fa-map-marker-alt"></i> ${project.location}
                        </p>
                        
                        <div class="modal-project-images">
                            ${imagesHTML}
                        </div>
                        
                        <div class="modal-project-details">
                            <div class="modal-details-content">
                                <div class="modal-section">
                                    <h3 class="modal-section-title">Project Overview</h3>
                                    <p class="modal-project-desc">${project.description}</p>
                                </div>
                                
                                <div class="modal-services">
                                    <h3 class="modal-section-title">Services Provided</h3>
                                    <ul class="modal-services-list">
                                        ${servicesHTML}
                                    </ul>
                                </div>
                                
                                <div class="modal-section">
                                    <h3 class="modal-section-title">Project Details</h3>
                                    <p><strong>Challenge:</strong> ${project.challenges}</p>
                                    <p><strong>Solution:</strong> ${project.solutions}</p>
                                    ${project.testimonial ? `
                                        <div class="modal-testimonial">
                                            <h4>Client Testimonial</h4>
                                            <p>"${project.testimonial}"</p>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                            
                            <div class="modal-sidebar">
                                <div class="modal-fact-box">
                                    <div class="modal-fact-title">Project Size</div>
                                    <div class="modal-fact-value">${project.size}</div>
                                </div>
                                
                                <div class="modal-fact-box">
                                    <div class="modal-fact-title">Duration</div>
                                    <div class="modal-fact-value">${project.duration}</div>
                                </div>
                                
                                <div class="modal-fact-box">
                                    <div class="modal-fact-title">Completed</div>
                                    <div class="modal-fact-value">${project.completed}</div>
                                </div>
                                
                                <div class="modal-cta-box">
                                    <h4>Inspired by This Project?</h4>
                                    <p>Let's create something beautiful for your space</p>
                                    <a href="contact.html?project=${projectId}" class="btn btn-primary">Start Your Project</a>
                                    <a href="tel:+254712345678" class="btn btn-outline">Call for Consultation</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Set modal content and show
                modalBody.innerHTML = modalHTML;
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add event listeners to modal images
                const modalImages = document.querySelectorAll('.modal-image');
                modalImages.forEach(img => {
                    img.addEventListener('click', function() {
                        const index = this.getAttribute('data-index');
                        openLightbox(project.images, parseInt(index));
                    });
                });
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Before & After Slider
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function updateSlider() {
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
    let slideInterval = setInterval(() => {
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        updateSlider();
    }, 5000);
    
    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
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
    
    // Lightbox functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-nav.prev');
    const lightboxNext = document.querySelector('.lightbox-nav.next');
    
    let currentImages = [];
    let currentImageIndex = 0;
    
    function openLightbox(images, startIndex = 0) {
        currentImages = images;
        currentImageIndex = startIndex;
        updateLightbox();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function updateLightbox() {
        if (currentImages.length > 0 && currentImageIndex >= 0 && currentImageIndex < currentImages.length) {
            lightboxImage.src = currentImages[currentImageIndex].src;
            lightboxCaption.textContent = currentImages[currentImageIndex].caption;
        }
    }
    
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function nextImage() {
        currentImageIndex = currentImageIndex === currentImages.length - 1 ? 0 : currentImageIndex + 1;
        updateLightbox();
    }
    
    function prevImage() {
        currentImageIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
        updateLightbox();
    }
    
    // Lightbox event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
    
    // Animation for process steps
    const processSteps = document.querySelectorAll('.process-step');
    const observer = new IntersectionObserver((entries) => {
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
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(step);
    });
    
    // Testimonial cards animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialObserver = new IntersectionObserver((entries) => {
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
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        testimonialObserver.observe(card);
    });
    
    /* Print portfolio functionality
    const printPortfolioBtn = document.createElement('button');
    printPortfolioBtn.className = 'btn btn-outline print-portfolio';
    printPortfolioBtn.innerHTML = '<i class="fas fa-print"></i> Print Portfolio';
    printPortfolioBtn.style.position = 'fixed';
    printPortfolioBtn.style.bottom = '100px';
    printPortfolioBtn.style.right = '2rem';
    printPortfolioBtn.style.zIndex = '999';
    
    document.body.appendChild(printPortfolioBtn);*/
    
    printPortfolioBtn.addEventListener('click', function() {
        const printContent = document.querySelector('.portfolio-grid-section').innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Kenscapes Solutions Portfolio</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
                    .portfolio-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .portfolio-card { break-inside: avoid; margin-bottom: 20px; }
                    .portfolio-image { height: 200px; overflow: hidden; }
                    .portfolio-image img { width: 100%; height: 100%; object-fit: cover; }
                    .portfolio-info { padding: 15px; }
                    .portfolio-item-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
                    .portfolio-item-desc { color: #666; margin-bottom: 10px; }
                    .portfolio-meta { display: flex; justify-content: space-between; font-size: 14px; color: #888; }
                    @media print {
                        .no-print { display: none; }
                        .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
                    }
                    @page { margin: 1cm; }
                </style>
            </head>
            <body>
                <h1>Kenscapes Solutions Portfolio</h1>
                <p>Professional Landscaping Projects in Kenya</p>
                <div class="portfolio-grid">
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
    
    /* Share portfolio functionality
    const sharePortfolioBtn = document.createElement('button');
    sharePortfolioBtn.className = 'btn btn-primary share-portfolio';
    sharePortfolioBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Portfolio';
    sharePortfolioBtn.style.position = 'fixed';
    sharePortfolioBtn.style.bottom = '160px';
    sharePortfolioBtn.style.right = '2rem';
    sharePortfolioBtn.style.zIndex = '999';
    
    document.body.appendChild(sharePortfolioBtn);*/
    
   /* sharePortfolioBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'Kenscapes Solutions Portfolio',
                text: 'Check out these amazing landscaping projects in Kenya',
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Portfolio link copied to clipboard!');
            });
        }
    });*/
});