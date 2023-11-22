import { pricing } from '@/constants/pricing'
import React from 'react'
import { PricingCard } from './pricing-card'


export function Pricing() {
  return (
    <>
     <div className='text-center space-y-2 p-4 mb-6'>
     <h2 className='text-2xl md:text-3xl font-semibold my-3 '>Coll8er priced your way</h2>
     <p className='text-neutral-600 md:text-lg'>Trusted by millions, Coll8er powers teams all around the world.</p>
     </div>
    <div className='w-full grid grid-cols-1 p-4 md:grid-cols-2 gap-4'>
      {
          pricing.map(data => (
              <PricingCard key={data.type} data={data} />
              ))
            }
    </div>
            </>
  )
}
