import GradientText from '@/app/_components/GradientText'
import React, { Suspense } from 'react'
import DashboardPage from './page'
import {BarLoader} from "react-spinners"

const DashboardLayout = () => {
  return (
    <div className="w-full px-6">
            <GradientText
                colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                animationSpeed={0}
                showBorder={false}
                className="text-4xl tracking-wider p-2"
            >
                Dashboard
            </GradientText>
            <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='white' />}>
                <DashboardPage/>
            </Suspense>
        </div>
  )
}

export default DashboardLayout