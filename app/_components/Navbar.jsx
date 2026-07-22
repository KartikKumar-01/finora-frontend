"use client"
import React from 'react'
import GradientText from './GradientText'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { HomeIcon, LayoutDashboard, LogIn, PlusCircle, ReceiptText } from 'lucide-react'
import { authStore } from '@/store/auth.store'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTransactionDialogStore } from '@/store/createTransactionDialog.store'

const Navbar = () => {
  const router = useRouter();
  const isAuthenticated = authStore((s) => s.isAuthenticated);
  const user = authStore((s) => s.user);
  const logout = authStore((s) => s.logout);
  const pathName = usePathname();
  const params = useParams();
  const accountId = typeof params.id === "string" ? params.id : undefined

  const { open } = useTransactionDialogStore();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  }

  const openDialog = () => {
    if (pathName.startsWith('/account')) {
      open(accountId);
    } else open();
  }

  const avatarImage = user?.avatarUrl || "https://github.com/shadcn.png";

  return (
    <div className={`bg-[#1b1722] fixed top-0 w-full h-16 flex justify-between px-4 py-2 z-10`}>
      <div className='flex justify-center items-center'>
        <h1>
          <GradientText
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            animationSpeed={8}
            showBorder={false}
            className="custom-class text-5xl tracking-wider p-2"
          >
            Finora
          </GradientText>
        </h1>
      </div>
      <div className="flex gap-2 h-full items-center justify-center text-white">
        <div className='flex items-center justify-center'>
          {isAuthenticated ? (
            <div className='flex items-center justify-center gap-1'>
              {
                pathName !== '/dashboard' ? <Button onClick={() => router.replace('/dashboard')} className="h-10 py-4 px-2 font-bold rounded-lg cursor-pointer bg-gradient-to-r from-[#5227FF] to-[#B497CF] hover:from-[#4420E0] hover:to-[#A583C6] transition-all duration-300 ease-in-out shadow-md hover:shadow-violet-500/30 text-white">
                  <LayoutDashboard /><span className="hidden md:inline">Dashboard </span>
                </Button> : <Button onClick={() => router.replace('/')} className="h-10 py-4 px-2 font-bold rounded-lg cursor-pointer bg-gradient-to-r from-[#5227FF] to-[#B497CF] hover:from-[#4420E0] hover:to-[#A583C6] transition-all duration-300 ease-in-out shadow-md hover:shadow-violet-500/30 text-white">
                  <HomeIcon /><span className="hidden md:inline">Home</span>
                </Button>
              }
              <Button onClick={openDialog} className="h-10 py-4 px-2 font-bold rounded-lg cursor-pointer bg-linear-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 transition-all duration-200  hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/20">
                <ReceiptText /><span className="hidden md:inline">Add Transaction</span>
              </Button>
            </div>

          )
            :
            <Button onClick={() => router.push('/login')} className="h-10 py-4 px-2 font-bold rounded-lg cursor-pointer bg-linear-to-r from-violet-600 to-purple-500 text-white hover:from-violet-700 hover:to-purple-600 transition-all">
              <LogIn /><span className="hidden md:inline">Login </span>
            </Button>}
        </div>
        <div className='flex items-center justify-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className='w-10 h-10 cursor-pointer'>
                  <AvatarImage src={avatarImage} alt="shadcn" sizes='' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30 m-3 rounded-xl bg-[#18182F] text-zinc-100 p-2 shadow-xl">
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-md hover:bg-zinc-800">Profile</DropdownMenuItem>
                <DropdownMenuItem className="rounded-md hover:bg-zinc-800">Billing</DropdownMenuItem>
                <DropdownMenuItem className="rounded-md hover:bg-zinc-800">Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className='bg-zinc-500' />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleLogout()} className='rounded-md text-red-500 hover:bg-red-700/10 focus:bg-red-500/10' variant="destructive">Log out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Navbar