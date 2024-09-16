import { AcceptHosted } from 'react-acceptjs'

interface AuthorizeFormProps {
  formToken: string | null
}

const AuthorizeForm: React.FC<AuthorizeFormProps> = ({ formToken }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {formToken ? (
        <AcceptHosted formToken={formToken} integration="redirect">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300">
            Continue to Payment
          </button>
        </AcceptHosted>
      ) : (
        <div className="p-6 bg-white rounded-md shadow-md">
          <p className="text-red-500 font-medium">
            You must have a form token. Have you made a call to the
            <span className="font-semibold">
              {' '}
              getHostedPaymentPageRequestAPI
            </span>
            ?
          </p>
        </div>
      )}
    </div>
  )
}

export default AuthorizeForm
