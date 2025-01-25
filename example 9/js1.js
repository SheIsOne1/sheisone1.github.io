function calculate(operation) {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const resultDiv = document.getElementById('result');

    // המרת הערכים למספרים
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // בדיקה אם הערכים הם מספרים
    if (isNaN(number1) || isNaN(number2)) {
        resultDiv.innerHTML = 'אנא הזן מספרים חוקיים בשתי התיבות.';
        return;
    }

    let result;
    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                alert('ניסית לחלק באפס');
                return;
            }
            result = number1 / number2;
            break;
        default:
            resultDiv.innerHTML = 'פעולה לא חוקית.';
            return;
    }

    // הצגת התוצאה
    resultDiv.innerHTML = 'התוצאה: ' + result;
}