'use server'
import { revalidatePath } from 'next/cache'
import FormModel from '@/models/form.model'
import FormResponseModel from '@/models/formResponse.model'
import { connectToMongoDB } from '@/lib/db'
import { Field } from '@/interfaces/formInterfaces'

export const getForms = async () => {
  await connectToMongoDB()
  const forms = await FormModel.find()
  return JSON.stringify(forms)
}

export const getFormById = async (id: string) => {
  await connectToMongoDB()
  const form = await FormModel.findById(id)
  return JSON.stringify(form)
}

export const updateFormById = async (id: string, formData: Field[]) => {
  await connectToMongoDB()
  const form = await FormModel.findByIdAndUpdate(id, { formData })
  revalidatePath('/form')
  return JSON.stringify(form)
}

export const createForm = async (
  name: string,
  description: string,
  formData?: Field[],
) => {
  await connectToMongoDB()
  const form = await FormModel.create({ name, description, formData })
  revalidatePath('/form')
  return JSON.stringify(form)
}

export const getAllFormResponsesById = async (formId: string) => {
  await connectToMongoDB()
  const formResponses = await FormResponseModel.find({ formId })
  return JSON.stringify(formResponses)
}

export const createFormResponse = async (formId: string, formResponse: any) => {
  await connectToMongoDB()
  const response = await FormResponseModel.create({ formId, formResponse })
  return JSON.stringify(response)
}
