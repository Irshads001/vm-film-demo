/* ============================================
   VM FILM — Premium Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Preloader (Fast & Snappy) ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 800);
    });
    // Fallback: hide preloader after 2.5s regardless
    setTimeout(() => preloader.classList.add('loaded'), 2500);

    // === Custom Cursor ===
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (window.matchMedia('(pointer: fine)').matches && cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects for interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .portfolio-card, .service-card, .deliverable-card, .addon-card, .filter-btn');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar background
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // === Mobile Menu ===
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // === Reveal on Scroll (Intersection Observer) ===
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // === Animated Counter ===
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        
        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        update();
    }

    // === Portfolio Tabs (Свадебный клип / Backstage) ===
    const tabBtns = document.querySelectorAll('.portfolio-tab-pill-btn');
    const tabPanes = document.querySelectorAll('.portfolio-tab-pane');
    const portfolioTag = document.getElementById('portfolioTag');
    const portfolioTitle = document.getElementById('portfolioTitle');
    const portfolioDesc = document.getElementById('portfolioDesc');

    const tabHeaderData = {
        clips: {
            tag: 'Свадебный клип',
            title: 'Так может выглядеть <em>ваш свадебный клип</em>',
            desc: 'Каждый проект — это уникальная история, рассказанная через объектив кинокамеры'
        },
        backstage: {
            tag: 'Съемочный процесс',
            title: 'Съемочный процесс <em>&amp; Backstage</em>',
            desc: 'Как создается магия кино: постановочные кадры и атмосфера со съемочной площадки'
        }
    };

    function switchPortfolioTab(tabKey) {
        if (!tabHeaderData[tabKey]) return;

        // Update active tab buttons
        tabBtns.forEach(btn => {
            const isActive = btn.getAttribute('data-tab') === tabKey;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update active tab panes
        tabPanes.forEach(pane => {
            const isTarget = pane.id === (tabKey === 'clips' ? 'paneClips' : 'paneBackstage');
            if (isTarget) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
                // Pause any playing videos in the hidden pane
                pane.querySelectorAll('.portfolio-card-video').forEach(vid => {
                    vid.pause();
                });
            }
        });

        // Smoothly update section header text
        if (portfolioTitle && tabHeaderData[tabKey]) {
            const data = tabHeaderData[tabKey];
            portfolioTitle.style.opacity = '0';
            portfolioTitle.style.transform = 'translateY(-6px)';
            
            setTimeout(() => {
                if (portfolioTag) portfolioTag.textContent = data.tag;
                portfolioTitle.innerHTML = data.title;
                if (portfolioDesc) portfolioDesc.textContent = data.desc;
                portfolioTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                portfolioTitle.style.opacity = '1';
                portfolioTitle.style.transform = 'translateY(0)';
            }, 160);
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabKey = btn.getAttribute('data-tab');
            switchPortfolioTab(tabKey);
        });
    });

    // === Contact Form & Telegram Integration ===
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formDate = document.getElementById('formDate');

    // Restrict date input to today onwards
    if (formDate) {
        formDate.min = new Date().toISOString().split('T')[0];
    }

    // Telegram settings (Recipients: Vadik 934307310 & Irshad 1804962526)
    const TELEGRAM_CONFIG = {
        botToken: '8967900034:AAGXr8LCggfdQ-Xd6gTsvZEoonvQWCB6G_M', // Telegram bot token
        chatIds: ['934307310', '1804962526'],                        // Client & Admin Telegram Chat IDs
        username: 'vadiqqqqqq'
    };

    const serviceLabels = {
        wedding: 'Свадебная съемка',
        lovestory: 'Love Story',
        commercial: 'Реклама / Промо',
        reels: 'Reels / Контент',
        drone: 'Аэросъемка',
        other: 'Другое'
    };

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;

            const name = document.getElementById('formName')?.value.trim() || '';
            const phone = document.getElementById('formPhone')?.value.trim() || '';
            const serviceVal = document.getElementById('formService')?.value || '';
            const serviceText = serviceLabels[serviceVal] || serviceVal || 'Не указана';
            const date = formDate?.value || 'Не указана';
            const message = document.getElementById('formMessage')?.value.trim() || '—';

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Отправка заявки...</span>';
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }

            const tgMessage = `🎬 <b>Новая заявка с сайта VM Film!</b>\n\n` +
                `👤 <b>Имя:</b> ${escapeHtml(name)}\n` +
                `📞 <b>Телефон / TG:</b> ${escapeHtml(phone)}\n` +
                `🎥 <b>Услуга:</b> ${escapeHtml(serviceText)}\n` +
                `📅 <b>Дата:</b> ${escapeHtml(date)}\n` +
                `💬 <b>Комментарий:</b> ${escapeHtml(message)}\n\n` +
                `🕒 <i>${new Date().toLocaleString('ru-RU')}</i>`;

            const directTgText = encodeURIComponent(
                `Здравствуйте, Вадик! Заявка с сайта:\nИмя: ${name}\nТелефон: ${phone}\nУслуга: ${serviceText}\nДата: ${date}\nСообщение: ${message}`
            );
            const directTgUrl = `https://t.me/${TELEGRAM_CONFIG.username}?text=${directTgText}`;

            try {
                if (!TELEGRAM_CONFIG.botToken || TELEGRAM_CONFIG.botToken === 'YOUR_BOT_TOKEN_HERE') {
                    throw new Error('NO_BOT_TOKEN');
                }

                // Send to all registered recipients
                const requests = TELEGRAM_CONFIG.chatIds.map(chatId =>
                    fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: tgMessage,
                            parse_mode: 'HTML'
                        })
                    }).then(res => res.json()).catch(err => ({ ok: false, error: err }))
                );

                const responses = await Promise.all(requests);
                const hasSuccess = responses.some(res => res.ok);

                if (hasSuccess) {
                    submitBtn.innerHTML = '<span>Отправлено! ✓</span>';
                    submitBtn.style.background = '#4CAF50';

                    if (formStatus) {
                        formStatus.className = 'form-status success';
                        formStatus.innerHTML = '✓ Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.';
                        formStatus.style.display = 'block';
                    }

                    contactForm.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 4000);
                } else {
                    const firstError = responses[0]?.description || 'API_ERROR';
                    throw new Error(firstError);
                }
            } catch (err) {
                console.warn('Telegram API submission note:', err.message);

                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;

                if (formStatus) {
                    formStatus.className = 'form-status error';
                    formStatus.innerHTML = `Не удалось отправить автоматически. <a href="${directTgUrl}" target="_blank">Нажмите здесь, чтобы отправить напрямую в Telegram @${TELEGRAM_CONFIG.username}</a>`;
                    formStatus.style.display = 'block';
                }
            }
        });
    }

    // === Hero Sound Toggle ===
    const heroSoundBtn = document.getElementById('heroSoundBtn');
    const heroVideo = document.querySelector('.hero-bg-video');

    if (heroSoundBtn && heroVideo) {
        const iconMuted = heroSoundBtn.querySelector('.icon-muted');
        const iconUnmuted = heroSoundBtn.querySelector('.icon-unmuted');
        const soundText = heroSoundBtn.querySelector('.sound-text');

        heroSoundBtn.addEventListener('click', () => {
            if (heroVideo.muted) {
                heroVideo.muted = false;
                heroVideo.play().catch(() => {});
                heroSoundBtn.classList.add('active');
                if (iconMuted) iconMuted.style.display = 'none';
                if (iconUnmuted) iconUnmuted.style.display = 'block';
                if (soundText) soundText.textContent = 'Без звука';
                heroSoundBtn.setAttribute('title', 'Выключить звук');
            } else {
                heroVideo.muted = true;
                heroSoundBtn.classList.remove('active');
                if (iconMuted) iconMuted.style.display = 'block';
                if (iconUnmuted) iconUnmuted.style.display = 'none';
                if (soundText) soundText.textContent = 'Звук';
                heroSoundBtn.setAttribute('title', 'Включить звук');
            }
        });
    }

    // === Parallax Effect on Hero Media ===
    const heroBgMedia = document.querySelector('.hero-bg-img, .hero-bg-video');
    
    if (heroBgMedia) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroBgMedia.style.transform = `scale(${1.02 + scrollY * 0.00015}) translateY(${scrollY * 0.12}px)`;
            }
        }, { passive: true });
    }

    // === Portfolio Card Tilt Effect (Smooth rAF Throttled) ===
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        let rafId = null;
        let rect = null;

        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
            card.style.transition = 'none';
        });

        card.addEventListener('mousemove', (e) => {
            if (!rect) rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            if (rafId) cancelAnimationFrame(rafId);
            rect = null;
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // === Service & Package Cards Hover Glow (Smooth rAF) ===
    const serviceCards = document.querySelectorAll('.service-card, .deliverable-card, .addon-card');
    
    serviceCards.forEach(card => {
        let glowRaf = null;
        let rect = null;

        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
            if (!rect) rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (glowRaf) cancelAnimationFrame(glowRaf);
            glowRaf = requestAnimationFrame(() => {
                card.style.setProperty('--glow-x', `${x}px`);
                card.style.setProperty('--glow-y', `${y}px`);
            });
        });

        card.addEventListener('mouseleave', () => {
            if (glowRaf) cancelAnimationFrame(glowRaf);
            rect = null;
        });
    });

    // === Video Hover Preview for Portfolio Cards ===
    portfolioCards.forEach(card => {
        const video = card.querySelector('.portfolio-card-video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                if (video.readyState >= 2) {
                    try {
                        video.currentTime = 0;
                    } catch (e) {}
                }
            });
        }
    });

    // Warm-up portfolio videos as user approaches portfolio section
    const portfolioSec = document.getElementById('portfolio');
    if (portfolioSec) {
        const warmObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    portfolioCards.forEach(card => {
                        const vid = card.querySelector('.portfolio-card-video');
                        if (vid && vid.readyState < 2) {
                            vid.load();
                        }
                    });
                    warmObserver.disconnect();
                }
            });
        }, { rootMargin: '300px 0px' });
        warmObserver.observe(portfolioSec);
    }

    // === Video Lightbox Modal ===
    const videoModal = document.getElementById('videoModal');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');
    const videoModalClose = document.getElementById('videoModalClose');
    const videoModalBackdrop = document.getElementById('videoModalBackdrop');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoModalCategory = document.getElementById('videoModalCategory');

    function openVideoModal(videoSrc, title, category) {
        if (!videoModal || !modalVideoPlayer) return;
        
        if (videoModalTitle) videoModalTitle.textContent = title || 'Видео VM Film';
        if (videoModalCategory) videoModalCategory.textContent = category || 'Портфолио';
        
        // Mute hero video if currently unmuted to avoid overlapping audio
        if (heroVideo && !heroVideo.muted) {
            heroVideo.muted = true;
            if (heroSoundBtn) {
                heroSoundBtn.classList.remove('active');
                const iconMuted = heroSoundBtn.querySelector('.icon-muted');
                const iconUnmuted = heroSoundBtn.querySelector('.icon-unmuted');
                const soundText = heroSoundBtn.querySelector('.sound-text');
                if (iconMuted) iconMuted.style.display = 'block';
                if (iconUnmuted) iconUnmuted.style.display = 'none';
                if (soundText) soundText.textContent = 'Звук';
                heroSoundBtn.setAttribute('title', 'Включить звук');
            }
        }

        modalVideoPlayer.src = videoSrc;
        modalVideoPlayer.currentTime = 0;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        const playPromise = modalVideoPlayer.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.log('Video play info:', err);
            });
        }
    }

    function closeVideoModal() {
        if (!videoModal || !modalVideoPlayer) return;
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        modalVideoPlayer.pause();
        modalVideoPlayer.removeAttribute('src');
        modalVideoPlayer.load();
    }

    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }
    if (videoModalBackdrop) {
        videoModalBackdrop.addEventListener('click', closeVideoModal);
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Click on portfolio cards and about video to open modal
    document.querySelectorAll('.portfolio-card, .about-video-wrap').forEach(item => {
        item.addEventListener('click', (e) => {
            const videoSrc = item.getAttribute('data-video');
            const title = item.getAttribute('data-title');
            const category = item.getAttribute('data-category');

            if (videoSrc) {
                e.preventDefault();
                openVideoModal(videoSrc, title, category);
            }
        });
    });

    // ============================================
    // Instagram Story Reviews Carousel & Lightbox
    // ============================================
    const reviewsTrack = document.getElementById('reviewsTrack');
    const reviewsTrackWrapper = document.getElementById('reviewsTrackWrapper');
    const reviewsPrevBtn = document.getElementById('reviewsPrev');
    const reviewsNextBtn = document.getElementById('reviewsNext');
    const reviewsDots = document.getElementById('reviewsDots');
    const reviewCards = document.querySelectorAll('.review-story-card');

    const reviewModal = document.getElementById('reviewModal');
    const reviewModalBackdrop = document.getElementById('reviewModalBackdrop');
    const reviewModalClose = document.getElementById('reviewModalClose');
    const reviewModalImg = document.getElementById('reviewModalImg');
    const reviewModalAuthor = document.getElementById('reviewModalAuthor');
    const reviewModalCategory = document.getElementById('reviewModalCategory');
    const reviewModalPrev = document.getElementById('reviewModalPrev');
    const reviewModalNext = document.getElementById('reviewModalNext');
    const reviewModalCounter = document.getElementById('reviewModalCounter');

    let currentReviewIndex = 0;
    let modalReviewIndex = 0;

    function updateReviewSlider() {
        if (!reviewsTrack || !reviewsTrackWrapper || reviewCards.length === 0) return;

        const cardWidth = reviewCards[0].offsetWidth;
        const style = window.getComputedStyle(reviewsTrack);
        const gap = parseFloat(style.gap) || 24;
        const visibleWidth = reviewsTrackWrapper.offsetWidth;
        const totalWidth = reviewsTrack.scrollWidth;
        const maxScroll = Math.max(0, totalWidth - visibleWidth);

        let targetOffset = currentReviewIndex * (cardWidth + gap);
        if (targetOffset > maxScroll) {
            targetOffset = maxScroll;
        }

        reviewsTrack.style.transform = `translateX(-${targetOffset}px)`;

        if (reviewsPrevBtn) {
            reviewsPrevBtn.disabled = currentReviewIndex === 0;
        }
        if (reviewsNextBtn) {
            reviewsNextBtn.disabled = targetOffset >= maxScroll - 5;
        }

        if (reviewsDots) {
            const dots = reviewsDots.querySelectorAll('.reviews-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentReviewIndex);
            });
        }
    }

    if (reviewsTrack && reviewCards.length > 0) {
        if (reviewsDots) {
            reviewsDots.innerHTML = '';
            reviewCards.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.className = `reviews-dot ${idx === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Отзыв ${idx + 1}`);
                dot.addEventListener('click', () => {
                    currentReviewIndex = idx;
                    updateReviewSlider();
                });
                reviewsDots.appendChild(dot);
            });
        }

        if (reviewsPrevBtn) {
            reviewsPrevBtn.addEventListener('click', () => {
                if (currentReviewIndex > 0) {
                    currentReviewIndex--;
                    updateReviewSlider();
                }
            });
        }

        if (reviewsNextBtn) {
            reviewsNextBtn.addEventListener('click', () => {
                const cardWidth = reviewCards[0].offsetWidth;
                const gap = parseFloat(window.getComputedStyle(reviewsTrack).gap) || 24;
                const maxScroll = reviewsTrack.scrollWidth - reviewsTrackWrapper.offsetWidth;
                if ((currentReviewIndex + 1) * (cardWidth + gap) <= maxScroll + (cardWidth / 2)) {
                    currentReviewIndex++;
                    updateReviewSlider();
                }
            });
        }

        let touchStartX = 0;
        let touchEndX = 0;

        reviewsTrackWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        reviewsTrackWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    if (reviewsNextBtn && !reviewsNextBtn.disabled) {
                        reviewsNextBtn.click();
                    }
                } else {
                    if (reviewsPrevBtn && !reviewsPrevBtn.disabled) {
                        reviewsPrevBtn.click();
                    }
                }
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            updateReviewSlider();
        });

        // Initialize after page elements render
        setTimeout(updateReviewSlider, 100);
    }

    function openReviewModal(index) {
        if (!reviewModal || !reviewCards[index]) return;
        modalReviewIndex = index;
        const card = reviewCards[index];
        const img = card.getAttribute('data-img');
        const author = card.getAttribute('data-author');
        const cat = card.getAttribute('data-cat');

        if (reviewModalImg) reviewModalImg.src = img;
        if (reviewModalAuthor) reviewModalAuthor.textContent = author;
        if (reviewModalCategory) reviewModalCategory.textContent = cat;
        if (reviewModalCounter) reviewModalCounter.textContent = `${index + 1} / ${reviewCards.length}`;

        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeReviewModal() {
        if (!reviewModal) return;
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';
        if (reviewModalImg) reviewModalImg.removeAttribute('src');
    }

    reviewCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            openReviewModal(idx);
        });
    });

    if (reviewModalClose) {
        reviewModalClose.addEventListener('click', closeReviewModal);
    }
    if (reviewModalBackdrop) {
        reviewModalBackdrop.addEventListener('click', closeReviewModal);
    }

    if (reviewModalPrev) {
        reviewModalPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (modalReviewIndex > 0) {
                openReviewModal(modalReviewIndex - 1);
            } else {
                openReviewModal(reviewCards.length - 1);
            }
        });
    }

    if (reviewModalNext) {
        reviewModalNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (modalReviewIndex < reviewCards.length - 1) {
                openReviewModal(modalReviewIndex + 1);
            } else {
                openReviewModal(0);
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (reviewModal && reviewModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeReviewModal();
            } else if (e.key === 'ArrowLeft') {
                if (reviewModalPrev) reviewModalPrev.click();
            } else if (e.key === 'ArrowRight') {
                if (reviewModalNext) reviewModalNext.click();
            }
        }
    });

});
