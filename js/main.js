// ==========================================
// MOBILE DEVICE DETECTION
// ==========================================

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || (window.innerWidth <= 768);
};

const isTouch = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

// ==========================================
// GAME LOADER
// ==========================================

const gameFrame = document.getElementById('game-frame');
const gameLoader = document.querySelector('.game-loader');
const mobileWarning = document.getElementById('mobile-warning');

// Show mobile warning on mobile devices
if (isMobile() || isTouch()) {
    if (mobileWarning) {
        mobileWarning.style.display = 'block';
    }

    // Log for debugging
    console.log('Mobile device detected');
}

// Enhanced game loading
if (gameFrame && gameLoader) {
    let loadTimeout;
    let hasLoaded = false;

    // Hide loader when iframe loads
    gameFrame.addEventListener('load', () => {
        hasLoaded = true;
        clearTimeout(loadTimeout);

        // 延迟隐藏加载器，给游戏更多时间初始化
        setTimeout(() => {
            gameLoader.style.opacity = '0';
            setTimeout(() => {
                gameLoader.style.display = 'none';
            }, 500);
        }, 2000); // 2秒后才隐藏，确保游戏已完全加载
    });

    // Fallback: Hide loader after timeout
    loadTimeout = setTimeout(() => {
        if (!hasLoaded) {
            gameLoader.innerHTML = `
                <div class="spinner"></div>
                <p style="color: #ff6b35; font-size: 1.2rem; font-weight: 600;">⚠️ 游戏加载时间较长</p>
                <p style="color: #a0a0a0; font-size: 1rem; margin-top: 10px;">请稍候或点击上方"在新窗口打开游戏"</p>
            `;

            // Still hide after showing message
            setTimeout(() => {
                gameLoader.style.opacity = '0';
                setTimeout(() => {
                    gameLoader.style.display = 'none';
                }, 500);
            }, 5000); // 再等5秒
        }
    }, 15000); // 15秒超时（增加时间）

    // Error handling
    gameFrame.addEventListener('error', () => {
        console.error('Failed to load game iframe');
        if (gameLoader) {
            gameLoader.innerHTML = `
                <p style="color: #ff6b35;">⚠️ 游戏加载失败</p>
                <p style="color: #a0a0a0; font-size: 0.9rem;">请使用下方备用链接</p>
            `;
        }

        // Show mobile warning if not already visible
        if (mobileWarning) {
            mobileWarning.style.display = 'block';
        }
    });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// HEADER BACKGROUND ON SCROLL
// ==========================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// ==========================================
// GAME LOADER
// ==========================================

const gameFrame = document.getElementById('game-frame');
const gameLoader = document.querySelector('.game-loader');

if (gameFrame && gameLoader) {
    gameFrame.addEventListener('load', () => {
        // Hide loader after game iframe loads
        setTimeout(() => {
            gameLoader.style.opacity = '0';
            setTimeout(() => {
                gameLoader.style.display = 'none';
            }, 300);
        }, 1000);
    });

    // Fallback: Hide loader after 5 seconds regardless
    setTimeout(() => {
        if (gameLoader.style.display !== 'none') {
            gameLoader.style.opacity = '0';
            setTimeout(() => {
                gameLoader.style.display = 'none';
            }, 300);
        }
    }, 5000);
}

// ==========================================
// LAZY LOADING FOR GAME IFRAME
// ==========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const gameObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            // Ensure iframe loads when visible (already has src, just observe)
            console.log('Game section is now visible');
            gameObserver.unobserve(iframe);
        }
    });
}, observerOptions);

// Observe game iframe container instead of iframe itself
const gameContainer = document.querySelector('.game-wrapper');
if (gameContainer) {
    gameObserver.observe(gameContainer);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observeElements = document.querySelectorAll('.feature-card, .step, .faq-item');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// ==========================================
// FAQ ACCORDION (OPTIONAL ENHANCEMENT)
// ==========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Initially show all answers (static FAQ)
    // If you want collapsible FAQs, uncomment below:

    /*
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease';

    question.style.cursor = 'pointer';
    question.addEventListener('click', () => {
        const isOpen = answer.style.maxHeight !== '0px';

        if (isOpen) {
            answer.style.maxHeight = '0';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
    */
});

// ==========================================
// PAGE VISIBILITY TRACKING (for analytics)
// ==========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the page');
        // You can add analytics tracking here
    } else {
        console.log('User returned to the page');
        // You can add analytics tracking here
    }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Preload critical images
const preloadImages = () => {
    const imagesToPreload = [
        // Add image paths here when you have actual game screenshots
        // '/images/og-image.jpg',
        // '/images/game-screenshot.jpg'
    ];

    imagesToPreload.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Call preload when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================

// Allow Enter key to trigger button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================

const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;

            // Extract number from text like "1M+" or "4.7★"
            // This is a simplified version - adjust based on your needs

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// ERROR HANDLING FOR GAME IFRAME
// ==========================================

if (gameFrame) {
    gameFrame.addEventListener('error', () => {
        console.error('Failed to load game iframe');
        if (gameLoader) {
            gameLoader.innerHTML = '<p style="color: #ff6b35;">⚠️ Failed to load game. Please refresh the page.</p>';
        }
    });
}

// ==========================================
// COPY TO CLIPBOARD (for sharing)
// ==========================================

const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            textArea.remove();
            return Promise.resolve();
        } catch (error) {
            textArea.remove();
            return Promise.reject(error);
        }
    }
};

// ==========================================
// SOCIAL SHARING
// ==========================================

const shareGame = (platform) => {
    const url = window.location.href;
    const title = 'Play Sunset Bike Racing - Free Online Motocross Game';
    const text = 'Check out this awesome motocross racing game!';

    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`
    };

    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
};

// Web Share API (for mobile)
const shareNative = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Sunset Bike Racing',
                text: 'Check out this awesome motocross racing game!',
                url: window.location.href
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    }
};

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%c🏍️ Sunset Bike Racing', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
console.log('%cWelcome to the console! 🎮', 'font-size: 14px; color: #f7931e;');
console.log('%cAre you a developer? Check out our code on GitHub!', 'font-size: 12px; color: #6c63ff;');

// ==========================================
// INITIALIZE APP
// ==========================================

const init = () => {
    console.log('🎮 Sunset Bike Racing initialized successfully!');

    // Add any initialization code here
    // For example: load saved game preferences, initialize analytics, etc.
};

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}