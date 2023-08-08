import React from 'react'
import "./Header.css"

function Header({children}) {
  return (
    <div className='header'>
        <h1>🍳 Stir Fry</h1>
        <p>Be careful on stir fry, or you might have to cry.</p>
        {children}
    </div>

  )
}

export default Header