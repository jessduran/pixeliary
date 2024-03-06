import React from 'react'
import moment from 'moment'

function Header() {
  const year = moment().year();

  return (
    <header>
      <div className="flex justify-between max-w-screen-xl mx-auto pt-12 px-8">
        <h1 className="bold text-4xl font-serif">a year in pixels</h1>
        <h1 className="bold text-4xl font-serif text-right">{year}</h1>
      </div>
    </header>
  )
}

export default Header