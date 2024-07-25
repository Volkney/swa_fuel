export function getAircraftData() {
    return new Promise((resolve) => {
      let divs = document.querySelectorAll('div');
      let divsArray = Array.from(divs);
  
      // Define a pattern to match "Aircraft Type:<type> Registry:<registry>"
      let pattern = /Aircraft Type:(.+?)Registry:(\w+)/i;
  
      // Find the div that matches the pattern
      let matchingDiv = divsArray.find(div => pattern.test(div.textContent.trim()));
  
      if (matchingDiv) {
         // Get the text content of the matching div
         let matchingString = matchingDiv.textContent.trim();
  
         // Extract aircraft type and registry from the matching string
         let match = matchingString.match(pattern);
  
         if (match) {
             let aircraftType = match[1].trim();
             let registry = match[2];
  
             console.log('Aircraft Type:', aircraftType);
             console.log('Registry:', registry);
             resolve({ type: aircraftType, registry: registry });
         } else {
             console.log('Pattern not matched');
             resolve({ type: '', registry: '' });
         }
      } else {
         console.log('No div matching the pattern found');
         resolve({ type: '', registry: '' });
      }
    });
  }