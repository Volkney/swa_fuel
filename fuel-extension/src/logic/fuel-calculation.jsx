import { useState, useEffect } from 'react';
import { getFuelData } from '../scrape-info/fuel-data.js';
import { getAircraftData } from '../scrape-info/aircraft-data.js';
import { getDateData } from '../scrape-info/date-data.js';
import { getFlightNumberData } from '../scrape-info/flight-number-data.js';
import { getGateData } from '../scrape-info/gate-data.js';

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
    const fetchAllData = async () => {
      const fuel = await getFuelData();
      const aircraft = await getAircraftData();
      const date = await getDateData();
      const flight = await getFlightNumberData();
      const gate = await getGateData();

      setFuelData(fuel);
      setAircraftData(aircraft);
      setDateData(date);
      setFlightData(flight);
      setGateNumber(gate);
    };

    fetchAllData();
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
      <h2 className="text-2xl font-bold mb-4">Fuel Calculator</h2>
      
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

export default FuelCalculator;