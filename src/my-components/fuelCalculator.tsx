import { FC, ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface FuelCalculatorProps {
  fuelInput: string;
  handleFuelInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  aircraftType: 'Non-Max' | 'MAX';
  calculateFuelValues: () => void;
  display1: number;
  display2: number;
  display3: number;
}

export const FuelCalculator: FC<FuelCalculatorProps> = ({
  fuelInput,
  handleFuelInputChange,
  aircraftType,
  calculateFuelValues,
  display1,
  display2,
  display3,
}) => {
  useEffect(() => {
    calculateFuelValues();
  }, [fuelInput, aircraftType]);

  return (
    <div>
      <div className='flex justify-center mt-4'>
        <Input
          type='number'
          placeholder='Enter a number'
          value={fuelInput}
          onChange={handleFuelInputChange}
          className='w-full p-2 text-center border rounded-md'
        />
      </div>
      <div className='flex justify-center mt-4'>
        <span>{aircraftType === 'Non-Max' ? '800-MAX' : 'Non-MAX'}</span>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full justify-center mt-4'>
        <div className='flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-md'>
          <span className='text-4xl font-bold'>{display1}</span>
          <span className='text-sm text-muted-foreground'>ONE</span>
        </div>
        <div className='flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-md'>
          <span className='text-4xl font-bold'>{display2}</span>
          <span className='text-sm text-muted-foreground'>TWO</span>
        </div>
        <div className='flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-md'>
          <span className='text-4xl font-bold'>{display3}</span>
          <span className='text-sm text-muted-foreground'>CENTER</span>
        </div>
      </div>
    </div>
  );
};
