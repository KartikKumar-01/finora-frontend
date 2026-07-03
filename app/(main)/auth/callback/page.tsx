"use client"
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const AuthCallBackPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

  return (
    <div>Callback page {searchParams.get('code')}</div>
  )
}

export default AuthCallBackPage;