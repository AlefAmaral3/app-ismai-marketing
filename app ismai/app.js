/**
 * App.js - Lógica Principal
 * Gerencia navegação, autenticação e interações
 */

// ===== NAVEGAÇÃO SPLASH =====
function goToLogin() {
    document.getElementById('splash').classList.remove('active');
    document.getElementById('login').classList.add('active');
}

// ===== VARIÁVEIS DE ESTADO DE FILTROS =====
let examFilter = 'all';
let announcementFilter = 'all';

// ===== MODAL DE CONFIRMAÇÃO =====
function closeConfirmModal() {
    const overlay = document.getElementById('confirmModal');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
}

function confirmDialog({ title = 'Confirmar ação', message = 'Tem a certeza?', confirmText = 'Confirmar', cancelText = 'Cancelar' } = {}) {
    return new Promise(resolve => {
        const overlay = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const msgEl = document.getElementById('confirmMessage');
        const okBtn = document.getElementById('confirmOkBtn');
        const cancelBtn = document.getElementById('confirmCancelBtn');

        if (!overlay || !titleEl || !msgEl || !okBtn || !cancelBtn) {
            // Fallback: resolve true to avoid blocking flows if modal missing
            resolve(true);
            return;
        }

        titleEl.textContent = title;
        msgEl.textContent = message;
        okBtn.textContent = confirmText;
        cancelBtn.textContent = cancelText;

        const onCancel = () => { cleanup(); resolve(false); };
        const onOk = () => { cleanup(); resolve(true); };
        const onKey = (e) => {
            if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
            if (e.key === 'Enter') { e.preventDefault(); onOk(); }
        };

        function cleanup() {
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            document.removeEventListener('keydown', onKey);
            closeConfirmModal();
        }

        cancelBtn.addEventListener('click', onCancel);
        okBtn.addEventListener('click', onOk);
        document.addEventListener('keydown', onKey);

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        okBtn.focus();
    });
}

function startApp(button) {
    if (button) {
        button.disabled = true;
        button.classList.add('loading');
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<span class="spinner"></span> A entrar...';
    }

    setTimeout(() => {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('splash').classList.remove('active');
        document.getElementById('login').classList.add('active');
        document.getElementById('bottomNav').style.display = 'none';
        if (button) {
            button.disabled = false;
            button.classList.remove('loading');
            button.innerHTML = button.dataset.originalText || 'Continuar';
        }
    }, 320);
}

// ===== AUTENTICAÇÃO =====
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    }
}

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameGroup = document.getElementById('usernameGroup');
    const passwordGroup = document.getElementById('passwordGroup');

    usernameGroup.classList.remove('error', 'success');
    passwordGroup.classList.remove('error', 'success');
    loginForm.classList.remove('shake');

    loginBtn.disabled = true;
    loginBtn.classList.add('loading');
    usernameInput.disabled = true;
    passwordInput.disabled = true;

    setTimeout(() => {
        if (VALID_CREDENTIALS[username] && VALID_CREDENTIALS[username] === password) {
            usernameGroup.classList.add('success');
            passwordGroup.classList.add('success');

            localStorage.setItem('userLogged', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('studentName', STUDENT_DATA.name);

            setTimeout(() => {
                document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
                document.getElementById('splash').classList.remove('active');
                document.getElementById('login').classList.remove('active');
                document.getElementById('home').classList.add('active');
                document.getElementById('bottomNav').style.display = 'flex';

                document.getElementById('studentName').textContent = 'João';
                document.getElementById('profileName').textContent = STUDENT_DATA.name;
                document.getElementById('profileNum').textContent = 'Número: ' + username;

                setTimeout(() => {
                    initHomeEntry();
                    initStatsCountUp();
                    loadReadStatus();
                    setupCardInteractions();
                }, 100);

                loginBtn.disabled = false;
                loginBtn.classList.remove('loading');
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                loginForm.reset();
                usernameGroup.classList.remove('success');
                passwordGroup.classList.remove('success');
            }, 300);
        } else {
            passwordGroup.classList.add('error');
            loginForm.classList.add('shake');

            setTimeout(() => {
                loginBtn.disabled = false;
                loginBtn.classList.remove('loading');
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                passwordInput.value = '';
                passwordInput.focus();
            }, 400);
        }
    }, 400);
}

