let errorState = '';
let tipPercentState = 0;
let amount = 0;
let people = 0;

 

const formElement = document.querySelector("form");
const billAmount = document.getElementById('bill');
const peopleSize = document.getElementById('people');
const tipPercentSelection = document.querySelectorAll('.tip-selection');
const customTip = document.getElementById('custom-tip');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const errorMessage = document.querySelector('.error-state');


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


const updateDisplay = () => {
    if (amount && people && tipPercentState) {
        const tip = calculateTipPerPerson(amount, people, tipPercentState);
        const total = calculateTotalPerPerson(amount, people);

        tipAmount.textContent = tip;
        totalAmount.textContent = total;
    }
}


tipPercentSelection.forEach(tipSelected => {
    tipSelected.addEventListener('click', () => {
        tipPercentSelection.forEach(elem => elem.classList.remove('selected-tip'));
        tipSelected.classList.add('selected-tip');
        tipPercentState = parseInt(tipSelected.dataset.percent);

        customTip.value = '';

        updateDisplay();
    })
});



// Event handlers for all the input widgets....
const handleBillchange = (ev) => {
    amount = parseFloat(ev.target.value);
    updateDisplay();
    // console.log(amount)
}

const handlePeopleSizeChange = (ev) => {
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

    updateDisplay();
}

const handleCustomTip = (ev) => {
    tipPercentSelection.forEach(elem => elem.classList.remove('selected-tip'));
    tipPercentState = parseInt(ev.target.value);

    updateDisplay();
}


// Registering event handlers...
billAmount.oninput = handleBillchange;
peopleSize.oninput = handlePeopleSizeChange;
customTip.oninput = handleCustomTip;
formElement.onreset = () => {
    tipPercentState = 0;
    amount = 0;
    people = 0;
    errorState = '';
    errorMessage.textContent = '';
    peopleSize.classList.remove('invalid');
    tipAmount.textContent = '0.00';
    totalAmount.textContent = '0.00';
    tipPercentSelection.forEach(elem => elem.classList.remove('selected-tip'));

}

