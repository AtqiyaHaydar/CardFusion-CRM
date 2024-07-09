"use client"

import React from 'react'
import { Snowfall } from 'react-snowfall'

const SnowBackground = ({ children }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Snowfall color="white" snowflakeCount={75} />
      {children}
    </div>
  )
}

export default SnowBackground