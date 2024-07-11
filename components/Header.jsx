import React from 'react'

const Header = () => {
  return (
    <header className='flex fixed top-0 left-0 items-center justify-center h-[80px] w-full'>
      <nav className='wrapper xl:max-w-[1600px] flex w-full justify-between items-center'>
        <h1 className='text-2xl font-black text-white'>Dashboard</h1>
        <p className='text-white hidden md:block'>Junior Backend Developer Task</p>
      </nav>
    </header>
  )
}

export default Header