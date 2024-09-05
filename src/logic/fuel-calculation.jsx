import { useState, useEffect } from 'react';

const FuelCalculator = () => {
  const [fuelData, setFuelData] = useState({ minFuel: 0, maxFuel: 0 });
  const [useMaxFuel, setUseMaxFuel] = useState(true);
  const [aircraftData, setAircraftData] = useState({ type: '', registry: '' });
  const [dateData, setDateData] = useState('');
  const [flightData, setFlightData] = useState({ number: '', origin: '', destination: '' });
  const [gateNumber, setGateNumber] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState({ display1: 0, display2: 0, display3: 0 });

  const MAX_800_AC = 8500;
  const NON_MAX_AC = 8600;

  useEffect(() => {
    const scrapeData = async () => {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: performScraping,
        }, (results) => {
          if (results && results[0].result) {
            const scrapedData = results[0].result;
            setFuelData(scrapedData.fuelData);
            setAircraftData(scrapedData.aircraftData);
            setDateData(scrapedData.dateData);
            setFlightData(scrapedData.flightNumberData);
            setGateNumber(scrapedData.gateData);
            chrome.storage.local.set({scrapedData: scrapedData});
          }
        });
      });
    };

    scrapeData();
  }, []);

  useEffect(() => {
    calculateFuel();
  }, [fuelData, useMaxFuel, aircraftData]);

  const calculateFuel = () => {
    const fuelAmount = useMaxFuel ? fuelData.maxFuel : fuelData.minFuel;
    let display1, display2, display3;

    if (aircraftData.type.includes('MAX')) {
      if (fuelAmount < 17000) {
        const dividedValue = fuelAmount / 2;
        display1 = Math.ceil(dividedValue);
        display2 = Math.floor(dividedValue);
        display3 = 0;
      } else {
        display1 = MAX_800_AC;
        display2 = MAX_800_AC;
        display3 = fuelAmount - (MAX_800_AC + MAX_800_AC);
      }
    } else {
      if (fuelAmount < 17200) {
        const dividedValue = fuelAmount / 2;
        display1 = Math.ceil(dividedValue);
        display2 = Math.floor(dividedValue);
        display3 = 0;
      } else {
        display1 = NON_MAX_AC;
        display2 = NON_MAX_AC;
        display3 = fuelAmount - (NON_MAX_AC + NON_MAX_AC);
      }
    }

    setCalculatedValues({ 
      display1: display1.toFixed(0), 
      display2: display2.toFixed(0), 
      display3: display3.toFixed(0) 
    });
  };

  const toggleFuelType = () => {
    setUseMaxFuel(!useMaxFuel);
  };

  return (
    <div className="w-full min-w-[300px] max-w-[600px] p-4 bg-gray-100">
      
      {/* Row with 4 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="bg-blue-200 p-2 rounded">
          <p className="font-semibold">Station</p>
          <p>{flightData.origin}</p>
        </div>
        <div className="bg-green-200 p-2 rounded">
          <p className="font-semibold">Flight #</p>
          <p>{flightData.number}</p>
        </div>
        <div className="bg-yellow-200 p-2 rounded">
          <p className="font-semibold">Aircraft</p>
          <p>{aircraftData.registry}</p>
        </div>
        <div className="bg-red-200 p-2 rounded">
          <p className="font-semibold">Date</p>
          <p>{dateData}</p>
        </div>
      </div>

      {/* Row with 2 columns */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-purple-200 p-2 rounded">
          <p className="font-semibold">Min Fuel</p>
          <p>{fuelData.minFuel}</p>
        </div>
        <div className="bg-indigo-200 p-2 rounded">
          <p className="font-semibold">Max Fuel</p>
          <p>{fuelData.maxFuel}</p>
        </div>
      </div>

      {/* Column with 5 rows */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="bg-gray-200 p-2 rounded">
          <button 
            onClick={toggleFuelType}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Toggle to {useMaxFuel ? 'Min Fuel' : 'Max Fuel'}
          </button>
        </div>
        <div className="bg-gray-200 p-2 rounded">
          <p className="font-semibold">Display 1</p>
          <p>{calculatedValues.display1}</p>
        </div>
        <div className="bg-gray-200 p-2 rounded">
          <p className="font-semibold">Display 2</p>
          <p>{calculatedValues.display2}</p>
        </div>
        <div className="bg-gray-200 p-2 rounded">
          <p className="font-semibold">Display 3</p>
          <p>{calculatedValues.display3}</p>
        </div>
        <div className="bg-gray-200 p-2 rounded">
          <p className="font-semibold">Current Fuel</p>
          <p>{useMaxFuel ? 'Max Fuel' : 'Min Fuel'}: {useMaxFuel ? fuelData.maxFuel : fuelData.minFuel}</p>
        </div>
      </div>

      {/* Row with 1 column */}
      <div className="bg-teal-200 p-2 rounded">
        <p className="font-semibold">Gate</p>
        <p>{gateNumber}</p>
      </div>
    </div>
  );
};

// This function will be stringified and executed in the context of the web page
function performScraping() {
  function getAircraftData() {
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

  function getDateData() {
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

  function getFlightNumberData() {
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

  function getFuelData() {
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

  function getGateData() {
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

  // Execute all scraping functions and return the results
  return Promise.all([
    getAircraftData(),
    getDateData(),
    getFlightNumberData(),
    getFuelData(),
    getGateData()
  ]).then(([aircraftData, dateData, flightNumberData, fuelData, gateData]) => {
    return { aircraftData, dateData, flightNumberData, fuelData, gateData };
  });
}

export default FuelCalculator;