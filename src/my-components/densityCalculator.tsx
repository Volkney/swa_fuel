import { FC, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

interface FuelDensityProps {
  density: string;
  volume: string;
  temperature: string;
  handleDensityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTemperatureChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fuelDensityResult: number;
}

export const FuelDensity: FC<FuelDensityProps> = ({
  density,
  volume,
  temperature,
  handleDensityChange,
  handleVolumeChange,
  handleTemperatureChange,
  fuelDensityResult,
}) => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-md'>
        <span className='text-4xl font-bold'>{fuelDensityResult.toFixed(2)}</span>
        <span className='text-sm text-muted-foreground'>Fuel Density Result</span>
      </div>
      <div className='flex flex-col items-center gap-2 w-full'>
        <Input
          type='number'
          placeholder='Density'
          value={density}
          onChange={handleDensityChange}
          className='w-full p-2 text-center border rounded-md'
        />
        <Input
          type='number'
          placeholder='Volume'
          value={volume}
          onChange={handleVolumeChange}
          className='w-full p-2 text-center border rounded-md'
        />
        <Input
          type='number'
          placeholder='Temperature'
          value={temperature}
          onChange={handleTemperatureChange}
          className='w-full p-2 text-center border rounded-md'
        />
      </div>
    </div>
  );
};
