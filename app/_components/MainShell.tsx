import React from 'react'
import Navbar from './Navbar'

const MainShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header><Navbar /></header>
      <main className="w-full flex flex-col pt-20 bg-[#120f17]">
        {children}
      </main></>
  )
}

export default MainShell