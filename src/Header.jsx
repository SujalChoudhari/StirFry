import React from 'react'
import "./Header.css"

function Header({ children }) {
  const handleLogoOnClick = () => {
    window.location.href = '/'
  }

  return (
    <div className='header'>
      <h1 onClick={handleLogoOnClick}>🍳 Stir Fry</h1>
      <p>Be careful on stir fry, or you might have to cry.</p>
      {children}
    </div>

  )
}

export default Header