async function logout() {
    const confirmed = await confirmDialog({
        title: 'Terminar sessão',
        message: 'Tem a certeza que deseja terminar a sessão? Poderá voltar a entrar mais tarde.',
        confirmText: 'Terminar',
        cancelText: 'Cancelar'
    });

    if (!confirmed) return;

    localStorage.removeItem('userLogged');
    localStorage.removeItem('username');
    localStorage.removeItem('studentName');
    sessionStorage.clear();

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('login').classList.add('active');
    document.getElementById('bottomNav').style.display = 'none';

    document.getElementById('loginForm').reset();
}

// ===== TEMA =====
function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
        const isDark = document.documentElement.classList.contains('dark-mode');
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// ===== HOME INTERACTIONS =====

function initHomeEntry() {
    const homeScreen = document.getElementById('home');
    if (!homeScreen || !homeScreen.classList.contains('active')) return;

    if (homeScreen.classList.contains('first-entry')) {
        setTimeout(() => {
            homeScreen.classList.remove('first-entry');
        }, 1000);
    }
}

function animateCountUp(element, target, duration, isPercentage = false) {
    const startTime = performance.now();
    const startValue = 0;
    const targetValue = parseFloat(target);

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (targetValue - startValue) * easeOut;
        
        if (isPercentage) {
            element.textContent = Math.round(currentValue) + '%';
        } else {
            element.textContent = currentValue.toFixed(1);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function initStatsCountUp() {
    const hasAnimated = sessionStorage.getItem('statsAnimated');
    if (hasAnimated) {
        document.querySelectorAll('.stat-value').forEach(el => {
            const target = el.getAttribute('data-target');
            if (target) {
                el.textContent = target.includes('%') ? target : target;
            }
        });
        return;
    }

    setTimeout(() => {
        const statMedia = document.querySelector('#statMedia .stat-value');
        const statPresenca = document.querySelector('#statPresenca .stat-value');

        if (statMedia) {
            animateCountUp(statMedia, 8.5, 500, false);
        }

        if (statPresenca) {
            animateCountUp(statPresenca, 95, 500, true);
        }

        sessionStorage.setItem('statsAnimated', 'true');
    }, 600);
}

// ===== COMUNICADOS =====

function markAsRead(newsItem) {
    const itemId = newsItem.getAttribute('data-id');
    if (!itemId) return;

    newsItem.classList.remove('unread');
    
    const readItems = JSON.parse(localStorage.getItem('readComunicados') || '[]');
    if (!readItems.includes(itemId)) {
        readItems.push(itemId);
        localStorage.setItem('readComunicados', JSON.stringify(readItems));
    }
}

function loadReadStatus() {
    const readItems = JSON.parse(localStorage.getItem('readComunicados') || '[]');
    document.querySelectorAll('.news-item').forEach(item => {
        const itemId = item.getAttribute('data-id');
        if (readItems.includes(itemId)) {
            item.classList.remove('unread');
        }
    });
}

// ===== INTERAÇÕES DOS CARDS =====

function setupCardInteractions() {
    const cards = document.querySelectorAll('.card, .stat-card, .news-item');
    
    cards.forEach(card => {
        let touchStartTime;

        card.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = 'scale(0.97)';
        }, { passive: true });

        card.addEventListener('touchend', (e) => {
            card.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'scale(1)';

            if (card.classList.contains('news-item')) {
                const touchDuration = Date.now() - touchStartTime;
                if (touchDuration < 300) {
                    markAsRead(card);
                }
            }
        }, { passive: true });

        card.addEventListener('touchcancel', () => {
            card.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'scale(1)';
        });
    });
}

// ===== NAVEGAÇÃO ENTRE TABS =====

function switchTab(tabId) {
    enhancedSwitchTab(tabId);
}

