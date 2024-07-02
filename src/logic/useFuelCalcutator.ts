import { useState, ChangeEvent } from 'react'

export function useFuelCalculator () {
    const [fuelInput, setFuelInput] = useState<string>('')
    const handleFuelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFuelInput(e.target.value);
    };
    const fuelCalculatorResult = fuelInput ? Math.floor(parseFloat(fuelInput) / 3) : 0;

    return {
      fuelInput,
      handleFuelInputChange,
      fuelCalculatorResult,
    };
    
}
