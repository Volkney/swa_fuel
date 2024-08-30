const inputNumber = document.getElementById('inputNumber');
const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');
const display3 = document.getElementById('display3');
const decimalWarning = document.getElementById('decimalWarning');
const aircraft = document.querySelectorAll('input[name="group1"]');
const MAX_800_AC = 8500;
const NON_MAX_AC = 8600;
var aircraftOne = aircraft[0];
var aircraftTwo = aircraft[1];

function updateDisplayValues() {
  const inputValue = inputNumber.value;
  const fuelAmount = parseInt(inputValue);

  // Check for decimal input
  if (inputValue.includes('.')) {
    decimalWarning.style.display = 'block';
    clearDisplays();
    return;
  } else {
    decimalWarning.style.display = 'none';
  }

  // Clear all displays if input has 3 or fewer digits
  if (inputValue.length <= 3) {
    clearDisplays();
    return;
  }

  if (aircraftTwo.checked) {
    if (fuelAmount < 17000) {
      const dividedValue = fuelAmount / 2;
      display1.value = Math.ceil(dividedValue);
      display2.value = Math.floor(dividedValue);
      display3.value = 0;
    } else {
      display1.value = MAX_800_AC;
      display2.value = MAX_800_AC;
      display3.value = fuelAmount - (MAX_800_AC + MAX_800_AC);
    }
  } else if (aircraftOne.checked) {
    if (fuelAmount < 17200) {
      const dividedValue = fuelAmount / 2;
      display1.value = Math.ceil(dividedValue);
      display2.value = Math.floor(dividedValue);
      display3.value = 0;
    } else {
      display1.value = NON_MAX_AC;
      display2.value = NON_MAX_AC;
      display3.value = fuelAmount - (NON_MAX_AC + NON_MAX_AC);
    }
  }
}

function clearDisplays() {
  display1.value = '';
  display2.value = '';
  display3.value = '';
}

function addFuelAmount(amount) {
  const currentValue = parseInt(inputNumber.value) || 0;
  inputNumber.value = currentValue + amount;
  updateDisplayValues();
}

inputNumber.addEventListener('input', updateDisplayValues);
aircraftOne.addEventListener('change', updateDisplayValues);
aircraftTwo.addEventListener('change', updateDisplayValues);

