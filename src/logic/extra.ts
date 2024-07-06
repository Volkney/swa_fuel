// Get all div elements
const fuel = document.querySelectorAll('div');

// Convert NodeList to an array
const fuelArray = Array.from(fuel)

// Example matching string
const matchingString = '18200MIN FUEL - 18200MAX FUEL'

// Regular expression to capture min and max fuel values
const regex = /(\d+)\s*MIN FUEL\s*-\s*(\d+)\s*MAX FUEL/i

// Variables to hold min and max fuel values
let minFuel, maxFuel

// Execute the regular expression to extract the numbers
const match = matchingString.match(regex)

if (match) {
  // Capture groups from the regex match
  minFuel = match[1]
  maxFuel = match[2]
  // Convert to numbers if needed
  minFuel = Number(minFuel)
  maxFuel = Number(maxFuel)

  console.log('Min Fuel:', minFuel)
  console.log('Max Fuel:', maxFuel)
} else {
  console.log('Pattern not matched')
}

// Log the variables outside the conditional block
console.log('Min Fuel:', minFuel)
console.log('Max Fuel:', maxFuel)
