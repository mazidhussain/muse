'use client'
import { createPaymentRequest } from '@/lib/actions/payment.actions'
import React, { useState } from 'react'
import './style.css'
import AuthorizeForm from '@/ui/AuthorizeForm/AuthorizeForm'
import { toast } from 'react-toastify'

const Page: React.FC = () => {
  const [amount, setAmount] = useState<number>(0)
  const [email, setEmail] = useState<string>('')
  const [token, setToken] = useState<string>('')

  const handlePayment = async () => {
    if (!email || !email.includes('@')) {
      console.log('Please enter a valid email.')
      return
    }

    if (isNaN(amount) || amount <= 0) {
      console.log('Please enter a valid amount.')
      return
    }

    const token = await createPaymentRequest(amount, email)
    console.log('token', token)
    if (token) {
      setToken(token)
    } else {
      toast.error('Please try again.', { autoClose: 1000 })
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {token === '' ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Payment Form
            </h2>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Amount"
              value={amount || ''}
              onChange={handleAmountChange}
            />
            <button
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </>
        ) : (
          <AuthorizeForm formToken={token} />
        )}
      </div>
    </div>
  )
}

export default Page
