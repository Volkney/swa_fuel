export function getFlightNumberData() {
    return new Promise((resolve) => {
      let divs = document.querySelectorAll('div');
      let divsArray = Array.from(divs);
  
      // Define a pattern to match "PrePlan - Flight <flight_number> <origin> - <destination>"
      let pattern = /PrePlan - Flight (\d+) (\w{3}) - (\w{3})/i;
  
      // Find the div that matches the pattern
      let matchingDiv = divsArray.find(div => pattern.test(div.textContent.trim()));
  
      if (matchingDiv) {
         // Get the text content of the matching div
         let matchingString = matchingDiv.textContent.trim();
  
         // Extract flight number, origin, and destination from the matching string
         let match = matchingString.match(pattern);
  
         if (match) {
             let flightNumber = match[1];
             let origin = match[2];
             let destination = match[3];
  
             console.log('Flight Number:', flightNumber);
             console.log('Origin:', origin);
             console.log('Destination:', destination);
             resolve({ number: flightNumber, origin, destination });
         } else {
             console.log('Pattern not matched');
             resolve({ number: '', origin: '', destination: '' });
         }
      } else {
         console.log('No div matching the pattern found');
         resolve({ number: '', origin: '', destination: '' });
      }
    });
  }