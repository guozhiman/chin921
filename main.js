// Main JavaScript file for TechSolutions IT outsourcing website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeServiceConfigurator();
    initializeMonitoringDashboard();
    initializeCaseStudiesSlider();
    initializeChatWidget();
    initializeMobileMenu();
    initializeParticleBackground();
});

// Animation initialization
function initializeAnimations() {
    // Fade in animations for elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuart',
                    delay: anime.stagger(100)
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Hero title animation
    anime({
        targets: '.hero-content h2 span',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        delay: anime.stagger(200),
        easing: 'easeOutExpo'
    });
}

// Service Configurator
function initializeServiceConfigurator() {
    const checkboxes = document.querySelectorAll('.service-checkbox');
    const configOptions = document.getElementById('config-options');
    const quoteItems = document.getElementById('quote-items');
    const totalPrice = document.getElementById('total-price');

    // Service configuration data
    const serviceConfigs = {
        website: {
            name: '网站建设',
            basePrice: 8000,
            options: [
                { name: '网站类型', type: 'select', items: ['企业官网', '电商网站', '定制开发'], prices: [8000, 15000, 25000] },
                { name: '页面数量', type: 'number', min: 5, max: 50, default: 10, pricePer: 500 },
                { name: '响应式设计', type: 'checkbox', default: true, price: 2000 },
                { name: 'SEO优化', type: 'checkbox', default: true, price: 3000 },
                { name: '多语言支持', type: 'checkbox', default: false, price: 5000 }
            ]
        },
        server: {
            name: '服务器出租',
            basePrice: 500,
            options: [
                { name: 'CPU核心数', type: 'select', items: ['4核', '8核', '16核', '32核'], prices: [500, 800, 1200, 2000] },
                { name: '内存容量', type: 'select', items: ['8GB', '16GB', '32GB', '64GB'], prices: [300, 500, 800, 1200] },
                { name: '存储容量', type: 'select', items: ['500GB', '1TB', '2TB', '5TB'], prices: [200, 400, 800, 1500] },
                { name: '带宽', type: 'select', items: ['10Mbps', '50Mbps', '100Mbps', '1Gbps'], prices: [100, 300, 500, 1000] },
                { name: '托管时长', type: 'select', items: ['1个月', '3个月', '6个月', '12个月'], prices: [1, 0.95, 0.9, 0.85] }
            ]
        },
        vps: {
            name: 'VPS租用',
            basePrice: 100,
            options: [
                { name: '套餐类型', type: 'select', items: ['基础版', '标准版', '专业版', '企业版'], prices: [100, 200, 400, 800] },
                { name: '操作系统', type: 'select', items: ['CentOS', 'Ubuntu', 'Windows Server'], prices: [0, 0, 100] },
                { name: '备份服务', type: 'checkbox', default: false, price: 50 },
                { name: 'DDoS防护', type: 'checkbox', default: true, price: 100 },
                { name: '使用时长', type: 'select', items: ['1个月', '3个月', '6个月', '12个月'], prices: [1, 0.95, 0.9, 0.85] }
            ]
        },
        email: {
            name: '企业邮箱',
            basePrice: 50,
            options: [
                { name: '用户数量', type: 'number', min: 5, max: 500, default: 10, pricePer: 50 },
                { name: '存储空间', type: 'select', items: ['5GB/用户', '10GB/用户', '50GB/用户', '无限存储'], prices: [0, 20, 50, 100] },
                { name: '反垃圾邮件', type: 'checkbox', default: true, price: 10 },
                { name: '邮件加密', type: 'checkbox', default: false, price: 30 },
                { name: '移动设备支持', type: 'checkbox', default: true, price: 20 }
            ]
        },
        maintenance: {
            name: '网络运维',
            basePrice: 2000,
            options: [
                { name: '服务等级', type: 'select', items: ['基础', '标准', '专业', '企业'], prices: [2000, 3500, 5000, 8000] },
                { name: '响应时间', type: 'select', items: ['4小时', '2小时', '1小时', '30分钟'], prices: [0, 500, 1000, 2000] },
                { name: '设备数量', type: 'number', min: 10, max: 500, default: 50, pricePer: 50 },
                { name: '月度巡检', type: 'checkbox', default: true, price: 500 },
                { name: '紧急支持', type: 'checkbox', default: true, price: 1000 }
            ]
        },
        security: {
            name: '监控安防',
            basePrice: 3000,
            options: [
                { name: '监控范围', type: 'select', items: ['基础监控', '全面监控', '深度监控'], prices: [3000, 5000, 8000] },
                { name: '摄像头数量', type: 'number', min: 4, max: 100, default: 16, pricePer: 200 },
                { name: '存储时长', type: 'select', items: ['7天', '30天', '90天', '365天'], prices: [500, 1000, 2000, 4000] },
                { name: '智能分析', type: 'checkbox', default: false, price: 3000 },
                { name: '云端备份', type: 'checkbox', default: true, price: 1000 }
            ]
        }
    };

    let selectedServices = {};

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const service = this.dataset.service;
            
            if (this.checked) {
                selectedServices[service] = {
                    basePrice: serviceConfigs[service].basePrice,
                    options: {}
                };
                showConfigOptions(service);
            } else {
                delete selectedServices[service];
                if (Object.keys(selectedServices).length === 0) {
                    configOptions.innerHTML = '<div class="text-gray-400 text-center py-8">请先选择服务以查看配置选项</div>';
                }
            }
            
            updateQuote();
        });
    });

    function showConfigOptions(service) {
        const config = serviceConfigs[service];
        let html = `<h5 class="text-lg font-semibold text-white mb-4">${config.name} 配置</h5>`;
        
        config.options.forEach((option, index) => {
            html += `<div class="mb-4">`;
            html += `<label class="block text-sm font-medium text-gray-300 mb-2">${option.name}</label>`;
            
            if (option.type === 'select') {
                html += `<select class="config-select w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none" data-service="${service}" data-option="${index}">`;
                option.items.forEach((item, itemIndex) => {
                    const selected = itemIndex === 0 ? 'selected' : '';
                    html += `<option value="${itemIndex}" ${selected}>${item}</option>`;
                });
                html += `</select>`;
            } else if (option.type === 'checkbox') {
                const checked = option.default ? 'checked' : '';
                html += `<label class="flex items-center">
                    <input type="checkbox" class="config-checkbox mr-3" data-service="${service}" data-option="${index}" ${checked}>
                    <span class="text-white">启用</span>
                </label>`;
            } else if (option.type === 'number') {
                html += `<input type="number" min="${option.min}" max="${option.max}" value="${option.default}" class="config-number w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none" data-service="${service}" data-option="${index}">`;
            }
            
            html += `</div>`;
        });
        
        configOptions.innerHTML = html;
        
        // Add event listeners for config options
        configOptions.querySelectorAll('.config-select, .config-checkbox, .config-number').forEach(element => {
            element.addEventListener('change', function() {
                updateServiceConfig(service);
                updateQuote();
            });
        });
        
        // Initialize default config
        updateServiceConfig(service);
    }

    function updateServiceConfig(service) {
        const config = serviceConfigs[service];
        selectedServices[service].options = {};
        
        config.options.forEach((option, index) => {
            const element = configOptions.querySelector(`[data-service="${service}"][data-option="${index}"]`);
            
            if (option.type === 'select') {
                selectedServices[service].options[index] = parseInt(element.value);
            } else if (option.type === 'checkbox') {
                selectedServices[service].options[index] = element.checked;
            } else if (option.type === 'number') {
                selectedServices[service].options[index] = parseInt(element.value);
            }
        });
    }

    function updateQuote() {
        let html = '';
        let total = 0;
        
        Object.keys(selectedServices).forEach(service => {
            const config = serviceConfigs[service];
            const serviceData = selectedServices[service];
            let serviceTotal = config.basePrice;
            
            html += `<div class="border-b border-gray-600 pb-3 mb-3">`;
            html += `<div class="flex justify-between items-center mb-2">`;
            html += `<span class="text-white font-semibold">${config.name}</span>`;
            html += `<span class="text-blue-400">¥${config.basePrice.toLocaleString()}</span>`;
            html += `</div>`;
            
            // Calculate option prices
            Object.keys(serviceData.options).forEach(optionIndex => {
                const option = config.options[optionIndex];
                const value = serviceData.options[optionIndex];
                
                if (option.type === 'select') {
                    const multiplier = option.prices[value];
                    if (option.items[value].includes('个月')) {
                        serviceTotal *= multiplier;
                        html += `<div class="text-sm text-gray-400 ml-4">${option.name}: ${option.items[value]}</div>`;
                    } else {
                        serviceTotal += multiplier;
                        html += `<div class="text-sm text-gray-400 ml-4">${option.name}: ${option.items[value]} (+¥${multiplier.toLocaleString()})</div>`;
                    }
                } else if (option.type === 'checkbox' && value) {
                    serviceTotal += option.price;
                    html += `<div class="text-sm text-gray-400 ml-4">${option.name}: +¥${option.price.toLocaleString()}</div>`;
                } else if (option.type === 'number') {
                    const optionTotal = value * option.pricePer;
                    serviceTotal += optionTotal;
                    html += `<div class="text-sm text-gray-400 ml-4">${option.name}: ${value}个 (+¥${optionTotal.toLocaleString()})</div>`;
                }
            });
            
            html += `</div>`;
            total += serviceTotal;
        });
        
        if (html === '') {
            html = '<div class="text-gray-400 text-center">暂无选择的服务</div>';
        }
        
        quoteItems.innerHTML = html;
        totalPrice.textContent = `¥${total.toLocaleString()}`;
    }
}

