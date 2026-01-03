// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Budget Slider
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    const budgetOptions = document.querySelectorAll('.budget-option');
    
    if (budgetSlider && budgetValue) {
        // Format number with commas
        function formatNumber(num) {
            return 'KES ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // Update slider value display
        function updateBudgetValue(value) {
            budgetValue.textContent = formatNumber(value);
            budgetSlider.value = value;
        }
        
        // Initial update
        updateBudgetValue(budgetSlider.value);
        
        // Slider change event
        budgetSlider.addEventListener('input', function() {
            updateBudgetValue(this.value);
            
            // Remove active class from all options
            budgetOptions.forEach(option => option.classList.remove('active'));
        });
        
        // Budget option buttons
        budgetOptions.forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                updateBudgetValue(value);
                
                // Update active state
                budgetOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Character counter for message textarea
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 1000) {
                charCount.style.color = '#dc3545';
            } else if (count > 800) {
                charCount.style.color = '#ffc107';
            } else {
                charCount.style.color = 'var(--medium-gray)';
            }
        });
        
        // Initial count
        charCount.textContent = messageTextarea.value.length;
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnotherBtn = document.getElementById('sendAnother');
    
    if (contactForm) {
        // Error elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const messageError = document.getElementById('messageError');
        
        // Clear error messages
        function clearErrors() {
            const errorElements = [nameError, emailError, phoneError, messageError];
            errorElements.forEach(el => {
                if (el) el.textContent = '';
            });
            
            const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
            inputs.forEach(input => {
                input.classList.remove('error');
            });
        }
        
        // Show error message
        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorElement = document.getElementById(inputId + 'Error');
            
            if (input) {
                input.classList.add('error');
            }
            
            if (errorElement) {
                errorElement.textContent = message;
            }
        }
        
        // Validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Validate phone number (basic validation for Kenya)
        function isValidPhone(phone) {
            // Accepts formats: 0712 345 678, 0712345678, +254712345678
            const phoneRegex = /^(\+?254|0)?[17]\d{8}$/;
            return phoneRegex.test(phone.replace(/\s/g, ''));
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const service = document.getElementById('service').value;
            const projectType = document.querySelector('input[name="project-type"]:checked').value;
            const budget = budgetSlider ? budgetSlider.value : '';
            const newsletter = document.getElementById('newsletter').checked;
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                showError('name', 'Please enter your full name');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone
            if (!phone) {
                showError('phone', 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone', 'Please enter a valid Kenyan phone number');
                isValid = false;
            }
            
            // Validate message
            if (!message) {
                showError('message', 'Please enter your project details');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Please provide more details about your project (at least 10 characters)');
                isValid = false;
            } else if (message.length > 1000) {
                showError('message', 'Message is too long (maximum 1000 characters)');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Prepare form data
                const formData = {
                    name,
                    email,
                    phone,
                    service,
                    projectType,
                    budget,
                    message,
                    newsletter,
                    timestamp: new Date().toISOString(),
                    source: 'Website Contact Form'
                };
                
                // In a real application, you would send this data to a server
                // For demo purposes, we'll simulate an API call
                setTimeout(() => {
                    // Simulate successful submission
                    
                    // Store form data in localStorage (for demo)
                    try {
                        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                        submissions.push(formData);
                        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                    } catch (error) {
                        console.error('Error saving submission:', error);
                    }
                    
                    // Show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Send email notification (in a real app, this would be a server-side action)
                    sendEmailNotification(formData);
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Send another message button
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function() {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'block';
                contactForm.reset();
                
                // Reset budget slider
                if (budgetSlider) {
                    budgetSlider.value = 150000;
                    updateBudgetValue(150000);
                    budgetOptions.forEach(option => option.classList.remove('active'));
                }
                
                // Reset character counter
                if (charCount) {
                    charCount.textContent = '0';
                    charCount.style.color = 'var(--medium-gray)';
                }
                
                // Scroll to form
                contactForm.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
    
    // Send email notification (simulated)
    function sendEmailNotification(formData) {
        // In a real application, you would use an email service or server endpoint
        console.log('Email notification would be sent with data:', formData);
        
        // You could integrate with EmailJS, SendGrid, or your own backend here
        // Example with EmailJS (uncomment and configure if using EmailJS):
        /*
        emailjs.send('service_id', 'template_id', {
            to_name: 'Kenscapes Team',
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            service: formData.service,
            project_type: formData.projectType,
            budget: formData.budget,
            message: formData.message,
            newsletter: formData.newsletter ? 'Yes' : 'No'
        })
        .then(response => console.log('Email sent:', response))
        .catch(error => console.error('Email error:', error));
        */
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Open specific FAQ based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const faqParam = urlParams.get('faq');
    
    if (faqParam) {
        const targetFaq = document.querySelector(`.faq-question:contains('${faqParam}')`);
        if (targetFaq) {
            targetFaq.click();
            setTimeout(() => {
                targetFaq.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
    
    // Auto-fill form from URL parameters
    function autoFillFormFromParams() {
        const params = new URLSearchParams(window.location.search);
        
        // Service parameter
        const serviceParam = params.get('service');
        if (serviceParam) {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = serviceParam;
            }
        }
        
        // Subject parameter (for career inquiries from about page)
        const subjectParam = params.get('subject');
        if (subjectParam) {
            const messageTextarea = document.getElementById('message');
            if (messageTextarea) {
                messageTextarea.value = `Subject: ${subjectParam}\n\n`;
                if (charCount) {
                    charCount.textContent = messageTextarea.value.length;
                }
            }
        }
        
        // Package/Plan parameters (from services page)
        const packageParam = params.get('package');
        const planParam = params.get('plan');
        
        if (packageParam || planParam) {
            let prefilledMessage = "I'm interested in: ";
            
            if (packageParam) {
                prefilledMessage += `The ${packageParam} package. `;
            }
            
            if (planParam) {
                prefilledMessage += `The ${planParam} maintenance plan. `;
            }
            
            const messageTextarea = document.getElementById('message');
            if (messageTextarea) {
                messageTextarea.value = prefilledMessage + '\n\n';
                if (charCount) {
                    charCount.textContent = messageTextarea.value.length;
                }
            }
        }
    }
    
    autoFillFormFromParams();
    
    // Print contact information
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-outline print-contact';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Info';
    printBtn.style.position = 'fixed';
    printBtn.style.bottom = '100px';
    printBtn.style.right = '2rem';
    printBtn.style.zIndex = '999';
    
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', function() {
        const contactInfo = document.querySelector('.contact-info-section').innerHTML;
        const formInfo = document.querySelector('.contact-form-section .contact-form-content').innerHTML;
        
        const printContent = `
            <div class="print-header">
                <h1>Kenscapes Solutions - Contact Information</h1>
                <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="print-contact-info">
                ${contactInfo}
            </div>
            <div class="page-break"></div>
            <div class="print-form-info">
                <h2>Contact Form</h2>
                <p>Visit our website to submit this form online: ${window.location.origin}</p>
                ${formInfo}
            </div>
        `;
        
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Kenscapes Solutions Contact Information</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
                    h1, h2, h3 { font-family: 'Jost', sans-serif; font-weight: 500; }
                    .print-header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #1E6F3D; padding-bottom: 20px; }
                    .contact-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
                    .contact-info-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
                    .response-guarantee { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #1E6F3D; margin-bottom: 30px; }
                    .page-break { page-break-before: always; }
                    .btn, .whatsapp-float, .social-buttons, .map-placeholder { display: none; }
                    @media print {
                        .no-print { display: none; }
                        .page-break { page-break-before: always; }
                    }
                    @page { margin: 1cm; }
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
    
    // Share contact page
    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn btn-primary share-contact';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    shareBtn.style.position = 'fixed';
    shareBtn.style.bottom = '160px';
    shareBtn.style.right = '2rem';
    shareBtn.style.zIndex = '999';
    
    document.body.appendChild(shareBtn);
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'Contact Kenscapes Solutions',
                text: 'Professional landscaping services in Kenya',
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Contact page link copied to clipboard!');
            });
        }
    });
    
    // Timeline animation
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelineObserver = new IntersectionObserver((entries) => {
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
    timelineSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        timelineObserver.observe(step);
    });
    
    // Contact info cards animation
    const contactCards = document.querySelectorAll('.contact-info-card');
    const cardsObserver = new IntersectionObserver((entries) => {
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
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardsObserver.observe(card);
    });
    
    // FAQ items animation
    const faqItems = document.querySelectorAll('.faq-item');
    const faqObserver = new IntersectionObserver((entries) => {
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
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        faqObserver.observe(item);
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as Kenyan phone number
            if (value.startsWith('254')) {
                value = '+' + value;
            } else if (value.startsWith('07') || value.startsWith('01')) {
                value = '0' + value.substring(1);
            }
            
            // Add spacing for readability
            if (value.length > 3 && value.length <= 6) {
                value = value.substring(0, 3) + ' ' + value.substring(3);
            } else if (value.length > 6 && value.length <= 9) {
                value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else if (value.length > 9) {
                value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 9) + ' ' + value.substring(9);
            }
            
            e.target.value = value;
        });
    }
    
    // Service selection effect
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            const serviceOptions = {
                'design': 'Landscape Design & Planning',
                'garden': 'Garden Installation & Planting',
                'lawn': 'Lawn Solutions & Maintenance',
                'hardscaping': 'Hardscaping & Outdoor Features',
                'irrigation': 'Irrigation Systems',
                'treecare': 'Tree & Plant Care',
                'multiple': 'Multiple Services',
                'not-sure': 'Not Sure / Consultation'
            };
            
            if (selectedValue && serviceOptions[selectedValue]) {
                // Highlight the selection visually
                this.style.borderColor = 'var(--primary-green)';
                this.style.boxShadow = '0 0 0 3px rgba(30, 111, 61, 0.1)';
                
                // If message field is empty or has default text, prefill it
                const messageField = document.getElementById('message');
                if (messageField && (!messageField.value || messageField.value.length < 50)) {
                    const defaultText = `I'm interested in ${serviceOptions[selectedValue]}. `;
                    if (!messageField.value.includes(defaultText)) {
                        messageField.value = defaultText + (messageField.value || '');
                        if (charCount) {
                            charCount.textContent = messageField.value.length;
                        }
                    }
                }
            }
        });
    }
});