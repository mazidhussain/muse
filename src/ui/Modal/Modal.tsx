import React, { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalContainerProps {
  onClose: () => void
  children?: ReactNode
  title?: string
  closeOnClickOutside?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isFloatingClose?: boolean
  showCloseButton?: boolean
}

function ModalContainer({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
  size = 'md',
  isFloatingClose = false,
  showCloseButton = true,
}: ModalContainerProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        closeOnClickOutside
      ) {
        onClose()
      }
    }

    window.addEventListener('keydown', handler)

    const modalOverlayElement = modalRef.current?.parentElement
    modalOverlayElement?.addEventListener('click', clickOutsideHandler)

    return () => {
      window.removeEventListener('keydown', handler)
      modalOverlayElement?.removeEventListener('click', clickOutsideHandler)
    }
  }, [closeOnClickOutside, onClose])

  // Tailwind CSS classes for styling
  const modalSizeClasses =
    {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    }[size] || 'max-w-md'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-4 w-11/12 ${modalSizeClasses} relative`}
        tabIndex={-1}
        ref={modalRef}
      >
        {title && <p className="text-xl font-semibold mb-2">{title}</p>}
        {showCloseButton && (
          <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-2 right-2 h-4 w-4 cursor-pointer"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  )
}

interface ModalProps extends ModalContainerProps {
  children?: ReactNode
}

function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside,
  showCloseButton,
  size,
  ...rest
}: ModalProps) {
  return createPortal(
    <ModalContainer
      onClose={onClose}
      title={title}
      closeOnClickOutside={closeOnClickOutside}
      showCloseButton={showCloseButton}
      size={size}
      {...rest}
    >
      {children}
    </ModalContainer>,
    document.body,
  )
}

export default Modal
