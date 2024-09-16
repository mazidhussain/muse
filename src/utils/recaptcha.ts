import axios from 'axios'

export async function verifyRecatpchaToken(token: string): Promise<boolean> {
  const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY

  if (!token) {
    return false
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    )

    if (response.data.success) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
