// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Service Navigation
    const serviceNavBtns = document.querySelectorAll('.service-nav-btn');
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    if (serviceNavBtns.length > 0) {
        serviceNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                serviceNavBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the service ID
                const serviceId = this.getAttribute('data-service');
                
                // Hide all service details
                serviceDetails.forEach(detail => {
                    detail.classList.remove('active');
                });
                
                // Show the selected service detail
                const selectedService = document.getElementById(serviceId);
                if (selectedService) {
                    selectedService.classList.add('active');
                    
                    // Scroll to the service detail
                    selectedService.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Update URL hash when switching services
    serviceNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            window.history.pushState(null, null, `#${serviceId}`);
        });
    });
    
    // Check URL hash on page load
    const hash = window.location.hash;
    if (hash) {
        const serviceId = hash.replace('#', '');
        const serviceBtn = document.querySelector(`.service-nav-btn[data-service="${serviceId}"]`);
        if (serviceBtn) {
            serviceBtn.click();
        }
    }
    
    // Service package selection
    const packageButtons = document.querySelectorAll('.packages-grid .btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const packageType = this.closest('.package').querySelector('.package-title').textContent;
            const packagePrice = this.closest('.package').querySelector('.package-price').textContent;
            
            // Store package selection in session storage for contact form
            sessionStorage.setItem('selectedPackage', packageType);
            sessionStorage.setItem('packagePrice', packagePrice);
            
            // If it's a custom quote button, add a note
            if (packageType.includes('Complete') || this.textContent.includes('Custom')) {
                sessionStorage.setItem('customQuote', 'true');
            }
        });
    });
    
    // Maintenance plan selection
    const planButtons = document.querySelectorAll('.plans-grid .btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const planType = this.closest('.plan').querySelector('h5').textContent;
            const planPrice = this.closest('.plan').querySelector('.plan-price').textContent;
            
            // Store plan selection in session storage
            sessionStorage.setItem('selectedPlan', planType);
            sessionStorage.setItem('planPrice', planPrice);
        });
    });
    
    // Service feature cards animation
    const featureCards = document.querySelectorAll('.feature, .benefit-card, .material');
    if (featureCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Set initial state
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    // Water savings chart animation
    const savingsBars = document.querySelectorAll('.savings-fill');
    if (savingsBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'width 1.5s ease-in-out';
                        entry.target.style.width = width;
                    }, 300);
                }
            });
        }, {
            threshold: 0.5
        });
        
        savingsBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
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
        
        // Set initial state
        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-20px)';
            step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(step);
        });
    }
    
    // Service plan cards hover effect
    const planCards = document.querySelectorAll('.plan, .package');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('recommended')) {
                this.style.boxShadow = '0 20px 40px rgba(30, 111, 61, 0.2)';
            } else {
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('recommended')) {
                this.style.boxShadow = '0 0 0 1px var(--primary-green)';
            } else {
                this.style.boxShadow = 'var(--shadow-md)';
            }
        });
    });
    
    // Print service details
    const printButtons = document.querySelectorAll('.print-service');
    if (printButtons.length > 0) {
        printButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceDetail = this.closest('.service-detail');
                const printContent = serviceDetail.innerHTML;
                const originalContent = document.body.innerHTML;
                
                document.body.innerHTML = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Kenscapes Solutions - Service Details</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .service-detail-header { background: #1E6F3D; color: white; padding: 20px; }
                            .service-icon-large { display: none; }
                            .service-detail-content { padding: 20px; }
                            .btn { display: none; }
                            @media print {
                                .no-print { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        ${printContent}
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
        });
    }
    
    // Service cost calculator (simplified)
    const calculatorTriggers = document.querySelectorAll('.calculate-cost');
    if (calculatorTriggers.length > 0) {
        calculatorTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                const modal = document.createElement('div');
                modal.className = 'calculator-modal';
                modal.innerHTML = `
                    <div class="calculator-content">
                        <h3>Estimate Your ${service} Cost</h3>
                        <p>This is a simplified estimator. Contact us for an accurate quote.</p>
                        
                        <div class="calculator-form">
                            <div class="form-group">
                                <label for="area">Area Size (square meters):</label>
                                <input type="range" id="area" min="50" max="1000" value="200" class="slider">
                                <span id="area-value">200 m²</span>
                            </div>
                            
                            <div class="form-group">
                                <label for="complexity">Project Complexity:</label>
                                <select id="complexity">
                                    <option value="simple">Simple</option>
                                    <option value="medium" selected>Medium</option>
                                    <option value="complex">Complex</option>
                                </select>
                            </div>
                            
                            <div class="result">
                                <h4>Estimated Cost:</h4>
                                <div class="estimated-cost">KES <span id="cost-value">75,000</span></div>
                                <small>This is an estimate only. Actual cost may vary.</small>
                            </div>
                            
                            <div class="calculator-actions">
                                <button class="btn btn-outline close-calculator">Close</button>
                                <a href="contact.html" class="btn btn-primary">Get Accurate Quote</a>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden';
                
                // Add calculator styles
                const style = document.createElement('style');
                style.textContent = `
                    .calculator-modal {
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
                    
                    .calculator-content {
                        background-color: white;
                        padding: 2rem;
                        border-radius: 12px;
                        max-width: 500px;
                        width: 90%;
                        max-height: 90vh;
                        overflow-y: auto;
                    }
                    
                    .calculator-form {
                        margin: 1.5rem 0;
                    }
                    
                    .form-group {
                        margin-bottom: 1.5rem;
                    }
                    
                    .form-group label {
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: 500;
                    }
                    
                    .slider {
                        width: 100%;
                        margin: 0.5rem 0;
                    }
                    
                    #area-value {
                        display: inline-block;
                        margin-left: 1rem;
                        font-weight: 500;
                    }
                    
                    .result {
                        background-color: #f8f9fa;
                        padding: 1.5rem;
                        border-radius: 8px;
                        margin: 1.5rem 0;
                        text-align: center;
                    }
                    
                    .estimated-cost {
                        font-size: 2rem;
                        font-weight: 500;
                        color: var(--primary-green);
                        margin: 0.5rem 0;
                    }
                    
                    .calculator-actions {
                        display: flex;
                        gap: 1rem;
                        justify-content: center;
                    }
                `;
                document.head.appendChild(style);
                
                // Calculator functionality
                const areaSlider = document.getElementById('area');
                const areaValue = document.getElementById('area-value');
                const complexitySelect = document.getElementById('complexity');
                const costValue = document.getElementById('cost-value');
                
                // Base prices per service
                const basePrices = {
                    'design': 5000,
                    'garden': 1500,
                    'lawn': 800,
                    'hardscaping': 2500,
                    'irrigation': 2000,
                    'treecare': 3000
                };
                
                // Complexity multipliers
                const complexityMultipliers = {
                    'simple': 0.8,
                    'medium': 1,
                    'complex': 1.5
                };
                
                function calculateCost() {
                    const area = parseInt(areaSlider.value);
                    const complexity = complexitySelect.value;
                    const basePrice = basePrices[service] || 1000;
                    
                    let cost = area * basePrice * complexityMultipliers[complexity];
                    
                    // Format the cost
                    costValue.textContent = cost.toLocaleString();
                }
                
                areaSlider.addEventListener('input', function() {
                    areaValue.textContent = `${this.value} m²`;
                    calculateCost();
                });
                
                complexitySelect.addEventListener('change', calculateCost);
                
                // Initial calculation
                calculateCost();
                
                // Close calculator
                const closeBtn = document.querySelector('.close-calculator');
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
            });
        });
    }
});