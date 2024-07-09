import Dashboard from '@/components/Dashboard'
import Header from '@/components/Header'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='h-screen w-full overflow-hidden'>
      <Header />
      <div className='wrapper mt-[80px]'>
        <Dashboard />
      </div>
    </div>
  )
}

export default DashboardPage