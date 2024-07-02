import { useState, ChangeEvent } from 'react';

export function useFuelDensity() {
  const [density, setDensity] = useState<string>('');
  const [volume, setVolume] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');

  const handleDensityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDensity(e.target.value);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(e.target.value);
  };

  const handleTemperatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemperature(e.target.value);
  };

  const fuelDensityResult =
    density && volume && temperature
      ? (parseFloat(density) * parseFloat(volume)) / (1 + 0.00067 * (parseFloat(temperature) - 15.5))
      : 0;

  return {
    density,
    volume,
    temperature,
    handleDensityChange,
    handleVolumeChange,
    handleTemperatureChange,
    fuelDensityResult,
  };
}