function enhancedSwitchTab(tabId) {
    const currentScreen = document.querySelector('.screen.active');
    const targetScreen = document.getElementById(tabId);

    if (!targetScreen || targetScreen === currentScreen) return;

    if (currentScreen) {
        currentScreen.style.opacity = '0.5';
        currentScreen.style.transition = 'opacity 0.1s ease-out';
    }

    setTimeout(() => {
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.style.opacity = '';
            s.style.transition = '';
        });
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

        targetScreen.classList.add('active');
        const navItem = document.querySelector(`.nav-item[onclick*="'${tabId}'"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        targetScreen.style.opacity = '1';
    }, 100);
}

// ===== INICIALIZAÇÃO =====

window.addEventListener('load', function() {
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark-mode');
    updateThemeButton();

    localStorage.removeItem('userLogged');
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('splash').classList.add('active');
    document.getElementById('bottomNav').style.display = 'none';
});

// ===== CALENDÁRIO =====

// Estado do calendário
let calendarState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    view: 'month',
    selectedDate: new Date()
};

// Inicializar calendário quando o ecrã fica visível
function initCalendarIfNeeded() {
    const calendarScreen = document.getElementById('calendario');
    if (calendarScreen && calendarScreen.classList.contains('active')) {
        renderCalendar();
    }
}

// Alterar vista (Dia, Semana, Mês)
function switchCalendarView(view) {
    calendarState.view = view;
    
    // Atualizar botões de vista
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
    
    // Mostrar/ocultar vistas
    document.querySelectorAll('.calendar-view').forEach(v => v.classList.remove('active'));
    const viewMap = { month: 'monthView', week: 'weekView', day: 'dayView' };
    document.getElementById(viewMap[view]).classList.add('active');
    
    renderCalendar();
}

// Navegação do calendário (próximo, anterior, hoje)
function navigateCalendar(direction) {
    if (direction === 'prev') {
        calendarState.month--;
        if (calendarState.month < 0) {
            calendarState.month = 11;
            calendarState.year--;
        }
    } else if (direction === 'next') {
        calendarState.month++;
        if (calendarState.month > 11) {
            calendarState.month = 0;
            calendarState.year++;
        }
    } else if (direction === 'today') {
        const today = new Date();
        calendarState.year = today.getFullYear();
        calendarState.month = today.getMonth();
    }
    
    renderCalendar();
}

// Renderizar calendário (dispatcher)
function renderCalendar() {
    updateCalendarTitle();
    
    if (calendarState.view === 'month') {
        renderMonthView();
    } else if (calendarState.view === 'week') {
        renderWeekView();
    } else if (calendarState.view === 'day') {
        renderDayView();
    }
}

// Atualizar título do calendário
function updateCalendarTitle() {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('calendarTitle').textContent = 
        `${months[calendarState.month]} ${calendarState.year}`;
}

// Vista de Mês
function renderMonthView() {
    const days = generateCalendarDays(calendarState.year, calendarState.month);
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    days.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        if (!day) {
            dayCell.classList.add('empty');
        } else {
            dayCell.textContent = day.day;
            
            if (day.isToday) dayCell.classList.add('today');
            if (day.isHoliday) dayCell.classList.add('holiday');
            
            if (day.hasClasses) dayCell.classList.add('has-classes');
            if (day.hasExams) dayCell.classList.add('has-exams');
            
            // Adicionar indicadores visuais
            if (day.hasClasses || day.hasExams) {
                const indicators = document.createElement('div');
                indicators.className = 'day-indicators';
                
                if (day.hasClasses) {
                    const classIndicator = document.createElement('div');
                    classIndicator.className = 'indicator class-indicator';
                    classIndicator.title = 'Aulas';
                    indicators.appendChild(classIndicator);
                }
                
                if (day.hasExams) {
                    const examIndicator = document.createElement('div');
                    examIndicator.className = 'indicator exam-indicator';
                    examIndicator.title = 'Exame';
                    indicators.appendChild(examIndicator);
                }
                
                dayCell.appendChild(indicators);
            }
            
            dayCell.addEventListener('click', () => {
                calendarState.selectedDate = new Date(day.date);
                switchCalendarView('day');
            });
        }
        
        grid.appendChild(dayCell);
    });
}

// Vista de Semana
function renderWeekView() {
    const today = new Date(calendarState.year, calendarState.month, 1);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    
    const container = document.getElementById('weekContainer');
    container.innerHTML = '';
    
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        daysOfWeek.push(date);
    }
    
    const weekGrid = document.createElement('div');
    weekGrid.className = 'week-grid';
    
    daysOfWeek.forEach(date => {
        const dateStr = date.toISOString().split('T')[0];
        const events = getDayEvents(dateStr);
        
        const dayCard = document.createElement('div');
        dayCard.className = 'week-day-card';
        
        const isToday = new Date().toDateString() === date.toDateString();
        if (isToday) dayCard.classList.add('today');
        
        const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][date.getDay()];
        const dayNum = date.getDate();
        
        dayCard.innerHTML = `
            <div class="week-day-header">
                <div class="week-day-name">${dayName}</div>
                <div class="week-day-num">${dayNum}</div>
            </div>
            <div class="week-day-events" id="events-${dateStr}">
                ${events.length === 0 ? '<div class="no-events">Sem eventos</div>' : ''}
            </div>
        `;
        
        // Adicionar eventos
        const eventsContainer = dayCard.querySelector(`#events-${dateStr}`);
        if (events.length > 0) {
            eventsContainer.innerHTML = '';
            events.forEach(event => {
                const eventEl = createEventElement(event);
                eventsContainer.appendChild(eventEl);
            });
        }
        
        weekGrid.appendChild(dayCard);
    });
    
    container.appendChild(weekGrid);
}

