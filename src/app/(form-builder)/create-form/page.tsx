'use client'
import { Field } from '@/interfaces/formInterfaces'
import FormBuilder from '@/ui/FormBuilder/FormBuilder'
import PreviewDialogBtn from '@/ui/PreviewDialogBtn/PreviewDialogBtn'
import PublishFormBtn from '@/ui/PublishFormBtn/PublishFormBtn'
import ShareFormBtn from '@/ui/ShareFormBtn/ShareFormBtn'
import { redirect, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CreateFormPage = () => {
  const searchParams = useSearchParams()
  useEffect(() => {
    if (!searchParams.get('id') || !searchParams.get('name')) redirect('/form')
  }, [])
  const [formData, setFormData] = useState<Field[]>([])
  return (
    <main className="flex w-full flex-col justify-center">
      <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
        <h2 className="truncate font-medium">
          <span className="mr-2 text-muted-foreground">
            Form: {searchParams.get('name')}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <PreviewDialogBtn formData={formData} />
          <ShareFormBtn />
          <PublishFormBtn id={searchParams.get('id')} formData={formData} />
        </div>
      </nav>
      <div className="flex justify-center">
        <div className="flex w-full flex-grow items-center justify-center border p-3 m-2 rounded-md">
          <FormBuilder setFormData={setFormData} />
        </div>
      </div>
    </main>
  )
}

export default CreateFormPage
