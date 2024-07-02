import { useState, ChangeEvent } from 'react';

export function useFuelCalculator() {
  const [fuelInput, setFuelInput] = useState<string>('');
  const [aircraftType, setAircraftType] = useState<'aircraftOne' | 'aircraftTwo'>('aircraftOne');
  const [display1, setDisplay1] = useState<number>(0);
  const [display2, setDisplay2] = useState<number>(0);
  const [display3, setDisplay3] = useState<number>(0);

  const MAX_800_AC = 8500;
  const NON_MAX_AC = 8600;

  const handleFuelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFuelInput(e.target.value);
  };

  const calculateFuelValues = () => {
    const enteredNumber = parseFloat(fuelInput);
    if (isNaN(enteredNumber)) {
      setDisplay1(0);
      setDisplay2(0);
      setDisplay3(0);
      return;
    }

    if (aircraftType === 'aircraftOne') {
      if (enteredNumber < 17200) {
        const dividedValue = enteredNumber / 2;
        setDisplay1(Math.ceil(dividedValue));
        setDisplay2(Math.floor(dividedValue));
        setDisplay3(0);
      } else {
        setDisplay1(NON_MAX_AC);
        setDisplay2(NON_MAX_AC);
        setDisplay3(enteredNumber - (NON_MAX_AC + NON_MAX_AC));
      }
    } else if (aircraftType === 'aircraftTwo') {
      if (enteredNumber < 17000) {
        const dividedValue = enteredNumber / 2;
        setDisplay1(Math.ceil(dividedValue));
        setDisplay2(Math.floor(dividedValue));
        setDisplay3(0);
      } else {
        setDisplay1(MAX_800_AC);
        setDisplay2(MAX_800_AC);
        setDisplay3(enteredNumber - (MAX_800_AC + MAX_800_AC));
      }
    }
  };

  return {
    fuelInput,
    handleFuelInputChange,
    aircraftType,
    calculateFuelValues,
    display1,
    display2,
    display3,
  };
}
