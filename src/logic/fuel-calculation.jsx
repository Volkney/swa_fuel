import { useState, useEffect } from 'react';
import mockData from '../mockData'

const FuelCalculator = () => {
  const [fuelData, setFuelData] = useState({ minFuel: '', maxFuel: '' });
  const [useMaxFuel, setUseMaxFuel] = useState(true);
  const [aircraftData, setAircraftData] = useState({ type: '', registry: '' });
  const [dateData, setDateData] = useState('');
  const [flightData, setFlightData] = useState({ number: '', origin: '', destination: '' });
  const [gateNumber, setGateNumber] = useState('');
  const [calculatedValues, setCalculatedValues] = useState({ display1: '', display2: '', display3: '' });

  const MAX_800_AC = 8500;
  const NON_MAX_AC = 8600;

  useEffect(() => {
    const fetchData = async () => {
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.scripting) {
        // Chrome extension environment
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
        // Non-Chrome extension environment (e.g., Vite development server)
        setFuelData(mockData.fuel);
        setAircraftData(mockData.aircraft);
        setDateData(mockData.date);
        setFlightData(mockData.flight);
        setGateNumber(mockData.gate);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculateFuel();
  }, [fuelData, useMaxFuel, aircraftData]);

  const calculateFuel = () => {
    const fuelAmount = useMaxFuel ? Number(fuelData.maxFuel) : Number(fuelData.minFuel);
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
    <div className="font-sans max-w-[600px] mx-auto p-5 bg-[#ffffc9] border-2 border-black">
      <h1 className="text-lg font-bold text-center mb-5">SOUTHWEST AIRLINES FUEL TICKET</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
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

      <div className="mb-4">
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
            <td className="border border-black p-3 text-xs"></td>
            <td className="border border-black p-3 text-xs">{calculatedValues.display1}</td>
            <td className="border border-black p-3 text-xs"></td>
          </tr>
          <tr>
            <td className="border border-black p-3 text-xs">TWO</td>
            <td className="border border-black p-3 text-xs"></td>
            <td className="border border-black p-3 text-xs">{calculatedValues.display2}</td>
            <td className="border border-black p-3 text-xs"></td>
          </tr>
          <tr>
            <td className="border border-black p-3 text-xs">CENTER</td>
            <td className="border border-black p-3 text-xs"></td>
            <td className="border border-black p-3 text-xs">{calculatedValues.display3}</td>
            <td className="border border-black p-3 text-xs"></td>
          </tr>
          <tr>
            <td className="border border-black p-3 text-xs">TOTAL</td>
            <td className="border border-black p-3 text-xs"></td>
            <td className="border border-black p-3 text-xs">
              {calculatedValues.display1 && calculatedValues.display2 && calculatedValues.display3
                ? (Number(calculatedValues.display1) + Number(calculatedValues.display2) + Number(calculatedValues.display3)).toString()
                : ''}
            </td>
            <td className="border border-black p-3 text-xs"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <div>
          <label className="text-xs font-bold">EQUIPMENT NO.</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]"></p>
        </div>
        <div>
          <label className="text-xs font-bold">GATE NO.</label>
          <p className="border border-black bg-white p-3 text-xs h-[37px]">{gateNumber}</p>
        </div>
      </div>

      {/* Toggle button added at the bottom */}
      <div className="mt-4">
        <button 
          onClick={toggleFuelType}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Toggle to {useMaxFuel ? 'Min Fuel' : 'Max Fuel'}
        </button>
      </div>
    </div>
  );
};

export default FuelCalculator;