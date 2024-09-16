'use client'
import { useRouter } from 'next/navigation'
const Login = () => {
  const router = useRouter()
  return (
    <button
      className="h-[55px] w-[164px] border-2 font-bold border-[#111111] rounded-full"
      onClick={() => router.push('/sign-in')}
    >
      LOGIN
    </button>
  )
}

export default Login
