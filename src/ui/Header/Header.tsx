import React from 'react'
import Link from 'next/link'
import LogoIcon from '@/assets/icons/LogoIcon'
import Login from '../LoginBtn/LoginBtn'
import { stackServerApp } from '@/stack'
import { UserButton } from '@stackframe/stack'
import RouteLoader from '../RouteLoader/RouteLoader'

const Header = async () => {
  const user = await stackServerApp.getUser()

  return (
    <>
      <RouteLoader />
      <header className="bg-white px-10 mx-auto">
        <div className="p-3 flex items-center justify-between border-b border-green-950">
          <LogoIcon />
          <div className="flex w-[80%] items-center justify-between">
            <ul className="flex gap-4 text-lg items-center">
              <li className="cursor-pointer hover:text-[#5C7A2B]">Classes</li>
              <li className="cursor-pointer hover:text-[#5C7A2B]">Events</li>
              <li className="cursor-pointer hover:text-[#5C7A2B]">Outreach</li>
              <li className="cursor-pointer hover:text-[#5C7A2B]">Youth</li>
              <li className="cursor-pointer hover:text-[#5C7A2B]">
                Get Involved
              </li>
              <li className="cursor-pointer hover:text-[#5C7A2B]">
                Writers Bolt
              </li>
              {user && (
                <li className="cursor-pointer hover:text-[#5C7A2B]">
                  {' '}
                  <Link href="/form">Forms</Link>
                </li>
              )}
              <li className="cursor-pointer hover:text-[#5C7A2B]">About Us</li>
            </ul>
            <div className="flex gap-6 items-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                {/* SVG Path */}
              </svg>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                {/* SVG Path */}
              </svg>
              {!user && <Login />}
              <button className="bg-[#6F923E] h-[55px] w-[164px] font-bold text-white rounded-full transition-transform transform hover:scale-105 hover:bg-[#5C7A2B]">
                DONATE
              </button>
              {user && <UserButton />}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
