'use client'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className="flex items-center justify-center gap-1 border py-2 px-3 rounded-md bg-[#CC622D] cursor-pointer text-white hover:scale-105"
    >
      <svg
        width={20}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffff"
      >
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z" />
        </g>
      </svg>
      Back
    </div>
  )
}

export default BackButton
