'use client'
import MobileLogin from '@/ui/MobileLogin/MobileLogin'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const router = useRouter()
  const [loginType, setLoginType] = useState<string>('')
  useEffect(() => {
    if (type) setLoginType(type)
    else router.push('/')
  }, [type])

  return (
    <div className="h-[600px] flex justify-center items-center">
      {loginType == '' ? (
        <div>Loading</div>
      ) : (
        <div className="w-[300px]">
          <h2 className="text-2xl font-semibold text-black text-center mb-4">
            Welcome to the Muse
          </h2>
          <MobileLogin type={loginType} />
        </div>
      )}
    </div>
  )
}

export default Page
