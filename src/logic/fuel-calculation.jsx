import { useState, useEffect } from 'react';
import mockData from '../mockData';

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
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.scripting) {
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
      } else {
        // Use mock data when not in Chrome extension environment
        setFuelData(mockData.fuel);
        setAircraftData(mockData.aircraft);
        setDateData(mockData.date);
        setFlightData(mockData.flight);
        setGateNumber(mockData.gate);
      }
    };

    scrapeData();
  }, []);

  function performScraping() {
    function getAircraftData() {
      return new Promise((resolve) => {
        let divs = document.querySelectorAll('div');
        let divsArray = Array.from(divs);
        let pattern = /Aircraft Type:(.+?)Registry:(\w+)/i;
        let matchingDiv = divsArray.find(div => pattern.test(div.textContent.trim()));
        if (matchingDiv) {
          let matchingString = matchingDiv.textContent.trim();
          let match = matchingString.match(pattern);
          if (match) {
            let aircraftType = match[1].trim();
            let registry = match[2];
            let aircraftTypeNumbers = aircraftType.replace(/\D/g, '');
            console.log('Aircraft Type (numbers only):', aircraftTypeNumbers);
            console.log('Registry:', registry);
            resolve({ type: aircraftTypeNumbers, registry: registry });
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
        let datePattern = /Date:(\d{2})\/(\d{2})\/\d{4}/i;
        let dateDiv = divsArray.find(div => datePattern.test(div.textContent.trim()));
        if (dateDiv) {
          let dateMatch = dateDiv.textContent.trim().match(datePattern);
          if (dateMatch) {
            let month = dateMatch[1].trim();
            let day = dateMatch[2].trim();
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
        let pattern = /PrePlan - Flight (\d+) (\w{3}) - (\w{3})/i;
        let matchingDiv = divsArray.find(div => pattern.test(div.textContent.trim()));
        if (matchingDiv) {
          let matchingString = matchingDiv.textContent.trim();
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
        let gatePattern = /Gate:(\d+)/i;
        let gateDiv = divsArray.find(div => gatePattern.test(div.textContent.trim()));
        if (gateDiv) {
          let gateMatch = gateDiv.textContent.trim().match(gatePattern);
          if (gateMatch) {
            let gateNumber = parseInt(gateMatch[1].trim(), 10);
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

  useEffect(() => {
    calculateFuel();
  }, [fuelData, useMaxFuel, aircraftData]);

  const calculateFuel = () => {
    const fuelAmount = useMaxFuel ? fuelData.maxFuel : fuelData.minFuel;
    let display1, display2, display3;
  
    // Check if the aircraft type is a MAX (700 or 800)
    const isMaxAircraft = aircraftData.type === '7' || aircraftData.type === '8';
  
    if (isMaxAircraft) {
      if (fuelAmount < 17000) {
        const dividedValue = fuelAmount / 2;
        display1 = Math.ceil(dividedValue);
        display2 = Math.floor(dividedValue);
        display3 = 0;
      } else {
        display1 = MAX_800_AC;
        display2 = MAX_800_AC;
        display3 = fuelAmount - (MAX_800_AC * 2);
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
        display3 = fuelAmount - (NON_MAX_AC * 2);
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
    <div className="font-sans max-w-[600px] mx-auto p-5 bg-[#ffffc9] border-2 border-black">
      <h1 className="text-lg font-bold text-center mb-3">SOUTHWEST AIRLINES FUEL TICKET</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        <div>
          <label className="text-xs font-bold">STATION</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{flightData.origin}</p>
        </div>
        <div>
          <label className="text-xs font-bold">FLIGHT NO</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{flightData.number}</p>
        </div>
        <div>
          <label className="text-xs font-bold">TAIL NO</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{aircraftData.registry}</p>
        </div>
        <div>
          <label className="text-xs font-bold">DATE</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{dateData}</p>
        </div>
      </div>
  
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label className="text-xs font-bold">MIN. FUEL</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{fuelData.minFuel}</p>
        </div>
        <div>
          <label className="text-xs font-bold">MAX.</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{fuelData.maxFuel}</p>
        </div>
      </div>
  
      <div className="mb-4">
        <label className="text-xs font-bold">PLANNED FUEL</label>
        <p className="border border-black bg-white p-3 text-xs h-[37px]">
          {useMaxFuel ? fuelData.maxFuel : fuelData.minFuel}
        </p>
      </div>
  
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <label className="text-xs font-bold">FUEL TYPE</label>
          <div className="flex items-center mt-1">
            <input type="checkbox" id="jet-a" checked disabled className="mr-1" />
            <label htmlFor="jet-a" className="text-xs">JET A</label>
          </div>
          <div className="flex items-center mt-1">
            <input type="checkbox" id="other" disabled className="mr-1" />
            <label htmlFor="other" className="text-xs">OTHER</label>
          </div>
        </div>
        <div className="flex-1 ml-4">
          <button 
            onClick={toggleFuelType}
            className="w-full bg-neutral-950 text-white py-2 mt-7 px-4 rounded-md text-xs font-bold overflow-hidden [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110 transition-all duration-300"
          >
            Toggle to {useMaxFuel ? 'Min Fuel' : 'Max Fuel'}
          </button>
        </div>
      </div>
  
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-3 text-xs font-bold text-left">TANKS</th>
            <th className="border border-black p-3 text-xs font-bold text-left">ARRIVAL FOB</th>
            <th className="border border-black p-3 text-xs font-bold text-left">PLANNED FUEL</th>
            <th className="border border-black p-3 text-xs font-bold text-left">DEPARTURE FOB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-3 text-xs">ONE</td>
            <td className="bg-white border border-black p-3 text-xs"></td>
            <td className="bg-white border border-black p-3 text-xs">{calculatedValues.display1}</td>
            <td className="bg-white border border-black p-3 text-xs"></td>
          </tr>
          <tr>
            <td className="border border-black p-3 text-xs">TWO</td>
            <td className="bg-white border border-black p-3 text-xs"></td>
            <td className="bg-white border border-black p-3 text-xs">{calculatedValues.display2}</td>
            <td className="bg-white border border-black p-3 text-xs"></td>
          </tr>
          <tr>
            <td className="border border-black p-3 text-xs">CENTER</td>
            <td className="bg-white border border-black p-3 text-xs"></td>
            <td className="bg-white border border-black p-3 text-xs">{calculatedValues.display3}</td>
            <td className="bg-white border border-black p-3 text-xs"></td>
          </tr>
          <tr>
            <td className="border border-black p-3 text-xs">TOTAL</td>
            <td className="bg-white border border-black p-3 text-xs"></td>
            <td className="bg-white border border-black p-3 text-xs">
              {calculatedValues.display1 && calculatedValues.display2 && calculatedValues.display3
                ? (Number(calculatedValues.display1) + Number(calculatedValues.display2) + Number(calculatedValues.display3)).toString()
                : ''}
            </td>
            <td className="bg-white border border-black p-3 text-xs"></td>
          </tr>
        </tbody>
      </table>
  
      <div className="flex justify-between mt-4">
        <div>
          <label className="text-xs font-bold">EQUIPMENT NO.</label>
        </div>
        <div>
          <label className="text-xs font-bold">GATE NO.</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{gateNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default FuelCalculator;