'use client'
import MobileLogin from '@/ui/MobileLogin/MobileLogin'
import { MagicLinkSignIn, OAuthButtonGroup } from '@stackframe/stack'
import Link from 'next/link'
import { useState } from 'react'

const LoginComponent = ({ tab }: { tab: string }) => {
  switch (tab) {
    case 'email':
      return <MagicLinkSignIn />
    case 'mobile':
      return <MobileLogin type="mobile" />
    default:
      return <></>
  }
}

const Page = () => {
  const [tab, setTab] = useState<string>('email')

  const handleTabs = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement
    const attributeValue = target.getAttribute('data-value')
    if (attributeValue) {
      setTab(attributeValue)
    }
  }

  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="w-[300px]">
        <div className="flex justify-center items-center flex-col mb-4">
          <h2 className="text-2xl font-semibold text-black">
            Sign in to your account
          </h2>
          <p className="text-md text-black">
            Don&apos;t have an account?{' '}
            <Link className="underline font-medium" href="/sign-up">
              Sign up
            </Link>
          </p>
        </div>
        <OAuthButtonGroup
          type="sign-in"
          mockProject={{
            config: {
              oauthProviders: [{ id: 'google' }],
            },
          }}
        />
        <div className="flex items-center justify-center my-6 stack-scope">
          <div className="flex-1">
            <div className="shrink-0 bg-border h-[1px] w-full"></div>
          </div>
          <div className="mx-2 text-sm text-zinc-500">Or continue with</div>
          <div className="flex-1">
            <div className="shrink-0 bg-border h-[1px] w-full"></div>
          </div>
        </div>
        <div className="w-full bg-[#f4f4f5] h-[36px] rounded-md flex gap-1 items-center justify-between mb-4">
          <button
            className={`w-full ml-1 h-[80%] rounded-sm text-sm font-semibold ${tab === 'email' ? 'bg-white' : 'text-gray'}`}
            data-value="email"
            onClick={handleTabs}
          >
            Email
          </button>
          <button
            className={`w-full mr-1 h-[80%] rounded-sm text-sm font-semibold ${tab === 'mobile' ? 'bg-white' : 'text-gray'}`}
            data-value="mobile"
            onClick={handleTabs}
          >
            Mobile
          </button>
        </div>
        {LoginComponent({ tab })}
      </div>
    </div>
  )
}

export default Page
