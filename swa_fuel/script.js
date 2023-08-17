    const inputNumber = document.getElementById('inputNumber');
    const display1 = document.getElementById('display1');
    const display2 = document.getElementById('display2');
    const display3 = document.getElementById('display3');
    
    inputNumber.addEventListener('input', () => {
      const enteredNumber = parseInt(inputNumber.value);
      if (!isNaN(enteredNumber)) {
        display1.value = enteredNumber;
        display2.value = enteredNumber * 2;
        display3.value = enteredNumber * 3;
      } else {
        display1.value = '';
        display2.value = '';
        display3.value = '';
      }
    });