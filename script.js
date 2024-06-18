const inputNumber = document.getElementById('inputNumber');
const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');
const display3 = document.getElementById('display3');
const aircraft = document.querySelectorAll('input[name="group1"]');
const MAX_800_AC = 8500;
const NON_MAX_AC = 8600;
var aircraftOne = aircraft[0];
var aircraftTwo = aircraft[1];

function updateDisplayValues() {
  const enteredNumber = parseFloat(inputNumber.value);
  
  if (aircraftOne.checked) {
    if (enteredNumber < 17200) {
      const dividedValue = enteredNumber / 2;
      display1.value = Math.ceil(dividedValue).toFixed(0);
      display2.value = Math.floor(dividedValue).toFixed(0);
      display3.value = 0;
    } else {
      display1.value = NON_MAX_AC;
      display2.value = NON_MAX_AC;
      display3.value = (enteredNumber - (NON_MAX_AC + NON_MAX_AC)).toFixed(0);
    }
  } else if (aircraftTwo.checked) {
    if (enteredNumber < 17000) {
      const dividedValue = enteredNumber / 2;
      display1.value = Math.ceil(dividedValue).toFixed(0);
      display2.value = Math.floor(dividedValue).toFixed(0);
      display3.value = 0;
    } else {
      display1.value = MAX_800_AC;
      display2.value = MAX_800_AC;
      display3.value = (enteredNumber - (MAX_800_AC + MAX_800_AC)).toFixed(0);
    }
  }
}

inputNumber.addEventListener('input', updateDisplayValues);
aircraftOne.addEventListener('change', updateDisplayValues);
aircraftTwo.addEventListener('change', updateDisplayValues);


// Calculator Code

const fuelOnBoardInput = document.getElementById('fuelOnBoard');
const fuelInInput = document.getElementById('fuelIn');
const fuelDensityInput = document.getElementById('fuelDensity');
const calculateButton = document.getElementById('calculateButton');
const fuelResult = document.getElementById('fuelResult');

calculateButton.addEventListener('click', () => {
    const fuelOnBoard = parseFloat(fuelOnBoardInput.value);
    const fuelIn = parseFloat(fuelInInput.value);
    const fuelDensity = parseFloat(fuelDensityInput.value);

    if (!isNaN(fuelOnBoard) && !isNaN(fuelIn) && !isNaN(fuelDensity) && fuelDensity !== 0) {
        const calculatedFuel = (fuelOnBoard - fuelIn) / fuelDensity;
        fuelResult.textContent = `Calculated Fuel: ${calculatedFuel.toFixed(2)}`;
    } else {
        fuelResult.textContent = 'Please enter valid values.';
    }

});


// Tab functionality 

// Function to switch between tabs
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
  }
  
  document.getElementById(tabName).style.display = "block";
}

// Initially show the first tab
document.getElementById("FuelDistribution").style.display = "block";
