export function getGateData() {
    return new Promise((resolve) => {
      let divs = document.querySelectorAll('div');
      let divsArray = Array.from(divs);
  
      // Define a pattern to match "Gate:<number>"
      let gatePattern = /Gate:(\d+)/i;
  
      // Find the div that matches the pattern
      let gateDiv = divsArray.find(div => gatePattern.test(div.textContent.trim()));
  
      if (gateDiv) {
         // Extract gate number from the div and convert to number
         let gateMatch = gateDiv.textContent.trim().match(gatePattern);
         if (gateMatch) {
             let gateNumber = parseInt(gateMatch[1].trim(), 10); // Convert to number
             console.log('Gate Number:', gateNumber);
             resolve(gateNumber);
         } else {
             console.log('Gate pattern not matched');
             resolve(0);
         }
      } else {
         console.log('No div with Gate information found');
         resolve(0);
      }
    });
  }