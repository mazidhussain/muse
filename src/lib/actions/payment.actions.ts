'use server'
import { AuthoriseDotNetAxios } from '@/utils/axios'

export const createPaymentRequest = async (
  amount: number,
  email: string,
): Promise<string | null> => {
  const response = await AuthoriseDotNetAxios.post('/', {
    getHostedPaymentPageRequest: {
      merchantAuthentication: {
        name: process.env.AUTHORIZE_NET_API_LOGIN_ID,
        transactionKey: process.env.AUTHORIZE_NET_TRANSACTION_KEY,
      },
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: amount,
        customer: {
          email: email,
        },
      },
      hostedPaymentSettings: {
        setting: [
          {
            settingName: 'hostedPaymentReturnOptions',
            settingValue:
              '{"showReceipt": true, "url": "https://google.com", "urlText": "Continue", "cancelUrl": "https://youtube.com", "cancelUrlText": "Cancel"}',
          },
        ],
      },
    },
  })

  const gatewayResponse = response.data
  console.log('gatewayResponse', gatewayResponse?.messages)

  if (gatewayResponse.messages.resultCode !== 'Ok') {
    return null
  }

  return gatewayResponse.token
}
