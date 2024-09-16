import { NextResponse } from 'next/server'
import { createOrUpdateAccount } from '@/lib/actions/account.actions'
import { verifyRecatpchaToken } from '@/utils/recaptcha'
import { verifyOTP } from '@/utils/twillio'

export async function POST(request: Request) {
  try {
    //verify the otp
    const { identifier, otp } = await request.json()
    let phone = identifier

    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 },
      )
    }

    if (await verifyOTP(phone, otp)) {
      const user = await createOrUpdateAccount(phone, phone, '')
      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully',
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify OTP', details: error },
      { status: 500 },
    )
  }
}
