document.addEventListener('DOMContentLoaded', function() {
    const norms = {
        "Hemoglobin": { min: 115, max: 150 },
        "Glucose": { min: 3.5, max: 5.9 },
        "Cholesterol": { min: 3.0, max: 5.0 },
        "Blood Pressure": { min: 90, max: 140 },
    };

    const analyzerForm = document.getElementById('analyzerForm');
    if (analyzerForm) {
        analyzerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processAnalysisForm();
        });
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('The file has been successfully downloaded');
        });
    }

    const registrationForm = document.querySelector('.registration-area form');
    if (registrationForm) {
        initializeRegistrationForm(registrationForm);
    }

    initializeProfileSystem();
    initializeMobileMenu();
});

function processAnalysisForm() {
    const norms = {
        "Hemoglobin": { min: 115, max: 150 },
        "Glucose": { min: 3.5, max: 5.9 },
        "Cholesterol": { min: 3.0, max: 5.0 },
        "Blood Pressure": { min: 90, max: 140 },
    };

    for (let i = 0; i < 5; i++) {
        const indicatorElem = document.querySelector(`select[name="indicator${i}"]`);
        const valueElem = document.querySelector(`input[name="value${i}"]`);
        const normElem = document.querySelector(`input[name="norm${i}"]`);
        const statusElem = document.querySelector(`input[name="status${i}"]`);

        if (!indicatorElem || !valueElem || !normElem || !statusElem) continue;

        const indicator = indicatorElem.value;
        const value = parseFloat(valueElem.value);

        if (!indicator || isNaN(value)) {
            normElem.value = '';
            statusElem.value = '';
            continue;
        }

        const normObj = norms[indicator];
        if (!normObj) continue;

        const normText = `${normObj.min} - ${normObj.max}`;
        let statusText = "";

        if (value < normObj.min) {
            statusText = "below normal";
        } else if (value > normObj.max) {
            statusText = "above normal";
        } else {
            statusText = "within normal range";
        }

        normElem.value = normText;
        statusElem.value = statusText;
    }
}

function initializeRegistrationForm(form) {
    const nameInput = form.querySelector('input[placeholder="Name"]');
    const lastNameInput = form.querySelector('input[placeholder="Last name"]');
    const emailInput = form.querySelector('input[placeholder="Email"]');
    const passwordInput = form.querySelector('input[placeholder="Password"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistrationSubmit(nameInput, lastNameInput, emailInput, passwordInput);
    });

    const passwordToggle = form.querySelector('.password-toggle i');
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            togglePasswordVisibility(passwordInput, passwordToggle);
        });
    }
}

function handleRegistrationSubmit(nameInput, lastNameInput, emailInput, passwordInput) {
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
    
    if (nameInput.form) {
        nameInput.form.reset();
    }
}

function togglePasswordVisibility(passwordInput, passwordToggle) {
    if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
    } else {
        passwordInput.type = 'text';
    }
    
    passwordToggle.classList.toggle('fa-eye');
    passwordToggle.classList.toggle('fa-eye-slash');
    passwordToggle.classList.toggle('far');
    passwordToggle.classList.toggle('fas');
}

function initializeProfileSystem() {
    let selectedGender = '';

    const profileBtn = document.querySelector('.fas.fa-user-circle');
    if (profileBtn) {
        profileBtn.addEventListener('click', showProfile);
    }

    const genderButtons = document.querySelectorAll('.btn-gender');
    genderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            genderButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedGender = btn.textContent;
        });
    });

    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveProfileData(selectedGender);
        });
    }

    const menuBtns = document.querySelectorAll('.profile-sidebar .menu-btn');
    const panels = document.querySelectorAll('.profile-content .panel');

    menuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (btn.classList.contains('logout-btn')) {
                logout();
                return;
            }

            handleMenuButtonClick(btn, menuBtns, panels);
        });
    });

    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-submenu');

    if (settingsBtn && settingsMenu) {
        settingsBtn.addEventListener('click', function() {
            toggleSettingsMenu(settingsMenu);
        });
    }

    const submenuBtns = document.querySelectorAll('.submenu-btn');
    submenuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleSubmenuClick(this);
        });
    });

    const tabBtns = document.querySelectorAll('.settings-tabs .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleTabSwitch(btn, tabBtns, tabPanels);
        });
    });
}

