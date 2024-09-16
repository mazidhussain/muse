import useModal from '@/hooks/useModal'
import React from 'react'
import ShareFormModal from '../ShareFormModal/ShareFormModal'

const ShareFormBtn = () => {
  const [modal, showModal] = useModal()
  const handleShare = () => {
    showModal({
      title: 'Share',
      contentFn: (onClose) => <ShareFormModal />,
      closeOnClickOutside: true,
      size: 'md',
      showCloseButton: true,
    })
  }
  return (
    <>
      <button
        className="flex items-center justify-center gap-1 border py-2 px-3 rounded-md hover:bg-[#f3f4f6]"
        onClick={handleShare}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
        Share
      </button>
      {modal}
    </>
  )
}

export default ShareFormBtn
