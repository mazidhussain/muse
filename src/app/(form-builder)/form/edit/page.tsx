'use client'
import React, { useState, useEffect } from 'react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import FormBuilder from '@/ui/FormBuilder/FormBuilder'
import PreviewDialogBtn from '@/ui/PreviewDialogBtn/PreviewDialogBtn'
import PublishFormBtn from '@/ui/PublishFormBtn/PublishFormBtn'
import { Field } from '@/interfaces/formInterfaces'

import { getFormById } from '@/lib/actions/form.actions'
import ShareFormBtn from '@/ui/ShareFormBtn/ShareFormBtn'

const FormEditPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState<Field[]>([])
  const [fields, setFields] = useState<Field[]>([])
  const [id, setId] = useState('*')

  const getFormData = async (formId: string) => {
    const dataJson = await getFormById(formId)
    const data = JSON.parse(dataJson)
    setId(data._id)
    setFields(data.formData)
  }
  useEffect(() => {
    if (!searchParams.get('id') || !searchParams.get('name')) redirect('/form')
    getFormData(searchParams.get('id') as string)
  }, [])

  return (
    <main className="flex w-full flex-col justify-center">
      <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
        <div className="flex items-center justify-center gap-2">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">
              Form: {searchParams.get('name')}
            </span>
          </h2>
          <div
            className="flex items-center justify-center gap-1 border py-2 px-3 rounded-md bg-[#CC622D] cursor-pointer text-white hover:scale-105"
            onClick={() => router.push(`/form-response/${id}`)}
          >
            Response
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PreviewDialogBtn formData={formData} />
          <ShareFormBtn />
          <PublishFormBtn id={searchParams.get('id')} formData={formData} />
        </div>
      </nav>
      <div className="flex justify-center">
        <div className="flex w-full flex-grow items-center justify-center border p-3 m-2 rounded-md">
          <FormBuilder key={id} fields={fields} setFormData={setFormData} />
        </div>
      </div>
    </main>
  )
}

export default FormEditPage
