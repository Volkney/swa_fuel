const inputNumber = document.getElementById('inputNumber');
const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');
const display3 = document.getElementById('display3');
const aircraft = document.querySelectorAll('input[name="group1"]');
const MAX_800_AC = 8.5;
const NON_MAX_AC = 8.6;
var aircraftOne = aircraft[0];
var aircraftTwo = aircraft[1];

function updateDisplayValues() {
  const enteredNumber = parseFloat(inputNumber.value);
  
  if (aircraftOne.checked) {
    if (enteredNumber < 17.2) {
      const dividedValue = enteredNumber / 2;
      display1.value = (Math.ceil(dividedValue * 10) / 10).toFixed(1);
      display2.value = (Math.floor(dividedValue * 10) / 10).toFixed(1);
      display3.value = 0;
    } else {
      display1.value = NON_MAX_AC;
      display2.value = NON_MAX_AC;
      display3.value = (enteredNumber - (NON_MAX_AC + NON_MAX_AC)).toFixed(1);
    }
  } else if (aircraftTwo.checked) {
    if (enteredNumber < 17.0) {
      const dividedValue = enteredNumber / 2;
      display1.value = (Math.ceil(dividedValue * 10) / 10).toFixed(1);
      display2.value = (Math.floor(dividedValue * 10) / 10).toFixed(1);
      display3.value = 0;
    } else {
      display1.value = MAX_800_AC;
      display2.value = MAX_800_AC;
      display3.value = (enteredNumber - (MAX_800_AC + MAX_800_AC)).toFixed(1);
    }
  }
}

inputNumber.addEventListener('input', updateDisplayValues);
aircraftOne.addEventListener('change', updateDisplayValues);
aircraftTwo.addEventListener('change', updateDisplayValues);
