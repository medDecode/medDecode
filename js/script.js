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



document.addEventListener('DOMContentLoaded', () => {
    // Аналіз результатів
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
});
