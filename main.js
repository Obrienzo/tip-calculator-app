// INITIAL STATE OF THE APP...
// This is the initial state of the app. It will be used to reset the app when...
let errorState = '';
let tipPercentState = 0;
let amount = 0;
let people = 0;

 
// UI ELEMENTS THAT WILL BE USED IN THE APP...
const formElement = document.querySelector("form");
const billAmount = document.getElementById('bill');
const peopleSize = document.getElementById('people');
const tipPercentSelection = document.querySelectorAll('.tip-selection');
const customTip = document.getElementById('custom-tip');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const errorMessage = document.querySelector('.error-state');



/*
FUNCTIONS THAT WILL BE USED TO CALCULATE THE TIP AND TOTAL AMOUNT...
The below functions will be used to calculate the tip and total amount per person based on the bill amount, number of people, and tip percentage selected.
*/
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

/*
This function will update the display of the tip and total amount per person based on the current state of the app.
It will be called whenever the user changes the bill amount, number of people, or tip percentage selected.
It will also be called when the app is reset to its initial state.
*/
const updateDisplay = () => {
    if (amount && people && tipPercentState) {
        const tip = calculateTipPerPerson(amount, people, tipPercentState);
        const total = calculateTotalPerPerson(amount, people);

        tipAmount.textContent = tip;
        totalAmount.textContent = total;
    }
}


/*
Functions that will handle the selection of tip percentages...
These functions will be used to handle the selection of tip percentages when the user clicks on the tip percentage buttons.
*/
tipPercentSelection.forEach(tipSelected => {
    tipSelected.addEventListener('click', () => {
        tipPercentSelection.forEach(elem => elem.classList.remove('selected-tip'));
        tipSelected.classList.add('selected-tip');
        tipPercentState = parseInt(tipSelected.dataset.percent);

        customTip.value = ''; // Clear custom tip input when a predefined tip is selected..

        updateDisplay();
    })
});



/*
EVENT HANDLERS FOR THE FORM ELEMENTS...
These event handlers will be used to handle the input events on the form elements.
*/
const handleBillchange = (ev) => {
    amount = parseFloat(ev.target.value);
    updateDisplay();
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


/*
REGISTERING EVENT HANDLERS FOR THE FORM ELEMENTS...
The above event handlers will be registered to handle the input events on the form elements.
*/
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

