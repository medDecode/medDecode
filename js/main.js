document.addEventListener("DOMContentLoaded", function () {
    
    /* ==========================================
       ЗАВДАННЯ 5: LocalStorage - Завантаження теми
       ========================================== */
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    /* ==========================================
       ЗАВДАННЯ 2.1: Маніпуляція елементами
       ========================================== */
    
    // 1. Зміна стилю елементів .card при наведенні
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transition = "all 0.3s ease";
        // Додаємо слухачі, щоб змінювати рамку
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "var(--primary-green)";
            card.style.boxShadow = "0 10px 20px rgba(56, 178, 172, 0.2)";
        });
        card.addEventListener('mouseleave', () => {
            // Повертаємо стиль з CSS (якщо в CSS немає border, буде transparent)
            card.style.borderColor = ""; 
            card.style.boxShadow = "";
        });
    });

    // 2. Додати новий елемент у кінець <main>
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        const newElement = document.createElement('p');
        newElement.innerHTML = "&copy; 2025 medDecode. All rights reserved.";
        newElement.style.textAlign = "center";
        newElement.style.color = "#888";
        newElement.style.padding = "20px 0";
        newElement.style.fontSize = "0.9rem";
        newElement.classList.add('created-by-js');
        mainContainer.append(newElement);
    }

    /* ==========================================
       ЗАВДАННЯ 2.2: Динамічна зміна контенту
       ========================================== */

    // 1. Поточна дата у футері
    const footer = document.querySelector('.footer-grid') || document.querySelector('.footer');
    if (footer) {
        const dateContainer = document.createElement('div');
        dateContainer.className = 'footer-date';
        dateContainer.style.width = '100%';
        dateContainer.style.textAlign = 'center';
        dateContainer.style.marginTop = '1rem';
        dateContainer.style.color = 'var(--text-dark)';
        
        const currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        
        dateContainer.innerHTML = `<small>Today: ${currentDate}</small>`;
        footer.appendChild(dateContainer);
    }

    // 2. Акордеон ("Показати більше") для тексту
    // Беремо тільки перший параграф в описі, щоб не ламати верстку
    const aboutTextContainer = document.querySelector('.about-text p');
    
    if (aboutTextContainer && aboutTextContainer.innerText.length > 150) {
        const originalText = aboutTextContainer.innerText;
        const shortText = originalText.substring(0, 150) + "...";
        
        // Встановлюємо початковий короткий текст
        aboutTextContainer.innerText = shortText;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = "Show more";
        toggleBtn.className = "btn btn-secondary btn-sm"; // btn-sm - стилізуй в CSS якщо треба
        toggleBtn.style.marginTop = "10px";
        toggleBtn.style.fontSize = "0.8rem";
        toggleBtn.style.padding = "5px 15px";

        let isExpanded = false;

        toggleBtn.addEventListener('click', function() {
            if (isExpanded) {
                aboutTextContainer.innerText = shortText;
                toggleBtn.textContent = "Show more";
                // Плавний скрол назад до тексту, якщо він був довгим
                aboutTextContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                aboutTextContainer.innerText = originalText;
                toggleBtn.textContent = "Collapse";
            }
            isExpanded = !isExpanded;
        });
        
        // Вставляємо кнопку після параграфа
        aboutTextContainer.parentNode.insertBefore(toggleBtn, aboutTextContainer.nextSibling);
    }

    /* ==========================================
       ЗАВДАННЯ 3.1: Зміна теми (Клік)
       ========================================== */
    const themeToggleBtn = document.querySelector('.fa-globe');
    if (themeToggleBtn) {
        themeToggleBtn.style.cursor = "pointer";
        themeToggleBtn.title = "Change the subject (Dark/Light)";
        
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('siteTheme', isDark ? 'dark' : 'light');
        });
    }

    /* ==========================================
       ЗАВДАННЯ 3.2: Події миші та клавіатури
       ========================================== */

    // 1. Підсвітка меню навігації
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.classList.add('js-nav-highlight');
            }
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('js-nav-highlight');
        });
    });

    // 2. Зміна розміру шрифту (Alt + ArrowUp/ArrowDown)
    // ВАЖЛИВО: Додано перевірку event.altKey, щоб не блокувати скрол сторінки
    let currentFontSize = 100; // у відсотках
    document.addEventListener('keydown', (event) => {
        if (event.altKey && event.key === "ArrowUp") {
            event.preventDefault(); // Запобігаємо дії за замовчуванням
            currentFontSize += 5;
            document.body.style.fontSize = `${currentFontSize}%`;
        } else if (event.altKey && event.key === "ArrowDown") {
            event.preventDefault();
            currentFontSize = Math.max(70, currentFontSize - 5);
            document.body.style.fontSize = `${currentFontSize}%`;
        }
    });

    /* ==========================================
       ЗАВДАННЯ 4: Робота з формами та валідацією
       ========================================== */
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Пропускаємо форму калькулятора (id="analyzerForm"), 
        // щоб не ламати логіку script.js
        if (form.id === 'analyzerForm') return;

        form.setAttribute('novalidate', true);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            const formDataLog = {};

            // Очищення старих помилок
            form.querySelectorAll('.js-error-msg').forEach(el => el.remove());
            form.querySelectorAll('.js-input-error').forEach(el => el.classList.remove('js-input-error'));
            const oldSuccess = form.parentNode.querySelector('.js-success-msg');
            if(oldSuccess) oldSuccess.remove();

            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                const val = input.value.trim();
                let error = null;

                // Збір даних для консолі
                if (input.name || input.placeholder) {
                    formDataLog[input.name || input.placeholder] = val;
                }

                // ВАЛІДАЦІЯ
                
                // Ім'я (шукаємо за name або placeholder)
                const isNameField = input.name === 'name' || 
                                    (input.placeholder && input.placeholder.toLowerCase().includes('name'));
                if (isNameField && input.type === 'text') {
                    if (val.length < 3) {
                        error = "The name must contain at least 3 characters.";
                    }
                }

                // Email
                if (input.type === 'email' || input.name === 'email') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(val)) {
                        error = "Please enter a valid email.";
                    }
                }

                // Повідомлення
                if (input.tagName === 'TEXTAREA' || input.name === 'message') {
                    if (val.length < 10) {
                        error = "The message is too short (min. 10 characters).";
                    }
                }
                
                // Пароль
                if (input.type === 'password') {
                    if (val.length < 8) {
                        error = "The password must be at least 8 characters long.";
                    }
                }

                // Вивід помилки
                if (error) {
                    isValid = false;
                    input.classList.add('js-input-error');
                    
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'js-error-msg';
                    errorDiv.textContent = error;
                    input.parentNode.appendChild(errorDiv);
                }
            });

            console.log("These forms (Log):", formDataLog);

            if (isValid) {
                // Успіх
                form.reset();
                
                // Бонус: Зберегти ім'я
                const userName = formDataLog['name'] || formDataLog['Name'];
                if(userName) localStorage.setItem('userName', userName);

                const successMsg = document.createElement('div');
                successMsg.className = 'js-success-msg';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> The form has been successfully submitted!';
                
                // Вставляємо повідомлення перед формою
                form.parentNode.insertBefore(successMsg, form);

                setTimeout(() => successMsg.remove(), 5000);
            }
        });
    });
});