const inputNumber = document.getElementById('inputNumber');
const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');
const display3 = document.getElementById('display3');
const aircraft = document.querySelectorAll('input[name="group1"]');

var aircraftOne = aircraft[0];
var aircraftTwo = aircraft[1];

function updateDisplayValues() {
  const enteredNumber = parseFloat(inputNumber.value);
  
  if (aircraftOne.checked) {
    display1.value = 8.6;
    display2.value = 8.6;
    display3.value = enteredNumber - (8.6 + 8.6);
  } else if (aircraftTwo.checked) {
    display1.value = 8.5;
    display2.value = 8.5;
    display3.value = enteredNumber - (8.5 + 8.5);
  }
}

inputNumber.addEventListener('input', updateDisplayValues);
aircraftOne.addEventListener('change', updateDisplayValues);
aircraftTwo.addEventListener('change', updateDisplayValues);
