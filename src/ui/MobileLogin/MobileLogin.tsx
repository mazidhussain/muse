import React, { useRef, useState } from 'react'
import Otp from './Otp'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'

interface MobileLoginProps {
  type: string
}

const MobileLogin: React.FC<MobileLoginProps> = ({ type }) => {
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [showOtp, setShowOtp] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>('')
  const [error, setError] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsVerified] = useState(false)

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        const captcha = await fetch('/captcha', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        console.log('captcha', captcha)

        setIsVerified(true)
      }
    } catch (e) {
      setIsVerified(false)
    }
  }

  const handleChange = (token: string | null) => {
    setToken(token)
    handleCaptchaSubmission(token)
  }

  function handleExpired() {
    setIsVerified(false)
  }

  const handleChangePhone = (value: string) => {
    setPhone(value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleOTP = async () => {
    if (!isVerified) {
      toast.error('Please verify captcha.', { autoClose: 1000 })
      return
    }
    setError(null)
    try {
      if (type === 'mobile') {
        await loginRequestOtp(`+${phone}`, type, token)
      } else {
        await loginRequestOtp(email, type, token)
      }
      setShowOtp(true)
    } catch (err) {
      console.log('err', err)

      setError('Failed to send OTP. Please try again.')
    }
  }

  const handleOtpSubmit = async (otp: string) => {
    setError(null)
    try {
      if (type === 'mobile') {
        await verifyOtp(`+${phone}`, otp, token)
      } else {
        await verifyOtp(email, otp, token)
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.')
    }
  }

  return (
    <div className="flex flex-col items-stretch">
      {!showOtp && (
        <>
          {type === 'email' ? (
            <>
              <label className="text-sm font-medium text-gray-600 mb-1">
                Verify Email
              </label>
              <input
                className="h-9 w-full rounded-md border px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                id="email"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={handleChangeEmail}
              />
            </>
          ) : (
            <>
              <label
                className="text-sm font-medium label-color mb-1"
                htmlFor="mobile"
              >
                Mobile
              </label>
              <PhoneInput
                country={'us'}
                value={phone}
                onChange={handleChangePhone}
                inputStyle={{ width: '100%' }}
                containerStyle={{ marginBottom: '1rem' }}
              />
            </>
          )}
        </>
      )}
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {showOtp && <Otp onOtpSubmit={handleOtpSubmit} />}
      {!showOtp && (
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          ref={recaptchaRef}
          onChange={handleChange}
          onExpired={handleExpired}
        />
      )}
      {!showOtp && (
        <button
          className="inline-flex items-center bg-[#18181b] justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-[#18181b]/90 h-9 px-4 py-2 mt-6"
          type="button"
          onClick={handleOTP}
          disabled={!isVerified}
        >
          Send OTP
        </button>
      )}
    </div>
  )
}

async function loginRequestOtp(
  identifier: string,
  type: string,
  token: string | null,
): Promise<void> {
  const url = `/api/otp/send`
  try {
    await axios.post(
      url,
      { identifier, type },
      { headers: { 'Content-Type': 'application/json', Authorization: token } },
    )
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw error
  }
}

async function verifyOtp(
  identifier: string,
  otp: string,
  token: string | null,
): Promise<void> {
  const url = `/api/otp/verify`
  try {
    await axios.post(
      url,
      { identifier, otp },
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error verifying OTP:', error)
    throw error
  }
}

export default MobileLogin