// Monitoring Dashboard
function initializeMonitoringDashboard() {
    // Performance Chart
    const performanceChart = echarts.init(document.getElementById('performance-chart'));
    const performanceOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#3b82f6',
            textStyle: { color: '#fff' }
        },
        legend: {
            data: ['CPU使用率', '内存使用率', '磁盘使用率'],
            textStyle: { color: '#e5e7eb' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#9ca3af' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#9ca3af' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [
            {
                name: 'CPU使用率',
                type: 'line',
                data: [45, 52, 78, 65, 72, 58],
                smooth: true,
                lineStyle: { color: '#3b82f6' },
                itemStyle: { color: '#3b82f6' },
                areaStyle: { color: 'rgba(59, 130, 246, 0.1)' }
            },
            {
                name: '内存使用率',
                type: 'line',
                data: [62, 58, 71, 68, 75, 64],
                smooth: true,
                lineStyle: { color: '#10b981' },
                itemStyle: { color: '#10b981' },
                areaStyle: { color: 'rgba(16, 185, 129, 0.1)' }
            },
            {
                name: '磁盘使用率',
                type: 'line',
                data: [38, 42, 45, 43, 47, 41],
                smooth: true,
                lineStyle: { color: '#f59e0b' },
                itemStyle: { color: '#f59e0b' },
                areaStyle: { color: 'rgba(245, 158, 11, 0.1)' }
            }
        ]
    };
    performanceChart.setOption(performanceOption);

    // Traffic Chart
    const trafficChart = echarts.init(document.getElementById('traffic-chart'));
    const trafficOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#10b981',
            textStyle: { color: '#fff' }
        },
        legend: {
            data: ['入站流量', '出站流量'],
            textStyle: { color: '#e5e7eb' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#9ca3af' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#374151' } },
            axisLabel: { color: '#9ca3af' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [
            {
                name: '入站流量',
                type: 'bar',
                data: [120, 132, 101, 134, 90, 230],
                itemStyle: { color: '#3b82f6' }
            },
            {
                name: '出站流量',
                type: 'bar',
                data: [220, 182, 191, 234, 290, 330],
                itemStyle: { color: '#10b981' }
            }
        ]
    };
    trafficChart.setOption(trafficOption);

    // Update charts periodically
    setInterval(() => {
        // Update performance chart data
        const newCpuData = Array.from({length: 6}, () => Math.floor(Math.random() * 40) + 40);
        const newMemoryData = Array.from({length: 6}, () => Math.floor(Math.random() * 30) + 50);
        const newDiskData = Array.from({length: 6}, () => Math.floor(Math.random() * 20) + 30);
        
        performanceChart.setOption({
            series: [
                { data: newCpuData },
                { data: newMemoryData },
                { data: newDiskData }
            ]
        });

        // Update traffic chart data
        const newInboundData = Array.from({length: 6}, () => Math.floor(Math.random() * 200) + 100);
        const newOutboundData = Array.from({length: 6}, () => Math.floor(Math.random() * 200) + 200);
        
        trafficChart.setOption({
            series: [
                { data: newInboundData },
                { data: newOutboundData }
            ]
        });
    }, 5000);

    // Handle window resize
    window.addEventListener('resize', () => {
        performanceChart.resize();
        trafficChart.resize();
    });
}

// Case Studies Slider
function initializeCaseStudiesSlider() {
    const splide = new Splide('#case-studies-slider', {
        type: 'loop',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        arrows: true,
        pagination: true,
        gap: '2rem'
    });
    
    splide.mount();
}

// Chat Widget
function initializeChatWidget() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // Chat responses
    const responses = [
        '感谢您的咨询！我们的专业团队会尽快为您提供详细的解决方案。',
        '您好！我们提供全方位的IT外包服务，包括网站建设、服务器托管、VPS租用等。',
        '我们的服务价格根据具体需求而定，建议您使用上方的服务配置器获取初步报价。',
        '我们提供7x24小时技术支持，确保您的系统稳定运行。',
        '您好！我们可以为您定制专业的企业网站，包括响应式设计、SEO优化等功能。',
        '我们的服务器托管服务包括99.9%在线保证、24小时监控和专业技术支持。'
    ];

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'bg-blue-600 rounded-lg p-3 mb-3 ml-8';
            userMessage.innerHTML = `<p class="text-sm text-white">${message}</p>`;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Add bot response after delay
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'bg-gray-700 rounded-lg p-3 mb-3';
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                botMessage.innerHTML = `<p class="text-sm text-gray-300">${randomResponse}</p>`;
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Particle Background
function initializeParticleBackground() {
    const container = document.getElementById('particle-container');
    
    // p5.js sketch for particle background
    const sketch = (p) => {
        let particles = [];
        const numParticles = 50;
        
        p.setup = () => {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 4)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(59, 130, 246, 100);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
                
                // Draw connections
                particles.forEach((other, j) => {
                    if (i !== j) {
                        const distance = p.dist(particle.x, particle.y, other.x, other.y);
                        if (distance < 100) {
                            const alpha = p.map(distance, 0, 100, 50, 0);
                            p.stroke(59, 130, 246, alpha);
                            p.strokeWeight(0.5);
                            p.line(particle.x, particle.y, other.x, other.y);
                        }
                    }
                });
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    };
    
    new p5(sketch);
}

// Form submission handling
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        
        // Show success message
        const button = e.target.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = '提交中...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '提交成功！';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                e.target.reset();
            }, 2000);
        }, 1500);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('bg-gray-900/95');
        nav.classList.remove('bg-gray-900/80');
    } else {
        nav.classList.add('bg-gray-900/80');
        nav.classList.remove('bg-gray-900/95');
    }
});