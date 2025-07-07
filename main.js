const billAmount = document.getElementById('bill');
const peopleSize = document.getElementById('people');
const tipPercentSelection = document.querySelectorAll('.tip-selection');
const customTip = document.getElementById('custom-tip');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const errorMessage = document.querySelector('.error-state');

let errorState = '';
let tipPercentState = 0;
let amount = 0;
let people = 0;

const calculateTipPerPerson = (billAmount, numberOfPeople, rate) => {
    if (billAmount <= 0 || numberOfPeople <=0 || rate <=0) {
        return;
    }

    const total = ((billAmount / numberOfPeople) * rate) / 100;
    return total.toFixed(2);

}

const calculateTotalPerPerson = (totalBill, peopleNumbers) => {
    if (totalBill <= 0 || peopleNumbers <= 0) {
        return;
    }

    const total = totalBill / peopleNumbers;
    return total.toFixed(2);

}

tipPercentSelection.forEach(tipSelected => {
    tipSelected.addEventListener('click', () => {
        tipPercentSelection.forEach(elem => elem.classList.remove('selected-tip'));
        tipSelected.classList.add('selected-tip');
        console.log(tipSelected.textContent);
    })
});

billAmount.addEventListener('input', (ev) => {
    amount = parseInt(ev.target.value);
});

peopleSize.addEventListener('input', (ev) => {
    if (parseInt(ev.target.value) === 0) {
        errorState = 'Can\'t be zero';
        errorMessage.textContent = errorState;
        ev.target.classList.add('invalid');
    } else {
        errorState = '';
        errorMessage.textContent = errorState;
        ev.target.classList.remove('invalid');
        people = parseInt(ev.target.value);
    }
})

customTip.addEventListener('input', (ev) => {
    tipPercentSelection.forEach(elem => {
        elem.classList.remove('selected-tip');
        tipPercentState = 0;
    });
    tipPercentState = parseInt(ev.target.value);
});


calculateTipPerPerson(amount, people, tipPercentState);
calculateTotalPerPerson(amount, people);

console.log(calculateTipPerPerson(amount, people, tipPercentState), calculateTotalPerPerson(amount, people));

tipAmount.textContent = calculateTipPerPerson(amount, people, tipPercentState);
totalAmount.textContent = calculateTotalPerPerson(amount, people);