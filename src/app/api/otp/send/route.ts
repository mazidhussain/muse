import { NextResponse } from 'next/server'
import { sendOTP } from '@/utils/twillio'
import { verifyRecatpchaToken } from '@/utils/recaptcha'

export async function POST(request: Request) {
  try {
    //validate the recaptcha token
    const recaptcha_token = request.headers.get('Authorization')

    if (!recaptcha_token) {
      return NextResponse.json(
        { error: 'Authorization header is required' },
        { status: 400 },
      )
    }

    if (!(await verifyRecatpchaToken(recaptcha_token))) {
      return NextResponse.json(
        { error: 'Failed to verify reCAPTCHA' },
        { status: 400 },
      )
    }

    const { identifier, type } = await request.json()
    if (!identifier) {
      return NextResponse.json(
        { error: 'Identifier is required' },
        { status: 400 },
      )
    }
    let phone = identifier
    if (type === 'sms' && !phone.startsWith('+')) {
      return NextResponse.json(
        {
          error:
            'Phone number must be in E.164 format, including the leading + sign',
        },
        { status: 400 },
      )
    }

    const channel = type === 'email' ? 'email' : 'sms'
    const verification = await sendOTP(phone, channel)

    return NextResponse.json(verification)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send OTP', details: error },
      { status: 500 },
    )
  }
}
