import React from 'react'
import Navbar from './Navbar'
import AddTransacitonDialog from '../(main)/account/_components/AddTransactionDialog'

const MainShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header><Navbar /></header>
      <main className="w-full flex flex-col pt-20 bg-[#120f17]">
        {children}
        <AddTransacitonDialog />
      </main></>
  )
}

export default MainShell