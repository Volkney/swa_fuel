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
    <div>
      <h2>Fuel Calculator</h2>
      <p>Date: {dateData}</p>
      <p>Flight: {flightData.number} ({flightData.origin} - {flightData.destination})</p>
      <p>Gate: {gateNumber}</p>
      <p>Aircraft Type: {aircraftData.type}</p>
      <p>Aircraft Registry: {aircraftData.registry}</p>
      <p>Current Fuel Type: {useMaxFuel ? 'Max Fuel' : 'Min Fuel'}</p>
      <p>Fuel Amount: {useMaxFuel ? fuelData.maxFuel : fuelData.minFuel}</p>
      <button onClick={toggleFuelType}>
        Toggle to {useMaxFuel ? 'Min Fuel' : 'Max Fuel'}
      </button>
      <p>Display 1: {calculatedValues.display1}</p>
      <p>Display 2: {calculatedValues.display2}</p>
      <p>Display 3: {calculatedValues.display3}</p>
    </div>
  );
};

export default FuelCalculator;