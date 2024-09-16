import { formInterface } from '@/interfaces/formInterfaces'
import Link from 'next/link'
import React from 'react'

const FormCard = ({ form }: { form: formInterface }) => {
  return (
    <div className="rounded-lg border shadow-sm p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{form.name}</h3>
        <p>{form.description}</p>
      </div>
      <Link
        href={`/form/edit/?id=${form._id}&name=${form.name}`}
        className="flex items-center justify-center mt-3 bg-publish-btn-gradient text-white gap-2 border py-2 rounded-lg w-full"
      >
        Edit form
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-pen-square"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
        </svg>
      </Link>
    </div>
  )
}

export default FormCard