// Vista de Dia
function renderDayView() {
    const selectedDate = calendarState.selectedDate;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const events = getDayEvents(dateStr);
    
    const container = document.getElementById('dayContainer');
    const dayName = selectedDate.toLocaleDateString('pt-PT', { weekday: 'long' });
    const dayFullDate = selectedDate.toLocaleDateString('pt-PT', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    container.innerHTML = `
        <div class="day-header">
            <div class="day-date">
                <div class="day-name">${dayName}</div>
                <div class="day-full">${dayFullDate}</div>
            </div>
        </div>
        <div class="day-events-list" id="dayEventsList">
            ${events.length === 0 ? '<div class="no-events">Sem eventos neste dia</div>' : ''}
        </div>
    `;
    
    if (events.length > 0) {
        const eventsList = container.querySelector('#dayEventsList');
        eventsList.innerHTML = '';
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'day-event-card';
            
            if (event.type === 'aula') {
                const course = COURSES[event.courseId];
                if (course) {
                    eventCard.innerHTML = `
                        <div class="event-badge aula">Aula</div>
                        <div class="event-content">
                            <h3>${course.name}</h3>
                            <p><i class="fas fa-user"></i> ${course.professor}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${course.location}</p>
                            <p><i class="fas fa-clock"></i> ${course.schedule}</p>
                        </div>
                    `;
                }
            } else if (event.type === 'exame') {
                const course = COURSES[event.courseId];
                const exam = EXAMS.find(e => e.courseId === event.courseId);
                if (course && exam) {
                    eventCard.innerHTML = `
                        <div class="event-badge exame">Exame</div>
                        <div class="event-content">
                            <h3>${course.name}</h3>
                            <p><i class="fas fa-calendar-check"></i> ${exam.date}</p>
                            <p><i class="fas fa-clock"></i> ${exam.time}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${exam.location}</p>
                        </div>
                    `;
                }
            } else if (event.type === 'feriado') {
                eventCard.innerHTML = `
                    <div class="event-badge feriado">Feriado</div>
                    <div class="event-content">
                        <h3>${event.title || 'Feriado'}</h3>
                    </div>
                `;
            }
            
            eventsList.appendChild(eventCard);
        });
    }
}

// Criar elemento de evento genérico
function createEventElement(event) {
    const el = document.createElement('div');
    el.className = 'event-badge-small';
    
    if (event.type === 'aula') {
        const course = COURSES[event.courseId];
        if (course) {
            el.className += ' aula';
            el.textContent = course.name.split(' ')[0];
            el.title = course.name;
        }
    } else if (event.type === 'exame') {
        const course = COURSES[event.courseId];
        if (course) {
            el.className += ' exame';
            el.textContent = '📝 Exame';
            el.title = course.name;
        }
    } else if (event.type === 'feriado') {
        el.className += ' feriado';
        el.textContent = event.title || 'Feriado';
    }
    
    return el;
}

// Observer para inicializar calendário quando aberto
const screenObserver = new MutationObserver(() => {
    const calendarScreen = document.getElementById('calendario');
    if (calendarScreen && calendarScreen.classList.contains('active')) {
        renderCalendar();
    }
});

window.addEventListener('load', () => {
    const appContent = document.querySelector('.app-content');
    if (appContent) {
        screenObserver.observe(appContent, { 
            attributes: true, 
            subtree: true,
            attributeFilter: ['class']
        });
    }
});

// ===== MODAL DETALHE DISCIPLINA =====

// Estado do modal
let currentCourseDetail = null;
let currentCourseTab = 'contents';

