import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID!
const client = Twilio(accountSid, authToken)

export const verifyOTP = async (phone: string, otp: string) => {
  const verificationCheck = await client.verify
    .services(serviceSid)
    .verificationChecks.create({
      to: phone,
      code: otp,
    })

  return verificationCheck.status === 'approved'
}

export const sendOTP = async (phone: string, type: 'sms' | 'email') => {
  const channel = type === 'email' ? 'email' : 'sms'
  console.log('phone', phone)
  const verification = await client.verify.v2
    .services(serviceSid)

    .verifications.create({
      to: phone,
      channel: channel,
    })

  return verification
}
