document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // Платформа для аналізу
    // ==========================
    const norms = {
        "Hemoglobin": {min: 115, max: 150},
        "Glucose": {min: 3.5, max: 5.9},
        "Cholesterol": {min: 3.0, max: 5.0},
        "Blood Pressure": {min: 90, max: 140},
    };

    const analyzerForm = document.getElementById('analyzerForm');
    if(analyzerForm){
        analyzerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            for (let i = 0; i < 5; i++) {
                const indicatorElem = analyzerForm.querySelector(`select[name="indicator${i}"]`);
                const valueElem = analyzerForm.querySelector(`input[name="value${i}"]`);
                const normElem = analyzerForm.querySelector(`input[name="norm${i}"]`);
                const statusElem = analyzerForm.querySelector(`input[name="status${i}"]`);
                if(!indicatorElem || !valueElem || !normElem || !statusElem) continue;
                const indicator = indicatorElem.value;
                const value = parseFloat(valueElem.value);
                if(!indicator || isNaN(value)){
                    normElem.value = '';
                    statusElem.value = '';
                    continue;
                }
                const normObj = norms[indicator];
                if(!normObj) continue;
                const normText = `${normObj.min} - ${normObj.max}`;
                let statusText = "";
                if (value < normObj.min) statusText = "below normal";
                else if (value > normObj.max) statusText = "above normal";
                else statusText = "within normal range";
                normElem.value = normText;
                statusElem.value = statusText;
            }
        });
    }

    // Кнопка завантаження
    const downloadBtn = document.getElementById('downloadBtn');
    if(downloadBtn){
        downloadBtn.addEventListener('click', () => {
            alert('The file has been successfully downloaded');
        });
    }

    // ==========================
    // Платформа для реєстрації
    // ==========================
    const form = document.querySelector('.registration-area form');
    if(form){
        const nameInput = form.querySelector('input[placeholder="Name"]');
        const lastNameInput = form.querySelector('input[placeholder="Last name"]');
        const emailInput = form.querySelector('input[placeholder="Email"]');
        const passwordInput = form.querySelector('input[placeholder="Password"]');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!nameInput.value.trim() || !lastNameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim()) {
                alert('Please fill in all fields!');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email.');
                return;
            }
            alert(`Registration successful!\nName: ${nameInput.value} ${lastNameInput.value}\nEmail: ${emailInput.value}`);
            form.reset();
        });

        const passwordToggle = form.querySelector('.password-toggle i');
        if(passwordToggle){
            passwordToggle.addEventListener('click', () => {
                if(passwordInput.type === 'password') passwordInput.type = 'text';
                else passwordInput.type = 'password';
                passwordToggle.classList.toggle('fa-eye');
                passwordToggle.classList.toggle('fa-eye-slash');
            });
        }
    }

    // ==========================
    // Профіль користувача
    // ==========================
    const tabs = document.querySelectorAll('.tab-content');

    function showProfile() {
        document.querySelector('.hero-block').style.display = 'none';
        document.querySelector('.profile-section').style.display = 'block';
        showTab('profile');
    }

    function closeProfile() {
        document.querySelector('.profile-section').style.display = 'none';
        document.querySelector('.hero-block').style.display = 'block';
    }

    function showTab(tabId) {
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabId).style.display = 'block';
    }

    function logout() {
        alert("You have logged out!");
        closeProfile();
    }

    // Прив'язка кнопок
    const profileBtn = document.querySelector('.fas.fa-user-circle');
    if(profileBtn) profileBtn.addEventListener('click', showProfile);

    const homeBtn = document.querySelector('.profile-section footer button');
    if(homeBtn) homeBtn.addEventListener('click', closeProfile);

    const logoutBtn = document.querySelector('.profile-section header button[onclick="logout()"]');
    if(logoutBtn) logoutBtn.addEventListener('click', logout);

    // Кнопки вкладок
    const tabButtons = document.querySelectorAll('.profile-section header nav button');
    tabButtons.forEach(btn => {
        const tabId = btn.textContent.toLowerCase().includes('profile') ? 'profile' :
                      btn.textContent.toLowerCase().includes('password') ? 'password' :
                      btn.textContent.toLowerCase().includes('history') ? 'history' : '';
        if(tabId) btn.addEventListener('click', () => showTab(tabId));
    });
});