// Abrir modal de detalhe da disciplina
function openCourseDetail(courseId) {
    const course = COURSES[courseId];
    if (!course) return;

    currentCourseDetail = courseId;
    currentCourseTab = 'contents';

    // Preencher dados do modal
    document.getElementById('courseDetailTitle').textContent = course.name;
    document.getElementById('courseDetailProfessor').textContent = course.professor;
    document.getElementById('courseDetailLocation').textContent = course.location;
    document.getElementById('courseDetailTime').textContent = course.schedule;
    document.getElementById('courseDetailCredits').textContent = `${course.credits} ECTS`;
    document.getElementById('courseDetailDescription').textContent = course.description;

    // Resetar abas
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelector('[data-tab="contents"]').classList.add('active');
    document.getElementById('contentsPanel').classList.add('active');

    // Preencher conteúdos
    renderCourseContents(course);
    renderCourseAnnouncements(course);
    renderCourseFeedback(course);

    // Mostrar modal com animação
    const modal = document.getElementById('courseDetailModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeCourseDetail() {
    const modal = document.getElementById('courseDetailModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentCourseDetail = null;
}

// Trocar de aba no modal
function switchCourseTab(tabName) {
    currentCourseTab = tabName;

    // Atualizar botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    // Atualizar painéis
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    const panelMap = {
        'contents': 'contentsPanel',
        'announcements': 'announcementsPanel',
        'feedback': 'feedbackPanel'
    };

    document.getElementById(panelMap[tabName]).classList.add('active');
}

// Renderizar conteúdos
function renderCourseContents(course) {
    const contentsList = document.getElementById('contentsList');
    contentsList.innerHTML = '';

    if (!course.contents || course.contents.length === 0) {
        contentsList.innerHTML = '<div class="empty-state">Sem conteúdos disponíveis</div>';
        return;
    }

    course.contents.forEach(content => {
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';

        let icon = 'fa-file';
        let typeLabel = 'Ficheiro';

        if (content.type === 'pdf') {
            icon = 'fa-file-pdf';
            typeLabel = 'PDF';
        } else if (content.type === 'slides') {
            icon = 'fa-presentation';
            typeLabel = 'Slides';
        } else if (content.type === 'link') {
            icon = 'fa-external-link-alt';
            typeLabel = 'Link';
        }

        const sizeInfo = content.size ? `<span class="content-size">${content.size}</span>` : '';

        if (content.type === 'link') {
            contentItem.innerHTML = `
                <div class="content-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="content-info">
                    <a href="${content.url}" target="_blank" rel="noopener noreferrer" class="content-name">
                        ${content.name} <i class="fas fa-external-link-alt"></i>
                    </a>
                    <span class="content-type">${typeLabel}</span>
                </div>
            `;
        } else {
            contentItem.innerHTML = `
                <div class="content-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="content-info">
                    <div class="content-name">${content.name}</div>
                    <div class="content-meta">
                        <span class="content-type">${typeLabel}</span>
                        ${sizeInfo}
                    </div>
                </div>
                <button class="content-download" onclick="alert('Download de: ${content.name}')">
                    <i class="fas fa-download"></i>
                </button>
            `;
        }

        contentsList.appendChild(contentItem);
    });
}

// Renderizar comunicados
function renderCourseAnnouncements(course) {
    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = '';

    if (!course.announcements || course.announcements.length === 0) {
        announcementsList.innerHTML = '<div class="empty-state">Sem comunicados</div>';
        return;
    }

    course.announcements.forEach(announcement => {
        const announcementItem = document.createElement('div');
        announcementItem.className = 'announcement-item';
        announcementItem.innerHTML = `
            <div class="announcement-header">
                <h4>${announcement.title}</h4>
                <span class="announcement-date">${announcement.date}</span>
            </div>
            <p class="announcement-author">
                <i class="fas fa-user"></i> ${announcement.author}
            </p>
        `;
        announcementsList.appendChild(announcementItem);
    });
}

// Renderizar feedback
function renderCourseFeedback(course) {
    const feedbackContent = document.getElementById('feedbackContent');

    const feedback = course.feedback || {};
    const approval = feedback.approval || 0;
    const studentCount = feedback.studentCount || 0;
    const comments = feedback.comments || '';
    const strengths = feedback.strengths || [];
    const improvements = feedback.improvements || [];

    let strengthsList = '';
    strengths.forEach(strength => {
        strengthsList += `<li><i class="fas fa-check-circle"></i> ${strength}</li>`;
    });

    let improvementsList = '';
    improvements.forEach(improvement => {
        improvementsList += `<li><i class="fas fa-lightbulb"></i> ${improvement}</li>`;
    });

    feedbackContent.innerHTML = `
        <div class="feedback-stats">
            <div class="stat-box">
                <div class="stat-label">Taxa de Aprovação</div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${approval}%"></div>
                </div>
                <div class="stat-value">${approval}%</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Alunos na Turma</div>
                <div class="stat-number">${studentCount}</div>
            </div>
        </div>

        <div class="feedback-comment">
            <h4><i class="fas fa-comment"></i> Comentário do Professor</h4>
            <p>${comments}</p>
        </div>

        ${strengths.length > 0 ? `
        <div class="feedback-section strengths">
            <h4><i class="fas fa-star"></i> Pontos Fortes</h4>
            <ul>
                ${strengthsList}
            </ul>
        </div>
        ` : ''}

        ${improvements.length > 0 ? `
        <div class="feedback-section improvements">
            <h4><i class="fas fa-arrow-up"></i> Áreas de Melhoria</h4>
            <ul>
                ${improvementsList}
            </ul>
        </div>
        ` : ''}
    `;
}

// Fechar modal ao clicar fora
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('courseDetailModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCourseDetail();
            }
        });
    }
});

