// Отримуємо форму реєстрації
const form = document.querySelector('.registration-area form');
const nameInput = form.querySelector('input[placeholder="Name"]');
const emailInput = form.querySelector('input[placeholder="Email"]');
const passwordInput = form.querySelector('input[placeholder="Password"]');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Перевірка формату
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
        alert('Please fill in all fields!');
        return;
    }

    // Простий приклад валідації email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email.');
        return;
    }

    // Всі перевірки пройдено — відправка на сервер
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            alert('Registration was successful!');
            form.reset();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(err => console.error(err));
});

