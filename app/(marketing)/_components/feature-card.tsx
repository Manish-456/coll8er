import { FeatureTypes } from '@/constants/features'
import Image from 'next/image'
import React from 'react'

interface FeatureCardProps {
  data : FeatureTypes
}
export function FeatureCard({data} : FeatureCardProps) {
  return (
    <div className='w-full rounded-sm shadow-sm bg-white p-4'>
      <div className="h-20 w-20 pl-2 relative">
        <Image src={data.image}
         alt={data.title}
         className='object-cover'
          fill />
      </div>
        <div className='my-4 '>
            <h3 className='text-xl font-medium mb-2'>{data.title}</h3>
            <p className='text-sm font-medium text-slate-600'>{data.description}</p>
        </div>
    </div>
  )
}
