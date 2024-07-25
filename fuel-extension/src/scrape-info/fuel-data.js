export function getFuelData() {
   return new Promise((resolve) => {
     let fuel = document.querySelectorAll('div')
     let fuelArray =  Array.from(fuel)
     let patternForFindingFuelAmount = /^\s*\d+\s*MIN FUEL\s*-\s*\d+\s*MAX FUEL\s*$/i
     let divsMatchingExactPattern = fuelArray.filter(div => patternForFindingFuelAmount.test(div.textContent.trim()))
     let matchingString = divsMatchingExactPattern[0].textContent
     let patterForMatchingString = /(\d+)\s*MIN FUEL\s*-\s*(\d+)\s*MAX FUEL/i
     let match = matchingString.match(patterForMatchingString)
     let minFuel, maxFuel
     if(match) {
        minFuel = match[1]
        maxFuel = match[2]
 
        minFuel = Number(minFuel)
        maxFuel = Number(maxFuel)
 
        console.log('min fuel: ', minFuel)
        console.log('max fuel: ', maxFuel)
        resolve({ minFuel, maxFuel });
     } else {
        console.log('Pattern not matched')
        resolve({ minFuel: 0, maxFuel: 0 });
     }
   });
 }