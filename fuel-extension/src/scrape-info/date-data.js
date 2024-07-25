export function getDateData() {
    return new Promise((resolve) => {
      let divs = document.querySelectorAll('div');
      let divsArray = Array.from(divs);
  
      // Define a pattern to match "Date:MM/DD/YYYY"
      let datePattern = /Date:(\d{2})\/(\d{2})\/\d{4}/i;
  
      // Find the div that matches the pattern
      let dateDiv = divsArray.find(div => datePattern.test(div.textContent.trim()));
  
      if (dateDiv) {
         // Extract date string from the div
         let dateMatch = dateDiv.textContent.trim().match(datePattern);
         if (dateMatch) {
             let month = dateMatch[1].trim(); // Extract month (group 1)
             let day = dateMatch[2].trim();   // Extract day (group 2)
  
             let monthDay = `${month}/${day}`;
             console.log('Date: ', monthDay);
             resolve(monthDay);
         } else {
             console.log('Date pattern not matched');
             resolve('');
         }
      } else {
         console.log('No div with Date information found');
         resolve('');
      }
    });
  }