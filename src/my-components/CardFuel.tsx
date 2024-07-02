import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

export default function Component () {
  const [activeTab, setActiveTab] = useState('fuel-calculator')
  const [fuelInput, setFuelInput] = useState('')
  const [density, setDensity] = useState('')
  const [volume, setVolume] = useState('')
  const [temperature, setTemperature] = useState('')
  const handleFuelInputChange = (e) => {
    setFuelInput(e.target.value)
  }
  const handleDensityChange = (e) => {
    setDensity(e.target.value)
  }
  const handleVolumeChange = (e) => {
    setVolume(e.target.value)
  }
  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value)
  }
  const fuelCalculatorResult = fuelInput ? Math.floor(parseFloat(fuelInput) / 3) : 0
  const fuelDensityResult =
    density && volume && temperature
      ? (parseFloat(density) * parseFloat(volume)) / (1 + 0.00067 * (parseFloat(temperature) - 15.5))
      : 0
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6 p-4 md:p-6'>
      <div className='flex flex-col items-center gap-4 w-full max-w-md'>
        <Tabs defaultValue='fuel-calculator' className='w-full' value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid grid-cols-2 w-full'>
            <TabsTrigger value='fuel-calculator'>Fuel Calculator</TabsTrigger>
            <TabsTrigger value='fuel-density'>Fuel Density</TabsTrigger>
          </TabsList>
          <TabsContent value='fuel-calculator'>
            <div className='flex justify-center mt-4'>
              <Input
                type='number'
                placeholder='Enter a number'
                value={fuelInput}
                onChange={handleFuelInputChange}
                className='w-full p-2 text-center border rounded-md'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full justify-center mt-4'>
              <div className='flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-md'>
                <span className='text-4xl font-bold'>{fuelCalculatorResult}</span>
                <span className='text-sm text-muted-foreground'>Fuel Calculator Result</span>
              </div>
              <div className='flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-md'>
                <span className='text-4xl font-bold'>{fuelCalculatorResult}</span>
                <span className='text-sm text-muted-foreground'>Fuel Calculator Result</span>
              </div>
              <div className='flex flex-col items-center justify-center p-4 bg-background rounded-md shadow-md'>
                <span className='text-4xl font-bold'>{fuelCalculatorResult}</span>
                <span className='text-sm text-muted-foreground'>Fuel Calculator Result</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='fuel-density'>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
