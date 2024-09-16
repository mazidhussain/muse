'use client'
import useModal from '@/hooks/useModal'
import React from 'react'
import DynamicForm from '../DynamicForm/DynamicForm'
import { Field } from '@/interfaces/formInterfaces'

const previewModal = (formData: Field[]) => {
  return (
    <div className="modal-wrapper">
      <DynamicForm data={formData} />
    </div>
  )
}

const PreviewDialogBtn = ({ formData }: { formData: any }) => {
  const [modal, showModal] = useModal()
  const handlePreview = () => {
    showModal({
      title: 'Create form',
      contentFn: (onClose) => previewModal(formData.actions.getData()),
      closeOnClickOutside: true,
      size: 'md',
      showCloseButton: true,
    })
  }
  return (
    <>
      <button
        className="flex items-center justify-center gap-1 border py-2 px-3 rounded-md hover:bg-[#f3f4f6]"
        onClick={handlePreview}
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
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        Preview
      </button>
      {modal}
    </>
  )
}

export default PreviewDialogBtn
