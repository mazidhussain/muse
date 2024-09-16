'use client'
import {
  CredentialSignIn,
  CredentialSignUp,
  MagicLinkSignIn,
  OAuthButton,
  OAuthButtonGroup,
} from '@stackframe/stack'
import Link from 'next/link'
import { useState } from 'react'

const LoginComponent = ({ tab }: { tab: string }) => {
  switch (tab) {
    case 'magic':
      return <MagicLinkSignIn />
    case 'email':
      return <CredentialSignIn />
    case 'password':
      return <></>
    default:
      return <></>
  }
}

const Page = () => {
  const [tab, setTab] = useState<string>('magic')

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
            <Link className="underline font-medium" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <OAuthButtonGroup
          type="sign-up"
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
        <CredentialSignUp />
      </div>
    </div>
  )
}

export default Page
