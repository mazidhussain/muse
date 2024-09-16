'use client'
import useModal from '@/hooks/useModal'
import FormCreateModal from '../FormCreateModal/FormCreateModal'

export default function CreateFormBtn() {
  const [modal, showModal] = useModal()

  const handleModal = () => {
    showModal({
      title: 'Create form',
      contentFn: (onClose) => <FormCreateModal />,
      closeOnClickOutside: true,
      size: 'md',
      showCloseButton: true,
    })
  }

  return (
    <>
      <div
        className="text-xl font-bold flex items-center justify-center h-[150px] w-[300px] m-4 rounded-lg border flex-col cursor-pointer hover:scale-95"
        onClick={handleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-muted-foreground group-hover:text-primary
                    transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" x2="12" y1="18" y2="12"></line>
          <line x1="9" x2="15" y1="15" y2="15"></line>
        </svg>
        <span>Create new form</span>
      </div>
      {modal}
    </>
  )
}