function showProfile() {
    const heroBlock = document.querySelector('.hero-block');
    const profileSection = document.querySelector('.profile-section');
    
    if (heroBlock) heroBlock.style.display = 'none';
    if (profileSection) profileSection.style.display = 'block';
}

function closeProfile() {
    const heroBlock = document.querySelector('.hero-block');
    const profileSection = document.querySelector('.profile-section');
    
    if (heroBlock) heroBlock.style.display = 'block';
    if (profileSection) profileSection.style.display = 'none';
}

function logout() {
    alert("You have logged out!");
    closeProfile();
}

function saveProfileData(selectedGender) {
    const firstName = document.getElementById('firstName')?.value || '';
    const lastName = document.getElementById('lastName')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const mobile = document.getElementById('mobile')?.value || '';

    const profileData = {
        firstName,
        lastName,
        email,
        mobile,
        gender: selectedGender
    };

    console.log('Saved profile data:', profileData);
    
    alert(`Saved Information:
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Mobile: ${mobile}
Gender: ${selectedGender}`);
}

function handleMenuButtonClick(clickedBtn, allButtons, panels) {
    allButtons.forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');

    const targetPanelId = clickedBtn.dataset.panel;
    panels.forEach(panel => panel.classList.remove('active'));
    
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    if (targetPanelId === 'settings') {
        initializeSettingsPanel();
    }
}

function initializeSettingsPanel() {
    const tabs = document.querySelectorAll('.settings-tabs .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(t => t.classList.remove('active'));
    tabPanels.forEach(tp => tp.classList.remove('active'));
    
    if (tabs[0]) tabs[0].classList.add('active');
    if (tabPanels[0]) tabPanels[0].classList.add('active');
}

function toggleSettingsMenu(settingsMenu) {
    const isVisible = settingsMenu.style.display === 'flex';
    settingsMenu.style.display = isVisible ? 'none' : 'flex';
}

function handleSubmenuClick(button) {
    const action = button.getAttribute('onclick');
    
    if (action && action.includes('openProfileSettings')) {
        openProfileSettings();
    } else if (action && action.includes('openPasswordSettings')) {
        openPasswordSettings();
    } else if (action && action.includes('openOtherSettings')) {
        openOtherSettings();
    }
}

function handleTabSwitch(clickedTab, allTabs, allPanels) {
    allTabs.forEach(tab => tab.classList.remove('active'));
    allPanels.forEach(panel => panel.classList.remove('active'));
    
    clickedTab.classList.add('active');
    
    const targetPanel = document.getElementById(clickedTab.dataset.tab);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

function openProfileSettings() {
    alert('Відкрито Profile Settings');
}

function openPasswordSettings() {
    alert('Відкрито Password Settings');
}

function openOtherSettings() {
    alert('Відкрито Other Settings');
}

function initializeMobileMenu() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', function() {
            toggleMobileMenu(mobileNav, mobileNavToggle);
        });

        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu(mobileNav, mobileNavToggle);
            });
        });

        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !mobileNavToggle.contains(event.target)) {
                closeMobileMenu(mobileNav, mobileNavToggle);
            }
        });
    }
}

function toggleMobileMenu(mobileNav, mobileNavToggle) {
    mobileNav.classList.toggle('active');
    mobileNavToggle.classList.toggle('active');

    if (mobileNav.classList.contains('active')) {
        mobileNavToggle.innerHTML = '✕';
    } else {
        mobileNavToggle.innerHTML = '☰';
    }
}

function closeMobileMenu(mobileNav, mobileNavToggle) {
    mobileNav.classList.remove('active');
    mobileNavToggle.classList.remove('active');
    mobileNavToggle.innerHTML = '☰';
}
