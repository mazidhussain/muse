'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { createForm } from '@/lib/actions/form.actions'
import { useApi } from '@/hooks/useApi'

const FormCreateModal = () => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [response, fetchForm] = useApi(() => createForm(name, description, []))

  const handleSave = async (): Promise<void> => {
    fetchForm()
  }

  React.useEffect(() => {
    if (response.isSuccess && response.data) {
      const formData = JSON.parse(response.data)
      toast.success('Form successfully created!', { autoClose: 1000 })
      router.push(`/create-form/?id=${formData?._id}&name=${formData?.name}`)
    } else if (response.error) {
      toast.error('Error creating form. Please try again.', { autoClose: 1000 })
    }
  }, [response, router])

  return (
    <div className="flex flex-col p-2">
      <span className="text-sm">
        Create a new form to start collecting responses.
      </span>
      <label className="mt-5 text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Name
      </label>
      <input
        type="text"
        className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="mt-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Description
      </label>
      <textarea
        className="mt-2 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="mt-5 bg-[#6F923E] text-white rounded-md h-10"
        onClick={handleSave}
        disabled={response.isFetching}
      >
        {response.isFetching ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}

export default FormCreateModal
