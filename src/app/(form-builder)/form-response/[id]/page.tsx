import { getAllFormResponsesById } from '@/lib/actions/form.actions'
import BackButton from '@/ui/BackButton/BackButton'
import FormResponseActions from '@/ui/FormResponseActions/FormResponseActions'
import React from 'react'

interface FormResponse {
  _id: string
  formId: string
  formResponse: Array<{
    type: string
    label: string
    value: string
    name?: string
    className?: string
  }>
  createdAt: string
  updatedAt: string
}

const Page = async ({ params }: { params: { id: string } }) => {
  const formResponses = (await getAllFormResponsesById(params.id)) ?? []
  const responseArray: FormResponse[] = JSON.parse(formResponses)

  const extractFieldValue = (
    formResponse: Array<{
      type: string
      label: string
      value: string
      name?: string
      className?: string
    }>,
    label: string,
  ) => {
    const field = formResponse.find((field) => field.label === label)
    return field ? field.value : 'N/A'
  }
  return (
    <main className="flex w-full flex-col justify-center">
      <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
        <div className="flex items-center justify-center gap-2">
          <BackButton />
        </div>
      </nav>
      <div className="flex justify-center">
        <div className="flex w-full flex-grow items-center justify-center p-3 m-2 rounded-md border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responseArray.map((response: FormResponse) => (
                <tr key={response._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {response._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {response.formId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {extractFieldValue(response.formResponse, 'Name')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(response.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FormResponseActions
                      formId={response._id}
                      formData={response.formResponse}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default Page
