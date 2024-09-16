import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react'

interface OtpInputProps {
  length?: number
  onOtpSubmit?: (otp: string) => void
}

const Otp: React.FC<OtpInputProps> = ({
  length = 6,
  onOtpSubmit = () => {},
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [])

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    const combinedOtp = newOtp.join('')
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp)

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1)
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf('')]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center gap-[3px]">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            ref={(input) => {
              if (input) {
                inputRefs.current[index] = input
              }
            }}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-1 focus:ring-black"
          />
        ))}
      </div>
      <button
        className="w-full inline-flex items-center bg-[#18181b] justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-[#18181b]/90 h-9 px-4 py-2 mt-6"
        type="button"
        onClick={() => onOtpSubmit(otp.join(''))}
      >
        Submit OTP
      </button>
    </div>
  )
}

export default Otp
