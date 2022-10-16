import React from 'react'
import FCCarousel from './FCCarousel'

export default function FCBanner() {
  return (
    <div className='banner_container'>
      <div className='tag-line'>
        <h1>Crypto currency Prices</h1>
        <span>The top 10 currencies in the market!</span>
      </div>
      <FCCarousel />
    </div>
  )
}
