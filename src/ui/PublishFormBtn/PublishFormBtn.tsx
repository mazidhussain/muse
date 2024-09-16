'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { updateFormById } from '@/lib/actions/form.actions'

const PublishFormBtn = ({
  id,
  formData,
}: {
  id: string | null
  formData: any
}) => {
  const router = useRouter()
  const handlePublish = async () => {
    if (!id) return
    const form = formData.actions.getData()
    try {
      await updateFormById(id, form)
      toast.success('Form successfully published!', { autoClose: 1000 })
      router.push('/form')
    } catch (error) {
      console.error('Error updating form:', error)
    }
  }

  return (
    <button
      onClick={handlePublish}
      className="flex items-center justify-center gap-1 border py-2 px-3 rounded-md bg-publish-btn-gradient text-white hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M5 3h14"></path>
        <path d="m18 13-6-6-6 6"></path>
        <path d="M12 7v14"></path>
      </svg>
      {/* {formData.actions ? 'Publish' : 'Save'} */}
      {true ? 'Publish' : 'Save'}
    </button>
  )
}

export default PublishFormBtn
