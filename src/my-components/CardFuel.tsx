'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useFuelCalculator } from '../logic/useFuelCalculator'
import { useFuelDensity } from '../logic/useFuelDensity'
import { FuelCalculator } from './fuelCalculator'
import { FuelDensity } from './densityCalculator'

export default function Component() {
  const [activeTab, setActiveTab] = useState<string>('fuel-calculator');
  const {
    fuelInput,
    handleFuelInputChange,
    aircraftType,
    calculateFuelValues,
    display1,
    display2,
    display3,
  } = useFuelCalculator();
  const {
    density,
    volume,
    temperature,
    handleDensityChange,
    handleVolumeChange,
    handleTemperatureChange,
    fuelDensityResult
  } = useFuelDensity()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6 p-4 md:p-6'>
      <div className='flex flex-col items-center gap-4 w-full max-w-md'>
        <Tabs defaultValue='fuel-calculator' className='w-full' value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid grid-cols-2 w-full'>
            <TabsTrigger value='fuel-calculator'>Fuel Calculator</TabsTrigger>
            <TabsTrigger value='fuel-density'>Fuel Density</TabsTrigger>
          </TabsList>
          <TabsContent value='fuel-calculator'>
            <FuelCalculator
              fuelInput={fuelInput}
              handleFuelInputChange={handleFuelInputChange}
              aircraftType={aircraftType}
              calculateFuelValues={calculateFuelValues}
              display1={display1}
              display2={display2}
              display3={display3}
            />
          </TabsContent>
          <TabsContent value='fuel-density'>
            <FuelDensity
              density={density}
              volume={volume}
              temperature={temperature}
              handleDensityChange={handleDensityChange}
              handleVolumeChange={handleVolumeChange}
              handleTemperatureChange={handleTemperatureChange}
              fuelDensityResult={fuelDensityResult}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