// ===== FILTROS E ORDENAÇÃO DE LISTAS =====

// Estado dos filtros
let currentFilters = {
    exams: 'all',
    announcements: 'all'
};

// Renderizar notas com ordenação
function renderNotes() {
    const notasContainer = document.getElementById('notasContainer');
    const emptyState = document.getElementById('notasEmptyState');
    const sortValue = document.getElementById('notasSort')?.value || 'date-desc';
    
    let notes = [];
    
    // Construir array de notas a partir de COURSES
    Object.values(COURSES).forEach(course => {
        if (course.note) {
            notes.push({
                courseId: course.id,
                name: course.name,
                note: course.note,
                date: new Date()
            });
        }
    });
    
    // Aplicar ordenação
    notes.sort((a, b) => {
        if (sortValue === 'date-desc') return b.date - a.date;
        if (sortValue === 'date-asc') return a.date - b.date;
        if (sortValue === 'grade-desc') return b.note - a.note;
        if (sortValue === 'grade-asc') return a.note - b.note;
        if (sortValue === 'name') return a.name.localeCompare(b.name);
        return 0;
    });
    
    // Mostrar/ocultar estado vazio
    if (notes.length === 0) {
        notasContainer.innerHTML = '';
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        notasContainer.innerHTML = notes.map(note => `
            <div class="card note-card" onclick="openCourseDetail('${note.courseId}')">
                <h3>${note.name}</h3>
                <div class="note-row">
                    <span class="note-label">Nota</span>
                    <span class="note-value">${note.note}</span>
                </div>
            </div>
        `).join('');
    }
}

function filterAndSortNotes() {
    renderNotes();
}

// Renderizar exames com filtro e ordenação
let currentExamFilter = 'all';

function filterExams(state) {
    currentExamFilter = state;
    filterAndSortExams();
}

function filterAndSortExams() {
    const examesContainer = document.getElementById('examesContainer');
    const emptyState = document.getElementById('examesEmptyState');
    const sortValue = document.getElementById('examesSort')?.value || 'date-asc';
    
    let exams = [...EXAMS];
    
    // Filtrar por estado
    if (currentExamFilter !== 'all') {
        exams = exams.filter(e => e.state === currentExamFilter);
    }
    
    // Aplicar ordenação
    exams.sort((a, b) => {
        if (sortValue === 'date-asc') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        }
        if (sortValue === 'date-desc') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        }
        if (sortValue === 'grade-desc') return (b.grade || 0) - (a.grade || 0);
        if (sortValue === 'grade-asc') return (a.grade || 0) - (b.grade || 0);
        return 0;
    });
    
    // Atualizar botões de filtro
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === currentExamFilter);
    });
    
    // Mostrar/ocultar estado vazio
    if (exams.length === 0) {
        examesContainer.innerHTML = '';
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        examesContainer.innerHTML = exams.map(exam => {
            const course = COURSES[exam.courseId];
            const icon = exam.state === 'completed' ? '✓' : '📅';
            const gradeInfo = exam.state === 'completed' ? `Classificação: ${exam.grade}` : `${exam.time} • ${exam.location}`;
            const statusBadge = exam.state === 'completed' ? 
                '<span class="exam-badge completed">Realizado</span>' : 
                '<span class="exam-badge scheduled">Marcado</span>';
            
            return `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
                        <h3 style="margin-bottom: 0;">${icon} ${course.name}</h3>
                        ${statusBadge}
                    </div>
                    <p>${exam.date} • ${gradeInfo}</p>
                </div>
            `;
        }).join('');
    }
}

// Renderizar comunicados com filtro e ordenação
let currentAnnouncementFilter = 'all';

function filterAnnouncements(type) {
    currentAnnouncementFilter = type;
    filterAndSortAnnouncements();
}

function filterAndSortAnnouncements() {
    const announcementsContainer = document.getElementById('announcementsContainer');
    const emptyState = document.getElementById('announcementsEmptyState');
    const sortValue = document.getElementById('announcementsSort')?.value || 'date-desc';
    
    let announcements = [...ANNOUNCEMENTS];
    
    // Filtrar
    if (currentAnnouncementFilter === 'academic') {
        announcements = announcements.filter(a => a.type === 'academic');
    } else if (currentAnnouncementFilter === 'administrative') {
        announcements = announcements.filter(a => a.type === 'administrative');
    } else if (currentAnnouncementFilter === 'unread') {
        announcements = announcements.filter(a => !a.read);
    }
    
    // Aplicar ordenação
    announcements.sort((a, b) => {
        if (sortValue === 'status') {
            return a.read - b.read; // Não lidos primeiro
        }
        // date-desc e date-asc baseado na ordem original (IDs)
        if (sortValue === 'date-desc') return b.id - a.id;
        if (sortValue === 'date-asc') return a.id - b.id;
        return 0;
    });
    
    // Atualizar botões de filtro
    document.querySelectorAll(`#comunicados [data-filter]`).forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === currentAnnouncementFilter);
    });
    
    // Mostrar/ocultar estado vazio
    if (announcements.length === 0) {
        announcementsContainer.innerHTML = '';
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        announcementsContainer.innerHTML = announcements.map(ann => `
            <div class="news-item ${ann.read ? '' : 'unread'}" data-id="${ann.id}" onclick="markAsRead(this)">
                <div class="news-title">${ann.title}</div>
                <div class="news-date">${ann.date}</div>
            </div>
        `).join('');
    }
}

// Inicializar listas quando a página carrega
function initLists() {
    renderNotes();
    filterAndSortExams();
    filterAndSortAnnouncements();
}

// Chamar ao fazer login
window.addEventListener('DOMContentLoaded', () => {
    // Observer para reinicializar listas quando mudam de ecrã
    const observer = new MutationObserver(() => {
        const notasActive = document.getElementById('notas')?.classList.contains('active');
        const examesActive = document.getElementById('exames')?.classList.contains('active');
        const comunicadosActive = document.getElementById('comunicados')?.classList.contains('active');
        
        if (notasActive) renderNotes();
        if (examesActive) filterAndSortExams();
        if (comunicadosActive) filterAndSortAnnouncements();
    });
    
    const appContent = document.querySelector('.app-content');
    if (appContent) {
        observer.observe(appContent, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }

    // Inicializar listas
    initLists();

    // Listeners para filtros de Notas
        const sortNotasSelect = document.getElementById('notasSort');
    if (sortNotasSelect) {
        sortNotasSelect.addEventListener('change', filterAndSortNotes);
    }

    // Listeners para filtros de Exames
    const examFilterChips = document.querySelectorAll('[data-filter-exam]');
    examFilterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterExams(chip.dataset.filterExam);
        });
    });

        const sortExamsSelect = document.getElementById('examesSort');
    if (sortExamsSelect) {
        sortExamsSelect.addEventListener('change', filterAndSortExams);
    }

    // Listeners para filtros de Comunicados
    const announcementFilterChips = document.querySelectorAll('[data-filter-announcement]');
    announcementFilterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterAnnouncements(chip.dataset.filterAnnouncement);
        });
    });

        const sortAnnouncementsSelect = document.getElementById('announcementsSort');
    if (sortAnnouncementsSelect) {
        sortAnnouncementsSelect.addEventListener('change', filterAndSortAnnouncements);
    }
});

